import React from "react";
import { Page, Document, StyleSheet, View, Text } from "@react-pdf/renderer";
import WeeklyShiftTableRow from "./WeeklyShiftTableRow";




const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    flexDirection: "column",
    marginTop: 30, 
    marginBottom: 50, 
    paddingBottom: 60, 
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  description: {
    width: "60%",
  },
  xyz: {
    width: "40%",
  },
  tableTitle: {
    textDecoration: "underline",
    marginLeft: "200px",
    marginTop: "20px",
    fontFamily: "Helvetica-Bold",
    marginBottom:"8px",

  },
  title2: {
    textDecoration: "underline",
    marginLeft: "220px",
    fontFamily: "Helvetica-Bold",
  },
  shiftperiod: {
    textAlign:"center",
    marginTop: "20px",
    marginLeft:"150px",
    fontFamily:"Helvetica-Bold",
  
  },
  boxdata: {
    border: "1px",
   padding:"5px",
    width: "480px",
    marginLeft: "50px",
    marginRight: "100px",
    marginTop:"10px"
  },
  tableview: {
    marginLeft: "60px",
    width: "460px",
    marginBottom:"10px"
  },
  Headingrow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottom: "1px",
    borderTop:1,
    marginTop: "20px",
    marginLeft: "60px",
    width: "460px",
    fontFamily:"Helvetica-Bold",
    padding:"2px"
  },
  machineHeading: {
    width: "35%",
  },
  operatorHeading: {
    width: "35%",
  },
  remarksHeading: {
    width: "30%",
  },
  Manager: {
    marginTop: "40px",
    marginRight: "160px",
    marginLeft: "40px",
    textDecoration: "underline",
    fontFamily: "Helvetica-Bold",
  },
  boldText:{
    fontFamily: "Helvetica-Bold",
    marginLeft:"50px",
    marginTop:"10px",
    textDecoration:"underline"
  },
  shiftDate:{
    textAlign:"center",
  },
  flexing:{
    flexDirection:"row",
  }
 
});

const formatDate = (dateStr) => {
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day}-${month}-${year}`;
  }
  return dateStr; // Return the original date if it's not in the expected format
};


const WeeklyShifttable = ({ selectedWeek, newData }) => (

  
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>Magod Laser Machining Pvt Ltd</Text>
        <Text style={styles.title2}>Production Department</Text>
        <Text style={[styles.shiftperiod,{fontStyle: 'italic'}]}>
        Shift Plan for Period From : {selectedWeek[0]} To {selectedWeek[6]}
      </Text>
      </View>

     
<View>
        {newData.map((mapItem) => {
          return (
            <React.Fragment key={mapItem.day}>
           
            <Text style={styles.boldText}>Date &nbsp;{formatDate(mapItem.day)}</Text>
          

              {mapItem.operators.map((item, key) => {
                return (
                  <>
                 
                  <View style={styles.boxdata}>
                  <View style={styles.flexing}>
                
                    <Text style={{fontFamily:"Helvetica-Bold"}} >Shift :&nbsp;&nbsp;&nbsp;</Text>
                    <Text>{item.Shift}</Text>
                    <Text style={{marginLeft:"200px", fontFamily:"Helvetica-Bold"}}>Shift IC :&nbsp;&nbsp;&nbsp;</Text>
                    <Text>{item.ShiftIc}</Text>
                    </View>
                  
                    </View>
                    <View style={styles.Headingrow}>
                      <Text style={styles.machineHeading}>Machine</Text>
                      <Text style={styles.operatorHeading}>Operator</Text>
                      <Text style={styles.remarksHeading}>ShiftRemarks</Text>
                    </View>

                    <View style={styles.tableview}>
                            <WeeklyShiftTableRow items={item.machineOperators} />
                    </View>

                  </>
                );
              })}
            </React.Fragment>
          );
        })}
        <View>
          <Text style={styles.Manager}>Production Manager</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default WeeklyShifttable;
