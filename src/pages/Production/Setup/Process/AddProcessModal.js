import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import AddProcessConfirmation from "./AddProcessConfirmation";
import axios from "axios";
import { baseURL } from "../../../../api/baseUrl";

export default function AddProcessModal({
  openAddProcessMod,
  setOpenAddProcessMod,
  processTab,
  setProcessTab,
}) {
  const [showInnerModal, setShowInnerModal] = useState(false);
  const [newProcessID, setNewProcessID] = useState("");
  const [newProcessDescription, setNewProcessDescription] = useState("");
  const [newProcessRawMaterial, setNewProcessRawMaterial] = useState("");
  const [newNoOfOperations, setNewNoOfOperations] = useState("");


  const handleModal = () => {
    setOpenAddProcessMod(false);
    if (newProcessID.trim() === "") {
      toast.error("Process Name cannot be empty", {
        position: toast.POSITION.TOP_CENTER,
      });
      setShowInnerModal(false);
    } else if (newProcessDescription.trim() === "") {
      toast.error("Process Description cannot be empty", {
        position: toast.POSITION.TOP_CENTER,
      });
      setShowInnerModal(false);
    } else if (newProcessRawMaterial.trim() === "") {
      toast.error("Raw Material cannot be empty", {
        position: toast.POSITION.TOP_CENTER,
      });
      setShowInnerModal(false);
    } else {
      setShowInnerModal(true);
    }
  };

  const AddProcess = () => {
    axios
      .post(baseURL + "/processSetup/addProcess", {
        ProcessID: newProcessID,
        ProcessDescription: newProcessDescription,
        RawMaterial: newProcessRawMaterial,
        No_of_Operations: newNoOfOperations,
      })
      .then(() => {
        setShowInnerModal(false);
        setOpenAddProcessMod(false);
        setNewProcessID("");
        setNewProcessDescription("");
        setNewProcessRawMaterial("");
        setNewNoOfOperations("");
      })
      .catch((err) => {
        console.log(err);
      });

    // axios
    //     .get(baseURL + "/productionSetup/getAllProcessList")
    //     .then((response) => {
    //       setProcessTab(response.data)
    //     }).catch((err) => {
    //       console.log(err)
    //     })
  };

  const handleNewProcessID = (event) => {
    const processtxt = event.target.value;
    setNewProcessID(processtxt);
  };

  const handleNewProcessDescription = (event) => {
    const processDesc = event.target.value;
    setNewProcessDescription(processDesc);
  };

  const handleNewProcessNoOfOperations = (event) => {
    setNewNoOfOperations(event.target.value);
  };

  const handleNewProcessRawMaterial = (event) => {
    const processRawMaterial = event.target.value;
    setNewProcessRawMaterial(processRawMaterial);
  };

  const handleClose = () => {
    setOpenAddProcessMod(false);
    setNewProcessID("");
    setNewProcessDescription("");
    setNewProcessRawMaterial("");
    setNewNoOfOperations("");
  };


  return (
    <div>
      <Modal show={openAddProcessMod} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "14px" }}>
            Magod Laser: Add Process
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ display: showInnerModal ? "none" : "block" }}>
          <div className="col-md-12 col-sm-12 ip-box form-bg">
            <div>
              <div className="row">
                <div className="d-flex col-md-12" style={{ gap: "79px" }}>
                  <label className="form-label">Process</label>
                  <input
                    className="input-field"
                    type="text"
                    value={newProcessID}
                    onChange={handleNewProcessID}
                  />
                </div>
              </div>
              <div className="row">
                <div className="d-flex col-md-12" style={{ gap: "10px" }}>
                  <label
                    className="form-label"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Process Description
                  </label>
                  <input
                    className="input-field"
                    type="text"
                    value={newProcessDescription}
                    onChange={handleNewProcessDescription}
                  />
                </div>
              </div>

              <div className="row">
                <div className="d-flex col-md-12" style={{ gap: "45px" }}>
                  <label
                    className="form-label"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Raw Material
                  </label>
                  <input
                    className="input-field"
                    type="text"
                    value={newProcessRawMaterial}
                    onChange={handleNewProcessRawMaterial}
                  />
                </div>
              </div>

              <div className="row">
                <div className="d-flex col-md-12 mb-2" style={{ gap: "22px" }}>
                  <label
                    className="form-label"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    No of Operations
                  </label>
                  <input
                    className="input-field"
                    type="number"
                    value={newNoOfOperations}
                    onChange={handleNewProcessNoOfOperations}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button className="button-style group-button" onClick={handleModal}>
            Add Process
          </button>

          <button className="button-style group-button" onClick={handleClose}>
            Exit
          </button>
        </Modal.Footer>
      </Modal>
      {showInnerModal && (
        <AddProcessConfirmation
          show={showInnerModal}
          handleClose={() => {
            setShowInnerModal(false);
            setOpenAddProcessMod(true);
          }}
          data={{
            title: <span style={{fontSize:'14px'}}>Add Process</span> ,
            content: (
              <div style={{fontSize:'12px'}}>
                Are you sure you want to add <strong>{newProcessID}</strong>{" "}
                Process?
              </div>
            ),
          }}
          handleAdd={AddProcess}
        />
      )}
    </div>
  );
}
