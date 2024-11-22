import React from 'react'
import { Page, Document, StyleSheet, View, Text } from "@react-pdf/renderer";
import ShowProgramsTableRow from './ShowProgramsTableRow';

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
       fontFamily:"Helvetica-Bold"
    },
    title2 :{
        textDecoration : "underline",
        marginLeft:"220px",
        fontFamily:"Helvetica-Bold"
    },
    location:{
        marginRight:"250px",
        marginLeft:"60px",
        marginTop:"20px",
        borderBottom:"1px",
        width:"500px"
    },
    details:{
        marginRight:"250px",
        marginLeft:"60px",
        borderBottom:"1px",
        width:"500px"
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
    Headingrow: {
      flexDirection: "row",
      alignItems: "center",
      borderBottom:"1px",
      marginTop:"5px",
      marginLeft:"60px",
      width:"500px",
    },
    Scheduled: {
      width: "20%",
    },
    dwgname: {
      width: "40%",
    },
    Nested:{
        width:"30%"
    }
  });
  

const ShowProgramsTable = ({processrowselect,rowselect,programlistdata,location}) => (
    <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.tableContainer}>
        <Text style={[styles.tableTitle]}>Magod Laser Machining Pvt Ltd</Text>
        <Text style={styles.title2}>Production Status Report</Text>
        <Text style={[styles.location,{paddingBottom:"10px"}]}>Magod Laser:{location[0]?.UnitName}</Text>

        <View>
            <Text style={styles.details}>Production Sheet Schedule No : {rowselect.OrdSchNo}</Text>
        </View>

        <View style={styles.Headingrow}>
          <Text style={[styles.dwgname,{fontFamily:"Helvetica-Bold"}]}>Task No</Text>
          <Text style={[styles.Scheduled,{fontFamily:"Helvetica-Bold"}]}>Material</Text>
          <Text style={[styles.Nested,{fontFamily:"Helvetica-Bold"}]}>Process</Text>
          <Text style={[styles.Nested,{fontFamily:"Helvetica-Bold"}]}>Material</Text>
        </View>

        <View style={styles.Headingrow}>
          <Text style={[styles.dwgname,{fontFamily:"Helvetica-Bold"}]}>{programlistdata[0]?.TaskNo || null || undefined}</Text>
          <Text style={[styles.Scheduled,{fontFamily:"Helvetica-Bold"}]}>{programlistdata[0]?.Mtrl_Code || null || undefined}</Text>
          <Text style={[styles.Nested, {fontFamily:"Helvetica-Bold"}]}>{programlistdata[0]?.MProcess || null || undefined}</Text>
          <Text style={[styles.Nested, {fontFamily:"Helvetica-Bold"}]}></Text>
        </View>

        <View style={styles.Headingrow}>
          <Text style={styles.dwgname}>Program No</Text>
          <Text style={styles.Scheduled}>Machine</Text>
          <Text style={styles.Nested}>Sheets</Text>
        </View>
        
    <View style={styles.tableview}>
      <ShowProgramsTableRow processrowselect={processrowselect}
      rowselect={rowselect}
      programlistdata={programlistdata}/>
    </View>
         
  </View>
    </Page>
  </Document>

);


export default ShowProgramsTable;
