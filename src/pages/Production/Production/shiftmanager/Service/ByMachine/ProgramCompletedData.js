import React, { useState } from "react";
import { Table } from "react-bootstrap";
import ProgramCompletedModal from "./ProgramCompletedModal";
import axios from "axios";
import { useEffect } from "react";
import { baseURL } from "../../../../../../api/baseUrl";
import { toast } from "react-toastify";

export default function ProgramCompletedData({
  machineProgramesCompleted,
  taskNoOnClick,
  MachineOnClick,
  setMachineProgramesCompleted,
  laser,
}) {
  const [show, setShow] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectProgramCompleted, setSelectProgramCompleted] = useState("");

  const handaleClick = () => {
    if (selectProgramCompleted) {
      setShow(true);
    } else {
      toast.error("Please select a row", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
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
        console.log("response  machine list", response.data);
        setMachineProgramesCompleted(response.data);
      });
  }, []);

  const programCompleted = (item, index) => {
    let list = { ...item, index: index };
    setSelectProgramCompleted(list);
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const dataCopy = [...machineProgramesCompleted];
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
    <>
      <div>
        <div className="row">
          <div>
            <button
              className="button-style group-button"
              onClick={handaleClick}
            >
              Open Program
            </button>
          </div>
        </div>

        <div className="row mt-1">
          <div className="col-md-12 col-sm-12">
            <div
              style={{
                height: "200px",
                overflow: "scroll",
                width: "850px",
              }}
            >
              <Table striped className="table-data border">
                <thead className="tableHeaderBGColor">
                  <tr>
                    <th onClick={() => requestSort("TaskNo")}>Task No</th>
                    <th onClick={() => requestSort("Machine")}>Machine</th>
                    <th onClick={() => requestSort("Operation")}>Operation</th>
                    <th
                      onClick={() => requestSort("NCProgramNo")}
                      className="textAllign"
                    >
                      Program No
                    </th>
                    <th
                      onClick={() => requestSort("EstimatedTime")}
                      className="textAllign"
                    >
                      Plan Time
                    </th>
                    <th
                      onClick={() => requestSort("ActualTime")}
                      className="textAllign"
                    >
                      Actual Time
                    </th>
                    <th
                      onClick={() => requestSort("Qty")}
                      className="textAllign"
                    >
                      QTY
                    </th>
                    <th
                      onClick={() => requestSort("QtyAllotted")}
                      className="textAllign"
                    >
                      Allotted
                    </th>
                    <th
                      onClick={() => requestSort("QtyCut")}
                      className="textAllign"
                    >
                      Processed
                    </th>
                  </tr>
                </thead>

                <tbody className="tablebody">
                  {machineProgramesCompleted &&
                    sortedData().map((item, key) => {
                      return (
                        <>
                          <tr
                            style={{ backgroundColor: item.rowColor }}
                            onClick={() => programCompleted(item, key)}
                            className={
                              key === selectProgramCompleted?.index
                                ? "selcted-row-clr"
                                : ""
                            }
                          >
                            <td style={{ whiteSpace: "nowrap" }}>
                              {item.TaskNo}
                            </td>
                            <td style={{ whiteSpace: "nowrap" }}>
                              {item.Machine}
                            </td>
                            <td style={{ whiteSpace: "nowrap" }}>
                              {item.Operation}
                            </td>
                            <td className="textAllign">{item.NCProgramNo}</td>
                            <td className="textAllign">{item.EstimatedTime}</td>
                            <td className="textAllign">{item.ActualTime}</td>
                            <td className="textAllign">{item.Qty}</td>
                            <td className="textAllign">{item.QtyAllotted}</td>
                            <td className="textAllign">{item.QtyCut}</td>
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

      {show && (
        <ProgramCompletedModal
          show={show}
          setShow={setShow}
          selectProgramCompleted={selectProgramCompleted}
          taskNoOnClick={taskNoOnClick}
          MachineOnClick={MachineOnClick}
          setSelectProgramCompleted={setSelectProgramCompleted}
          setMachineProgramesCompleted={setMachineProgramesCompleted}
          laser={laser}
        />
      )}
    </>
  );
}
