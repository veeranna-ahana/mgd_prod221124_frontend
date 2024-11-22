Public Class DayProductionReportForm
  
    Private DA_ShiftLog, Da_DayMachineUsage, DA_MachineTaskSummary, Da_reportInfo, _
                DA_Rep As MySql.Data.MySqlClient.MySqlDataAdapter
    Public Sub New()

        ' This call is required by the Windows Form Designer.
        InitializeComponent()

        ' Add any initialization after the InitializeComponent() call.
        setUpdata()
        BS_Machine.DataSource = MagodProd.getAllWorkingMachines
        setProductionTree()
    End Sub
    Private Sub setProductionTree()
        With TreeView_Machines
            .Nodes.Clear()
            Dim newNode As New TreeNode("Machines")
            For Each dr As Object In BS_Machine.List
                Dim machineName As String = dr.item("refName")
              
                Dim newMachine As New TreeNode(machineName & " - ")
                newMachine.Name = machineName
                newNode.Nodes.Add(newMachine)
                newMachine.BackColor = Color.LightGray
              
            Next
            .Nodes.Add(newNode)
            newNode.Expand()

        End With
    End Sub

    Private Sub setUp_DAShiftLog()
        DA_ShiftLog = MagodProd.getDBLink.getMySqlDataAdopter
        With DA_ShiftLog
            Dim sql As New System.Text.StringBuilder
            With sql
                .Append("SELECT s1.ShiftLogId, d.`ShiftDate`, d.`Shift`, d.`Shift_Ic`, s.`Machine`, s.`Operator` as ShiftOperator, s1.`Operator` as MachineOperator,")
                .Append(" s1.`FromTime`, s1.`ToTime`, s1.`Program`, n.`Operation`, n.`Cust_Code`, n.`Mtrl_Code`, n.`CustMtrl`,s1.`TaskNo`,m.`Material` ")
                .Append(" FROM magodmis.day_shiftregister d, magodmis.shiftregister s, magodmis.shiftlogbook s1,magodmis.ncprograms n,magodmis.mtrlgrades m, magodmis.mtrl_data m1 ")
                .Append("WHERE d.`ShiftDate`>=@FromDate AND d.`ShiftDate`<=@ToDate AND s.`DayShiftID`=d.`DayShiftId` ")
                .Append("AND s.`ShiftID`=s1.`ShiftID` AND s1.`TaskNo` not like '100'   AND s1.`StoppageID`=n.`NcId` AND Not (s1.`ToTime` is null OR  s1.`FromTime` is null) ")
                .Append("AND m.`MtrlGradeID` =m1.`MtrlGradeID` AND m1.`Mtrl_Code`=n.`Mtrl_Code` ")
                .Append("UNION ")
                .Append("SELECT  s1.ShiftLogId, d.`ShiftDate`,d.`Shift`, d.`Shift_Ic`, s.`Machine`, s.`Operator` as ShiftOperator, s1.`Operator` as MachineOperator,")
                .Append(" s1.`FromTime`, s1.`ToTime`, s1.`Program`, s3.`GroupName` as Operation, '0000' as cust_code,'NA' as Mtrl_Code, 'Magod' as CustMtrl,s1.`TaskNo`,'NA' as `Material` ")
                .Append(" FROM magodmis.day_shiftregister d, magodmis.shiftregister s, magodmis.shiftlogbook s1,")
                .Append(" magod_production.stoppagereasonlist s2,magod_production.stoppage_category s3 ")
                .Append("WHERE d.`ShiftDate`>=@FromDate AND d.`ShiftDate`<=@ToDate AND s.`DayShiftID`=d.`DayShiftId` AND s.`ShiftID`=s1.`ShiftID` AND s1.`TaskNo`  like '100' ")
                .Append("AND s1.`StoppageID`=s2.`StoppageID` AND s3.`StoppageGpId`=s2.`StoppageGpId` AND Not (s1.`ToTime` is null OR  s1.`FromTime` is null)")

            End With
            With .SelectCommand
                .CommandText = sql.ToString
                .Parameters.AddWithValue("@FromDate", Format(DTP_Report.Value, "yyyy-MM-dd"))
                .Parameters.AddWithValue("@ToDate", Format(DTP_Report.Value, "yyyy-MM-dd"))
            End With


            With .UpdateCommand
                .CommandText = "UPDATE magodmis.Shiftlogbook SET FromTime=@FromTime, ToTime=@ToTime " _
                            & " WHERE ShiftLogId =@ShiftLogId;"
                With .Parameters
                    .Add("@FromTime", MySql.Data.MySqlClient.MySqlDbType.DateTime, 30, "FromTime")
                    .Add("@ToTime", MySql.Data.MySqlClient.MySqlDbType.DateTime, 30, "ToTime")
                    .Add("@ShiftLogId", MySql.Data.MySqlClient.MySqlDbType.Int32, 20, "ShiftLogId")

                End With
            End With
            With .DeleteCommand
                .CommandText = "DELETE FROM magodmis.Shiftlogbook " _
                            & " WHERE ShiftLogId =@ShiftLogId;"
                With .Parameters
                    .Add("@ShiftLogId", MySql.Data.MySqlClient.MySqlDbType.Int32, 20, "ShiftLogId")

                End With
            End With
        End With
    End Sub
    Private Sub setup_DAMachineUtilisation()
        Da_DayMachineUsage = MagodProd.getDBLink.getMySqlDataAdopter
        With Da_DayMachineUsage
            With .SelectCommand
                .CommandText = "SELECT * FROM magod_production.machine_utilisationsummary m " _
                & "WHERE m.`Date`=@repdate;"
                .Parameters.Add("@repdate", MySql.Data.MySqlClient.MySqlDbType.DateTime)
            End With

            With .InsertCommand
                .CommandText = "INSERT INTO magod_production.machine_utilisationsummary " _
                                    & "(Date, Machine, TotalOn, ProdON, NonProdOn, TotalOff, " _
                                    & "NoOrderOFF, OFFMaintenance, OFFNoPower, OFFAdmin, " _
                                    & "PowerUsed, BeamOn, LaserOn, OFFNoOrder, OFFMaterial, " _
                                    & "OFFCad, NPmaint, NPAdmin, NPOrder, NPMtrl, NPCad, NPOperator) " _
                                    & "VALUES(@Date, @Machine,@TotalOn, @ProdON, @NonProdOn, @TotalOff, " _
                                    & "@NoOrderOFF, @OFFMaintenance, @OFFNoPower, @OFFAdmin, " _
                                    & "@PowerUsed, @BeamOn, @LaserOn, @OFFNoOrder, @OFFMaterial, " _
                                    & "@OFFCad, @NPmaint, @NPAdmin, @NPOrder, @NPMtrl, @NPCad, @NPOperator);"

                '.CommandText = "INSERT INTO magod_production.machine_utilisationsummary " _
                '                  & "(Date, Machine, TotalOn, TotalOff) " _
                '                  & "VALUES(@Date, @Machine, @TotalOn, @TotalOff);"



                With .Parameters
                    .Add("@Date", MySql.Data.MySqlClient.MySqlDbType.DateTime, 20, "Date")
                    .Add("@Machine", MySql.Data.MySqlClient.MySqlDbType.VarChar, 45, "Machine")
                    .Add("@TotalOn", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "TotalOn")
                    .Add("@ProdON", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "ProdON")
                    .Add("@NonProdOn", MySql.Data.MySqlClient.MySqlDbType.Int32, 20, "NonProdOn")
                    .Add("@TotalOff", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "TotalOff")
                    .Add("@NoOrderOFF", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "NoOrderOFF")
                    .Add("@OFFMaintenance", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "OFFMaintenance")
                    .Add("@OFFNoPower", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "OFFNoPower")
                    .Add("@OFFAdmin", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "OFFAdmin")
                    .Add("@PowerUsed", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "PowerUsed")
                    .Add("@BeamOn", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "BeamOn")
                    .Add("@LaserOn", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "LaserOn")
                    .Add("@OFFNoOrder", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "OFFNoOrder")
                    .Add("@OFFMaterial", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "OFFMaterial")
                    .Add("@OFFCad", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "OFFCad")
                    .Add("@NPmaint", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "NPmaint")
                    .Add("@NPAdmin", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "NPAdmin")
                    .Add("@NPOrder", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "NPOrder")
                    .Add("@NPMtrl", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "NPMtrl")
                    .Add("@NPCad", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "NPCad")
                    .Add("@NPOperator", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "NPOperator")

                End With
            End With
            '
            With .UpdateCommand
                .CommandText = "UPDATE magod_production.machine_utilisationsummary " _
                              & "SET TotalOn=@TotalOn, ProdON=@ProdON, NonProdOn=@NonProdOn, TotalOff=@TotalOff,LaserOn=@LaserOn  " _
                           & "WHERE ID=@ID;"
                '& "OFFMaintenance=@OFFMaintenance, OFFNoPower=@OFFNoPower, OFFAdmin=@OFFAdmin, PowerUsed=@PowerUsed, BeamOn=@BeamOn, " _
                '& "LaserOn=@LaserOn, OFFNoOrder=@OFFNoOrder, OFFMaterial=@OFFMaterial, OFFCad=@OFFCad, NPmaint=@NPmaint, " _
                '& "NPAdmin=@NPAdmin, NPOrder=@NPOrder, NPMtrl=@NPMtrl, NPCad=@NPCad, NPOperator=@NPOperator " _
                '  & "WHERE ID=@ID;"
                With .Parameters
                    .Add("@TotalOn", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "TotalOn")
                    .Add("@ProdON", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "ProdON")
                    .Add("@NonProdOn", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "NonProdOn")
                    .Add("@TotalOff", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "TotalOff")
                    .Add("@NoOrderOFF", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "NoOrderOFF")
                    '.Add("@OFFMaintenance", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "OFFMaintenance")
                    '.Add("@OFFNoPower", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "OFFNoPower")
                    '.Add("@OFFAdmin", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "OFFAdmin")
                    '.Add("@PowerUsed", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "PowerUsed")
                    '.Add("@BeamOn", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "BeamOn")
                    .Add("@LaserOn", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "LaserOn")
                    '.Add("@OFFNoOrder", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "OFFNoOrder")
                    '.Add("@OFFMaterial", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "OFFMaterial")
                    '.Add("@OFFCad", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "OFFCad")
                    '.Add("@NPmaint", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "NPmaint")
                    '.Add("@NPAdmin", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "NPAdmin")
                    '.Add("@NPOrder", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "NPOrder")
                    '.Add("@NPMtrl", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "NPMtrl")
                    '.Add("@NPCad", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "NPCad")
                    '.Add("@NPOperator", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "NPOperator")

                    .Add("@ID", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "ID")
                End With


            End With
        End With
    End Sub

    Private Sub setUpdata()
        setUp_DARep()
        setUp_DAShiftLog()
        setup_DAMachineUtilisation()
        setUp_DAMachineTaskSummary()

    End Sub
    Private Sub setUp_DARep()
        '***** Daily Repot Ino deatisl

        Da_reportInfo = MagodProd.getDBLink.getMySqlDataAdopter
        With Da_reportInfo
            With .SelectCommand
                .CommandText = "SELECT * FROM magodmis.dailyreport_register " _
                & "WHERE `Report_Name`='Production_Report' AND `reportdate`=@repdate;"
                .Parameters.Add("@repdate", MySql.Data.MySqlClient.MySqlDbType.DateTime)
            End With

            With .UpdateCommand
                .CommandText = "UPDATE  magodmis.dailyreport_register SET  SubmitDate=@SubmitDate " _
                & "WHERE `ReportId`=@ReportId;"
                .Parameters.Add("@SubmitDate", MySql.Data.MySqlClient.MySqlDbType.DateTime, 20, "SubmitDate")
                .Parameters.Add("@ReportId", MySql.Data.MySqlClient.MySqlDbType.Int32, 20, "ReportId")
            End With

            With .InsertCommand
                .CommandText = "INSERT INTO magodmis.dailyreport_register " _
                & "(Report_Name, reportdate, UnitName, SubmitDate, SentBy, ApprovedBy) " _
                & "Values(@Report_Name, @reportdate, @UnitName, @SubmitDate, @SentBy, @ApprovedBy);"
                With .Parameters
                    .Add("@Report_Name", MySql.Data.MySqlClient.MySqlDbType.VarChar, 45, "Report_Name")
                    .Add("@reportdate", MySql.Data.MySqlClient.MySqlDbType.DateTime, 20, "reportdate")
                    .Add("@UnitName", MySql.Data.MySqlClient.MySqlDbType.VarChar, 45, "UnitName")
                    .Add("@SubmitDate", MySql.Data.MySqlClient.MySqlDbType.DateTime, 20, "SubmitDate")
                    .Add("@SentBy", MySql.Data.MySqlClient.MySqlDbType.VarChar, 45, "SentBy")
                    .Add("@ApprovedBy", MySql.Data.MySqlClient.MySqlDbType.VarChar, 45, "ApprovedBy")
                End With
            End With
        End With
        DA_Rep = MagodProd.getDBLink.getMySqlDataAdopter
        ''**** Set data Adopters
        With DA_Rep
            ' 
            With .SelectCommand
                .CommandText = "SELECT * FROM daily_unitproductionsummary WHERE `Date`= @repdate;"
                .Parameters.Add("@repdate", MySql.Data.MySqlClient.MySqlDbType.DateTime)
            End With

            With .InsertCommand
                .CommandText = "INSERT INTO magod_production.daily_unitproductionsummary " _
                & "(Date, PowerReading, PowerUnits, OT_hours, OT_value, DailyReport) " _
                & "values (@Date, @PowerReading, @PowerUnits, @OT_hours, @OT_value, @DailyReport); "
                .Parameters.Add("@Date", MySql.Data.MySqlClient.MySqlDbType.DateTime, 20, "Date")
                .Parameters.Add("@PowerReading", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "PowerReading")
                .Parameters.Add("@PowerUnits", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "PowerUnits")
                .Parameters.Add("@OT_hours", MySql.Data.MySqlClient.MySqlDbType.Double, 45, "OT_value")
                .Parameters.Add("@DailyReport", MySql.Data.MySqlClient.MySqlDbType.VarChar, 500, "DailyReport")
            End With
            'ID, Date, Details, Value, PowerReading, PowerUnits, OT_hours, OT_value, DailyReport
            '
            With .UpdateCommand
                .CommandText = "UPDATE magod_production.daily_unitproductionsummary " _
                                & "SET PowerReading=@PowerReading, PowerUnits=@PowerUnits, OT_hours=@OT_hours, OT_value=@OT_value, " _
                                & "DailyReport=@DailyReport , PreparedBy=@PreparedBy, ReportSent=@ReportSent " _
                                & "WHERE ID=@ID;"


                .Parameters.Add("@PowerReading", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "PowerReading")
                .Parameters.Add("@PowerUnits", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "PowerUnits")
                .Parameters.Add("@OT_hours", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "OT_hours")
                .Parameters.Add("@OT_value", MySql.Data.MySqlClient.MySqlDbType.Double, 20, "OT_value")
                .Parameters.Add("@DailyReport", MySql.Data.MySqlClient.MySqlDbType.VarChar, 500, "DailyReport")
                .Parameters.Add("@PreparedBy", MySql.Data.MySqlClient.MySqlDbType.VarChar, 45, "PreparedBy")
                .Parameters.Add("@ReportSent", MySql.Data.MySqlClient.MySqlDbType.Int32, 20, "ReportSent")
                .Parameters.Add("@ID", MySql.Data.MySqlClient.MySqlDbType.Int32, 20, "ID")
            End With


        End With
    End Sub

    Private Sub setUp_DAMachineTaskSummary()
        DA_MachineTaskSummary = MagodProd.getDBLink.getMySqlDataAdopter
        With DA_MachineTaskSummary
            With .SelectCommand
                .CommandText = "SELECT sum(timestampdiff(minute, s.`FromTime`, s.`toTime`)) as machineTime, n.`TaskNo`, n.`ScheduleID`," _
                                & "s.`Machine`, n.`Cust_Code`, n.`Mtrl_Code`, n.`MTRL`, n.`Thickness`, n.`Operation`, s1.`ShiftDate` " _
                                & "FROM magodmis.shiftlogbook s,magodmis.shiftregister s1,magodmis.nc_task_list n " _
                                & "WHERE s1.`ShiftDate`=@repdate AND s1.`ShiftID`=s.`ShiftID` AND  not s.`TaskNo` like '100' AND n.`TaskNo`=s.`TaskNo` " _
                                & "GROUP BY s.`TaskNo`, s.`Machine`;"
                .Parameters.Add("@repdate", MySql.Data.MySqlClient.MySqlDbType.DateTime)
            End With
        End With
    End Sub
    Private Sub setup_DailyProdReport()
        Da_reportInfo = MagodProd.getDBLink.getMySqlDataAdopter
        With Da_reportInfo
            With .SelectCommand
                .CommandText = "SELECT * FROM magodmis.dailyreport_register " _
                & "WHERE `Report_Name`='Production_Report' AND `reportdate`=@ReportDate;"
                .Parameters.Add("@ReportDate", MySql.Data.MySqlClient.MySqlDbType.DateTime)
            End With

            With .UpdateCommand
                .CommandText = "UPDATE  magodmis.dailyreport_register SET  SubmitDate=@SubmitDate " _
                & "WHERE `ReportId`=@ReportId;"
                .Parameters.Add("@SubmitDate", MySql.Data.MySqlClient.MySqlDbType.DateTime, 20, "SubmitDate")
                .Parameters.Add("@ReportId", MySql.Data.MySqlClient.MySqlDbType.Int32, 20, "ReportId")
            End With

            With .InsertCommand
                .CommandText = "INSERT INTO magodmis.dailyreport_register " _
                & "(Report_Name, reportdate, UnitName, SubmitDate, SentBy, ApprovedBy) " _
                & "Values(@Report_Name, @reportdate, @UnitName, @SubmitDate, @SentBy, @ApprovedBy);"
                With .Parameters
                    .Add("@Report_Name", MySql.Data.MySqlClient.MySqlDbType.VarChar, 45, "Report_Name")
                    .Add("@reportdate", MySql.Data.MySqlClient.MySqlDbType.DateTime, 20, "reportdate")
                    .Add("@UnitName", MySql.Data.MySqlClient.MySqlDbType.VarChar, 45, "UnitName")
                    .Add("@SubmitDate", MySql.Data.MySqlClient.MySqlDbType.DateTime, 20, "SubmitDate")
                    .Add("@SentBy", MySql.Data.MySqlClient.MySqlDbType.VarChar, 45, "SentBy")
                    .Add("@ApprovedBy", MySql.Data.MySqlClient.MySqlDbType.VarChar, 45, "ApprovedBy")
                End With
            End With
        End With
    End Sub
    Private Sub btnSaveLog_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles btnSaveLog.Click
        '***** Save changes to Shift Log"
        BS_ShiftLog.EndEdit()
        DA_ShiftLog.Update(Analytics1.MachineLogBook)
        '**** Update NcProgram Actual Time

        With MagodProd.getCommand
            .CommandText = "UPDATE magodmis.ncprograms n, (SELECT  s.`Program`,
                        sum(timestampdiff( minute,s.`FromTime`, s.`ToTime`)) as MachineTime
                        FROM magodmis.shiftlogbook s,magodmis.ncprograms n
                        WHERE s.`Program`=n.`NCProgramNo` AND s.`Program`=@Program ) as A
                        SET n.`ActualTime`=A.MachineTime
                        WHERE A.Program=n.NCProgramNo "
            .Parameters.Add("@Program", MySql.Data.MySqlClient.MySqlDbType.String)
            Try
                .Connection.Open()
                For Each pgm In Analytics1.MachineLogBook
                    .Parameters("@Program").Value = pgm.Program
                    .ExecuteNonQuery()
                Next
            Catch ex As Exception
                MsgBox(ex.Message)
            Finally
                If .Connection.State <> ConnectionState.Closed Then
                    .Connection.Close()
                End If
            End Try


        End With
        MsgBox("LogSaved")
    End Sub

    Private Sub DTP_Report_ValueChanged(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles DTP_Report.ValueChanged
        Analytics1.Clear()

        BasicDS1.dailyreport_register.Clear()
        Da_reportInfo.SelectCommand.Parameters("@repdate").Value = Format(DTP_Report.Value, "yyyy-MM-dd")
        Da_reportInfo.Fill(BasicDS1.dailyreport_register)


        DA_ShiftLog.SelectCommand.Parameters("@FromDate").Value = Format(DTP_Report.Value, "yyyy-MM-dd")
        DA_ShiftLog.SelectCommand.Parameters("@ToDate").Value = Format(DTP_Report.Value, "yyyy-MM-dd")
        DA_ShiftLog.Fill(Analytics1.MachineLogBook)
        For Each log As Analytics.MachineLogBookRow In Analytics1.MachineLogBook.Rows
            log.MachineTime = DateDiff(DateInterval.Minute, log.FromTime, log.ToTime)
        Next

        DA_MachineTaskSummary.SelectCommand.Parameters("@repdate").Value = Format(DTP_Report.Value, "yyyy-MM-dd")
        DA_MachineTaskSummary.Fill(Analytics1.Unit_Task_MachineTime)


        Production1.daily_unitproductionsummary.Clear()
        DA_Rep.SelectCommand.Parameters("@repdate").Value = Format(DTP_Report.Value, "yyyy-MM-dd")
        DA_Rep.Fill(Production1.daily_unitproductionsummary)
        If Production1.daily_unitproductionsummary.Rows.Count = 0 Then
            '**** Report Entry does not exist. So Insert
            Dim newRep = Production1.daily_unitproductionsummary.Newdaily_unitproductionsummaryRow
            With newRep
                ._Date = DTP_Report.Value
                .OT_hours = 0
                .OT_value = 0
                .PowerReading = 0
                .PowerUnits = 0
                .DailyReport = ""
            End With
            With MagodProd.getCommand
                .CommandText = "INSERT INTO magod_production.daily_unitproductionsummary " _
                & "(Date, PowerReading, PowerUnits, OT_hours, OT_value, DailyReport) " _
                & "values (@Date, @PowerReading, @PowerUnits, @OT_hours, @OT_value, @DailyReport); "
                .Parameters.Clear()
                .Parameters.AddWithValue("@Date", newRep._Date)
                .Parameters.AddWithValue("@PowerReading", 0)
                .Parameters.AddWithValue("@PowerUnits", 0)
                .Parameters.AddWithValue("@OT_hours", 0)
                .Parameters.AddWithValue("@OT_value", 0)
                .Parameters.AddWithValue("@DailyReport", "")
                .Connection.Open()
                .ExecuteNonQuery()
                .CommandText = "SELECT LAST_INSERT_ID();"
                .ExecuteScalar()
                newRep.ID = .ExecuteScalar
                .Connection.Close()
            End With
            Production1.daily_unitproductionsummary.Adddaily_unitproductionsummaryRow(newRep)
            newRep.AcceptChanges()
        End If

        Production1.machine_utilisationsummary.Clear()


        Da_DayMachineUsage.SelectCommand.Parameters("@repdate").Value = Format(DTP_Report.Value, "yyyy-MM-dd")
        Da_DayMachineUsage.Fill(Production1.machine_utilisationsummary)
        If Production1.machine_utilisationsummary.Rows.Count = 0 Then
            '***** Machine Serials are not available
            For Each mach In MagodProd.getWorkingMachineList
                Dim machReport As magod.Production.machine_utilisationsummaryRow _
                            = Production1.machine_utilisationsummary.Newmachine_utilisationsummaryRow
                With machReport
                    ._Date = DTP_Report.Value
                    .Machine = mach.item("RefName")
                End With
                Production1.machine_utilisationsummary.Addmachine_utilisationsummaryRow(machReport)

            Next
            Da_DayMachineUsage.Update(Production1.machine_utilisationsummary)


        End If

        Production1.machine_utilisationsummary.Clear()
        Da_DayMachineUsage.SelectCommand.Parameters("@repdate").Value = Format(DTP_Report.Value, "yyyy-MM-dd")
        Da_DayMachineUsage.Fill(Production1.machine_utilisationsummary)



        setMachinePara()
        set_EditStatus()

    End Sub

    Private Sub TreeView_Machines_AfterSelect(ByVal sender As System.Object, ByVal e As System.Windows.Forms.TreeViewEventArgs) Handles TreeView_Machines.AfterSelect
        If e.Node.Level = 0 Then
            BS_ShiftLog.Filter = ""
            BS_TaskSummary.Filter = ""
        ElseIf e.Node.Level = 1 Then
            BS_ShiftLog.Filter = String.Format("Machine='{0}'", e.Node.Name)
            BS_TaskSummary.Filter = String.Format("Machine='{0}'", e.Node.Name)
        ElseIf e.Node.Level = 2 Then
            BS_ShiftLog.Filter = String.Format("Machine='{0}' AND  Shift='{1}'", e.Node.Parent.Name, e.Node.Name)
            BS_TaskSummary.Filter = String.Format("Machine='{0}'", e.Node.Parent.Name)
        End If
       
    End Sub
    Private Sub setMachinePara()
        Dim TimeMachine, TimeShift As Int32
        For Each machineNode As TreeNode In TreeView_Machines.Nodes(0).Nodes
            TimeMachine = 0
            Dim machineName As String = machineNode.Name
            Dim machineTime = From log In Analytics1.MachineLogBook Where Not (log.IsFromTimeNull Or log.IsToTimeNull) And log.Machine = machineName _
                              Group By log.Shift Into shiftList = Group Select Shift, shiftList
            machineNode.Nodes.Clear()

            For Each mech In machineTime
                TimeShift = 0
                Dim shiftNode As New TreeNode(mech.Shift)
                shiftNode.Name = mech.Shift
                machineNode.Nodes.Add(shiftNode)
                Dim ProdNode As New TreeNode("Production")
                shiftNode.Nodes.Add(ProdNode)
                Dim ProdTime As Int32 = 0
                Dim productionTime = From log In mech.shiftList Where Not log.TaskNo Like "100" _
                                    Group By log.Operation Into opsList = Group, opsTime = Sum(DateDiff(DateInterval.Minute, log.FromTime, log.ToTime)) _
                                    Select Operation, opsTime, opsList
                For Each ops In productionTime
                    TimeShift += ops.opsTime
                    ProdTime += ops.opsTime
                    Dim opsNode As New TreeNode(ops.Operation & " - " & ops.opsTime)
                    ProdNode.Nodes.Add(opsNode)
                Next
                ProdNode.Text = "Production - " & ProdTime
                ProdTime = 0
                ProdNode = New TreeNode("Non Productive")
                shiftNode.Nodes.Add(ProdNode)
                productionTime = From log In mech.shiftList Where log.TaskNo Like "100" _
                                  Group By log.Operation Into opsList = Group, opsTime = Sum(DateDiff(DateInterval.Minute, log.FromTime, log.ToTime)) _
                                  Select Operation, opsTime, opsList
                For Each ops In productionTime
                    TimeShift += ops.opsTime
                    ProdTime += ops.opsTime
                    Dim opsNode As New TreeNode(ops.Operation & " - " & ops.opsTime)
                    ProdNode.Nodes.Add(opsNode)
                Next
                ProdNode.Text = "Non Productive - " & ProdTime
                shiftNode.Text = mech.Shift & " - " & TimeShift
                TimeMachine += TimeShift
            Next

        Next

    End Sub

    Private Sub TextBox_totalOff_Validated(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles TextBox_totalOff.Validated
        BS_MachineUtilistaionSummary.Current.item("TotalOn") = 1440 - BS_MachineUtilistaionSummary.Current.item("Totaloff")
        BS_MachineUtilistaionSummary.Current.item("NonProdOn") = BS_MachineUtilistaionSummary.Current.item("TotalOn") - BS_MachineUtilistaionSummary.Current.item("ProdOn")
        BS_MachineUtilistaionSummary.EndEdit()
    End Sub

    Private Sub btn_SetProduction_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles btn_SetProduction.Click
        Dim productionTime = From log In Analytics1.MachineLogBook Where Not (log.IsFromTimeNull Or log.IsToTimeNull) And Not log.TaskNo = "100" _
                              Group By log.Machine Into machineList = Group, ProdTime = Sum(DateDiff(DateInterval.Minute, log.FromTime, log.ToTime))
        For Each dr As magod.Production.machine_utilisationsummaryRow In Production1.machine_utilisationsummary.Rows
            dr.ProdON = 0
            dr.TotalOn = 1440
        Next
        For Each MachTime In productionTime
            If Production1.machine_utilisationsummary.Select(String.Format("Machine='{0}'", MachTime.Machine)).Length > 0 Then
                Dim MachineSummary As magod.Production.machine_utilisationsummaryRow = Production1.machine_utilisationsummary.Select(String.Format("Machine='{0}'", MachTime.Machine)).First
                MachineSummary.ProdON = MachTime.ProdTime
                MachineSummary.NonProdOn = MachineSummary.TotalOn - MachineSummary.ProdON
            End If
        Next
    End Sub

   
    Private Sub btn_Save_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles btn_Save.Click
        BS_MachineUtilistaionSummary.EndEdit()
        Da_DayMachineUsage.Update(Production1.machine_utilisationsummary)
    End Sub

    Private Sub btnViewShiftLog_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles btnViewShiftLog.Click
        If Not Check_reportSent() Then
            MsgBox("Prepare Report before Printing Shift Log")
            Exit Sub
        End If

        For Each item As Analytics.MachineLogBookRow In Analytics1.MachineLogBook.Rows
            If Not (item.IsFromTimeNull And item.IsToTimeNull) Then
                item.MachineTime = DateDiff(DateInterval.Minute, item.FromTime, item.ToTime)
                If item.MachineTime = 0 Then
                    item.Delete()
                End If
            End If

        Next
        BS_ShiftLog.EndEdit()
        DA_ShiftLog.Update(Analytics1.MachineLogBook)
      
        Try
            '*** do not print if not ready for invoicing

            ' *** prepare invoice for printing
            ReportManager1.DataSources.Clear()
            BS_ShiftLog.RemoveFilter()
            ReportManager1.DataSources.Add("ShiftLog", BS_ShiftLog)
            If Not FileReportSlot1.Equals(Nothing) Then

                FileReportSlot1.Prepare()
                '  FileReportSlot1.DesignTemplate()
                ' document.Source = Me.FileReportSlot1
                Using preViewForm As New PerpetuumSoft.Reporting.View.PreviewForm(FileReportSlot1)
                    preViewForm.ShowMenu = False
                    preViewForm.WindowState = System.Windows.Forms.FormWindowState.Maximized
                    preViewForm.ShowDialog()
                End Using

            End If


        Catch ex As Exception
            MsgBox(ex.Message)
        End Try

    End Sub
    Private Function Check_reportSent() As Boolean

        If BS_Rep.Current("ReportSent") = -1 Then
            Return True
        Else
            Return False
        End If


    End Function

    Private Sub btnPrepareReport_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles btnPrepareReport.Click
        For Each item As Analytics.MachineLogBookRow In Analytics1.MachineLogBook.Rows
            If Not (item.IsFromTimeNull And item.IsToTimeNull) Then
                item.MachineTime = DateDiff(DateInterval.Minute, item.FromTime, item.ToTime)
                If item.MachineTime = 0 Then
                    item.Delete()
                End If
            End If

        Next
        BS_ShiftLog.EndEdit()
        DA_ShiftLog.Update(Analytics1.MachineLogBook)
        If Not checkMachineUtilisation() Then
            MsgBox("Ensure Machine Utilisation Report is correct")
            Exit Sub
        End If
        ' **** Proceed only Report not sent
        If Dailyreport_registerBindingSource.List.Count <> 0 Then
            Dim msg As String = String.Format("Report for{0} already sent.Details cannot be changed now. Do you wish to send report again ", Format(DTP_Report.Value, "dd/MM/yy"))
            If MsgBox(msg, MsgBoxStyle.YesNo) = MsgBoxResult.No Then
                Exit Sub
            End If
        Else

            If Me.TextBox_PreparedBy.Text = "" Then
                MsgBox("Enter your name in Prepared By box")
                Exit Sub
            End If

            If MsgBox("You will not be able to make Any Changes after this to the Day Report, Do you wish to Continue@", MsgBoxStyle.YesNo) = MsgBoxResult.No Then
                Exit Sub
            End If

        End If


      
        BS_Rep.Current("ReportSent") = -1
        BS_Rep.EndEdit()
        save_Report()
        MsgBox("Export to HO will be implemented in later versions")
    End Sub
    Private Sub saveDs_to_XML()
        'Dim ReportTable As New DataTable
        'Dim Cl As DataColumn
        ' Dim dr As DataRow

        Dim filename As String = MagodProd.UnitName & "_Daily_Production_Report_" & Format(DTP_Report.Value, "dd_MM_yy")
        Using saveFileDialog As New SaveFileDialog
            With saveFileDialog
                .CheckPathExists = True
                .AddExtension = True
                .ValidateNames = True
                .DefaultExt = ".XML"
                .Filter = "XML Files|*.XML"
                .FileName = filename
            End With
            If (saveFileDialog.ShowDialog(Me) = DialogResult.OK) Then
                filename = saveFileDialog.FileName
                'If Bs_RepInfo.List.Count = 0 Then
                '    DS_form.Tables("ReportInfo").Rows.Clear()
                '    dr = DS_form.Tables("ReportInfo").NewRow
                '    dr.Item("Report_name") = "Production_Report"
                '    dr.Item("unitname") = MagodProd.UnitName
                '    dr.Item("reportdate") = Me.DateTimePicker1.Value
                '    dr.Item("SubmitDate") = Now
                '    ' dr.Item("SubmitTime") = Format(Now, "HH:mm")
                '    dr.Item("SentBy") = "Admin"
                '    dr.Item("ApprovedBy") = "Admin"
                '    DS_form.Tables("ReportInfo").Rows.Add(dr)
                'Else
                '    Bs_RepInfo.Current.item("SubmitDate") = Now
                'End If

                ' DS_Form.WriteXml(fileName)

                'With MagodProd.getCommand
                '    .Connection.Open()
                '    .Parameters.Add("ReportDate", MySql.Data.MySqlClient.MySqlDbType.DateTime).Value = Me.DTP_Report.Value
                '    '**** Create diiferent types of summary in magod_production
                '    .CommandText = "Call magod_production.insert_Daily_Machine_ShiftSummary(@ReportDate);"
                '    .ExecuteNonQuery()

                '    .CommandText = "SELECT * FROM magod_production.daily_task_timesummary d " _
                '                   & "WHERE d.`ShiftDate`=@ReportDate;"
                '    DS_form.Tables("Daily_taskTimeSummary").Load(.ExecuteReader)

                '    .CommandText = "SELECT * FROM magod_production.daily_machineperformance_summary d " _
                '                   & "WHERE d.`ShiftDate`=@ReportDate;"
                '    DS_form.Tables("daily_machineperformance_summary").Load(.ExecuteReader)

                '    .CommandText = "SELECT * FROM magod_production.daily_stoppage_timesummary d " _
                '                    & "WHERE d.`ShiftDate`=@ReportDate;"
                '    DS_form.Tables("daily_stoppage_timesummary").Load(.ExecuteReader)

                '    .Connection.Close()

                'End With

                'Dim Ds As New DataSet
                'With Ds.Tables
                '    .Add(DS_form.Tables("ReportInfo").Copy)
                '    .Add(DS_form.Tables("Daily_ProductionReport").Copy)
                '    .Add(DS_form.Tables("Daily_MachineUasgeSummary").Copy)
                '    .Add(DS_form.Tables("Daily_taskTimeSummary").Copy)
                '    .Add(DS_form.Tables("daily_stoppage_timesummary").Copy)
                '    .Add(DS_form.Tables("daily_machineperformance_summary").Copy)

                'End With
                'Ds.WriteXml(filename)
                'Bs_RepInfo.EndEdit()
                'Da_reportInfo.Update(DS_form, "ReportInfo")
                'Me.btnSaveReport.Enabled = False
                'MsgBox("Production Report saved as " & filename)
            End If



        End Using
    End Sub

    Private Sub save_Report()
        BS_Rep.EndEdit()
        DA_Rep.Update(Production1.daily_unitproductionsummary)
    End Sub
    Private Function checkMachineUtilisation() As Boolean
        BS_MachineUtilistaionSummary.EndEdit()
        save_machineUsage()

        For Each Obj As Object In BS_MachineUtilistaionSummary
            If Obj.item("TotalOn") + Obj.item("TotalOff") <> 1440 Then
                MsgBox("Check Machine ON/OFF time for " & Obj.item("Machine"))
                Return False
            End If
            If Obj.item("ProdON") + Obj.item("NonProdOn") <> Obj.item("TotalOn") Then
                Obj.item("NonProdOn") = Obj.item("TotalOn") - Obj.item("ProdON")
            End If

            'If Obj.item("NonProdOn") <> Obj.item("NPmaint") + Obj.item("NPAdmin") _
            '        + Obj.item("NPCad") + Obj.item("NPMtrl") + Obj.item("NPOperator") Then
            '    MsgBox("Check Non Production details for " & Obj.item("Machine"))
            '    Return False
            'End If


            'If Obj.item("TotalOff") <> Obj.item("OFFNoPower") + Obj.item("OFFMaterial") _
            '        + Obj.item("OFFMaintenance") + Obj.item("OFFCad") _
            '        + Obj.item("OFFNoOrder") + Obj.item("OFFadmin") Then
            '    MsgBox("Check Machine OFF details for " & Obj.item("Machine"))
            '    Return False
            'End If

        Next

        MsgBox("Machine Utilisation Report OK")
        Return True
    End Function
    Private Sub save_machineUsage()
        Try

            BS_MachineUtilistaionSummary.EndEdit()
            Da_DayMachineUsage.Update(Production1.machine_utilisationsummary)

        Catch ex As Exception
            MsgBox(ex.Message)
        End Try
    End Sub

    Private Sub FileReportSlot1_GetReportParameter(ByVal sender As Object, ByVal e As PerpetuumSoft.Reporting.Components.GetReportParameterEventArgs) Handles FileReportSlot1.GetReportParameter
        e.Parameters("AcctgDate").Value = DTP_Report.Value.Date
    End Sub

    Private Sub btnPrintReport_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles btnPrintReport.Click
        If Not Check_reportSent() Then
            MsgBox("Prepare Report before printing")
            Exit Sub
        End If
        Dim OpHours = (From log In Analytics1.MachineLogBook, machine In Production1.machine_utilisationsummary _
                      Where Not IsDBNull(log.FromTime) And Not IsDBNull(log.ToTime) And Not log.TaskNo Like "100" _
                      And log.Machine = machine.Machine _
                      Select log.Machine, log.Operation, machine.LaserOn, ProdON = MagodProd.getHourMin(machine.ProdON), _
                     NonProdOn = getHourMin(machine.NonProdOn), TotalOff = getHourMin(machine.TotalOff), log.FromTime, log.ToTime _
                      Group By Machine, Operation, LaserOn, ProdON, NonProdOn, TotalOff Into opGp = Group, OpsTime = Sum(DateDiff(DateInterval.Minute, FromTime, ToTime)) _
                      Select Machine, Operation, OpsTime, ProdType = "Production", LaserOn, ProdON, NonProdOn, TotalOff _
                      Order By Machine, Operation).Union _
                      (From log In Analytics1.MachineLogBook, machine In Production1.machine_utilisationsummary _
                      Where Not IsDBNull(log.FromTime) And Not IsDBNull(log.ToTime) And log.TaskNo Like "100" _
                      And log.Machine = machine.Machine _
                      Select log.Machine, log.Operation, machine.LaserOn, ProdON = MagodProd.getHourMin(machine.ProdON), _
                      NonProdOn = getHourMin(machine.NonProdOn), TotalOff = getHourMin(machine.TotalOff), log.FromTime, log.ToTime _
                      Group By Machine, Operation, LaserOn, ProdON, NonProdOn, TotalOff Into opGp = Group, OpsTime = Sum(DateDiff(DateInterval.Minute, FromTime, ToTime)) _
                      Select Machine, Operation, OpsTime, ProdType = " Non Production", LaserOn, ProdON, NonProdOn, TotalOff _
                      Order By Machine, Operation)
                 

     
        'PrintSavePDFReport()
        Try
            '*** do not print if not ready for invoicing

            ' *** prepare invoice for printing

            If Not FileReportSlot2.Equals(Nothing) Then

                With ReportManager1
                    .DataSources.Clear()
                    .DataSources.Add("UnitInfo", MagodProd.getBasicData.magodlaser_units)
                    .DataSources.Add("Rep", BS_Rep)
                    .DataSources.Add("ShiftLog", BS_ShiftLog)
                    .DataSources.Add("DailyMachineUsage", BS_MachineUtilistaionSummary)
                    .DataSources.Add("OpProd", OpHours)


                End With
                FileReportSlot2.Prepare()
                '    FileReportSlot2.DesignTemplate()

                ' document.Source = Me.FileReportSlot1
                Using preViewForm As New PerpetuumSoft.Reporting.View.PreviewForm(FileReportSlot2)
                    preViewForm.ShowMenu = False
                    preViewForm.WindowState = System.Windows.Forms.FormWindowState.Maximized
                    preViewForm.ShowDialog()
                End Using

            End If


        Catch ex As Exception
            MsgBox(ex.Message)
        End Try

    End Sub
    Private Sub set_EditStatus()

        If Check_reportSent() Then
            Me.btnSaveLog.Enabled = False
            Me.btn_Save.Enabled = False
            Me.btnPrepareReport.Enabled = True
            Me.btn_SetProduction.Enabled = False
        Else
            Me.btnSaveLog.Enabled = True
            Me.btn_Save.Enabled = True
            Me.btnPrepareReport.Enabled = True
            Me.btn_SetProduction.Enabled = True
        End If

    End Sub
End Class