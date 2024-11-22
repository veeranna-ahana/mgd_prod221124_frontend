import React, { useState } from "react";
import Table from "react-bootstrap/Table";

export default function GroupNameTable({
  getGroupNameList,
  selectedGroup,
  selectedRowFn,
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
    const dataCopy = [...getGroupNameList];
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
    <div className="row">
      <div>
        <div style={{ height: "450px", overflowY: "auto" }}>
          <Table striped className="table-data border">
            <thead className="tableHeaderBGColor">
              <tr>
                <th className="textAllign" onClick={() => requestSort("SL NO")}>SL NO</th>
                <th className="textAllign" onClick={() => requestSort("GroupName")}>GropName</th>
                {/* <th>Working</th> */}
              </tr>
            </thead>

            <tbody>
              {sortedData().map((item, key) => {
                return (
                  <>
                    <tr
                      onClick={() => selectedRowFn(item, key)}
                      className={
                        key === selectedGroup?.index ? "selcted-row-clr textAllign" : "textAllign"
                      }
                    >
                      <td>{key + 1}</td>
                      <td>{item.GroupName}</td>
                      {/* {
              <td>
                 <input className="form-check-input mt-2"
                   type="checkbox"
                   disabled
                   value=""
                   id="flexCheckDefault"/>
              </td>
             } */}
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
