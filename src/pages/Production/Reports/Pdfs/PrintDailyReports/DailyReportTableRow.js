import React, { Fragment, useState } from "react"; 
import { Text, View, StyleSheet } from "@react-pdf/renderer";
// import axios from "axios";


const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      borderBottom:"1px"
    },
    machine: {
      width: "30%",
    },
    operator: {
      width: "30%",
    },
    remarks:{
        width:"40%"
    }
  });
  
  const DailyReportTableRow = ({reportsTreeViewData}) => {
    // console.log(typeof(firstmachineoperator));
    //console.log(newitems , 'New Items from print daily Shift Table Row')
    const rows = reportsTreeViewData.map(() => (
      <View style={styles.row}>
         <Text style={styles.machine}></Text>
         <Text style={styles.operator}></Text>
         <Text style={styles.remarks}></Text>
      </View>
    ));



    return <Fragment>{rows}</Fragment>;
  };
  
  export default DailyReportTableRow;
  