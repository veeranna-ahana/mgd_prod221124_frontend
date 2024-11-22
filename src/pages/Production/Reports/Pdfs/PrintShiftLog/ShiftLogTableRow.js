import React, { Fragment, useState } from "react"; 
import { Text, View, StyleSheet } from "@react-pdf/renderer";
// import axios from "axios";


const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      borderBottom:"1px"
    },
    Headingrow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop:"10px",
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
  });
  
  const ShiftLogTableRow = ({logs}) => {
    // console.log(typeof(firstmachineoperator));
    //console.log(newitems , 'New Items from print daily Shift Table Row')
    const rows =logs.map((item) => (
      <View style={styles.Headingrow}>
        <Text style={styles.from}>{item.FromTime}</Text>
        <Text style={styles.to}>{item.ToTime}</Text>
        <Text style={styles.minutes}>{item.MachineTime}</Text>
        <Text style={styles.Program}>{item.Program}</Text>
        <Text style={styles.qty}></Text>
      </View>
    ));



    return <Fragment>{rows}</Fragment>;
  };
  
  export default ShiftLogTableRow;
  