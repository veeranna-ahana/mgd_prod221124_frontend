import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ModalPrintPriority from "../PrintPriortyTable/ModalPrintPriority";
import { baseURL } from "../../../../../../api/baseUrl";

export default function PriorityTable({
  machineSelect,
  ncProgramsTableData,
  selectNcProgram,
  setNcProgramsTableData,
  handleCheckboxChange,
}) {
  const [priorityTable, setPriorityTable] = useState([]);
  let constspriorityTabel = [];

  useEffect(() => {}, [priorityTable]);

  function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }

  const selectRowTable = (item) => {
    if (priorityTable.includes(item)) {
    } else {
      setPriorityTable([...priorityTable, item]);
    }
  };

  const selectRowPriorityTable = (row) => {
    var id = row.Ncid;
    let constPriorityTable = priorityTable;
    let filteredList = priorityTable.filter((item) => {
      return item?.Ncid != id;
    });

    //  console.log( 'Const Priority Table Data is ' , filteredList)
    setPriorityTable(filteredList);
  };

  const [openPrint, setOpenPrint] = useState("");
  const openPrintPriority = () => {
    setOpenPrint(true);
  };

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
     const dataCopy = [...ncProgramsTableData];
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
 
   //////////////////////////////////////
 //
 const [sortConfig1, setSortConfig1] = useState({ key: null, direction: null });
 const requestSort1 = (key) => {
   let direction = "asc";
   if (sortConfig1.key === key && sortConfig1.direction === "asc") {
     direction = "desc";
   }
   setSortConfig1({ key, direction });
 };
 
 const sortedData1 = () => {
   const dataCopy = [...priorityTable];
   if (sortConfig1.key) {
     dataCopy.sort((a, b) => {
       if (a[sortConfig1.key] < b[sortConfig1.key]) {
         return sortConfig1.direction === "asc" ? -1 : 1;
       }
       if (a[sortConfig1.key] > b[sortConfig1.key]) {
         return sortConfig1.direction === "asc" ? 1 : -1;
       }
       return 0;
     });
   }
   return dataCopy;
 };

 const[location,setlocation]=useState([]);
 useEffect(()=>{
   axios
   .post(baseURL + "/location/getlocation", {})
   .then((response) => {
     setlocation(response.data);
   });
 },[])
 
  return (
    <>
      <ModalPrintPriority
        openPrint={openPrint}
        setOpenPrint={setOpenPrint}
        priorityTable={priorityTable}
        location={location}
      />

      <div className="col-md-12">
        <div className="row">
          <div
            className="col-md-6"
            style={{
              overflowY: "scroll",
              overflowX: "scroll",
              height: "375px",
            }}
          >
            <Table striped className="table-data border table-space">
              <thead className="tableHeaderBGColor">
                <tr>
                <th onClick={() => requestSort("Select")}>Select</th>
                <th onClick={() => requestSort("NCProgramNo")}>Program No</th>
                <th onClick={() => requestSort("TaskNo")}>Task No</th>
                <th onClick={() => requestSort("Machine")}>Machine</th>
                <th onClick={() => requestSort("Operation")}>Operation</th>
                <th onClick={() => requestSort("Mtrl_Code")}>Material</th>
                <th onClick={() => requestSort("Cust_name")}>Cust_Name</th>
                <th onClick={() => requestSort("CustMtrl")}>Source</th>
                <th className="textAllign" onClick={() => requestSort("QtyAllotted")}>Allotted</th>
                <th className="textAllign" onClick={() => requestSort("QtyCut")}>Processed</th>
                <th onClick={() => requestSort("PStatus")}>Status</th>
                <th className="textAllign" onClick={() => requestSort("EstimatedTime")}>PlanTime</th>
                <th className="textAllign" onClick={() => requestSort("ActualTime")}>Actual Time</th>
                <th onClick={() => requestSort("Remarks")}>Remarks</th>
              </tr>
              </thead>

              <tbody className="tablebody table-space">
                {sortedData().map((item, key) => {
                  return (
                    <>
                      <tr
                        style={{ backgroundColor: item.rowColor }}
                        onDoubleClick={() => selectRowTable(item)}
                        className={
                          key === priorityTable?.index ? "selcted-row-clr" : ""
                        }
                      >
                        <td>
                          <input
                            className="form-check-input mt-2"
                            type="checkbox"
                            value={item}
                            onChange={() => handleCheckboxChange(item, key)}
                            //data-row-value={item}
                            checked={item.isChecked}
                            id="flexCheckDefault"
                          />
                        </td>
                        <td>{item.NCProgramNo}</td>
                        <td>{item.TaskNo}</td>
                        <td>{item.Machine}</td>
                        <td>{item.Operation}</td>
                        <td>{item.Mtrl_Code}</td>
                        <td>{item.Cust_name}</td>
                        <td>{item.CustMtrl}</td>
                        <td className="textAllign">{item.QtyAllotted}</td>
                        <td className="textAllign">{item.QtyCut}</td>
                        <td>{item.PStatus}</td>
                        <td className="textAllign">{item.EstimatedTime}</td>
                        <td className="textAllign">{item.ActualTime}</td>
                        <td>{item.Remarks}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
          </div>

          {/* priority print */}

          <div className="col-md-6">
            <div>
              <div
                className="d-flex"
                style={{ backgroundColor: "#F2D7D5", gap: "10px" }}
              >
                <div>
                  <label className="form-label">Production Priority list</label>
                </div>
                <div>
                  <button
                    className="button-style group-button"
                    onClick={openPrintPriority}
                  >
                    Print
                  </button>
                </div>
              </div>

              {/* Table2 */}

              <div
                style={{
                  height: "340px",
                  overflowY: "scroll",
                  overflowX: "scroll",
                }}
              >
                {/* <h6 style={{textAlign:"center"}} className='mt-1 ms-1'>Priority Table</h6> */}
                <Table striped className="table-data border">
                  <thead className="tableHeaderBGColor">
                  <tr style={{whiteSpace:'nowrap'}}>
                    <th onClick={() => requestSort1("Program No")}>Program No</th>
                    <th onClick={() => requestSort1("Task No")}>Task No</th>
                    <th onClick={() => requestSort1("Machine")}>Machine</th>
                    <th onClick={() => requestSort1("Operation")}>Operation</th>
                    <th onClick={() => requestSort1("Material")}>Material</th>
                    <th onClick={() => requestSort1("Cust_Name")}>Cust_Name</th>
                    <th onClick={() => requestSort1("Source")}>Source</th>
                    <th className="textAllign" onClick={() => requestSort1("Processed")}>Processed</th>
                    <th className="textAllign" onClick={() => requestSort1("Allotted")}>Allotted</th>
                    <th onClick={() => requestSort1("Status")}>Status</th>
                    <th className="textAllign" onClick={() => requestSort1("PlanTime")}>PlanTime</th>
                    <th className="textAllign" onClick={() => requestSort1("Actual Time")}>Actual Time</th>
                    <th onClick={() => requestSort1("Remarks")}>Remarks</th>
                  </tr>
                  </thead>

                  <tbody className="tablebody table-space">
                    {sortedData1().map((priorityTable) => (
                      <tr
                        key={priorityTable?.Ncid}
                        onDoubleClick={() =>
                          selectRowPriorityTable(priorityTable)
                        }
                      >
                        <td>{priorityTable?.NCProgramNo}</td>
                        <td>{priorityTable?.TaskNo}</td>
                        <td>{priorityTable?.Machine}</td>
                        <td>{priorityTable?.Operation}</td>
                        <td>{priorityTable?.Mtrl_Code}</td>
                        <td>{priorityTable?.Cust_name}</td>
                        <td>{priorityTable?.CustMtrl}</td>
                        <td className="textAllign">{priorityTable?.QtyAllotted}</td>
                        <td className="textAllign">{priorityTable?.QtyCut}</td>
                        <td>{priorityTable?.PStatus}</td>
                        <td className="textAllign">{priorityTable?.EstimatedTime}</td>
                        <td className="textAllign">{priorityTable?.ActualTime}</td>
                        <td>{priorityTable?.Remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
