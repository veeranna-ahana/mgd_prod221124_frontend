import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useGlobalContext } from "../../../../Context/Context";

export default function MachineTable({ selectedRowFn, selectedRow }) {
  const { post, MachineTabledata } = useGlobalContext();


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
    const dataCopy = [...post];
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

  // console.log("selectedRow is",selectedRow);
  return (
    <div className="row mt-1">
      <div>
        <div style={{ height: "430px", overflowY: "auto" }}>
          <Table striped className="table-data border">
            <thead className="tableHeaderBGColor">
              <tr>
                <th  onClick={() => requestSort("Manufacturer")}>Manufacturer</th>
                <th  onClick={() => requestSort("Model")}>Model</th>
                <th  onClick={() => requestSort("Working")}>Working</th>
              </tr>
            </thead>

            <tbody>
              {sortedData().map((item, key) => {
                return (
                  <>
                    <tr
                      onClick={() => selectedRowFn(item, key)}
                      className={
                        key === selectedRow?.index ? "selcted-row-clr" : ""
                      }
                    >
                      <td>{item.manufacturer}</td>
                      <td>{item.Model}</td>
                      {
                        <td>
                          <input
                            className="form-check-input mt-2"
                            type="checkbox"
                            disabled
                            value=""
                            checked={item.Working === 0 ? false : true}
                            id="flexCheckDefault"
                          />
                        </td>
                      }
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
