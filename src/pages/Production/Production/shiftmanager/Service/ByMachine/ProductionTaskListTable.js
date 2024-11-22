import React, { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { useGlobalContext } from "../../../../../../Context/Context";

export default function ProductionTaskListTable() {
  const {
    productionTaskList,
    SetProductionTaskList,
    getProductionTaskListData,
  } = useGlobalContext();
  // console.log(productionTaskList);

  useEffect(() => {
    getProductionTaskListData();
  }, [productionTaskList]);

  
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
    const dataCopy = [...productionTaskList];
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
          style={{
            height: "240px",
            overflowX: "scroll",
            width: "850px",
            overflowY: "scroll",
          }}
        >
          <Table striped className="table-data border">
            <thead className="tableHeaderBGColor table-space">
              <tr>
                <th onClick={() => requestSort("TaskNo")}>TaskNo</th>
                <th onClick={() => requestSort("Operation")}>Operation</th>
                <th onClick={() => requestSort("Mtrl_Code")}>Mtrl_Code</th>
                <th onClick={() => requestSort("NoOfSheets")} className="textAllign">NoOfSheets</th>
                <th onClick={() => requestSort("NoOfDwgs")} className="textAllign">NoOfDwgs</th>
                <th onClick={() => requestSort("DwgsNo")} className="textAllign">DwgsNo</th>
                <th onClick={() => requestSort("DwgsNested")} className="textAllign">DwgsNested</th>
                <th onClick={() => requestSort("PartsNested")} className="textAllign">PartsNested</th>
                <th onClick={() => requestSort("TotalParts")} className="textAllign">TotalParts</th>
                <th onClick={() => requestSort("NestCount")}>NestCount</th>
                <th onClick={() => requestSort("Priority")} className="textAllign">Priority</th>
                <th onClick={() => requestSort("EstimatedTime")} className="textAllign">EstimatedTime</th>
                <th onClick={() => requestSort("TaskProcessTime")} className="textAllign">TaskProcessTime</th>
                <th onClick={() => requestSort("TaskPgmTime")} className="textAllign">TaskPgmTime</th>
              </tr>
            </thead>

            {sortedData().map((item, key) => {
              return (
                <>
                  <tbody className="tablebody table-space">
                    <tr>
                      <td>{item.TaskNo}</td>
                      <td>{item.Operation}</td>
                      <td>{item.Mtrl_Code}</td>
                      <td className="textAllign">{item.NoOfSheets}</td>
                      <td className="textAllign">{item.DwgsNested}</td>
                      <td className="textAllign">{item.NoOfDwgs}</td>
                      <td className="textAllign">{item.PartsNested}</td>
                      <td className="textAllign">{item.TotalParts}</td>
                      <td>{item.NestCount}</td>
                      <td className="textAllign">{item.Priority}</td>
                      <td className="textAllign">{item.EstimatedTime}</td>
                      <td className="textAllign">{item.NestCount}</td>
                      <td></td>
                      <td></td>
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
