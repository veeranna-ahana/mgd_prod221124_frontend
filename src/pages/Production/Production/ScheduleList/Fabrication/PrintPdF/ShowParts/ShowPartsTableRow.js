import React, { Fragment, useState } from "react"; 
import { Text, View, StyleSheet } from "@react-pdf/renderer";
// import axios from "axios";


const styles = StyleSheet.create({
  Headingrow: {
    flexDirection: "row",
    borderBottom:"1px",
    width:"500px",
  },
    Scheduled: {
      width: "19%",
      textAlign:"center",
      paddingTop:"5px",
  
    },
    dwgname: {
      width: "40%",
    },
    Nested:{
      width:"14%",
      borderRight:1,
      textAlign:"right",
    },
    lot:{
      width:"10%",
      textAlign:"right",
    }
  });
  
  const ShowPartsTableRow = ({partlistdata}) => {
    // console.log(typeof(firstmachineoperator));
    //console.log(newitems , 'New Items from print daily Shift Table Row')
    const rows = partlistdata.map((item) => (
      <View style={styles.Headingrow}>
          <Text style={styles.dwgname}>{item.DwgName}</Text>
          <Text style={styles.Scheduled}>{item.QtyToNest}</Text>
          <Text style={[styles.Nested,{ paddingRight:"7px", paddingTop:"5px"}]}>{item.QtyNested}</Text>
          <Text style={[styles.lot,{borderRight:1,  paddingRight:"7px", paddingTop:"5px"}]}></Text>
          <Text style={[styles.lot,{borderRight:1,  paddingRight:"7px", paddingTop:"5px"}]}></Text>
          <Text style={[styles.lot,{borderRight:1,  paddingRight:"7px", paddingTop:"5px"}]}></Text>
          <Text style={[styles.lot,{paddingRight:"7px", paddingTop:"5px"}]}></Text>
      </View>
    ));



    return <Fragment>{rows}</Fragment>;
  };
  
  export default ShowPartsTableRow;
  