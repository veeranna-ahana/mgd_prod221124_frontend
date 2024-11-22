import React from "react";
import { Page, Document, StyleSheet, View, Text } from "@react-pdf/renderer";
import PrintPriorityTableRow from "./PrintPriorityTableRow";

const styles = StyleSheet.create({
  page: {
    fontSize: 10,
    flexDirection: "column",
    marginTop: 30, 
    marginBottom: 50, 
    paddingBottom: 50, 
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
  tableTitle: {
    textDecoration: "underline",
    marginLeft: "180px",
    marginTop: "10px",
    fontFamily: "Helvetica-Bold"
  },
  title2: {
    textDecoration: "underline",
    marginLeft: "170px",
  },
  shiftperiod: {
    marginLeft: "250px",
    marginTop: "3px",
  },
  machineName: {
    marginTop: "10px",
    marginRight: "200px",
    marginLeft: "10px",
  },
  tableview: {
    marginLeft: "10px",
    width: "480px",
  },
  Headingrow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottom: "1px",
    marginTop: "10px",
    marginLeft: "10px",
    width: "570px",
  },
  srl: {
    width: "30px",
    fontFamily: "Helvetica-Bold",
  },
  Program: {
    width: "50px",
    fontFamily: "Helvetica-Bold",
  },
  operation: {
    width: "130px",
    fontFamily: "Helvetica-Bold",
  },
  customer: {
    width: "130px",
    fontFamily: "Helvetica-Bold",
  },
  rowcus: {
    flexDirection: "row",
  },
  newloaddisplay: {
    width: "337px",
    marginLeft: "10px",
    paddingRight: "40px",
  },
  newLoad: {
    textAlign: "right",
    marginTop: "7px",
  },
  processed: {
    width: "40px",
    fontFamily: "Helvetica-Bold",
  },
  load: {
    width: "40px",
    fontFamily: "Helvetica-Bold",
  },
  production: {
    marginTop: "30px",
    //  marginLeft:"-300px"
  },
  Signature: {
    marginTop: "15px",
    // marginLeft:"-300px"
  },
  Time: {
    // marginLeft:"-300px"
  },
  time: {
    marginTop: "7px",
    fontFamily: "Helvetica-Bold",
  },
  machinedisplay: {
    width: "550px",
    marginLeft: "10px",
  },
  signaturedisplay: {
    width: "550px",
    marginLeft: "10px",
  },
});

const PrintPriorityTable = ({ sortedPriorityTable,location }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>
          Magod Laser Machining Pvt Ltd:Production Department
        </Text>
        <Text style={styles.shiftperiod}>Production Plan:{location[0]?.UnitName} </Text>

        {sortedPriorityTable.map((item) => {
          return (
            <>
              <View style={styles.machinedisplay}>
                <Text style={styles.machineName}>{item.Machine}</Text>
              </View>
              <View style={styles.Headingrow}>
                <Text style={styles.srl}>Srl</Text>
                <Text style={styles.Program}>Program</Text>
                <Text style={styles.operation}>Operation</Text>
                <Text style={styles.customer}>Customer</Text>
                <Text style={styles.processed}>Load</Text>
                <Text style={styles.load}>Processed</Text>
              </View>

              <View style={styles.tableview}>
                <PrintPriorityTableRow
                  sortedPriorityTable={item.priorityList}
                />
              </View>
              <View style={styles.rowcus}>
                <View style={styles.newloaddisplay}>
                  <Text style={styles.newLoad}>Load For {item.Machine}</Text>
                </View>
                <View>
                  <Text style={styles.time}>{item.newLoad}</Text>
                </View>
              </View>
            </>
          );
        })}
        <View style={styles.signaturedisplay}>
          <Text style={styles.production}>Production In Charge</Text>
          <Text style={styles.Signature}>Signature</Text>
          <Text style={styles.Time}>Date and Time</Text>
        </View>

        {/* <View>
          <Text style={styles.Signature}></Text>
          <Text ></Text>
        </View> */}
      </View>
    </Page>
  </Document>
);

export default PrintPriorityTable;
