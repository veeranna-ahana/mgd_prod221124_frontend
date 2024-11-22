import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";

// useEffect( () => {
// console.log('props from second table' , props)
// },[])

function SecondTable(props) {
  //  console.log('secondTableShiftState in second TABLE 1' , props.week)

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
     const dataCopy = [...props.week];
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
      className="col-md-3"
      style={{
        width: "340px",
        height: "495px",
        overflowX: "scroll",
        overflowY: "scroll",
      }}
    >
      <div>
        <Table
          striped
          className="table-data border table-space"
          style={{ marginLeft: "5px", border: "1px" }}
        >
          <thead className="tableHeaderBGColor">
            <tr>
              <th onClick={() => requestSort("ShiftDate")}>ShiftDate</th>
              <th onClick={() => requestSort("Shift")}>Shift</th>
              <th onClick={() => requestSort("Shift IC")} >Shift IC</th>
              <th onClick={() => requestSort("From")}>From</th>
              <th onClick={() => requestSort("To")}>To</th>
            </tr>
          </thead>

          <tbody className="tablebody">
            {sortedData().map((rank, i, row) => {
              return (
                <>
                  <tr>
                    <td >{rank.ShiftDate}</td>
                    <td >{rank.Shift}</td>
                    <td >{rank.Shift_Ic}</td>
                    <td >{rank.FromTime}</td>
                    <td >{rank.ToTime}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default SecondTable;
