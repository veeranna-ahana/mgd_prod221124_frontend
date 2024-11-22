import React, { useEffect, useMemo, useState } from "react";
import Table from "react-bootstrap/Table";
import { useGlobalContext } from "../../../../../Context/Context";

export default function ScheduleListtable({
  rowSelectFun,
  rowselect,
  getprocessTabledata,
  setRowselect,
}) {
  const {
    schedulelistfabricationdata,
    getSchedulistfabricationdata,
    selectedRowsFabrication,
    setSelectedRowsFabrication,
    handleCheckboxChangeFabrication,
  } = useGlobalContext();

  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (schedulelistfabricationdata.length > 0 && initialLoad) {
      rowSelectFun(schedulelistfabricationdata[0], 0); // Select the first row on initial load
      setInitialLoad(false); // Set initialLoad to false so this effect doesn't run again
    }
  }, [schedulelistfabricationdata, initialLoad, rowSelectFun]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const dataCopy = [...schedulelistfabricationdata];
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

        <tbody className="tablebody table-space">
          {sortedData().length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No data to display
              </td>
            </tr>
          ) : (
            <>
              {sortedData().map((item, key) => {
                const isChecked = selectedRowsFabrication.some(
                  (row) => row === item
                );

                return (
                  <tr
                    key={key}
                    onClick={() => rowSelectFun(item, key)}
                    className={
                      key === rowselect?.index ? "selcted-row-clr" : ""
                    }
                  >
                    <td>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCheckboxChangeFabrication(item)}
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
            </>
          )}
        </tbody>
      </Table>
    </div>
  );
}
