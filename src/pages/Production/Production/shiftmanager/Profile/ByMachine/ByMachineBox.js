import axios from "axios";
import React, { useState, useEffect } from "react";
import TreeView from "react-treeview";
import "react-treeview/react-treeview.css";
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
    const isPageRefreshed = localStorage.getItem("isPageRefreshed") === "true";
    setIsPageRefreshed(isPageRefreshed);
    localStorage.setItem("isPageRefreshed", false);
  }, []);

  const selectedMachineFun = (item, index) => {
    setSelectedMachineIndex(index);
    setSelectedLabelIndex(-1);
  };

  useEffect(() => {
    setLoading(true); 
    axios
      .get(baseURL + "/shiftManagerProfile/profileListMachinesTaskNo")
      .then((response) => {
        // console.log("response  machine list", response.data);
        setMachineProcessData(response.data);
        setLoading(false);
      });
  }, []);

  const [selectLaser, setSelectLaser] = useState("");
  // const LaserRowselect = (item, index) => {
  //   let list = { ...item, index: index };
  //   setSelectLaser(list);
  // };

  const [selectProgramCompleted, setSelectProgramCompleted] = useState("");
  const programCompleted = (item, index) => {
    let list = { ...item, index: index };
    setSelectProgramCompleted(list);
  };

  const taskNoOnClick = (Machine, TaskNo) => {
    axios
      .post(baseURL + "/shiftManagerProfile/taskNoProgramNoCompleted", TaskNo)
      .then((response) => {
        // console.log("Programs Compleated DATA", response.data);
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
      .post(baseURL + "/shiftManagerProfile/taskNoProgramNoProcessing", TaskNo)
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
        // console.log("AFTER ADDING COLOR", response.data);
        setmachineProgramesProcessing(response.data);
      });
  };

  const MachineOnClick = (Machine) => {
    setSelectedMachine(Machine);
    axios
      .post(
        baseURL + "/shiftManagerProfile/profileListMachinesProgramesCompleted",
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
        // console.log("AFTER ADDING COLOR", response.data);
        setMachineProgramesCompleted(response.data);
      });
    axios
      .post(
        baseURL + "/shiftManagerProfile/profileListMachinesProgramesProcessing",
        { MachineName: Machine }
      )
      .then((response) => {
        // console.log(response.data);
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
        // console.log("AFTER ADDING COLOR", response.data);
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

  const onClickMachine = (index) => {
    axios
      .get(baseURL + "/shiftManagerProfile/allCompleted")
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
        setSelectedLabelIndex(index);
        setSelectedMachineIndex(-1);
        setIsPageRefreshed(false);
        localStorage.setItem("isPageRefreshed", false);
      });
    axios
      .get(baseURL + "/shiftManagerProfile/allProcessing")
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
        // console.log("response  machine list", response.data);
        setmachineProgramesProcessing(response.data);
      });
  };

  useEffect(() => {
    onClickMachine();
  }, []);

  // console.log("machineProgramesCompleted is",machineProgramesCompleted);

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
                  style={{ fontSize: "14px" }}
                  className={`node ${
                    selectedLabelIndex === node.labelIndex
                      ? "selcted-row-clr"
                      : ""
                  }`}
                  onClick={() => onClickMachine(node.labelIndex)}
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
                        onClick={(e) => {
                          selectedMachineFun(data, key);
                          MachineOnClick(data.MachineName);
                          // LaserRowselect(data, key);
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
                        // onClick={() => LaserRowselect(data, key)}
                        className={
                          key === selectLaser?.index ? "selcted-row-clr" : ""
                        }
                      >
                        <ul>
                          {data.process.map((value, key) => {
                            return (
                              <>
                                <div
                                  style={{ fontSize: "11px" }}
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
                        </ul>
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
          setMachineProgramesCompleted={setMachineProgramesCompleted}
          setmachineProgramesProcessing={setmachineProgramesProcessing}
          onClickMachine={onClickMachine}
          selectedMachine={selectedMachine}
        />
      </div>
    </div>
  );
}
