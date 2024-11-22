import React, { Fragment, useState } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderBottom: "1px solid black", // Add a proper border style here
  },
  machine: {
    width: "30%",
  },
  operator: {
    width: "30%",
  },
  remarks: {
    width: "40%",
  },
  noData: {
    textAlign: "center",
    marginTop: 10,
  },
});

const PrintDailyShiftTableRows = ({ newestdata }) => {
  if (!newestdata || !newestdata.machineOperators || newestdata.machineOperators.length === 0) {
    return <Text style={styles.noData}>No data found</Text>;
  }

  const rows = newestdata.machineOperators.map((item) => (
    <View style={styles.row} key={item.id}>
      <Text style={styles.machine}>{item?.Machine}</Text>
      <Text style={styles.operator}>{item?.Operator}</Text>
      <Text style={styles.remarks}></Text>
    </View>
  ));

  return <Fragment>{rows}</Fragment>;
};

export default PrintDailyShiftTableRows;
