import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { baseURL } from "../../../../../../api/baseUrl";

export default function MachineChangeModal({
  changeMachine,
  setChangeMachine,
  selectProgramProcessing,
  setSelectProgramProcessing,
  selectedMachine,
  setOpenChangeMachine,
  onClickMachine,
  FirstSelectedMachine,
  setmachineProgramesProcessing,
}) {
  const handleClose = () => {
    setChangeMachine(false);
    setOpenChangeMachine(false);
  };

  const onClickYes = () => {
    console.log(selectedMachine);
    axios
      .post(baseURL + "/shiftManagerProfile/changeMachine", {
        ...selectProgramProcessing,
        NewMachine: selectedMachine,
      })
      .then((response) => {
        console.log("Current State of programCompleteData", response.data);
        const constSelectProgramCompleted = selectProgramProcessing;
        constSelectProgramCompleted.Machine = selectedMachine;
        setSelectProgramProcessing(constSelectProgramCompleted);
        toast.success("Machine Name Changed", {
          position: toast.POSITION.TOP_CENTER,
        });
        handleClose();
        axios
          .post(
            baseURL +
              "/shiftManagerProfile/profileListMachinesProgramesProcessing",
            { MachineName: FirstSelectedMachine }
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
            console.log("AFTER ADDING COLOR", response.data);
            setmachineProgramesProcessing(response.data);
          });
      })
      .catch((error) => {
        // Handle error if the machine change fails
        toast.error("Failed to change machine", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  return (
    <>
      <Modal show={changeMachine}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title style={{ fontSize: "14px" }}>
            Machine Selection Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: "12px" }}>
          Do you wish to shift Program No{" "}
          <b>{selectProgramProcessing.NCProgramNo}</b> from{" "}
          <b>{selectProgramProcessing.Machine}</b> To <b>{selectedMachine}</b>?
        </Modal.Body>
        <Modal.Footer>
          <button className="button-style group-button" onClick={onClickYes}>
            Yes
          </button>
          <button className="button-style group-button" onClick={handleClose}>
            No
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
