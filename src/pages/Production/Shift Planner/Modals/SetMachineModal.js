import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../../../api/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function SetMachineModal({
  opensetmachine,
  setOpensetmachine,
  selectedMachine,
  selectedOperator,
  selectedWeek,
  weekState1,
  setWeekState1,
  getMachineOperatorTableData,
  getSingleDayShiftPlan4thTable,
  selectedShift,
  rowselectDailyShiftTable,
  setMachineOperatorTableData,
  // 
  setSelectedShift,
  setSelectedMachine,
  setSelectedShiftIncharge,
  setSelectedOperator
}) {
  const handleClose = () => {
    setOpensetmachine(false);
  };

  const setMachineoperators = () => {
    const invalidFields = weekState1.some(
      (item) =>
        item.Machine === "Select Machine" ||
        item.Shift === "Select Shift" ||
        item.Operator === "Select Operator"
    );
    if (invalidFields) {
      handleClose();
      toast.error("Please select all fields (Machine, Shift, and Operator)", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    axios
      .post(baseURL + "/shiftEditor/setMachineOperators", weekState1)
      .then((response) => {
        handleClose();
        if (response.data === "Operator/Machine already present") {
          toast.error("Operator/Machine already present", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else if (response.data === "Machine Operator Added Successfully") {
          toast.success("Machine Operator Added Successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
          setSelectedShift("")
          setSelectedMachine("")
          setSelectedShiftIncharge("")
          setSelectedOperator("")
          getMachineOperatorTableData();
          getSingleDayShiftPlan4thTable();
          // setWeekState1("");
        }
      })
      .catch((error) => {
        console.error(error); 
        toast.error("An error occurred while processing your request", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  return (
    <div>
      <Modal show={opensetmachine} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "14px" }}>Set Machine </Modal.Title>
        </Modal.Header>

        {selectedOperator && selectedMachine && selectedShift ? (
          <Modal.Body style={{ fontSize: "12px" }}>
            Are you sure want add <b>{selectedOperator}</b> to{" "}
            <b>{selectedMachine}</b> for the week?
          </Modal.Body>
        ) : (
          <Modal.Body style={{ fontSize: "12px" }}>
            Please select a <b>Operator</b> and <b>Machine</b> and <b>Shift</b>{" "}
            before clicking Set MachineOperator
          </Modal.Body>
        )}

        <Modal.Footer>
          {selectedOperator && selectedMachine && selectedShift ? (
            <>
              <button className="button-style group-button" onClick={() => setMachineoperators()}>
                Yes
              </button>
              <button className="button-style group-button" onClick={handleClose}>
                No
              </button>
            </>
          ) : (
            <button className="button-style group-button" onClick={handleClose}>
              OK
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
