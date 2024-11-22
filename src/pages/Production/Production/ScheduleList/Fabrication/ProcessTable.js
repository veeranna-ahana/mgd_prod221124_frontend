import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

export default function ProcessTable({
  OrdSchNo,
  getprocessTabledata,
  processtable,
  processtableSelectFun,
  processrowselect
}) {
  useEffect(() => {
    getprocessTabledata();
  }, [OrdSchNo]);

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
   const dataCopy = [...processtable];
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
    <div style={{ height: "200px", overflowY: "scroll", overflowX: "scroll" }}>
      <Table striped className="table-data border">
        <thead className="tableHeaderBGColor table-space">
        <tr>
            <th onClick={() => requestSort("TStatus")}>Status</th>
            <th onClick={() => requestSort("TaskNo")}>Task No</th>
            <th onClick={() => requestSort("Mtrl_Code")}>Material</th>
            <th onClick={() => requestSort("MProcess")}>Process</th>
            <th className="textAllign" onClick={() => requestSort("EstimatedTime")}>Estimated Time</th>
            <th className="textAllign" onClick={() => requestSort("TaskProcessTime")}>Time Taken</th>
            <th className="textAllign" onClick={() => requestSort("NoOfDwgs")}>No of Dwgs</th>
            <th className="textAllign" onClick={() => requestSort("DwgsNested")}>Dwgs Nested</th>
            <th className="textAllign" onClick={() => requestSort("TotalParts")}>Total Parts</th>
            <th className="textAllign" onClick={() => requestSort("PartsNested")}>Parts Nested</th>
            <th className="textAllign" onClick={() => requestSort("NoOfSheets")}>No of Sheets</th>
          </tr>
        </thead>
        <tbody className='tablebody table-cell-align table-space'>
          {processtable.length === 0 ? (
            <tr>
              <td colSpan="11">No data found</td>
            </tr>
          ) : (
            sortedData().map((item, key) => (
              <tr
                onClick={() => processtableSelectFun(item, key)}
                className={key === processrowselect?.index ? 'selcted-row-clr' : ''}
              >
                <td>{item.TStatus}</td>
                <td>{item.TaskNo}</td>
                <td>{item.Mtrl_Code}</td>
                <td>{item.MProcess}</td>
                <td className="textAllign">{item.EstimatedTime}</td>
                <td className="textAllign">{item.TaskProcessTime}</td>
                <td className="textAllign">{item.NoOfDwgs}</td>
                <td className="textAllign">{item.DwgsNested}</td>
                <td className="textAllign">{item.TotalParts}</td>
                <td className="textAllign">{item.PartsNested}</td>
                <td className="textAllign">{item.NoOfSheets}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}
