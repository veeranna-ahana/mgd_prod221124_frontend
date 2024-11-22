import React, { useState } from "react";
import Table from "react-bootstrap/Table";

export default function EditOperatorTable({
  getOperatorlist,
  rowselectOperator,
  selectedRowFunOperator,
}) {

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const dataCopy = [...getOperatorlist];
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
    <div style={{ height: "430px", overflowY: "auto" }}>
      <Table striped className="table-data border">
        <thead className="tableHeaderBGColor">
          <tr>
            <th onClick={() => requestSort("Name")}>Operator</th>
            <th className="textAllign" onClick={() => requestSort("Skill_Level")}>Skill Level</th>
            <th onClick={() => requestSort("Status")}>Status</th>
          </tr>
        </thead>

        <tbody className="tablebody table-space">
          {sortedData().length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center">
                No data to show
              </td>
            </tr>
          ) : (
            sortedData().map((item, key) => (
              <tr
                key={key}
                onClick={() => selectedRowFunOperator(item, key)}
                className={
                  key === rowselectOperator?.index ? "selcted-row-clr" : ""
                }
              >
                <td>{item?.Name}</td>
                <td className="textAllign">{item?.Skill_Level}</td>
                <td>{item?.Status}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}
