import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import { baseURL } from "../../../../../../api/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function AllotmentTables() {
  const blockInvalidCharReg = (e) =>
    [
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
      "',",
      "}",
      "{",
      "[",
      "]",
      ".",
      ",",
      "/",
      "?",
      "e",
      "E",
    ].includes(e.key) && e.preventDefault();

  const [allotmentTable, setAllotmentTable] = useState([]);
  const [searchallotment, setSearchallotment] = useState([]);
  useEffect(() => {
    axios
      .get(baseURL + "/machineAllotmentService/machineAllotmentServiceSchedule")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          let dateSplit = response.data[i].Delivery_Date.split("-");
          let year = dateSplit[0];
          let month = dateSplit[1];
          let day = dateSplit[2];

          let newDay = day.split(" ");
          let onlyDay = newDay[0];

          response.data[i].Delivery_Date = onlyDay + "-" + month + "-" + year;
        }

        setAllotmentTable(response.data);
        setSearchallotment(response.data);
      });
  }, []);

  //ALLOTMENT TABLE
  const [scheduleListData, setScheduleList] = useState([]);
  const [rowSelect, setRowSelect] = useState({});
  const RowSelectAllotmentTable = (item, index) => {
    let list = { ...item, index: index };
    setRowSelect(list);
  };
  const getScheduleListdata = () => {
    console.log("getScheduleListData is called");
    axios
      .post(
        baseURL + "/machineAllotment/machineAllotmentScheduleTableForm",
        rowSelect
      )
      .then((response) => {
        setScheduleList(response.data);
      });
  };
  useEffect(() => {
    getScheduleListdata();
  }, [rowSelect]);

  useMemo(() => {
    setRowSelect({ ...allotmentTable[0], index: 0 });
  }, [allotmentTable[0]]);

  //SCHEDULELIST TABLE
  const [tableRowSelect, setTableRowSelect] = useState({});
  const [rowselect, setRowselect] = useState({});
  const [machineList, setMachineList] = useState([]);
  const RowSelect = (item, index) => {
    let list = { ...item, index: index };
    setTableRowSelect(item);
    setRowselect(list);
    // setNewSelectedMachine("");
  };
  const getMachineList = () => {
    axios
      .post(
        baseURL +
          "/machineAllotmentService/machineAllotmentScheduleTableFormMachinesService",
        tableRowSelect
      )
      .then((response) => {
        console.log("required machine List", response.data);
        setMachineList(response.data);
      });
  };
  useEffect(() => {
    getMachineList();
  }, [tableRowSelect]);

  useMemo(() => {
    setTableRowSelect({ ...scheduleListData[0], index: 0 });
  }, [scheduleListData[0]]);

  useMemo(() => {
    setRowselect({ ...scheduleListData[0], index: 0 });
  }, [scheduleListData[0]]);

  // //Search
  // const searchText = (e) => {
  //   let number = e.target.value;
  //   let filteredData = allotmentTable.filter((data) => {
  //     return data.OrdSchNo.startsWith(number);
  //   });
  //   if (filteredData.length > 0) {
  //     setAllotmentTable(filteredData);
  //   }
  //   if (e.target.value.length === 0) {
  //     setAllotmentTable(searchallotment);
  //   }
  // };

  const [newSelectedMchine, setNewSelectedMachine] = useState(
    tableRowSelect?.Machine !== "" ? tableRowSelect?.Machine : ""
  );
  const onChangeMachine = (e) => {
    setNewSelectedMachine(e.target.value);
  };

  useEffect(() => {
    setNewSelectedMachine(tableRowSelect.Machine);
  }, [tableRowSelect.Machine]);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onClickChangeMachine = async (e) => {
    e.preventDefault();
    if (newSelectedMchine == "") {
      toast.error("Machine Not Selected", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      axios
        .post(baseURL + "/machineAllotment/changeMachineInForm", {
          ...tableRowSelect,
          newMachine: newSelectedMchine,
        })
        .then((response) => {
          toast.success("Machine Changed", {
            position: toast.POSITION.TOP_CENTER,
          });
        });
      await delay(200);
      console.log("Selected Row from right table is ", tableRowSelect);
      axios
        .post(baseURL + "/machineAllotment/formRefresh", tableRowSelect)
        .then((response) => {
          console.log("OnClick Post response change machine", response.data[0]);
          setTableRowSelect(response.data[0]);
          getScheduleListdata();
        });
    }
  };

  const onClickReleaseForProgramming = async (e) => {
    e.preventDefault();
    axios
      .post(baseURL + "/machineAllotment/releaseForProgramming", tableRowSelect)
      .then((response) => {});
    await delay(200);
    axios
      .post(baseURL + "/machineAllotment/formRefresh", tableRowSelect)
      .then((response) => {
        setTableRowSelect(response.data[0]);
      });
  };

  const isMachineListEmpty = machineList.length === 0;

  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    // ... Other existing code ...
    // Assuming you have some logic to set the button status based on tableRowSelect.TStatus
    // For example, if the TStatus is "completed", we set the buttonDisabled state to true
    setButtonDisabled(tableRowSelect.TStatus === "Completed");
  }, [tableRowSelect.TStatus]);

  //TRY SEARCH
  const [searchInput, setSearchInput] = useState("");
  const searchText1 = (e) => {
    const searchText = e.target.value;
    const sanitizedSearchText = searchText.replace(/[^0-9 ]/g, ""); // Remove non-numeric characters except spaces
    setSearchInput(sanitizedSearchText);
    // Apply the filter on allotmentTable based on the search input value
    const filteredData = searchallotment.filter((data) =>
      data.OrdSchNo.includes(sanitizedSearchText)
    );
    setAllotmentTable(filteredData);
  };

  //  useEffect(() => {
  //   if (scheduleListData.length > 0 && !rowselect.TaskNo) {
  //     RowSelect(scheduleListData[0], 0); // Select the first row
  //   }
  // }, [scheduleListData, rowselect]);

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
    const dataCopy = [...allotmentTable];
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
  const [sortConfig1, setSortConfig1] = useState({
    key: null,
    direction: null,
  });
  const requestSort1 = (key) => {
    let direction = "asc";
    if (sortConfig1.key === key && sortConfig1.direction === "asc") {
      direction = "desc";
    }
    setSortConfig1({ key, direction });
  };

  const sortedData1 = () => {
    const dataCopy = [...scheduleListData];
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

  return (
    <>
      <div className="col-md-12">
        <div className="d-flex col-md-3 ms-3" style={{ gap: "10px" }}>
          <label className="form-label" style={{ whiteSpace: "nowrap" }}>
            Find Schedule
          </label>
          <input
            className="input-field"
            onKeyDown={blockInvalidCharReg}
            type="text" // Change the input type to "text"
            value={searchInput} // Set the value to the state variable
            onChange={searchText1} // Call the searchText function on change
          />
        </div>

        <div className="row mt-2">
          <div
            className="col-md-6"
            style={{
              overflowY: "scroll",
              overflowX: "scroll",
              height: "344px",
            }}
          >
            <Table striped className="table-data border table-space">
              <thead className="tableHeaderBGColor">
              <tr>
                  <th onClick={() => requestSort("OrdSchNo")}>
                    Schedule No
                  </th>
                  <th onClick={() => requestSort("Delivery_Date")}>
                    Delivery Date
                  </th>
                  <th onClick={() => requestSort("Cust_name")}> Customer</th>
                  <th onClick={() => requestSort("Schedule_Status")}>Status</th>
                  <th onClick={() => requestSort("Special_Instructions")}>
                    Special_instruction
                  </th>
                </tr>
              </thead>

              <tbody className="tablebody table-space">
                {sortedData().map((item, key) => {
                  return (
                    <>
                      <tr
                        onClick={() => {
                          RowSelectAllotmentTable(item, key);
                        }}
                        className={
                          key === rowSelect?.index ? "selcted-row-clr" : ""
                        }
                      >
                        <td>{item.OrdSchNo}</td>
                        <td>{item.Delivery_Date}</td>
                        <td>{item.Cust_name}</td>
                        <td>{item.Schedule_Status}</td>
                        <td>{item.Special_Instructions}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
          </div>

          {/* Form */}
          <div className="col-md-6">
            <form className="form">
              <div className="ip-box form-bg">
                <div className="row">
                  <div className="d-flex col-md-12" style={{ gap: "10px" }}>
                    <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Customer
                    </label>
                    <input
                      className="input-field"
                      value={tableRowSelect.Cust_name}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="d-flex col-md-6" style={{ gap: "20px" }}>
                    <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Task No
                    </label>
                    <input
                      className="input-field"
                      value={tableRowSelect.TaskNo}
                    />
                  </div>
                  <div className="d-flex col-md-6" style={{ gap: "22px" }}>
                    <label className="form-label">Status</label>
                    <input
                      className="input-field"
                      value={tableRowSelect.TStatus}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="d-flex col-md-12" style={{ gap: "17px" }}>
                    <label className="form-label">Material</label>
                    <input
                      className="input-field"
                      value={tableRowSelect.Mtrl_Code}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="d-flex col-md-5" style={{ gap: "22px" }}>
                    <label className="form-label">Process</label>
                    <input
                      className="input-field"
                      value={tableRowSelect.MProcess}
                    />
                  </div>
                  <div className="d-flex col-md-7" style={{ gap: "10px" }}>
                    <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Select machine
                    </label>
                    {isMachineListEmpty ? (
                      // Render a disabled input or label showing the selected machine
                      <input
                        type="text"
                        className="ip-select"
                        value={tableRowSelect.Machine}
                        disabled
                      />
                    ) : (
                      // Render the regular select element with options
                      <select
                        className="ip-select"
                        onChange={onChangeMachine}
                        value={
                          newSelectedMchine !== ""
                            ? newSelectedMchine
                            : tableRowSelect?.Machine
                        }
                      >
                        <option value="">{newSelectedMchine}</option>
                        {machineList.map((value, key) => (
                          <option key={key} value={value.refName}>
                            {value.refName}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="d-flex col-md-6" style={{ gap: "22px" }}>
                    <label className="form-label">Priority</label>
                    <input
                      className="input-field"
                      value={tableRowSelect.Priority}
                    />
                  </div>

                  <div className="d-flex col-md-6" style={{ gap: "10px" }}>
                    <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Machine
                    </label>
                    <input
                      className="input-field"
                      value={tableRowSelect.Machine}
                    />
                  </div>
                </div>

                <div className="row mb-1">
                  <div className="col-md-6">
                    <button
                      onClick={onClickChangeMachine}
                      className={`button-style group-button ${
                        buttonDisabled ? "disabled" : ""
                      }`}
                      disabled={buttonDisabled}
                    >
                      Change Machine
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button
                      onClick={onClickReleaseForProgramming}
                      className="button-style group-button "
                    >
                      Release For Programming
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* //TABLE3 */}

            <div
              className="mt-1"
              style={{
                height: "155px",
                overflowY: "scroll",
                overflowX: "scroll",
              }}
            >
              <Table striped className="table-data border table-space">
                <thead className="tableHeaderBGColor">
                <tr>
                    <th onClick={() => requestSort1("TaskNo")}>Task No</th>
                    <th onClick={() => requestSort1("Machine")}>Machine</th>
                    <th onClick={() => requestSort1("Operation")}>Operation</th>
                    <th onClick={() => requestSort1("Mtrl_Code")}>Mtrl_code</th>
                    <th onClick={() => requestSort1("Priority")}>Priority</th>
                    <th
                      className="textAllign"
                      style={{ whiteSpace: "nowrap" }}
                      onClick={() => requestSort1("EstimatedTime")}
                    >
                      Estimated time
                    </th>
                  </tr>
                </thead>

                <tbody className="tablebody table-space">
                  {sortedData1().map((value, key) => {
                    return (
                      <>
                        <tr
                          onClick={() => {
                            RowSelect(value, key);
                          }}
                          className={
                            key === rowselect?.index ? "selcted-row-clr" : ""
                          }
                        >
                          <td>{value.TaskNo}</td>
                          <td>{value.Machine}</td>
                          <td>{value.Operation}</td>
                          <td>{value.Mtrl_Code}</td>
                          <td>{value.Priority}</td>
                          <td className="textAllign">{value.EstimatedTime}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
