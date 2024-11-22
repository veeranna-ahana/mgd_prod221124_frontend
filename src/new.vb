Public Class Form_Program_Parts_Inspection

    Dim Da_Pgm, DA_PgmParts, DA_pgmMaterial As MySql.Data.MySqlClient.MySqlDataAdapter
    Dim intNCId As Integer
    Dim pgm As magod.Production.TaskProgramListRow


    Private Sub setUpProgram()
        Da_Pgm = MagodProd.getDBLink.getMySqlDataAdopter
        With Da_Pgm
            With .SelectCommand
                .CommandText = "SELECT n.* FROM magodmis.ncprograms n WHERE n.ncid=@ncid;"
                .Parameters.AddWithValue("@ncid", intNCId)
            End With
            ' .Fill(DS_Form, "Program")
            .Fill(Production1.TaskProgramList)
            pgm = Production1.TaskProgramList.First
            With .UpdateCommand
                .CommandText = "UPDATE magodmis.ncprograms n SET n.`PStatus`=@PStatus,  n.`Machine`=@Machine " _
                & "WHERE n.`Ncid`=@Ncid;"
                With .Parameters
                    .Add("@Machine", MySql.Data.MySqlClient.MySqlDbType.VarChar, 45, "Machine")
                    .Add("@PStatus", MySql.Data.MySqlClient.MySqlDbType.VarChar, 45, "PStatus")
                    .Add("@Ncid", MySql.Data.MySqlClient.MySqlDbType.Int32, 20, "Ncid")

                End With
            End With
        End With
        DA_PgmParts = MagodProd.getDBLink.getMySqlDataAdopter
        With DA_PgmParts
            With .SelectCommand

                .CommandText = "SELECT n1.nc_pgme_part_id, n1.`DwgName`, n1.`QtyNested`, n1.`Sheets`,  " _
                                & "n1.`QtyNested` * n1.`Sheets` as `TotQtyNested`, " _
                                   & "n1.`QtyCut`, n1.`QtyRejected`, n1.`QtyCleared`, n1.`Remarks`, n1.`NcProgramNo` " _
                                   & "FROM magodmis.ncprogram_partslist n1 WHERE n1.`NCId`=@NCId"
                .Parameters.AddWithValue("@NCId", intNCId)
            End With
         
            .Fill(Production1.NCProgramPartsList)
            With .UpdateCommand
                .CommandText = "UPDATE magodmis.ncprogram_partslist n " _
                & "SET n.`QtyCut`=@QtyCut, n.`QtyCleared`=@QtyCleared, n.`QtyRejected`=@QtyRejected, n.`Remarks`=@Remarks " _
                & "WHERE n.`NC_Pgme_Part_ID`=@NC_Pgme_Part_ID;"
                With .Parameters
                    .Add("@QtyCut", MySql.Data.MySqlClient.MySqlDbType.Int32, 20, "QtyCut")
                    .Add("@QtyCleared", MySql.Data.MySqlClient.MySqlDbType.Int32, 20, "QtyCleared")
                    .Add("@QtyRejected", MySql.Data.MySqlClient.MySqlDbType.Int32, 20, "QtyRejected")
                    .Add("@Remarks", MySql.Data.MySqlClient.MySqlDbType.VarChar, 45, "Remarks")
                    .Add("@NC_Pgme_Part_ID", MySql.Data.MySqlClient.MySqlDbType.Int32, 20, "NC_Pgme_Part_ID")
                End With
            End With
        End With

    End Sub
   
    Private Sub btn_Clear_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles btn_Clear.Click
        Bs_ProgramParts.EndEdit()
        For Each dr As magod.Production.NCProgramPartsListRow In Production1.NCProgramPartsList.Rows
            dr.QtyCleared = dr.QtyCut - dr.QtyRejected
        Next
        saveParts()
    End Sub

    Private Sub DataGridView1_CellValidated(ByVal sender As System.Object, ByVal e As System.Windows.Forms.DataGridViewCellEventArgs) Handles DataGridView1.CellValidated
        If Me.DataGridView1.Columns(e.ColumnIndex).Name = "Remarks" Then

        End If
        If Me.DataGridView1.Columns(e.ColumnIndex).Name = "QtyCut" _
        Or Me.DataGridView1.Columns(e.ColumnIndex).Name = "QtyRejected" Then

            Me.DataGridView1.CurrentRow.Cells("QtyCleared").Value = 0

        End If
        saveParts()

    End Sub
    Private Sub saveParts()
        Bs_ProgramParts.EndEdit()
        DA_PgmParts.Update(Production1.NCProgramPartsList)
    End Sub

    Private Sub btn_Close_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles btn_Close.Click
        '*******Permit if parts cleared is correct
        For Each dr As magod.Production.NCProgramPartsListRow In Production1.NCProgramPartsList.Rows
            If Not dr.QtyCleared = dr.QtyCut - dr.QtyRejected Then
                MsgBox("Clear Parts for quality before closing the Program")
                Exit Sub
            End If
        Next
        '***** If Sheets Allotted Either Used Or returned
        Dim result As Integer
        With getCommand
            .Parameters.Clear()
            .Parameters.AddWithValue("@NCProgramNo", pgm.NCProgramNo)
            .CommandText = "Select CASE When SUM(Used)+Sum(Rejected)=n.QtyAllotted then 1 ELSE 0 end
                        FROM magodmis.ncprograms n,
                        ( SELECT n.`Used`, n.`Rejected`,n.`ShapeMtrlID` FROM magodmis.ncprogrammtrlallotmentlist n
                        WHERE n.`NCProgramNo`=@NCProgramNo
                        UNION
                        SELECT n.`Used`, n.`Rejected`,n.`ShapeMtrlID` FROM magodmis.ncprogramusedmtrllist n
                        WHERE n.`NCProgramNo`=@NCProgramNo) as A
                        WHERE n.`NCProgramNo`=@NCProgramNo"

            .Connection.Open()
            result = .ExecuteScalar
            .Connection.Close()
            If result = 0 Then
                MsgBox("Return or update Material before closing Program")
                Exit Sub
            End If
        End With

        With Production1.TaskProgramList.First
            If .QtyAllotted < .Qty Then '****** Means complete material for program not issued

                If MsgBox(String.Format("Qty Required {0} - Qty Allotted {1}. Do you wish to short close program No {2}", .Qty, .QtyAllotted, .NCProgramNo), MsgBoxStyle.YesNo) = MsgBoxResult.Yes Then
                    .PStatus = "Closed"
                Else
                    .PStatus = "Mtrl Issue"
                End If

                'ElseIf .QtyCut < .QtyAllotted Then '***** Means Material Rejected or Prematurly Closed
                '    .PStatus = "Cutting"
                '        ' **** check if all the material has been marked as closed
            Else
                    '***** check if all parts 
                                 .PStatus = "Closed"

            End If
        End With
      

        Da_Pgm.Update(Production1.TaskProgramList)
    End Sub

    Public Sub New(ByVal Cutting As Boolean, ByVal NcId As Integer)

        ' This call is required by the Windows Form Designer.
        InitializeComponent()

        ' Add any initialization after the InitializeComponent() call.
        If Cutting Then
            Me.Panel1.BackColor = Color.Crimson
            Me.btn_ChangeMachine.Visible = True
            Me.btn_Close.Visible = False
        Else
            Me.btn_ChangeMachine.Visible = False
            Me.btn_Close.Visible = True
        End If
        intNCId = NcId
        setUpProgram()
    End Sub
    Private Sub btn_ChangeMachine_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles btn_ChangeMachine.Click
        Using X As New Form_MachineSelection(BS_Program)

            X.ShowDialog()
            BS_Program.EndEdit()
            Da_Pgm.Update(Production1.TaskProgramList)
        End Using
    End Sub
   
  
   
End Class