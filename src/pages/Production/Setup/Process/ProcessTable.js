import axios from "axios";
import React, { useState } from "react";
import { Table } from "react-bootstrap";

export default function ProcessTable({
  processTab,
  selectRow,
  selectedRowFun,
}) {


  ////
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const dataCopy = [...processTab];
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

  // console.log("Selected Row", selectRow)
  return (
    <div className="row mt-1">
      <div className="col-md-12 col-sm-12">
        <div
          style={{
            height: "350px",
            overflow: "scroll",
            maxWidth: "850px",
            marginLeft: "-10px",
          }}
        >
          <Table striped className="table-data border">
            <thead className="tableHeaderBGColor">
              <tr>
                <th onClick={() => requestSort("ProcessID")}>Process</th>
                <th onClick={() => requestSort("ProcessDescription")}>ProcessDescription</th>
                <th onClick={() => requestSort("RawMaterial")}>RawMaterial</th>
              </tr>
            </thead>

            <tbody className="tablebody table-space">
              <>
                {sortedData().map((data, key) => (
                  <tr
                    onClick={() => selectedRowFun(data, key)}
                    className={
                      key === selectRow?.index ? "selcted-row-clr" : ""
                    }
                  >
                    <td>{data.ProcessID}</td>
                    <td>{data.ProcessDescription}</td>
                    <td>{data.RawMaterial}</td>
                  </tr>
                ))}
              </>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
