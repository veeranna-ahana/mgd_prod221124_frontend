import React, { useState } from "react";
import { Page, Document, StyleSheet, View, Text } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    flexDirection: "column",
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: "820px",
    overflow: "hidden",
  },
  tableTitle: {
    textDecoration: "underline",
    marginLeft: "200px",
    marginTop: "20px",
  },
  title2: {
    marginTop: "5px",
    textDecoration: "underline",
    marginLeft: "205px",
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
  program: {
    marginLeft: "180px",
    marginTop: "-10px",
  },
  tableview: {
    marginLeft: "60px",
    width: "430px",
  },
  tablemainheaderName: {
    textDecoration: "underline",
    marginRight: "200px",
  },
  tablemainheader1: {
    // textDecoration:"underline",
    marginLeft: "80px",
    textAlign:"left",
    marginTop: "14px",
  },
  tablemainheader: {
    textDecoration: "underline",
    marginLeft: "100px",
    marginTop: "10px",
  },
  Headingrow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottom: "1px",
    marginTop: "5px",
    marginLeft: "60px",
    width: "500px",
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
  name: {
    marginRight: "100px",
    marginLeft: "100px",
    marginTop: "50px",
  },
  desig: {
    marginRight: "80px",
    marginLeft: "380px",
    marginTop: "-10px",
  },
  power: {
    marginLeft: "60px",
    marginTop: "20px",
    borderTop: "1px",
    width: "500px",
    paddingTop: "10px",
  },
  power1: {
    marginLeft: "60px",
    marginTop: "5px",
  },
  task: {
    textDecoration: "underline",
  },
  Nodata: {
    marginTop: "100px",
  },
  desc: {
  width:"200px",
    marginTop: "10px",
    },
  desc2: {
    paddingLeft: "220px",
    paddingTop: "-33px",
    paddingBottom:"-16px",
    marginTop: "-12px",
    marginBottom: "8px",
  },
  desc3: {
    marginLeft: "124px",
    marginTop: "5px",
  },
  descalign :{
    marginLeft:"20px"
  },
  column:{
    flexDirection:"row",
    flexWrap:"wrap"
  },
  desc1: {
    marginLeft: "40px",
    marginTop: "10px",
    textAlign:"left",
    width:"100px",
  },
  action:{
    width:"80px",
  
  },
  time:{
    flexDirection:"column",
    width:"30%"
  }
 
});

const DailyReportTable = ({ Date, pdfData, preparedby, roleValue,location }) => {
  const [index, setIndex] = useState(0);
  const recordsPerPage = index === 0 ? 3 : 5; // if page is 1, display 3 records; otherwise, display 4 records

  const totalPages = Math.ceil(pdfData.length / recordsPerPage);

  return (
    <Document>
      {Array.from({ length: totalPages }, (_, pageIndex) => {
        const startIndex = pageIndex * recordsPerPage;
        const endIndex = Math.min(startIndex + recordsPerPage, pdfData.length);
        const pageRecords = pdfData.slice(startIndex, endIndex);

        return (
          <Page size="A4" style={styles.page} key={pageIndex}>
            <View style={styles.tableContainer}>
              {pageIndex === 0 && (
                <View>
                  <Text style={styles.tableTitle}>
                    Magod Laser Machining Pvt Ltd: {location[0]?.UnitName}
                  </Text>
                  <Text style={styles.title2}>Production Summary: {Date}</Text>
                </View>
              )}

              {pageRecords && pageRecords.length > 0 ? (
                pageRecords.map((machine, index) => (
                  <React.Fragment key={machine.MachineName}>
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

                    {machine.task.map((task) => (
                      <View style={styles.tablemainheader1} key={task.task}>
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
                ))
              ) : (
                <Text style={styles.Nodata}>No data available</Text>
              )}

              {pageIndex === totalPages - 1 && (
                <React.Fragment>
                  <View>
                    <Text style={styles.power}>Power Meter Reading 0</Text>
                    <Text style={styles.power1}>Power Units Consume 0</Text>
                  </View>
                  <View>
                    <Text style={styles.name}>{preparedby}</Text>
                    <Text style={styles.desig}>Production Manager</Text>
                  </View>
                </React.Fragment>
              )}
            </View>
          </Page>
        );
      })}
    </Document>
  );
};

export default DailyReportTable;
