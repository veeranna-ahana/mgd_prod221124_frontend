import axios from "axios";
import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { baseURL } from "../../../../../../api/baseUrl";
import { useState } from "react";

export default function MachineLogSideTable({
  setSelectmachinelog,
  selectmachinelog,
  selectMachineLogFun,
  machineList,
}) {

  
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
    const dataCopy = [...machineList];
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
    <div className="row mt-1">
      <div className="col-md-12 col-sm-12">
        <div
          style={{ height: "234px", overflowY: "scroll", overflowX: "scroll" }}
        >
          <Table striped className="table-data border">
            <thead className="tableHeaderBGColor">
              <tr>
                <th onClick={() => requestSort("Machine")}>Machine</th>
              </tr>
            </thead>

            {sortedData().map((item, key) => {
              return (
                <>
                  <tbody className="tablebody">
                    <tr
                      onClick={() => selectMachineLogFun(item, key)}
                      className={
                        key === selectmachinelog?.index ? "selcted-row-clr" : ""
                      }
                    >
                      <td>{item.MachineName}</td>
                    </tr>
                  </tbody>
                </>
              );
            })}
          </Table>
        </div>
      </div>
    </div>
  );
}

