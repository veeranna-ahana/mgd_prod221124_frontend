import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState } from "react";
import { baseURL } from "../../../../../../api/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import MachineChangeModal from "./MachineChangeModal";

export default function Popup({
  openChnageMachine,
  setOpenChangeMachine,
  selectProgramProcessing,
  machineData,
  setSelectProgramProcessing,
  onClickMachine,
  selectedMachine,
  setmachineProgramesProcessing,
}) {
  const [selectedMachine1, setSelectedMachine] = useState("");

  const handleClose = () => {
    setOpenChangeMachine(false);
  };

  const [changeMachineList, setChangeMachineList] = useState([]);
  const handleMachineChange = (e) => {
    setChangeMachineList(e.target.value);
    setSelectedMachine(e.target.value);
  };

  const changeMachineonClick = () => {
    if (selectedMachine1) {
      changeMachineModal();
    } else {
      toast.error("Please select the Machine", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const [changeMachine, setChangeMachine] = useState("");
  const changeMachineModal = () => {
    setChangeMachine(true);
  };

  return (
    <>
      <MachineChangeModal
        changeMachine={changeMachine}
        setChangeMachine={setChangeMachine}
        selectProgramProcessing={selectProgramProcessing}
        setSelectProgramProcessing={setSelectProgramProcessing}
        selectedMachine={selectedMachine1}
        FirstSelectedMachine={selectedMachine}
        setOpenChangeMachine={setOpenChangeMachine}
        onClickMachine={onClickMachine}
        setmachineProgramesProcessing={setmachineProgramesProcessing}
      />

      <Modal show={openChnageMachine} size="lg">
        <div
          className="modal show"
          style={{ display: "block", position: "initial" }}
        >
          <Modal.Header closeButton onClick={handleClose}>
            <Modal.Title style={{ fontSize: "14px" }}>
              Machine Selection Form
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-md-12 col-sm-12">
              <div className="ip-box form-bg ">
                <div className="row">
                  <div className="d-flex col-md-6" style={{ gap: "10px" }}>
                    <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Program No
                    </label>
                    <input
                      className="input-field"
                      value={selectProgramProcessing.NCProgramNo}
                    />
                  </div>

                  <div className="d-flex col-md-6" style={{ gap: "20px" }}>
                    <label className="form-label">Machine</label>
                    <input
                      className="input-field"
                      value={selectProgramProcessing.Machine}
                    />
                  </div>

                  <div className="d-flex col-md-6" style={{ gap: "31px" }}>
                    <label className="form-label">Material</label>
                    <input
                      className="input-field"
                      value={selectProgramProcessing.Mtrl_Code}
                    />
                  </div>

                  <div className="d-flex col-md-6" style={{ gap: "10px" }}>
                    <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Change To
                    </label>
                    <select
                      className="ip-select"
                      onChange={handleMachineChange}
                    >
                      <option selected>Select Machine</option>

                      {machineData.map((machineData) => (
                        <option value={machineData.refName}>
                          {machineData.refName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="d-flex col-md-6" style={{ gap: "35px" }}>
                    <label className="form-label">Process</label>
                    <input
                      className="input-field"
                      value={selectProgramProcessing.MProcess}
                    />
                  </div>

                  <div className="col-md-5">
                    <button
                      className="button-style group-button"
                      onClick={changeMachineonClick}
                    >
                      Change Machine
                    </button>
                  </div>

                  <div className="d-flex col-md-6 mb-3" style={{ gap: "41px" }}>
                    <label className="form-label">Status</label>
                    <input
                      className="input-field"
                      value={selectProgramProcessing.PStatus}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}
