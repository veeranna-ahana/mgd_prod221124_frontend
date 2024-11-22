import React from "react";
import { Page, Document, StyleSheet, View, Text } from "@react-pdf/renderer";
import ShowPartsTableRow from "./ShowPartsTableRow";

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
  tableTitle: {
    textDecoration: "underline",
    marginLeft: "200px",
    marginTop: "20px",
  },
  title2: {
    textDecoration: "underline",
    marginLeft: "220px",
  },
  location: {
    marginRight: "250px",
    marginLeft: "60px",
    marginTop: "20px",
    borderBottom: "1px",
    width: "500px",
  },
  details: {
    marginRight: "250px",
    marginLeft: "60px",
    borderBottom: "1px",
    width: "500px",
  },
  details1: {
    marginRight: "250px",
    marginLeft: "60px",
    borderBottom: "1px",
    width: "500px",
    fontFamily: "Helvetica-Bold",
  },
  details2: {
    marginRight: "50px",
    borderBottom: "1px",
  },
  datedisplay: {
    marginRight: "200px",
    marginLeft: "225px",
    marginTop: "2px",
  },
  tableview: {
    marginLeft: "60px",
    width: "430px",
  },
  tablemainheader: {
    textDecoration: "underline",
    marginTop: "20px",
    marginRight: "200px",
    marginLeft: "50px",
  },
  Headingrow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottom: "1px",
    marginTop: "5px",
    marginLeft: "60px",
    width: "500px",
    fontFamily: "Helvetica-Bold",
  },
  Scheduled: {
    width: "19%",
    textAlign: "left",
  },
  dwgname: {
    width: "45%",
  },
  Nested: {
    width: "10%",
    textAlign: "center",
  },
  lot: {
    width: "10%",
    textAlign: "center",
  },
  detailss: {
    marginRight: "250px",
    marginLeft: "60px",
    borderBottom: "1px",
    width: "500px",
    marginTop: "50px",
    paddingBottom: "10px",
  },
});

const ShowPartsTable = ({ processrowselect, rowselect, partlistdata,location }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.tableContainer}>
            <React.Fragment>
              <View>
                <Text style={styles.detailss}>Magod Laser:{location}</Text>
                <Text style={styles.details}>Parts Sheet Schedule No : {rowselect?.OrdSchNo}</Text>
              </View>

{partlistdata.map((item,key)=>{
  return(
    <>
    <View key={key} style={{ marginTop: key > 0 ? 20 : 0 }}>
     <Text style={styles.details1}><Text>Task No: </Text>
                  <Text style={styles.details2}>{item.taskNo}</Text>
                  <Text>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Text style={styles.details2}>Inspected and Cleared</Text>
                  </Text>
                </Text>
                </View>
              <View style={styles.Headingrow}>
                <Text style={styles.dwgname}>Drawing Name</Text>
                <Text style={styles.Scheduled}>Scheduled</Text>
                <Text style={styles.Nested}>Nested</Text>
                <Text style={styles.lot}>Lot1</Text>
                <Text style={styles.lot}>Lot2</Text>
                <Text style={styles.lot}>Lot3</Text>
                <Text style={styles.lot}>Lot4</Text>
              </View>
              <View style={styles.tableview}>
                <ShowPartsTableRow
                  processrowselect={processrowselect}
                  rowselect={rowselect}
                  partlistdata={item.data}
                />
              </View>
    </>
  )
})}
             

            </React.Fragment>
      
      </View>
    </Page>
  </Document>
);

export default ShowPartsTable;
