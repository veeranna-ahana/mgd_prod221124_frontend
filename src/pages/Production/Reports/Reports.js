import axios from "axios";
import React, { useState, useEffect } from "react";
import TreeView from "react-treeview";
import "react-treeview/react-treeview.css";
import { baseURL } from "../../../api/baseUrl";
import NabTab from "./Components/NavTab";
import DailyReportPrintModal from "./Pdfs/PrintDailyReports/DailyReportPrintModal";
import PrepareReportModal1 from "./Components/PrepareReportModal1";
import { useGlobalContext } from "../../../Context/Context";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import CustomModal from "../CustomModal";
import { useNavigate } from "react-router-dom";

export default function Reports() {
  const moment = require("moment");
  const today = moment();
  let Date = today.format("YYYY-MM-DD");
  //  console.log(Date);

  const {
    machineutilisationSummartdata,
    setMachineutilisationSummarydata,
    multiplerowSelect,
  } = useGlobalContext();
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedLabelIndex, setSelectedLabelIndex] = useState(-1);
  const [isPageRefreshed, setIsPageRefreshed] = useState(true);
  const [selectedMachineIndex, setSelectedMachineIndex] = useState(-1);
  const [modalShow, setModalShow] = useState(false);

  const selectedMachineFun = (item, index) => {
    setSelectedMachineIndex(index);
    setSelectedLabelIndex(-1);
  };
  // console.log(machineutilisationSummartdata);

  useEffect(() => {
    const isPageRefreshed = localStorage.getItem("isPageRefreshed") === "true";
    setIsPageRefreshed(isPageRefreshed);
    localStorage.setItem("isPageRefreshed", false);
  }, []);

  const machinelogRowSelect = (index) => {
    const selectedRowData = machineLogData[index];
    // Check if the selected row is already in the selectedRows array
    const isSelected = selectedRows.some((row) => row.data === selectedRowData);
    if (isSelected) {
      // If the selected row is already selected, remove it from the selectedRows array
      const updatedSelectedRows = selectedRows.filter(
        (row) => row.data !== selectedRowData
      );
      setSelectedRows(updatedSelectedRows);
    } else {
      // If the selected row is not already selected, add it to the selectedRows array
      setSelectedRows([...selectedRows, { data: selectedRowData }]);
    }
  };

  //Onchange
  const [status, setStatus] = useState("");
  const [productionTaskSummary, setProductionTaskSummary] = useState([]);
  const [machineLogData, setMachineLogData] = useState([]);
  //Select Date
  const [dateSelect, SetDateSelect] = useState(Date);

  const handleChangeSelectDate = (e) => {
    SetDateSelect(e.target.value);
    axios
      .post(baseURL + "/reports/machineLog", { Date: e.target.value })
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          let dateSplit1 = response.data[i].FromTime.split(" ");
          let date1 = dateSplit1[0].split("-");
          let year1 = date1[0];
          let month1 = date1[1];
          let day1 = date1[2];
          let time = dateSplit1[1].split(":");
          let Time = time[0] + ":" + time[1];
          let finalDay1 = day1 + "/" + month1 + "/" + year1 + " " + Time;
          response.data[i].FromTime = finalDay1;
        }
        for (let i = 0; i < response.data.length; i++) {
          let dateSplit2 = response.data[i].ToTime.split(" ");
          let date2 = dateSplit2[0].split("-");
          let year2 = date2[0];
          let month2 = date2[1];
          let day2 = date2[2];
          let time1 = dateSplit2[1].split(":");
          let Time1 = time1[0] + ":" + time1[1];
          let finalDay2 = day2 + "/" + month2 + "/" + year2 + " " + Time1;
          response.data[i].ToTime = finalDay2;
        }
        // console.log(response.data);
        setMachineLogData(response.data);
        setMachineName("");
        axios
          .post(baseURL + "/reports/getMachineUtilisationSummary", {
            Date: e.target.value,
          })
          .then((res) => {
            // console.log("require response mus", res.data.data);
            setMachineutilisationSummarydata(res.data.data);
          });
        axios
          .post(baseURL + "/reports/productTaskSummary", {
            Date: e.target.value,
          })
          .then((response) => {
            //  console.log("data", response.data.data);
            setProductionTaskSummary(response.data);
          });
      });
  };

  // //STATUS CODE
  useEffect(() => {
    axios
      .post(baseURL + "/reports/getStatusPrintReport", {
        Date: dateSelect,
      })
      .then((res) => {
        // console.log(res.data);
        setStatus(res.data);
      });
  }, [dateSelect]);

  const [prepareReport1, setPrepareReport] = useState("");
  const openPrepareReport1 = () => {
    let isError = false; // Variable to track if any error occurs
    let isFirstErrorShown = false; // Variable to track if the first error message is shown

    // Loop through each object in machineutilisationSummartdata array
    for (let obj of machineutilisationSummartdata) {
      if (obj.TotalOn + obj.TotalOff !== 1440) {
        // If the sum of TotalOn and TotalOff is not equal to 1440
        // and the error message for the first machine hasn't been shown yet
        if (!isFirstErrorShown) {
          // Set isFirstErrorShown to true to indicate that the first error message is shown
          isFirstErrorShown = true;

          // Display error message using Toastify for the first machine only
          toast.error(`Check machine ON/OFF Time for ${obj.Machine}`, {
            position: toast.POSITION.TOP_CENTER,
          });
        }

        // Set isError to true
        isError = true;
      }

      // If isError is true, break the loop to exit early
      if (isError) {
        break;
      }
    }

    // If isError is true, at least one object had a TotalOn + TotalOff sum not equal to 1440
    // Otherwise, all objects had a sum equal to 1440, so enable the "Print Daily Report" button
    if (!isError) {
      // Call function to enable the "Print Daily Report" button
      setPrepareReport(true);
    }
    console.log("isError is", isError);
  };

  const [selectedMachine, setSelectedMachine] = useState({});
  const [machineName, setMachineName] = useState("");
  //Machine OnClick
  const machineSelected = (Machine, item, index) => {
    // console.log("The Machine Selected is ", Machine);
    let list = { ...item, index: index };
    setSelectedMachine(list);
    setMachineName(list.MachineName);
    axios
      .post(baseURL + "/reports/machineOnclick", {
        Date: dateSelect,
        Machine: Machine,
      })
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          let dateSplit1 = response.data[i].FromTime.split(" ");
          let date1 = dateSplit1[0].split("-");
          let year1 = date1[0];
          let month1 = date1[1];
          let day1 = date1[2];
          let time = dateSplit1[1].split(":");
          let Time = time[0] + ":" + time[1];
          let finalDay1 = day1 + "/" + month1 + "/" + year1 + " " + Time;
          response.data[i].FromTime = finalDay1;
        }
        for (let i = 0; i < response.data.length; i++) {
          let dateSplit2 = response.data[i].ToTime.split(" ");
          let date2 = dateSplit2[0].split("-");
          let year2 = date2[0];
          let month2 = date2[1];
          let day2 = date2[2];
          let time1 = dateSplit2[1].split(":");
          let Time1 = time1[0] + ":" + time1[1];
          let finalDay2 = day2 + "/" + month2 + "/" + year2 + " " + Time1;
          response.data[i].ToTime = finalDay2;
        }
        // console.log("require response mus", response.data);
        setMachineLogData(response.data);
      });
  };
  // console.log("machineName in report main page",machineName);

  //OnClick Shift
  const [selectedShift, setSelectedShft] = useState({});
  const ShiftSelected = (Shift, Machine, item, index) => {
    let list = { ...item, index: index };
    setSelectedShft(list);
    axios
      .post(baseURL + "/reports/shiftOnClick", {
        Date: dateSelect,
        Shift: Shift,
        Machine: Machine,
      })
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          let dateSplit1 = response.data[i].FromTime.split(" ");
          let date1 = dateSplit1[0].split("-");
          let year1 = date1[0];
          let month1 = date1[1];
          let day1 = date1[2];
          let time = dateSplit1[1].split(":");
          let Time = time[0] + ":" + time[1];
          let finalDay1 = day1 + "/" + month1 + "/" + year1 + " " + Time;
          response.data[i].FromTime = finalDay1;
        }
        for (let i = 0; i < response.data.length; i++) {
          let dateSplit2 = response.data[i].ToTime.split(" ");
          let date2 = dateSplit2[0].split("-");
          let year2 = date2[0];
          let month2 = date2[1];
          let day2 = date2[2];
          let time1 = dateSplit2[1].split(":");
          let Time1 = time1[0] + ":" + time1[1];
          let finalDay2 = day2 + "/" + month2 + "/" + year2 + " " + Time1;
          response.data[i].ToTime = finalDay2;
        }
        // console.log("require response mus", response.data);
        setMachineLogData(response.data);
      });
  };

  useEffect(() => {
    axios
      .post(baseURL + "/reports/machineLog", { Date: dateSelect })
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          let dateSplit1 = response.data[i].FromTime.split(" ");
          let date1 = dateSplit1[0].split("-");
          let year1 = date1[0];
          let month1 = date1[1];
          let day1 = date1[2];
          let time = dateSplit1[1].split(":");
          let Time = time[0] + ":" + time[1];
          let finalDay1 = day1 + "/" + month1 + "/" + year1 + " " + Time;
          response.data[i].FromTime = finalDay1;
        }
        for (let i = 0; i < response.data.length; i++) {
          let dateSplit2 = response.data[i].ToTime.split(" ");
          let date2 = dateSplit2[0].split("-");
          let year2 = date2[0];
          let month2 = date2[1];
          let day2 = date2[2];
          let time1 = dateSplit2[1].split(":");
          let Time1 = time1[0] + ":" + time1[1];
          let finalDay2 = day2 + "/" + month2 + "/" + year2 + " " + Time1;
          response.data[i].ToTime = finalDay2;
        }
        // console.log(response.data);
        setMachineLogData(response.data);
        setSelectedMachineIndex(-1);
        setIsPageRefreshed(false);
        localStorage.setItem("isPageRefreshed", false);
        axios
          .post(baseURL + "/reports/getMachineUtilisationSummary", {
            Date: dateSelect,
          })
          .then((res) => {
            // console.log("require response mus", res.data.data);
            setMachineutilisationSummarydata(res.data.data);
          });
        axios
          .post(baseURL + "/reports/productTaskSummary", { Date: dateSelect })
          .then((response) => {
            //  console.log("data", response.data.data);
            setProductionTaskSummary(response.data);
          });
      });
  }, []);

  //Onclick MainTreeView
  const treeViewHeader = (index) => {
    axios
      .post(baseURL + "/reports/machineLog", { Date: dateSelect })
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          let dateSplit1 = response.data[i].FromTime.split(" ");
          let date1 = dateSplit1[0].split("-");
          let year1 = date1[0];
          let month1 = date1[1];
          let day1 = date1[2];
          let time = dateSplit1[1].split(":");
          let Time = time[0] + ":" + time[1];
          let finalDay1 = day1 + "/" + month1 + "/" + year1 + " " + Time;
          response.data[i].FromTime = finalDay1;
        }
        for (let i = 0; i < response.data.length; i++) {
          let dateSplit2 = response.data[i].ToTime.split(" ");
          let date2 = dateSplit2[0].split("-");
          let year2 = date2[0];
          let month2 = date2[1];
          let day2 = date2[2];
          let time1 = dateSplit2[1].split(":");
          let Time1 = time1[0] + ":" + time1[1];
          let finalDay2 = day2 + "/" + month2 + "/" + year2 + " " + Time1;
          response.data[i].ToTime = finalDay2;
        }
        // console.log(response.data);
        setMachineLogData(response.data);
        setSelectedLabelIndex(index);
        setSelectedMachineIndex(-1);
        setIsPageRefreshed(false);
        localStorage.setItem("isPageRefreshed", false);
        setMachineName("");
        setSelectedShft({});
      });
  };

  let [lazerUser, setLazerUser] = useState(
    JSON.parse(localStorage.getItem("LazerUser"))
  );

  // console.log(multiplerowSelect,selectedRows)
  const [reportsTreeViewData, setReportsTreeView] = useState([]);
  useEffect(() => {
    axios
      .post(baseURL + "/reports/reportsTreeView", { Date: dateSelect || Date })
      .then((response) => {
        // console.log(" RESPONSE ", response.data);
        setReportsTreeView(response.data);
      });
  }, [dateSelect]);
  // console.log(reportsTreeViewData);

  const dataSource = [
    {
      type: "Machines",
      collapsed: true,
      serverData: reportsTreeViewData.map((data, index) => ({
        ...data,
        labelIndex: index,
      })),
    },
  ];

  //ONCLICK PRINTDAILY REPORT
  const [opendailyReport, setOpendailyReport] = useState("");
  const [pDFData, setPDFData] = useState([]);
  const openPrintdailyPdf = () => {
    if (status == false) {
      // toast.error("Prepare Report Before Printing", {
      //   position: toast.POSITION.TOP_CENTER,
      // });
      setModalShow(true);
    } else {
      setOpendailyReport(true);
      //TRY PDF
      axios
        .post(baseURL + "/reports/printDailyReport", {
          Date: dateSelect,
        })
        .then((res) => {
          // console.log(res.data);
          setPDFData(res.data);
        });
    }
  };

  //location
  const[location,setlocation]=useState([]);
  useEffect(()=>{
    axios
    .post(baseURL + "/location/getlocation", {})
    .then((response) => {
      setlocation(response.data);
    });
  },[])

  // console.log("location is",location[0]?.UnitName);

  const closeModal = () => {
    setModalShow(false);
  };
  const modalData = {
    title: "Reports",
    content: "Prepare Report Before Printing",
  };

  ////INPUT VALUE
  const [preparedby, setPreparedby] = useState(lazerUser.data[0].Name);
  const InputChange = (e) => {
    setPreparedby(e.target.value);
  };

  const [userRole, setUserRole] = useState(lazerUser.data[0].Role);
  const roleValue = userRole;
  // console.log(roleValue);

  //Close Button
  const navigate = useNavigate();
  const onClickClose = () => {
    navigate("/Production");
  };

  return (
    <div>
      <DailyReportPrintModal
        opendailyReport={opendailyReport}
        setOpendailyReport={setOpendailyReport}
        pdfData={pDFData}
        dateSelect={dateSelect}
        preparedby={preparedby}
        roleValue={roleValue}
        location={location}
      />

      <PrepareReportModal1
        prepareReport1={prepareReport1}
        setPrepareReport={setPrepareReport}
        dateSelect={dateSelect}
        setStatus={setStatus}
        preparedby={preparedby}
      />

      <div className="row">
        <h4 className="title">Daily Production Report</h4>
      </div>

      <div className="row">
        <div className="col-md-3">
          <input
            className="input-field mt-2"
            name="InstallDate"
            onChange={handleChangeSelectDate}
            type="date"
            required
            defaultValue={Date}
          />
        </div>

        <div className="col-md-4">
          <button
            className="button-style group-button"
            type="button"
            onClick={openPrepareReport1}
          >
            Prepare Report
          </button>

          <button
            className="button-style group-button"
            type="button"
            onClick={openPrintdailyPdf}
            // disabled={status===false ? true : false}
          >
            Print Daily Report
          </button>
        </div>

        <div className="d-flex col-md-4" style={{ gap: "10px" }}>
          <label className="form-label" style={{ whiteSpace: "nowrap" }}>
            Prepared By
          </label>
          <input
            className="in-field"
            name="preparedby"
            onChange={InputChange}
            value={preparedby}
          />
        </div>
        <div className="col-md-1">
          <button
            className="button-style group-button ms-3"
            type="button"
            onClick={onClickClose}
          >
            Close
          </button>
        </div>
      </div>

      <div className="row mt-1">
        <div
          className="col-md-2"
          style={{
            height: "390px",
            overflowY: "scroll",
            fontSize: "14px",
          }}
        >
          {dataSource.map((node, i) => {
            const type = node.type;
            const label = (
              <span
                style={{ fontSize: "14px" }}
                onClick={() => treeViewHeader(node.labelIndex)}
                className={`node ${
                  selectedLabelIndex === node.labelIndex
                    ? "selcted-row-clr"
                    : ""
                }`}
              >
                {type}
              </span>
            );
            return (
              <TreeView
                key={type + "|" + i}
                nodeLabel={label}
                defaultCollapsed={false}
              >
                {node.serverData.map((data, key) => {
                  const label2 = (
                    <span
                      style={{ fontSize: "12px" }}
                      onClick={() => {
                        selectedMachineFun(data, key);
                        machineSelected(data.MachineName, data, key);
                      }}
                      className={`node ${
                        key === selectedMachineIndex ? "selcted-row-clr" : ""
                      }`}
                    >
                      {data.MachineName}
                    </span>
                  );

                  return (
                    <TreeView
                      nodeLabel={label2}
                      key={data.name}
                      defaultCollapsed={true}
                    >
                      {data.Shifts.map((value, key) => {
                        const label3 = (
                          <span
                            style={{ fontSize: "13px" }}
                            onClick={() => {
                              ShiftSelected(
                                value.Shift,
                                data.MachineName,
                                value,
                                key
                              );
                            }}
                            className={
                              key === selectedShift?.index
                                ? "selcted-row-clr"
                                : ""
                            }
                          >
                            {value.Shift} - {value.time}{" "}
                          </span>
                        );
                        return (
                          <>
                            <TreeView
                              nodeLabel={label3}
                              key={data.name}
                              defaultCollapsed={true}
                            >
                              {value.task.map((data) => {
                                const label4 = (
                                  <span
                                    style={{ fontSize: "12px" }}
                                    className="node"
                                  >
                                    {data.action} - {data.time}
                                  </span>
                                );
                                return (
                                  <>
                                    <TreeView
                                      nodeLabel={label4}
                                      key={data.name}
                                      defaultCollapsed={true}
                                    >
                                      {data.operations.map((value) => {
                                        const label5 = (
                                          <span
                                            style={{ fontSize: "11px" }}
                                            className="node"
                                          >
                                            {value.Operation} - {value.time}
                                          </span>
                                        );
                                        return (
                                          <>
                                            <TreeView
                                              nodeLabel={label5}
                                              key={data.name}
                                              defaultCollapsed={true}
                                            ></TreeView>
                                          </>
                                        );
                                      })}
                                    </TreeView>
                                  </>
                                );
                              })}
                            </TreeView>
                          </>
                        );
                      })}
                    </TreeView>
                  );
                })}
              </TreeView>
            );
          })}
        </div>
        <div className="col-md-10">
          <NabTab
            machineutilisationSummartdata={machineutilisationSummartdata}
            productionTaskSummary={productionTaskSummary}
            machineLogData={machineLogData}
            dateSelect={dateSelect}
            setMachineLogData={setMachineLogData}
            setMachineutilisationSummarydata={setMachineutilisationSummarydata}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            machinelogRowSelect={machinelogRowSelect}
            status={status}
            machineName={machineName}
            location={location}
            selectedShift={selectedShift}
          />
          <CustomModal
            show={modalShow}
            handleClose={closeModal}
            data={modalData}
          />
        </div>
      </div>
    </div>
  );
}
