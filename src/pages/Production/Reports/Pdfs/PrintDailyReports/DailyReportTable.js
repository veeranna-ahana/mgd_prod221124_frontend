import React from "react";
import { Page, Document, StyleSheet, View, Text } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    flexDirection: "column",
    padding: 10,
    marginTop: 30, 
    marginBottom: 50, 
    paddingBottom: 50, 
  },
  tableContainer: {
    marginBottom: 20,
  },
  tableTitle: {
    textDecoration: "underline",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
    fontSize: 14,
  },
  title2: {
    textDecoration: "underline",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 12,
  },
  details: {
    marginLeft: "60px",
    borderBottom: "1px",
    borderTop: "1px",
    width: "500px",
    marginTop: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
    display: "flex",
  },
  tablemainheaderName: {
    textDecoration: "underline",
    marginRight: "200px",
  },
  machineName: {
    textDecoration: "underline",
    fontSize: 12,
    marginBottom: 5,
  },
  program: {
    marginLeft: "160px",
    marginTop: "-10px",
  },
  production: {
    marginLeft: "350px",
    marginTop: "-10px",
  },
  production1: {
    marginLeft: "350px",
    marginTop: "10px",
  },
  production2: {
    marginLeft: "350px",
    marginTop: "10px",
  },
  taskContainer: {
    marginLeft: 20,
    marginBottom: 10,
  },
  task: {
    textDecoration: "underline",
    marginBottom: 5,
    fontSize: 11,
  },
  operationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  operationText: {
    fontSize: 10,
    width: "70%",
  },
  timeText: {
    fontSize: 10,
    width: "30%",
    textAlign: "right",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "black",
    marginTop: 20,
    paddingTop: 10,
  },
  footerItem: {
    textAlign: "center",
    width: "50%",
  },
  column: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tablemainheader1: {
    marginLeft: "80px",
    textAlign: "left",
    marginTop: "14px",
  },
  action: {
    width: "80px",
  },
  time: {
    flexDirection: "column",
    width: "30%",
  },
  desc: {
    width: "200px",
    marginTop: "10px",
  },
  desc1: {
    marginLeft: "40px",
    marginTop: "10px",
    textAlign: "left",
    width: "100px",
  },
  desc2: {
    paddingLeft: "220px",
    paddingTop: "-33px",
    paddingBottom: "-16px",
    marginTop: "-12px",
    marginBottom: "8px",
  },
  desc3: {
    marginLeft: "124px",
    marginTop: "5px",
  },
});

const DailyReportTable = ({
  Date,
  pdfData,
  preparedby,
  roleValue,
  location,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>Magod Laser Machining Pvt Ltd</Text>
        <Text style={styles.title2}>Daily Shift Log for: {Date}</Text>

        {pdfData.map((machine, index) => (
          <React.Fragment key={index}>
            <View style={styles.details}>
              <Text style={styles.tablemainheaderName}>
                {machine.MachineName}
              </Text>
              <Text style={styles.program}>
                Laser ON Reading {machine.LaserOn}
              </Text>
              <Text style={styles.production}>
                Production ON: {machine.ProdON}
              </Text>
              <Text style={styles.production1}>
                Non-Production ON: {machine.NonProdOn}
              </Text>
              <Text style={styles.production2}>
                Total Off: {machine.TotalOff}
              </Text>
            </View>

            {machine.task.map((task, taskIndex) => (
              <View key={taskIndex} style={styles.tablemainheader1}>
                <View style={styles.column}>
                  <View style={styles.action}>
                    <Text style={styles.task}>{task.action}</Text>
                  </View>

                  <View>
                    {task.operations.map((operation) => (
                      <Text key={operation.Operation} style={styles.desc}>
                        {operation.Operation}
                      </Text>
                    ))}
                  </View>

                  <View style={styles.time}>
                    {task.operations.map((operation) => (
                      <Text key={operation.Operation} style={styles.desc1}>
                        {operation.time}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </React.Fragment>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerItem}>{preparedby}</Text>
          <Text style={styles.footerItem}>Production Manager</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default DailyReportTable;
