import React from 'react'
import { Page, Document, StyleSheet, View, Text } from "@react-pdf/renderer";
import ShiftLogTableRow from './ShiftLogTableRow';

const styles = StyleSheet.create({
    page: {
      fontSize: 11,
      flexDirection: "column",
      marginTop: 30, 
      marginBottom: 50, 
      paddingBottom: 50,
    },
     tableContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    tableTitle : {
        textDecoration : "underline",
        marginLeft:"200px",
        marginTop:"20px",
    },
    title2 :{
        marginLeft:"205px",
        marginTop:"8px",
    },
    details:{
        marginTop:"8px",
        marginRight:"250px",
        marginLeft:"60px",
    },
    datedisplay:{
        marginRight:"200px",
        marginLeft:"225px",
        marginTop:"2px"
    },
    tableview:
    {
      marginLeft:"60px",
      width:"430px",
    },
    tablemainheader:{
        textDecoration:"underline",
        marginTop:"20px",
        marginRight:"200px",
        marginLeft:"50px"
    },
    tablemainheader1:{
      textDecoration:"underline",
      marginTop:"30px",
      marginRight:"200px",
      marginLeft:"50px"
  },
    Headingrow: {
      flexDirection: "row",
      alignItems: "center",
      borderBottom:"1px",
      marginTop:"10px",
      marginLeft:"60px",
      width:"550px",
    },
    to: {
      width: "60%",
    },
    from: {
      width: "60%",
    },
    minutes: {
      width: "30%",
    },
    Program:{
        width:"50%"
    },
    qty:{
      width:"70%"
    },
    totalsum:{
      marginLeft:"60px",
      borderTop:"1px",
      width:"500px"
    },
    totalsum1:{
      marginLeft:"245px",
    }
  });
  

const ShiftLogTable = ({Date,sortedMachineLogs,location}) => (
    <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.tableContainer}>
      <Text style={styles.tableTitle}>Magod Laser Machining Pvt Ltd</Text>
      <Text style={styles.title2}>Daily Shift Log for :{Date}</Text>

      {sortedMachineLogs.map((ShiftLog) => {
  return (
    <React.Fragment key={ShiftLog.Shift}>
      <View>
        <Text style={styles.tablemainheader}>{ShiftLog.Shift}</Text>
      </View>

      <View style={styles.Headingrow}>
        <Text style={styles.from}>From</Text>
        <Text style={styles.to}>To</Text>
        <Text style={styles.minutes}>Minutes</Text>
        <Text style={styles.Program}>Program</Text>
        <Text style={styles.qty}>Qty Processed</Text>
      </View>

      {ShiftLog.Machines.map((machineLog) => {
        return (
          <React.Fragment key={machineLog.Machine}>
            <View>
              <Text style={styles.tablemainheader1}>{machineLog.Machine}</Text>
            </View>
        
            <View style={styles.tableview}>
              <ShiftLogTableRow logs={machineLog.logs}/>
            </View>

            <View style={styles.totalsum}>
              <Text style={styles.totalsum1} >{machineLog.TotalMachineTime}</Text>
            </View>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
})}
      
  </View>
    </Page>
  </Document>

);


export default ShiftLogTable;
