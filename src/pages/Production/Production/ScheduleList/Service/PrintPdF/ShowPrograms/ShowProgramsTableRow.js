import React, { Fragment, useState } from "react"; 
import { Text, View, StyleSheet } from "@react-pdf/renderer";
// import axios from "axios";


const styles = StyleSheet.create({
  Headingrow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottom:"1px",
    marginTop:"5px",
    width:"500px",
  },
    Scheduled: {
      width: "20%",
    },
    dwgname: {
      width: "40%",
    },
    Nested:{
        width:"10%"
    },
    lot:{
      width:"10%",
    }
  });
  
  const ShowProgramsTableRow = ({programlistdata}) => {
    // console.log(typeof(firstmachineoperator));
    //console.log(newitems , 'New Items from print daily Shift Table Row')
    const rows = programlistdata.map((item) => (
      <View style={styles.Headingrow}>
          <Text style={styles.dwgname}>{item.NCProgramNo}</Text>
          <Text style={styles.Scheduled}>{item.Machine}</Text>
          <Text style={styles.Nested}>{item.QtyNested}</Text>
      </View>
    ));



    return <Fragment>{rows}</Fragment>;
  };
  
  export default ShowProgramsTableRow;
  