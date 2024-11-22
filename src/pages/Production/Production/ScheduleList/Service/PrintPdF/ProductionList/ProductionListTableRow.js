import React, { Fragment, useState } from "react"; 
import { Text, View, StyleSheet } from "@react-pdf/renderer";
// import axios from "axios";


const styles = StyleSheet.create({
  Headingrow: {
    flexDirection: "row",
    borderBottom: "1px",
    width: "800px",
    marginLeft:"-40px",
    textAlign:"center"
  },
  schd: {
    width: "80px",
    fontFamily: "Helvetica-Bold"
  },
  status: {
    width: "80px",
  },
  customer: {
    width: "300px",

  },
  deldate: {
    width: "80px",
    fontFamily: "Helvetica-Bold",
    borderRight:1

  },
  remaining: {
    width: "50px",
  },
  remarks: {
    width: "80px",
  },
  });
  
  const ProductionListTableRow = ({selectedRows}) => {

    // console.log(typeof(firstmachineoperator));
    //console.log(newitems , 'New Items from print daily Shift Table Row')
    const rows = selectedRows.map((item) => (
      <View style={styles.Headingrow}>
      <Text style={[styles.schd,{paddingVertical:"8px"}]}>{item.OrdSchNo}</Text>
      <Text style={[styles.status,{paddingVertical:"8px"}]}>{item.Schedule_Status}</Text>
      <Text style={[styles.customer,{paddingVertical:"8px", textAlign:"left"}]}>{item.Cust_name}</Text>
      <Text style={[styles.deldate,{paddingVertical:"8px"}]}>{item.Delivery_Date}</Text>
          <Text style={[styles.remaining,{paddingVertical:"8px",borderRightWidth:1}]}></Text>
          <Text style={[styles.remaining,{paddingVertical:"8px",borderRightWidth:1}]}></Text>
          <Text style={[styles.remaining,{paddingVertical:"8px",borderRightWidth:1}]}></Text>
          <Text style={[styles.remaining,{paddingVertical:"8px",borderRightWidth:1}]}></Text>
          <Text style={[styles.remaining,{paddingVertical:"8px",borderRightWidth:1}]}></Text>
          <Text style={[styles.remaining,{paddingVertical:"8px",borderRightWidth:1}]}></Text>
          <Text style={[styles.remaining,{paddingVertical:"8px",borderRightWidth:1}]}></Text>
          <Text style={[styles.remaining,{paddingVertical:"8px",borderRightWidth:1}]}></Text>
          <Text style={styles.remarks}></Text>
      </View>
    ));



    return <Fragment>{rows}</Fragment>;
  };
  
  export default ProductionListTableRow;
  