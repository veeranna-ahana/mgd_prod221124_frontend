import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Table from "react-bootstrap/Table";

export default function StoppageReasonTable({
  selectedGroup,
  selectedReason,
  selectReasonFun,
  getReasonsList,
}) {

  useEffect(() => {
    if (getReasonsList.length > 0 && !selectedReason.Stoppage) {
      selectReasonFun(getReasonsList[0], 0); // Select the first row
    }
  }, [getReasonsList, selectedReason, selectReasonFun]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const dataCopy = [...getReasonsList];
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
    <div className="mt-1">
      <div>
        <div style={{ height: "370px", overflowY: "auto", overflowX: "auto" }}>
          <Table striped className="table-data border">
            <thead className="tableHeaderBGColor">
              <tr>
                <th className="textAllign" onClick={() => requestSort("SL NO")}>SL NO</th>
                <th className="textAllign" onClick={() => requestSort("Stoppage")}>Stoppage Reason</th>
              </tr>
            </thead>

            <tbody>
              {sortedData().length > 0 ? (
                sortedData().map((item, key) => {
                  return (
                    <>
                      <tr
                        onClick={() => selectReasonFun(item, key)}
                        className={
                          key === selectedReason?.index ? "selcted-row-clr textAllign" : "textAllign"
                        }
                      >
                        <td>{key + 1}</td>
                        <td>{item?.Stoppage}</td>
                      </tr>
                    </>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="2">No data available</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
