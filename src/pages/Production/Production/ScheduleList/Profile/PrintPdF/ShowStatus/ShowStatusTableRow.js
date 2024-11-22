import React, { Fragment, useState } from "react"; 
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import moment from 'moment';
// import axios from "axios";


const styles = StyleSheet.create({
  Headingrow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottom:"1px",
   
    // marginLeft:"60px",
    width:"700px",

    // fontSize:"10px"
  },
  Scheduleno: {
    width: "100px",
    whiteSpace:"nowrap",
    fontSize:"10px",
    textAlign:"center"
  },
  Customer: {
    width: "250px",
    whiteSpace:"nowrap",
    fontSize:"10px"
    
  },
  Date:{
      width:"100px",
      whiteSpace:"nowrap",
      fontSize:"10px"
  },
  Instruction:{
    width:"150px",
    whiteSpace:"nowrap",
    fontSize:"10px"
  }
  });
  
  const ShowStatusTableRow = ({showStatusData}) => {

    // console.log(typeof(firstmachineoperator));
    //console.log(newitems , 'New Items from print daily Shift Table Row')
    const rows =showStatusData.map((value) => (
      <View style={styles.Headingrow}>
          <Text style={[styles.Scheduleno]}>{value.OrdSchNo}</Text>
          <Text style={styles.Customer}>{value.Cust_name}</Text>
          <Text style={[styles.Date,{textAlign:"center"}]}>{value.schTgtDate}</Text>
          <Text style={[styles.Date, {textAlign:"center"}]}>{value.Delivery_Date}</Text>
          <Text style={[styles.Instruction,{textAlign:"center"}]}></Text>
       </View>
    ));



    return <Fragment>{rows}</Fragment>;
  };
  
  export default ShowStatusTableRow;
  