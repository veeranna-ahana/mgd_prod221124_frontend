import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useGlobalContext } from "../../../../../Context/Context";
import { baseURL } from "../../../../../api/baseUrl";
import { useState } from "react";

export default function ScheduleListtable({
  rowSelectFun,
  rowselect,
  getprocessTabledata,
  setRowselect,
  scheduleList,
  custcode,
}) {
  const {
    schedulelistdata,
    getSchedulistdata,
    selectedRows,
    setSelectedRows,
    handleCheckboxChange,
  } = useGlobalContext();

  useEffect(() => {
    getSchedulistdata();
  }, []);

  const [initialLoad, setInitialLoad] = useState(true);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const dataCopy = [...schedulelistdata];
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

  useEffect(() => {
    if (schedulelistdata.length > 0 && initialLoad) {
      rowSelectFun(schedulelistdata[0], 0); // Select the first row on initial load
      setInitialLoad(false); // Set initialLoad to false so this effect doesn't run again
    }
  }, [schedulelistdata, initialLoad, rowSelectFun]);

  return (
    <div style={{ height: "400px", overflowY: "scroll", overflowX: "scroll" }}>
      <Table striped className="table-data border">
        <thead className="tableHeaderBGColor table-space">
          <tr>
            <th onClick={() => requestSort("Select")}>Select</th>
            <th onClick={() => requestSort("OrdSchNo")}>Schedule No</th>
            <th onClick={() => requestSort("Cust_name")}>Customer</th>
            <th onClick={() => requestSort("schTgtDate")}>TgtDelDate</th>
            <th onClick={() => requestSort("Delivery_Date")}>Delivery_date</th>
            <th onClick={() => requestSort("Schedule_Status")}>Status</th>
          </tr>
        </thead>

        {sortedData().length === 0 ? (
          <tbody>
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No data to display
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="tablebody table-space">
            {sortedData().map((item, key) => {
              const isChecked = selectedRows.some((row) => row === item);

              return (
                <tr
                  onClick={() => rowSelectFun(item, key)}
                  className={key === rowselect?.index ? "selcted-row-clr" : ""}
                >
                  <td>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCheckboxChange(item)}
                    />
                  </td>
                  <td>{item.OrdSchNo}</td>
                  <td>{item.Cust_name}</td>
                  <td>{item.schTgtDate}</td>
                  <td>{item.Delivery_Date}</td>
                  <td>{item.Schedule_Status}</td>
                </tr>
              );
            })}
          </tbody>
        )}
      </Table>
    </div>
  );
}
