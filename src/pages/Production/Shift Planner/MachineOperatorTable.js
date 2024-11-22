import React, { useState, useEffect, useMemo } from "react";
import Table from "react-bootstrap/Table";

function MachineOperatorTable({
  rowselectMachineOperator,
  rowselectDailyShiftTable,
  machineOperatorTableData,
  getMachineOperatorTableData,
  rowSelectFun,
  setRowselectMachineOperator,
  selectedWeek,
  rowselect,
}) {
  // useEffect(() => {
  //   getMachineOperatorTableData();
  // }, [rowselectDailyShiftTable]);

  useEffect(() => {
    if (rowselectDailyShiftTable) {
      getMachineOperatorTableData();
    } else {
      getMachineOperatorTableData();
    }
  }, [rowselectDailyShiftTable]);

  useMemo(() => {
    setRowselectMachineOperator({ ...machineOperatorTableData[0], index: 0 });
  }, [machineOperatorTableData[0]]);

   //
   const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
   const requestSort = (key) => {
     let direction = "asc";
     if (sortConfig.key === key && sortConfig.direction === "asc") {
       direction = "desc";
     }
     setSortConfig({ key, direction });
   };
 
   const sortedData = () => {
     const dataCopy = [...machineOperatorTableData];
     if (sortConfig.key) {
       dataCopy.sort((a, b) => {
         if (a[sortConfig.key] < b[sortConfig.key]) {
           return sortConfig.direction === "asc" ? -1 : 1;
         }
         if (a[sortConfig.key] > b[sortConfig.key]) {
           return sortConfig.direction === "asc" ? 1 : -1;
         }
         return 0;
       });
     }
     return dataCopy;
   };

  return (
    <div
      className="mx-1"
      style={{
        width: "420px",
        height: "350px",
        overflowX: "scroll",
        overflowY: "scroll",
      }}
    >
      <Table striped className="table-data border " style={{ border: "1px" }}>
        <thead className="tableHeaderBGColor">
          <tr>
            <th onClick={() => requestSort("Machine")}>Machine</th>
            <th onClick={() => requestSort("Operator")}>Operator</th>
          </tr>
        </thead>

        <tbody className="tablebody">
          {machineOperatorTableData.length === 0 ? (
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                No data to show
              </td>
            </tr>
          ) : (
            sortedData().map((rank, i, row) => (
              <tr
                key={i}
                onClick={() => rowSelectFun(rank, i)}
                className={
                  i === rowselectMachineOperator?.index ? "selcted-row-clr" : ""
                }
              >
                {/* <td>{rank.ShiftDate}</td> */}
                <td>{rank.Machine}</td>
                <td>{rank.Operator}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default MachineOperatorTable;
