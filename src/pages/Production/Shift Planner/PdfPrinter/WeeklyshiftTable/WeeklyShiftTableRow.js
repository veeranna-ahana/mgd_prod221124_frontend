import React, { Fragment } from "react"; 
import { Text, View, StyleSheet } from "@react-pdf/renderer";



const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      borderBottom:"1px",
      padding:"2px"
    },
    machine: {
      width: "35%",
    },
    operator: {
      width: "35%",
    },
    remarks:{
        width:"30%"
    }
  });
  
  const WeeklyShiftTableRow = ({ items }) => {
    const rows = items.map((item) => (
      <View style={styles.row}>
        <Text style={[styles.machine, {fontFamily:"Helvetica-Bold"}]}>{item.Machine}</Text>
        <Text style={styles.operator}>{item.Operator}</Text>
        <Text style={styles.remarks}>{item.shiftRemarks}</Text>
      </View>
    ));
    return <Fragment>{rows}</Fragment>;
  };
  
  export default WeeklyShiftTableRow;
  