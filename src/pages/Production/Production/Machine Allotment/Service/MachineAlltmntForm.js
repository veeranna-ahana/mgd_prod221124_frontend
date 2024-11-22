import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import NavTab from "./NavTab";
import TreeView from "react-treeview";
import ChangeMachineModal from "./ChangeMachineModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../../../../../api/baseUrl";
import CustomModal from "../../../CustomModal";
import { useNavigate } from "react-router-dom";

export default function MachineAlltmntForm() {
  const [machineProcessData, setMachineProcessData] = useState([]);
  const [machineList, setMachineList] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState("");
  const [currentSelectedMachine, setCurrentSelectedMachine] = useState("");
  const [selectedLabelIndex, setSelectedLabelIndex] = useState(-1);
  const [selectedMachineIndex, setSelectedMachineIndex] = useState(-1);
  const [isPageRefreshed, setIsPageRefreshed] = useState(true);
  const [modalShow3, setModalShow3] = useState(false);

  useEffect(() => {
    const isPageRefreshed = localStorage.getItem("isPageRefreshed") === "true";
    setIsPageRefreshed(isPageRefreshed);
    localStorage.setItem("isPageRefreshed", false);
  }, []);

  const [machineSelect, setMachineSelect] = useState({});
  const selectedMachineFun = (item, index) => {
    setSelectedMachineIndex(index);
    setSelectedLabelIndex(-1);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  //open Change Machine Popup
  const [openModal, setOpenModal] = useState("");
  const openChangeMachineModal = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    // setSelectedRows([])
  };

  const [selectNcProgram, setSelectProgram] = useState({});
  // const selectRowNcProgram=(item,index)=>{
  //   let list={...item,index:index}
  //   setSelectProgram(list);
  // }
  // console.log(selectNcProgram);

  const [ncProgramsTableData, setNcProgramsTableData] = useState([]);
  const [selectedMachineTreeView, setSelectedMachineTreeView] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  const onClickMachine = (Machine, key) => {
    setSelectedRows([]);
    axios
      .post(baseURL + "/machineAllotmentService/getNCprogramTabTableData", {
        MachineName: Machine,
      })
      .then((response) => {
        //  console.log("data", response.data);
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].PStatus === "Completed") {
            response.data[i].rowColor = "#90EE90";
          } else if (response.data[i].PStatus === "Cutting") {
            response.data[i].rowColor = "#E0FFFF";
          } else if (response.data[i].PStatus === "Mtrl Issue") {
            response.data[i].rowColor = "#87CEFA";
          } else if (response.data[i].PStatus === "Created") {
            response.data[i].rowColor = "#FFFFE0";
          }
        }
        setNcProgramsTableData(response.data);
        for (let i = 0; i < response.data.length; i++) {
          response.data[i].isChecked = false;
        }
      });
    setSelectedRows([]);
    setSelectedMachineTreeView(Machine);
    setCurrentSelectedMachine(Machine);

    setMachineList([]);
  };

  //SELECTED ROWS IS THE STATE TO CHANGE THE MACHINES
  const handleCheckboxChange = (item, key) => {
    const constncProgramsTableData = ncProgramsTableData;
    if (ncProgramsTableData[key].isChecked === true) {
      constncProgramsTableData[key].isChecked = false;
    } else {
      constncProgramsTableData[key].isChecked = true;
    }
    setNcProgramsTableData(constncProgramsTableData);
    if (selectedRows.length === 0) {
      axios
        .post(
          baseURL +
            "/machineAllotmentService/machineAllotmentScheduleTableFormMachinesService",
          item
        )
        .then((response) => {
          setMachineList(response.data);
        });
      setSelectedRows([item]);
    } else {
      if (item.Operation === selectedRows[0].Operation) {
        if (selectedRows.includes(item)) {
          setSelectedRows(selectedRows.filter((r) => r !== item));
        } else {
          setSelectedRows([...selectedRows, item]);
        }
      } else {
        //   toast.error('Please select a program with the same operation',{
        //     position: toast.POSITION.TOP_CENTER
        // })
        setModalShow3(true);
        const constNCProgramsTableData = ncProgramsTableData;
        constNCProgramsTableData[key].isChecked = false;
        setNcProgramsTableData(constNCProgramsTableData);
      }
    }
  };

  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const treeViewData = () => {
    setIsLoading(true); // Set loading state to true before fetching data
    axios
      .get(baseURL + "/machineAllotmentService/MachineswithLoadService")
      .then((response) => {
        console.log(response.data);
        setMachineProcessData(response.data);
        setIsLoading(false); // Set loading state to false after data is fetched
      });
  };
  useEffect(() => {
    treeViewData();
  }, []);

  const dataSource = [
    {
      type: "Machines",
      collapsed: false,
      serverData: machineProcessData.map((data, index) => ({
        ...data,
        labelIndex: index,
      })),
    },
  ];

  // \\\\\\\\\\\\\\\\\/////////////////////

  const [open, setOpen] = useState("");

  const showPopup = () => {
    setOpen(true);
  };

  const clickChangeMachine = async () => {
    axios
      .post(baseURL + "/machineAllotment/changeMachineHeaderButton", {
        programs: selectedRows,
        newMachine: selectedMachine,
      })
      .then((response) => {
        handleClose();
      });
    axios
      .post(baseURL + "/machineAllotment/afterChangeMachine", {
        MachineName: currentSelectedMachine?.MachineName,
      })
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].PStatus === "Completed") {
            response.data[i].rowColor = "#90EE90";
          } else if (response.data[i].PStatus === "Cutting") {
            response.data[i].rowColor = "#E0FFFF";
          } else if (response.data[i].PStatus === "Mtrl Issue") {
            response.data[i].rowColor = "#87CEFA";
          } else if (response.data[i].PStatus === "Created") {
            response.data[i].rowColor = "#FFFFE0";
          }
        }
        setNcProgramsTableData(response.data);
        for (let i = 0; i < response.data.length; i++) {
          response.data[i].isChecked = false;
        }
      });
    setSelectedRows([]);
    setMachineList([]);
  };

  useMemo(() => {}, [machineProcessData[0]]);

  const onClickMachineLabel = (index) => {
    axios
      .post(baseURL + "/machineAllotment/getNCprogramTabTableDatauseEffect", {
        MachineName: "Laser 6",
      })
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].PStatus === "Completed") {
            response.data[i].rowColor = "#90EE90";
          } else if (response.data[i].PStatus === "Cutting") {
            response.data[i].rowColor = "#E0FFFF";
          } else if (response.data[i].PStatus === "Mtrl Issue") {
            response.data[i].rowColor = "#87CEFA";
          } else if (response.data[i].PStatus === "Created") {
            response.data[i].rowColor = "#FFFFE0";
          }
        }
        setNcProgramsTableData(response.data);
      });
    setSelectedLabelIndex(index);
    setSelectedMachineIndex(-1);
    setIsPageRefreshed(false);
    localStorage.setItem("isPageRefreshed", false);
  };

  useEffect(() => {
    onClickMachineLabel();
  }, []);

  const onMachineChange = (e) => {
    setSelectedMachine(e.target.value);
  };
  const closeModal = () => {
    setModalShow3(false);
  };
  const modalData = {
    title: "Machine Allotment",
    content: "Please select a program with the same operation",
  };

  //Close Button
  const navigate = useNavigate();
  const onClickClose = () => {
    navigate("/Production");
  };

  return (
    <>
      <h4 className="title">Machine Allotment Form</h4>

      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-3">
          <select className="ip-select" onChange={onMachineChange}>
            <option>Select Machine</option>
            {machineList.length === 0 ? (
              <option>No machine to select</option>
            ) : (
              machineList.map((value, key) => (
                <option value={value.refName} key={key}>
                  {value.refName}
                </option>
              ))
            )}
          </select>
        </div>
        <div className="col-md-4">
          <button className="button-style group-button">Save</button>
          <button
            className="button-style group-button"
            onClick={openChangeMachineModal}
          >
            Change Machine
          </button>

          <button
            className="button-style group-button"
            type="button"
            onClick={onClickClose}
          >
            Close
          </button>
        </div>
      </div>

      <div className="d-flex" style={{ gap: "10px" }}>
        <div
          className="col-md-2 mt-1"
          style={{ overflow: "scroll", height: "410px" }}
        >
          {isLoading ? (
            <div>
              <b>Loading...</b>
            </div>
          ) : (
            dataSource.map((node, i) => {
              const type = node.type;
              const label = (
                <span
                  style={{ fontSize: "14px" }}
                  className={`node ${
                    selectedLabelIndex === node.labelIndex
                      ? "selcted-row-clr"
                      : ""
                  }`}
                  onClick={() => onClickMachineLabel(node.labelIndex)}
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
                        style={{
                          backgroundColor: "#C0C0C0",
                          fontSize: "12px",
                        }}
                        onClick={() => {
                          selectedMachineFun(data, key);
                          onClickMachine(data, key);
                        }}
                        className={`node ${
                          key === selectedMachineIndex ? "selcted-row-clr" : ""
                        }`}
                      >
                        {data.MachineName}&nbsp;{data.formattedLoad}
                      </span>
                    );

                    return (
                      <TreeView
                        nodeLabel={label2}
                        key={data.name}
                        defaultCollapsed={false}
                      >
                        <ul>
                          {isLoading ? (
                            <div>Loading...</div>
                          ) : (
                            data.process.map((value, index) => (
                              <li
                                className="node"
                                style={{
                                  marginLeft: "-10px",
                                  fontSize: "11px",
                                }}
                                key={index}
                              >
                                {value.RefProcess} &nbsp; {value.formattedLoad}
                              </li>
                            ))
                          )}
                        </ul>
                      </TreeView>
                    );
                  })}
                </TreeView>
              );
            })
          )}
        </div>
        <div className="col-md-10 mt-1">
          <NavTab
            machineSelect={machineSelect}
            ncProgramsTableData={ncProgramsTableData}
            selectNcProgram={selectNcProgram}
            setNcProgramsTableData={setNcProgramsTableData}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
      </div>

      {/* <div className="row">
        <div
          className="col-md-3 mt-1"
          style={{
            overflowY: "scroll",
            overflowX: "scroll",
            fontSize: "12px",
            marginLeft: "-20px",
            height: "430px",
          }}
        >
          {isLoading ? (
            <div>
              <b>Loading...</b>
            </div>
          ) : (
            dataSource.map((node, i) => {
              const type = node.type;
              const label = (
                <span
                  style={{ fontSize: "16px" }}
                  className={`node ${
                    selectedLabelIndex === node.labelIndex
                      ? "selcted-row-clr"
                      : ""
                  }`}
                  onClick={() => onClickMachineLabel(node.labelIndex)}
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
                        style={{
                          backgroundColor: "#C0C0C0",
                          fontSize: "14px",
                        }}
                        onClick={() => {
                          selectedMachineFun(data, key);
                          onClickMachine(data, key);
                        }}
                        className={`node ${
                          key === selectedMachineIndex ? "selcted-row-clr" : ""
                        }`}
                      >
                        {data.MachineName}&nbsp;{data.formattedLoad}
                      </span>
                    );

                    return (
                      <TreeView
                        nodeLabel={label2}
                        key={data.name}
                        defaultCollapsed={false}
                      >
                        <ul>
                          {isLoading ? (
                            <div>Loading...</div>
                          ) : (
                            data.process.map((value, index) => (
                              <li
                                className="node"
                                style={{
                                  marginLeft: "-10px",
                                  fontSize: "11px",
                                }}
                                key={index}
                              >
                                {value.RefProcess} &nbsp; {value.formattedLoad}
                              </li>
                            ))
                          )}
                        </ul>
                      </TreeView>
                    );
                  })}
                </TreeView>
              );
            })
          )}
        </div>
        <div className="col-md-9 mt-1">
          <NavTab
            machineSelect={machineSelect}
            ncProgramsTableData={ncProgramsTableData}
            selectNcProgram={selectNcProgram}
            setNcProgramsTableData={setNcProgramsTableData}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
      </div> */}

      <ChangeMachineModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectedRows={selectedRows}
        selectedMachine={selectedMachine}
        clickChangeMachine={clickChangeMachine}
        handleClose={handleClose}
      />
      <CustomModal
        show={modalShow3}
        handleClose={closeModal}
        data={modalData}
      />
    </>
  );
}
