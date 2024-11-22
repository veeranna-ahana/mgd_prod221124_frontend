import React from "react";
import { Page, Document, StyleSheet, View, Text } from "@react-pdf/renderer";
import ProductionListTableRow from "./ProductionListTableRow";

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
    // marginTop: "50px",
  },
  details1: {
    marginRight: "250px",
    marginLeft: "60px",
    borderBottom: "1px",
    width: "500px",
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
    marginLeft: "40px",
  },
  Headingrow: {
    flexDirection: "row",
    fontFamily:"Helvetica-Bold",
    borderBottom: "1px",
    marginLeft: "20px",
    width: "800px",
    textAlign:"center"
  },
  schd: {
    width: "80px",
    textAlign:"center",
    paddingVertical:"8px"
  },
  status: {
    width: "80px",
    textAlign:"center",
    paddingVertical:"8px"
  },
  customer: {
    width: "300px",
    textAlign:"center",
    paddingVertical:"8px"
  },
  deldate: {
    width: "80px",
    textAlign:"center",
    borderRightWidth:1,
    paddingVertical:"8px"
  },
  remaining: {
    width: "50px",
    paddingVertical:"8px",
    borderRightWidth:1
  },
  remarks: {
    width: "80px",
    paddingVertical:"8px"
  },
  detailss: {
    marginLeft: "20px",
    borderBottom: "1px",
    width: "800px",
    marginTop: "50px",
  },
});

const ProductionListTable = ({selectedRows}) => (
  <Document>
    <Page size="A4" style={styles.page} orientation="landscape">
      <View style={styles.tableContainer}>
        
        <View style={styles.detailss}>
          <Text>Magod Laser Machining Pvt Ltd</Text>
          <Text>Production Schedules List</Text>
        </View>

        <View style={styles.Headingrow}>
          <Text style={styles.schd}>Schedule</Text>
          <Text style={styles.status}>Status</Text>
          <Text style={styles.customer}>Customer</Text>
          <Text style={styles.deldate}>DelDate</Text>
          <Text style={styles.remaining}>Progr</Text>
          <Text style={styles.remaining}>Material</Text>
          <Text style={styles.remaining}>Cutting</Text>
          <Text style={styles.remaining}>Cutting Time</Text>
          <Text style={styles.remaining}>Finish Time</Text>
          <Text style={styles.remaining}>Insp</Text>
          <Text style={styles.remaining}>ETC</Text>
          <Text style={styles.remaining}>HO</Text>
          <Text style={styles.remarks}>Remarks</Text>
        </View>

        <View style={styles.tableview}>
          <ProductionListTableRow
          selectedRows={selectedRows}
          />
        </View>
      </View>
    </Page>
  </Document>
);

export default ProductionListTable;
