import React, { useState } from "react";
import { Table } from "react-bootstrap";
import DateChangeModal from "./DateChangeModal";
import { baseURL } from "../../../../api/baseUrl";
import axios from "axios";
import PrintShiftLogModal from "../Pdfs/PrintShiftLog/PrintShiftLogModal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import CustomModal from "../../CustomModal";

export default function MachineLog({
  machineLogData,
  setMachineLogData,
  dateSelect,
  selectedRows,
  setSelectedRows,
  machinelogRowSelect,
  status,
  machineName,location,selectedShift
}) {
  const [selectAll, setSelectAll] = useState(false);
  const [FinalMachineLogArray, setFinalMachineLogArray] = useState([]);
  const [alert, setAlert] = useState("");
  const [machineLogSelectedRow, setMachineLogSelectedRow] = useState({});
  const [openShiftLog, setOpenShiftLog] = useState(false);
  const [SumMachineTime, setSumMachineTime] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [modalShow1, setModalShow1] = useState(false);
  const [modalShow4, setModalShow4] = useState(false);

  const blockInvalidChar = (e) => {
  const invalidChars = [
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "_",
    "-",
    "+",
    "=",
    "|",
    "}",
    "{",
    "[",
    "]",
    ".",
    ",",
    "?", 
    '"',
    "<",
    ">",
    "`",
    "~",
    ";",
    "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
  ];
  if (invalidChars.includes(e.key) || e.key === "'" || e.key === "\\") {
    e.preventDefault();
  }
}


  const sortMachineLogs = (logs) => {
    // Perform sorting based on your desired logic
    // Here, we assume sorting by 'shift' in ascending order and 'machine' in alphabetical order
    logs.sort((a, b) => {
      const MachineA =
        a.Machine !== undefined && a.Machine !== null ? String(a.Machine) : "";
      const MachineB = b.Machine ? String(b.Machine) : "";

      if (a.Shift === b.Shift) {
        return MachineA.localeCompare(MachineB);
      }
      return a.Shift.localeCompare(b.Shift);
    });

    return logs;
  };

  let sortedMachineLogs = [];
  if (Array.isArray(machineLogData)) {
    sortedMachineLogs = machineLogData.reduce((acc, log) => {
      const { Shift, Machine, MachineTime } = log;
      const existingShift = acc.find((item) => item.Shift === Shift);

      if (existingShift) {
        const existingMachine = existingShift.Machines.find(
          (item) => item.Machine === Machine
        );

        if (existingMachine) {
          existingMachine.logs.push(log);
          existingMachine.TotalMachineTime += MachineTime;
        } else {
          existingShift.Machines.push({
            Machine,
            TotalMachineTime: MachineTime,
            logs: [log],
          });
        }
      } else {
        acc.push({
          Shift,
          Machines: [
            {
              Machine,
              TotalMachineTime: MachineTime,
              logs: [log],
            },
          ],
        });
      }

      return acc;
    }, []);

    sortedMachineLogs.forEach((ShiftLog) => {
      ShiftLog.Machines.forEach((machineLog) => {
        machineLog.logs = sortMachineLogs(machineLog.logs);
        machineLog.logs.push({ TotalMachineTime: machineLog.TotalMachineTime });
      });
    });
  }

  const handleTimeChange = (index, field, value) => {
    const dateTimeRegex = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/;
    const maxLength = 16; // Length of 'DD/MM/YYYY HH:MM'

    if (value.length > maxLength) {
        toast.error(`Invalid ${field} format. Please use DD/MM/YYYY HH:MM`, {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    if(value.length ===0){
      toast.error(`Input field cannot be empty`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    const updatedMachineLogData = [...machineLogData]; // Create a copy of the array
    // Update the specific item's field with the new value
    updatedMachineLogData[index] = {
      ...updatedMachineLogData[index],
      [field]: value,
    };
    setMachineLogData(updatedMachineLogData);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setFinalMachineLogArray([...machineLogData]);
      setSelectedRows(
        machineLogData.map((_, index) => ({
          index,
          data: machineLogData[index],
        }))
      );

      const sum = machineLogData.reduce(
        (accumulator, item) => accumulator + item.MachineTime,
        0
      );
      setSumMachineTime(sum);
    } else {
      setFinalMachineLogArray([]);
      setSelectedRows([]);
      setSumMachineTime(0);
    }
  };


  const onClickSaveLog = () => {
    // Regular expression to validate dd/mm/yyyy HH:MM format
    const dateTimeRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4} ([01][0-9]|2[0-3]):([0-5][0-9])$/;
  
    // Check if any log entry has empty or invalid FromTime or ToTime
    for (let log of machineLogData) {
      if (!log.FromTime || !log.ToTime) {
        toast.error("FromTime and ToTime cannot be empty", {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }
      if (!dateTimeRegex.test(log.FromTime) || !dateTimeRegex.test(log.ToTime)) {
        toast.error("FromTime and ToTime must be in the format dd/mm/yyyy HH:MM and within valid ranges", {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }
    }
  
    // If all FromTime and ToTime are valid, proceed with the logic
    if (Object.keys(selectedShift).length !== 0) {
      axios.post(baseURL + "/reports/saveLog", {
        machineLogData,
      })
      .then((response) => {
        setModalShow1(true);
        axios.post(baseURL + "/reports/shiftOnClick", {
          Date: dateSelect,
          Machine: machineName,
          Shift: selectedShift?.Shift,
        })
        .then((response) => {
          processResponse(response.data);
        });
      });
    } else if (machineName !== "" && machineName !== undefined) {
      axios.post(baseURL + "/reports/saveLog", {
        machineLogData,
      })
      .then((response) => {
        setModalShow1(true);
        axios.post(baseURL + "/reports/machineOnclick", {
          Date: dateSelect,
          Machine: machineName,
        })
        .then((response) => {
          processResponse(response.data);
        });
      });
    } else {
      axios.post(baseURL + "/reports/saveLog", {
        machineLogData,
      })
      .then((response) => {
        setModalShow1(true);
        axios.post(baseURL + "/reports/machineLog", {
          Date: dateSelect,
          Machine: machineName,
        })
        .then((response) => {
          processResponse(response.data);
        });
      });
    }
  };
  
  // // Function to check the date and time format
  // function isValidDateTimeFormat(dateTime) {
  //   // Regular expression to validate dd/mm/yyyy HH:MM format
  //   const dateTimeRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4} ([01][0-9]|2[0-3]):([0-5][0-9])$/;
  //   return dateTimeRegex.test(dateTime);
  // }
  

  
  const processResponse = (data) => {
    // Processing response data format if needed
    for (let i = 0; i < data.length; i++) {
      let dateSplit1 = data[i].FromTime.split(" ");
      let date1 = dateSplit1[0].split("-");
      let year1 = date1[0];
      let month1 = date1[1];
      let day1 = date1[2];
      let time = dateSplit1[1].split(":");
      let Time = time[0] + ":" + time[1];
      let finalDay1 = day1 + "/" + month1 + "/" + year1 + " " + Time;
      data[i].FromTime = finalDay1;
  
      let dateSplit2 = data[i].ToTime.split(" ");
      let date2 = dateSplit2[0].split("-");
      let year2 = date2[0];
      let month2 = date2[1];
      let day2 = date2[2];
      let time1 = dateSplit2[1].split(":");
      let Time1 = time1[0] + ":" + time1[1];
      let finalDay2 = day2 + "/" + month2 + "/" + year2 + " " + Time1;
      data[i].ToTime = finalDay2;
    }
  
    setMachineLogData(data);
  };
  
  const isValidDateTimeFormat = (dateTimeString) => {
    const dateTimeRegex = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/;
    return dateTimeRegex.test(dateTimeString);
  };
  
  
  

  const closeModal = () => {
    setModalShow1(false);
  };
  const modalData = {
    title: "Reports",
    content: "Log Saved",
  };

  //Open PDF
  const PrintShiftLog = () => {
    if (status == false) {
      // toast.error("Prepare Report Before Printing ShiftLog", {
      //   position: toast.POSITION.TOP_CENTER,
      // });
      setModalShow4(true);
    } else {
      setOpenShiftLog(true);
    }
  };

  const closeModal1 = () => {
    setModalShow4(false);
  };
  const modalData1 = {
    title: "Reports",
    content: "Prepare Report Before Printing ShiftLog",
  };

  // console.log(machineLogData);

  const [showActionTaken, setShowActionTaken] = useState(false);
  const [actionTaken, setActionTaken] = useState("");
  const onclicktoShowActionTaken = (actionTaken) => {
    if (actionTaken !== null) {
      // Show toast notification
      // Example using toastify
      setShowActionTaken(true);
      setActionTaken(actionTaken);
    }
  };
  // console.log("actionTaken", actionTaken);


   ///
   const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
   const requestSort = (key) => {
     let direction = "asc";
     if (sortConfig.key === key && sortConfig.direction === "asc") {
       direction = "desc";
     }
     setSortConfig({ key, direction });
   };
 
   const sortedData = () => {
     const dataCopy = [...machineLogData];
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
    <div>
      <PrintShiftLogModal
        openShiftLog={openShiftLog}
        setOpenShiftLog={setOpenShiftLog}
        sortedMachineLogs={sortedMachineLogs}
        dateSelect={dateSelect}
        location={location}
      />

      <DateChangeModal
        alert={alert}
        setAlert={setAlert}
        machineLogSelectedRow={machineLogSelectedRow}
      />

      <div>
        <button
          className={`button-style group-button ${status ? "disabled" : ""}`}
          type="button"
          onClick={onClickSaveLog}
          disabled={status}
        >
          Save Log
        </button>

        <button
          className="button-style group-button"
          type="button"
          onClick={PrintShiftLog}
        >
          Print Shift Log
        </button>
      </div>
      <div
        className="mt-1"
        style={{
          maxWidth: "900px",
          overflowY: "scroll",
          overflowX: "scroll",
          height: "320px",
        }}
      >
        <Table striped className="table-data border">
          <thead className="tableHeaderBGColor table-cell-align">
            <tr>
              {/* <th style={{ paddingLeft: "10px", paddingBottom: "10px" }}>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th> */}

              <th onClick={() => requestSort("Machine")}>Machine</th>
              <th onClick={() => requestSort("Shift")}>Shift</th>
              <th className="textAllign" onClick={() => requestSort("Srl")}>Srl</th>
              <th className="textAllign" onClick={() => requestSort("FromTime")}>FromTime</th>
              <th className="textAllign" onClick={() => requestSort("ToTime")}> ToTime</th>
              <th className="textAllign" onClick={() => requestSort("MachineTime")}>MachineTime</th>
              <th onClick={() => requestSort("Program")}>Program</th>
              <th onClick={() => requestSort("Remarks")}>Remarks</th>
              <th style={{ whiteSpace: "nowrap" }} onClick={() => requestSort("Machine Operator")}>Machine Operator</th>
              <th onClick={() => requestSort("Operation")}>Operation</th>
            </tr>
          </thead>

          {Array.isArray(machineLogData) && machineLogData.length > 0 ? (
            <tbody className="tablebody table-space table-cell-align">
              {sortedData().map((item, key) => {
                const isSelected = selectedRows.some(
                  (row) => row.data === item
                );
                return (
                  <tr
                    key={key}
                    onClick={() => machinelogRowSelect(key)}
                    className={isSelected ? "selected-row" : ""}
                  >
                    {/* <td>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => machinelogRowSelect(key)}
                      />
                    </td> */}
                    <td>{item?.Machine}</td>
                    <td>{item?.Shift}</td>
                    <td className="textAllign">{key + 1}</td>
                    <td>
                      <div>
                        <input
                          className="table-cell-editor"
                          style={{ textAlign: "center", width: "150px" }}
                          onKeyDown={blockInvalidChar}
                          value={item?.FromTime}
                          onChange={(e) =>
                            handleTimeChange(key, "FromTime", e.target.value)
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <div>
                        <input
                          className="table-cell-editor"
                          style={{ textAlign: "center", width: "150px" }}
                          onKeyDown={blockInvalidChar}
                          value={item?.ToTime}
                          onChange={(e) =>
                            handleTimeChange(key, "ToTime", e.target.value)
                          }
                        />
                      </div>
                    </td>
                    <td className="textAllign">{item?.MachineTime}</td>
                    <td>{item?.Program}</td>
                    <td
                      onClick={() =>
                        onclicktoShowActionTaken(item?.actiontaken)
                      }
                    >
                      {item?.Remarks === "null" ? "" : item?.Remarks}
                    </td>
                    <td>{item?.Operator}</td>
                    <td>{item?.Operation}</td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={11} style={{ textAlign: "center" }}>
                  <b>No machine log data available</b>
                </td>
              </tr>
            </tbody>
          )}
        </Table>
      </div>

      <CustomModal
        show={modalShow1}
        handleClose={closeModal}
        data={modalData}
      />

      <CustomModal
        show={modalShow4}
        handleClose={closeModal1}
        data={modalData1}
      />

      <CustomModal
        show={showActionTaken}
        handleClose={() => setShowActionTaken(false)}
        data={{ title: "Action Taken", content: actionTaken }}
      />
    </div>
  );
}
