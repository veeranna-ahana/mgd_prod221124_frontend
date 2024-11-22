import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { Table } from "react-bootstrap";
import axios from "axios";
import { baseURL } from "../../../../../../api/baseUrl";
import CloseProgramModal from "../ByMachine/CloseProgramModal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import ShortCloseModal from "../ByOperations/ShortCloseModal";

export default function OperationsCompleteOpenProgram({
  show,
  setShow,
  selectProgramCompleted,
  onClickOperation,
  onClickProgram,
  onClickMachine,
  setSelectProgramCompleted,
  operation,
  setProgramCompleted,
}) {
  const [fullscreen, setFullscreen] = useState(true);

  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault();

  const [programCompleteData, setProgramCompleteData] = useState([]);
  const [newprogramCompleteData, setNewProgramCompleteData] = useState([]);

  const [newpartlistdata, setNewPartlistdata] = useState([]);

  const modalTable = () => {
    axios
      .post(baseURL + "/shiftManagerProfile/shiftManagerncProgramTaskList", {
        ...selectProgramCompleted,
      })
      .then((response) => {
        console.log(response.data);
        setProgramCompleteData(response.data);
      });
  };

  useEffect(() => {
    modalTable();
  }, [selectProgramCompleted]);

  const handleClose = () => {
    setShow(false);
    axios
      .post(baseURL + "/shiftManagerProfile/OperationProgramesCompleted", {
        Operation: operation,
      })
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (
            response.data[i].ActualTime <
            0.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#339900";
            //break;
          } else if (
            response.data[i].ActualTime <
            0.75 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#82c2b4";
            //break;
          } else if (
            response.data[i].ActualTime <
            0.9 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
            //break;
          } else if (
            response.data[i].ActualTime <
            1.1 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
            //break;
          } else if (
            response.data[i].ActualTime <
            1.25 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FF7F50";
            //break;
          } else if (
            response.data[i].ActualTime <
            1.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FFA500";
            //break;
          } else {
            response.data[i].rowColor = "#ff0000";
          }
        }
        setProgramCompleted(response.data);
        setSelectProgramCompleted({ ...response.data[0], index: 0 });
      });
  };

  //console.log(programCompleteData);

  const clearAllButton = () => {
    const constProgramCompleteData = [...programCompleteData]; // Create a copy of the array
    for (let i = 0; i < constProgramCompleteData.length; i++) {
      constProgramCompleteData[i].QtyCleared =
        constProgramCompleteData[i].QtyCut -
        constProgramCompleteData[i].QtyRejected;
    }
    // Validate if Remarks are mandatory
    const hasInvalidRemarks = constProgramCompleteData.some(
      (item) =>
        item.QtyRejected > 0 && (!item.Remarks || item.Remarks === "null")
    );
    if (hasInvalidRemarks) {
      // Display an error using the toastify library
      toast.error("Please add remarks", {
        position: toast.POSITION.TOP_CENTER,
      });
      return; // Stop further processing
    }
    // Update state with the modified data
    setProgramCompleteData(constProgramCompleteData);
    setNewProgramCompleteData(constProgramCompleteData);
    setNewPartlistdata(constProgramCompleteData);

    // Check if any row has QtyCut > 0 before submitting
    const hasQtyCutGreaterThanZero = constProgramCompleteData.some(
      (item) => item.QtyCut > 0
    );

    if (hasQtyCutGreaterThanZero) {
      // Send a POST request
      axios
        .post(
          baseURL + "/shiftManagerProfile/shiftManagerCloseProgram",
          constProgramCompleteData
        )
        .then((response) => {
          // Handle the response if needed
          toast.success("Success", {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    } else {
      toast.error("Produced should be greater than zero", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const onChangeRejected = (e, item, key) => {
    const newconstprogramCompleteData = [...programCompleteData];
    const newQtyRejected = Number(e.target.value);
    if (newQtyRejected > newconstprogramCompleteData[key].QtyCut) {
      toast.error(
        "Rejected quantity should not be greater than produced quantity.",
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
      // Reset the input field to the original value (QtyRejected)
      e.target.value = item.QtyRejected;
      return; // Exit the function without updating the state
    }
    newconstprogramCompleteData[key].QtyRejected = newQtyRejected;
    setProgramCompleteData(newconstprogramCompleteData);
    setNewProgramCompleteData(newconstprogramCompleteData);
  };

  ///
  //   const onClickCloseProgram2 = () => {
  //     axios.post(baseURL+'/shiftManagerProfile/CloseProgram',
  //     selectProgramCompleted)
  //    .then((response) => {
  //      const constSelectProgramCompleted = selectProgramCompleted;
  //      constSelectProgramCompleted.PStatus = 'Closed'
  //      setSelectProgramCompleted(constSelectProgramCompleted)
  //      setCloseProgram(true);
  //      axios
  //       .post(baseURL + "/shiftManagerProfile/OperationProgramesCompleted", {
  //         Operation: operation,
  //       })
  //       .then((response) => {
  //         for (let i = 0; i < response.data.length; i++) {
  //           if (
  //             response.data[i].ActualTime <
  //             0.5 * response.data[i].EstimatedTime
  //           ) {
  //             response.data[i].rowColor = "#339900";
  //             //break;
  //           } else if (
  //             response.data[i].ActualTime <
  //             0.75 * response.data[i].EstimatedTime
  //           ) {
  //             response.data[i].rowColor = "#82c2b4";
  //             //break;
  //           } else if (
  //             response.data[i].ActualTime <
  //             0.9 * response.data[i].EstimatedTime
  //           ) {
  //             response.data[i].rowColor = "#f08080";
  //             //break;
  //           } else if (
  //             response.data[i].ActualTime <
  //             1.1 * response.data[i].EstimatedTime
  //           ) {
  //             response.data[i].rowColor = "#f08080";
  //             //break;
  //           } else if (
  //             response.data[i].ActualTime <
  //             1.25 * response.data[i].EstimatedTime
  //           ) {
  //             response.data[i].rowColor = "#FF7F50";
  //             //break;
  //           } else if (
  //             response.data[i].ActualTime <
  //             1.5 * response.data[i].EstimatedTime
  //           ) {
  //             response.data[i].rowColor = "#FFA500";
  //             //break;
  //           } else {
  //             response.data[i].rowColor = "#ff0000";
  //           }
  //         }
  //         setProgramCompleted(response.data);
  //         setSelectProgramCompleted({...response.data[0],index:0})
  //       });
  //  })
  //   }
  ///

  const [openCloseProgram, setCloseProgram] = useState(false);
  const [disableStatus, setDisableStatus] = useState(false);
  const [response, setResponse] = useState("");
  const [comparedResponse, setComparedResponse] = useState("");
  const [openShortClose, setOpenShortClose] = useState(false);
  const onClickCloseProgram = () => {
    if (programCompleteData[0]?.QtyCleared === 0) {
      toast.error("Clear parts for for quantity before closing the program", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      axios
        .post(
          baseURL + "/shiftManagerProfile/CloseProgram",
          selectProgramCompleted
        )
        .then((response) => {
          console.log(response.data);
          if (
            response.data == "Return or update Material before closing Program"
          ) {
            setCloseProgram(true);
            setResponse("Return or update Material before closing Program");
          } else {
            if (
              selectProgramCompleted?.QtyAllotted < selectProgramCompleted?.Qty
            ) {
              setComparedResponse("Do you wish to short close program No?");
              setOpenShortClose(true);
            } else {
              axios
                .post(
                  baseURL + "/shiftManagerProfile/updateClosed",
                  selectProgramCompleted
                )
                .then((response) => {
                  console.log(response.data);
                });
              setCloseProgram(true);
              setResponse("Closed");
              const constSelectProgramCompleted = selectProgramCompleted;
              constSelectProgramCompleted.PStatus = "Closed";
              setSelectProgramCompleted(constSelectProgramCompleted);
              setDisableStatus(true);
            }
          }
        });
    }
  };

  ////

  //console.log(newprogramCompleteData , 'After Updating newprogramCompleteData')
  const onChangeCleared = (e, item, key) => {
    const newconstprogramCompleteData = programCompleteData;
    newconstprogramCompleteData[key].QtyCleared = Number(e.target.value);
    setProgramCompleteData(newconstprogramCompleteData);
    setNewProgramCompleteData(newconstprogramCompleteData);
    console.log(
      "NEW CONST PROGRAM COMPLETE DATA IS ",
      newconstprogramCompleteData
    );
    setNewProgramCompleteData(newconstprogramCompleteData);
    setNewPartlistdata(newconstprogramCompleteData);
  };

  const onChangeRemarks = (e, item, key) => {
    const newconstprogramCompleteData = programCompleteData;
    newconstprogramCompleteData[key].Remarks = e.target.value;
    setProgramCompleteData(newconstprogramCompleteData);
    setNewProgramCompleteData(newconstprogramCompleteData);
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
    const dataCopy = [...programCompleteData];
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
      <CloseProgramModal
        openCloseProgram={openCloseProgram}
        data={response}
        setCloseProgram={setCloseProgram}
      />

      <ShortCloseModal
        openShortClose={openShortClose}
        setOpenShortClose={setOpenShortClose}
        response1={comparedResponse}
        selectProgramCompleted={selectProgramCompleted}
        Operation={operation}
        setSelectProgramCompleted={setSelectProgramCompleted}
        setProgramCompleted={setProgramCompleted}
      />

      <Modal size="lg" show={show} fullscreen={fullscreen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "14px" }}>
            Program Parts Inspection Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-md-12 col-sm-12">
            <div className="ip-box form-bg ">
              <div className="row">
                <div className="d-flex col-md-3" style={{ gap: "35px" }}>
                  <label
                    className="form-label"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {" "}
                    Task No
                  </label>
                  <input
                    className="input-field"
                    value={selectProgramCompleted.TaskNo}
                  />
                </div>
                <div className="d-flex col-md-2" style={{ gap: "18px" }}>
                  <label
                    className="form-label"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {" "}
                    Quantity
                  </label>
                  <input
                    className="input-field"
                    value={selectProgramCompleted.Qty}
                  />
                </div>
                <div className="d-flex col-md-5" style={{ gap: "10px" }}>
                  <label className="form-label"> Material</label>
                  <input
                    className="input-field"
                    value={selectProgramCompleted.Mtrl_Code}
                  />
                </div>

                <div className="d-flex col-md-3" style={{ gap: "10px" }}>
                  <label
                    className="form-label"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {" "}
                    Program No
                  </label>
                  <input
                    className="input-field"
                    value={selectProgramCompleted.NCProgramNo}
                  />
                </div>

                <div className="d-flex col-md-2" style={{ gap: "26px" }}>
                  <label className="form-label">Alloted</label>
                  <input
                    className="input-field"
                    value={selectProgramCompleted.QtyAllotted}
                  />
                </div>

                <div className="d-flex col-md-2" style={{ gap: "15px" }}>
                  <label className="form-label">Process</label>
                  <input
                    className="input-field"
                    value={selectProgramCompleted.MProcess}
                  />
                </div>

                <div className="d-flex col-md-3" style={{ gap: "10px" }}>
                  <label className="form-label">Status</label>
                  <input
                    className="input-field"
                    value={selectProgramCompleted.PStatus}
                  />
                </div>

                <div className="d-flex col-md-3" style={{ gap: "30px" }}>
                  <label className="form-label">Machine</label>
                  <input
                    className="input-field"
                    value={selectProgramCompleted.Machine}
                  />
                </div>

                <div className="d-flex col-md-2" style={{ gap: "10px" }}>
                  <label className="form-label">Processed</label>
                  <input
                    className="input-field"
                    value={selectProgramCompleted.QtyCut}
                  />
                </div>

                <div className="d-flex col-md-2" style={{ gap: "25px" }}>
                  <label className="form-label">Dwgs</label>
                  <input
                    className="input-field"
                    value={selectProgramCompleted.NoOfDwgs}
                  />
                </div>

                <div className="d-flex col-md-3" style={{ gap: "15px" }}>
                  <label className="form-label">Parts</label>
                  <input
                    className="input-field"
                    value={selectProgramCompleted.TotalParts}
                  />
                </div>

                <div className="col-md-3" style={{ marginTop: "-5px" }}>
                  <label className="form-label" style={{ marginLeft: "70%" }}>
                    Process Time -
                  </label>
                </div>

                <div className="d-flex col-md-2" style={{ gap: "10px" }}>
                  <label className="form-label">Estimated</label>
                  <input
                    style={{ height: "59%" }}
                    className="input-field"
                    value={selectProgramCompleted.EstimatedTime}
                  />
                </div>

                <div className="d-flex col-md-2 mb-2" style={{ gap: "10px" }}>
                  <label className="form-label">Machine</label>
                  <input
                    className="input-field"
                    value={selectProgramCompleted.ActualTime}
                  />
                </div>

                <div className="col-md-2 ms-5">
                  <button
                    className="button-style group-button"
                    onClick={clearAllButton}
                  >
                    Clear Parts
                  </button>
                  <button
                    className="button-style group-button"
                    onClick={onClickCloseProgram}
                  >
                    CloseProgram
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-1">
            <div
              className="col-md-12 col-sm-12"
              style={{ marginLeft: "-14px" }}
            >
              <div
                style={{
                  height: "200px",
                  width: "102%",
                  overflowY: "scroll",
                  overflowX: "scroll",
                }}
              >
                <Table striped className="table-data border">
                  <thead className="tableHeaderBGColor">
                    <tr>
                      <th
                        style={{ width: "15%" }}
                        onClick={() => requestSort("Dwg Name")}
                      >
                        Dwg Name
                      </th>
                      <th
                        style={{ width: "15%" }}
                        className="textAllign"
                        onClick={() => requestSort("To Produce")}
                      >
                        To Produce
                      </th>
                      <th
                        style={{ width: "15%" }}
                        className="textAllign"
                        onClick={() => requestSort("Produced")}
                      >
                        Produced
                      </th>
                      <th
                        style={{ width: "15%" }}
                        className="textAllign"
                        onClick={() => requestSort("Rejected")}
                      >
                        Rejected
                      </th>
                      <th
                        style={{ width: "15%" }}
                        className="textAllign"
                        onClick={() => requestSort("Cleared")}
                        disabled={disableStatus === true}
                      >
                        Cleared
                      </th>
                      <th
                        style={{ width: "25%" }}
                        onClick={() => requestSort("Remarks")}
                      >
                        Remarks
                      </th>
                    </tr>
                  </thead>

                  {sortedData().map((item, key) => {
                    return (
                      <>
                        <tbody className="tablebody">
                          <tr>
                            <td style={{ whiteSpace: "nowrap" }}>
                              {item.DwgName}
                            </td>
                            {/* <td>{item.TotQtyNested}</td> */}
                            <td className="textAllign">{item.TotQtyNested}</td>
                            <td className="textAllign">{item.QtyCut}</td>
                            <td>
                              <div>
                                <input
                                  className="table-cell-editor textAllign"
                                  name="cleared"
                                  type="number"
                                  onKeyDown={blockInvalidChar}
                                  Value={
                                    item.Remarks === "null"
                                      ? null
                                      : item.Remarks
                                  }
                                  onChange={(e) =>
                                    onChangeRejected(e, item, key)
                                  }
                                />
                              </div>
                            </td>
                            <td className="textAllign">{item.QtyCleared}</td>
                            <td>
                              <input
                                className="table-cell-editor "
                                name="cleared"
                                defaultValue={item.Remarks}
                                onChange={(e) => onChangeRemarks(e, item, key)}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </>
                    );
                  })}
                </Table>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
