import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { baseURL } from "../../../../../../api/baseUrl";

export default function ProgramList({
  getProgramlistdata,
  programlistdata,
  TaskNo,
}) {
  //Process Table(Right First table) data
  console.log(programlistdata);

  useEffect(() => {
    getProgramlistdata();
  }, [TaskNo]);

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
    const dataCopy = [...programlistdata];
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
    <div className="mt-1" style={{ height: "170px", overflowY: "scroll" }}>
      <Table striped className="table-data border">
        <thead className="tableHeaderBGColor">
          <tr>
            <th  onClick={() => requestSort("NCProgramNo")}>NCProgramNo</th>
            <th onClick={() => requestSort("Machine")}>Machine</th>
            <th className="textAllign"  onClick={() => requestSort("ActualTime")}>ActualTime</th>
            <th className="textAllign"  onClick={() => requestSort("EstmatedTime")}>EstmatedTime</th>
            <th className="textAllign"  onClick={() => requestSort("QtyAlloted")}>QtyAlloted</th>
            <th className="textAllign"  onClick={() => requestSort("QtyProcessed")}>QtyProcessed</th>
          </tr>
        </thead>

        <tbody className="tablebody">
          {sortedData().map((item, key) => {
            return (
              <>
                <tr>
                  <td style={{ whiteSpace: "nowrap" }}>{item.NCProgramNo}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{item.Machine}</td>
                  <td className="textAllign">{item.ActualTime}</td>
                  <td className="textAllign">{item.EstimatedTime}</td>
                  <td className="textAllign">{item.QtyAllotted}</td>
                  <td className="textAllign">{item.QtyCut}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
