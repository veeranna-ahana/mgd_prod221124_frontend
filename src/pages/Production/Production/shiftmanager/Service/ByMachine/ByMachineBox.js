import axios from "axios";
import React, { useState, useEffect } from "react";
import TreeView from "react-treeview";
import "react-treeview/react-treeview.css";
// import ProgramCompletedData from "./ProgramCompletedData";
import Iframe from "./Iframe";
import { baseURL } from "../../../../../../api/baseUrl";

export default function ByMachineBox() {
  const [machineProcessData, setMachineProcessData] = useState([]);
  const [machineProgramesCompleted, setMachineProgramesCompleted] = useState(
    []
  );
  const [machineProgramesProcessing, setmachineProgramesProcessing] = useState(
    []
  );
  const [selectedMachine, setSelectedMachine] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLabelIndex, setSelectedLabelIndex] = useState(-1);
  const [selectedMachineIndex, setSelectedMachineIndex] = useState(-1);
  const [isPageRefreshed, setIsPageRefreshed] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(baseURL + "/shiftManagerService/serviceListMachinesTaskNo")
      .then((response) => {
        setMachineProcessData(response.data);
        setLoading(false); 
      });
  }, []);

  useEffect(() => {
    const isPageRefreshed = localStorage.getItem("isPageRefreshed") === "true";
    setIsPageRefreshed(isPageRefreshed);
    localStorage.setItem("isPageRefreshed", false);
  }, []);

  const selectedMachineFun = (item, index) => {
    setSelectedMachineIndex(index);
    setSelectedLabelIndex(-1);
    let list = { ...item, index: index };
    // console.log("ScheduleNo",item.ScheduleNo)
    setSelectLaser(list);
    setLaser(list.MachineName);
  };

  const [selectLaser, setSelectLaser] = useState("");
  const [laser, setLaser] = useState("");
  const LaserRowselect = (item, index) => {
    let list = { ...item, index: index };
    setSelectLaser(list);
  };

  const [selectProgramCompleted, setSelectProgramCompleted] = useState("");
  const programCompleted = (item, index) => {
    let list = { ...item, index: index };
    setSelectProgramCompleted(list);
  };

  const taskNoOnClick = (Machine, TaskNo) => {
    axios
      .post(baseURL + "/shiftManagerService/taskNoProgramNoCompleted", TaskNo)
      .then((response) => {
        console.log("Programs Compleated DATA", response.data);
        for (let i = 0; i < response.data.length; i++) {
          if (
            response.data[i].ActualTime <
            0.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#339900";
          } else if (
            response.data[i].ActualTime <
            0.75 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#82c2b4";
          } else if (
            response.data[i].ActualTime <
            0.9 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
          } else if (
            response.data[i].ActualTime <
            1.1 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
          } else if (
            response.data[i].ActualTime <
            1.25 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FF7F50";
          } else if (
            response.data[i].ActualTime <
            1.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FFA500";
          } else {
            response.data[i].rowColor = "#ff0000";
          }
        }
        setMachineProgramesCompleted(response.data);
      });

    axios
      .post(baseURL + "/shiftManagerService/taskNoProgramNoProcessing", TaskNo)
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (
            response.data[i].ActualTime <
            0.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#339900";
          } else if (
            response.data[i].ActualTime <
            0.75 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#82c2b4";
          } else if (
            response.data[i].ActualTime <
            0.9 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
          } else if (
            response.data[i].ActualTime <
            1.1 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
          } else if (
            response.data[i].ActualTime <
            1.25 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FF7F50";
          } else if (
            response.data[i].ActualTime <
            1.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FFA500";
          } else {
            response.data[i].rowColor = "#ff0000";
          }
        }
        console.log("AFTER ADDING COLOR", response.data);
        setmachineProgramesProcessing(response.data);
      });
  };


  const MachineOnClick = (Machine) => {
    setSelectedMachine(Machine);
    axios
      .post(
        baseURL + "/shiftManagerService/profileListMachinesProgramesCompleted",
        { MachineName: Machine }
      )
      .then((response) => {

        for (let i = 0; i < response.data.length; i++) {
          if (
            response.data[i].ActualTime <
            0.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#339900";
          } else if (
            response.data[i].ActualTime <
            0.75 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#82c2b4";
          } else if (
            response.data[i].ActualTime <
            0.9 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
          } else if (
            response.data[i].ActualTime <
            1.1 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
          } else if (
            response.data[i].ActualTime <
            1.25 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FF7F50";
          } else if (
            response.data[i].ActualTime <
            1.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FFA500";
          } else {
            response.data[i].rowColor = "#ff0000";
          }
        }
        setMachineProgramesCompleted(response.data);
      });

    axios
      .post(
        baseURL + "/shiftManagerService/profileListMachinesProgramesProcessing",
        { MachineName: Machine }
      )
      .then((response) => {
        console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
          if (
            response.data[i].ActualTime <
            0.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#339900";
          } else if (
            response.data[i].ActualTime <
            0.75 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#82c2b4";
          } else if (
            response.data[i].ActualTime <
            0.9 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
          } else if (
            response.data[i].ActualTime <
            1.1 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
          } else if (
            response.data[i].ActualTime <
            1.25 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FF7F50";
          } else if (
            response.data[i].ActualTime <
            1.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FFA500";
          } else {
            response.data[i].rowColor = "#ff0000";
          }
        }
        setmachineProgramesProcessing(response.data);
      });
  };

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

  const onClickMachineLabel = (index) => {
    axios
      .get(baseURL + "/shiftManagerService/allCompleted")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (
            response.data[i].ActualTime <
            0.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#339900";
          } else if (
            response.data[i].ActualTime <
            0.75 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#82c2b4";
          } else if (
            response.data[i].ActualTime <
            0.9 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
          } else if (
            response.data[i].ActualTime <
            1.1 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
          } else if (
            response.data[i].ActualTime <
            1.25 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FF7F50";
          } else if (
            response.data[i].ActualTime <
            1.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FFA500";
          } else {
            response.data[i].rowColor = "#ff0000";
          }
        }
        setMachineProgramesCompleted(response.data);
      });
    axios
      .get(baseURL + "/shiftManagerService/allProcessing")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (
            response.data[i].ActualTime <
            0.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#339900";
          } else if (
            response.data[i].ActualTime <
            0.75 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#82c2b4";
          } else if (
            response.data[i].ActualTime <
            0.9 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
          } else if (
            response.data[i].ActualTime <
            1.1 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
          } else if (
            response.data[i].ActualTime <
            1.25 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FF7F50";
          } else if (
            response.data[i].ActualTime <
            1.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FFA500";
          } else {
            response.data[i].rowColor = "#ff0000";
          }
        }
        setmachineProgramesProcessing(response.data);
        setSelectedLabelIndex(index);
        setSelectedMachineIndex(-1);
        setIsPageRefreshed(false);
        localStorage.setItem("isPageRefreshed", false);
      });
  };

  useEffect(() => {
    onClickMachineLabel();
  }, []);

  return (
    <div className="row">
      <div
        className="col-md-3"
        style={{
          height: "270px",
          overflow: "scroll",
        }}
      >
        {loading ? (
          <b>Loading...</b>
        ) : (
          <div className="">
            {dataSource.map((node, i) => {
              const type = node.type;
              const label = (
                <span
                  style={{fontSize:'14px'}}
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
                        style={{ fontSize: "12px", backgroundColor: "#C0C0C0" }}
                        onClick={() => {
                          MachineOnClick(data.MachineName);
                          // LaserRowselect1(data,key)
                          selectedMachineFun(data, key);
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
                        onClick={() => LaserRowselect(data, key)}
                        className={
                          key === selectLaser?.index ? "selcted-row-clr" : ""
                        }
                      >
                        <ui>
                          {data.process.map((value, key) => {
                            return (
                              <>
                                <div
                                  style={{ fontSize: "10px" }}
                                  onClick={() =>
                                    taskNoOnClick(data.MachineName, value)
                                  }
                                >
                                  {value.PStatus === "Completed" ? (
                                    <li
                                      className="completed"
                                      style={{ backgroundColor: "#afbfa1" }}
                                    >
                                      {value.TaskNo} / {value.Mtrl_Code} /{" "}
                                      {value.NCProgramNo} / {value.PStatus}
                                    </li>
                                  ) : (
                                    <li className="node">
                                      {value.TaskNo} / {value.Mtrl_Code} /{" "}
                                      {value.NCProgramNo} / {value.PStatus}
                                    </li>
                                  )}
                                </div>
                              </>
                            );
                          })}
                        </ui>
                      </TreeView>
                    );
                  })}
                </TreeView>
              );
            })}
          </div>
        )}
      </div>
      <div className="col-md-9">
        <Iframe
          machineProgramesCompleted={machineProgramesCompleted}
          machineProgramesProcessing={machineProgramesProcessing}
          taskNoOnClick={taskNoOnClick}
          MachineOnClick={MachineOnClick}
          selectProgramCompleted={selectProgramCompleted}
          programCompleted={programCompleted}
          setmachineProgramesProcessing={setmachineProgramesProcessing}
          setMachineProgramesCompleted={setMachineProgramesCompleted}
          onClickMachineLabel={onClickMachineLabel}
          laser={laser}
          selectedMachine={selectedMachine}
        />
      </div>
    </div>
  );
}
