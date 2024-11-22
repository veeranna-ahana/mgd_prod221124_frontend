import React, { useMemo } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";

export default function ProductionTaskSummary({ productionTaskSummary }) {
  const [selectrow, setSelectRow] = useState({});
  const selectRowFunction = (item, index) => {
    let list = { ...item, index: index };
    setSelectRow(list);
  };

  useMemo(() => {
    setSelectRow({ ...productionTaskSummary[0], index: 0 });
  }, [productionTaskSummary[0]]);

  ///
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const dataCopy = [...productionTaskSummary];
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
      className="mt-1"
      style={{
        maxWidth: "900px",
        overflowX: "scroll",
        height: "360px",
        overflowY: "scroll",
      }}
    >
      <Table striped className="table-data border">
        <thead className="tableHeaderBGColor">
          <tr>
            <th onClick={() => requestSort("Machine")}>Machine</th>
            <th onClick={() => requestSort("Task No")}>Task No</th>
            <th onClick={() => requestSort("Mtrl Code")}>Mtrl Code</th>
            <th onClick={() => requestSort("Operation")}>Operation</th>
            <th className="textAllign" onClick={() => requestSort("Machine Time")}>Machine Time</th>
          </tr>
        </thead>

        <tbody className="tablebody">
          {sortedData().map((item, key) => {
            return (
              <>
                <tr
                  onClick={() => selectRowFunction(item, key)}
                  className={key === selectrow?.index ? "selcted-row-clr" : ""}
                >
                  <td>{item.Machine}</td>
                  <td>{item.TaskNo}</td>
                  <td>{item.Mtrl_Code}</td>
                  <td>{item.Operation}</td>
                  <td className="table-cell-align textAllign">{item.machineTime}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
