import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../../../api/baseUrl";
import { ToastContainer, toast } from "react-toastify";

export default function CreateweekModal({
  openweekshift,
  setOpenweekshift,
  selectedShift,
  selectedShiftIncharge,
  selectedWeek,
  weekState,
  getSingleDayShiftPlan4thTable,
  getSecondTableData,
  setWeekState,
  setSelectedShift,
  setSelectedMachine,
  setSelectedShiftIncharge,
  setIsChecked,
  setIsChecked2,
  setIsChecked3,
  setIsChecked4,
  setIsChecked5,
  setIsChecked6,
}) {
  const handleClose = () => {
    setOpenweekshift(false);
  };

  const createWeekshift = () => {
    let constWeekState = weekState;
    for (let i = 0; i < constWeekState.length; i++) {
      //console.log(letinputArray[i].ShiftDate)
      let dateSplit = constWeekState[i].ShiftDate.split("/");
      let year = dateSplit[2];
      let month = dateSplit[1];
      let day = dateSplit[0];
      let finalDay = year + "-" + month + "-" + day;
      constWeekState[i].ShiftDate = finalDay;
      //console.log(finalDay)
    }

    let fromTime = 0;
    let toTime = 0;
    if (constWeekState.length > 0) {
      if (constWeekState[0].Shift === "First") {
        fromTime = " 06:00:00";
        toTime = " 14:00:00";
      }
      if (constWeekState[0].Shift === "Second") {
        fromTime = " 14:00:00";
        toTime = " 22:00:00";
      }
      if (constWeekState[0].Shift === "Third") {
        fromTime = " 22:00:00";
        toTime = " 06:00:00";

        for (let i = 0; i < constWeekState.length; i++) {
          const shiftDate = new Date(constWeekState[i].ShiftDate);
          const nextDay = new Date(shiftDate);
          nextDay.setDate(nextDay.getDate() + 1); // Add one day

          // Format times for "Third" shift
          constWeekState[i].FromTime =
            shiftDate.toISOString().slice(0, 10) + fromTime;
          constWeekState[i].ToTime =
            nextDay.toISOString().slice(0, 10) + toTime;
        }
      }
      if (constWeekState[0].Shift === "General") {
        fromTime = " 09:00:00";
        toTime = " 17:00:00";
      }
      for (let i = 0; i < constWeekState.length; i++) {
        if (constWeekState[i].Shift !== "Third") {
          constWeekState[i].FromTime = constWeekState[i].ShiftDate + fromTime;
          constWeekState[i].ToTime = constWeekState[i].ShiftDate + toTime;
        }
      }
    }

    axios
      .post(baseURL + "/shiftEditor/createWeeklyShiftPlan", constWeekState)
      .then((response) => {
        if (response.data === "Shift Data Already present") {
          toast.error("Shift Data Already present", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.success("Shift Data Successfully added", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        getSecondTableData();
        getSingleDayShiftPlan4thTable();
        handleClose();
        setWeekState("");
        setSelectedShift("");
        setSelectedShiftIncharge("");
      });
    setIsChecked(false);
    setIsChecked2(false);
    setIsChecked3(false);
    setIsChecked4(false);
    setIsChecked5(false);
    setIsChecked6(false);
    // setSelectedMachine("");
  };

  return (
    <div>
      <Modal show={openweekshift} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "14px" }}>Create Weekshift</Modal.Title>
        </Modal.Header>

        {selectedShiftIncharge.length > 0 && selectedShift ? (
          <Modal.Body style={{ fontSize: "12px" }}>
            Do you wish to add <b>{selectedShiftIncharge}</b> for{" "}
            <b>{selectedShift}</b> shift for the week?
          </Modal.Body>
        ) : (
          <Modal.Body style={{ fontSize: "12px" }}>
            Please select a <b>shift</b> and <b>shift Instructor</b> before
            clicking Create Weekshift.
          </Modal.Body>
        )}

        <Modal.Footer>
          {selectedShiftIncharge.length > 0 && selectedShift ? (
            <>
              <button className="button-style group-button" onClick={createWeekshift}>
                Yes
              </button>
              <button className="button-style group-button" onClick={handleClose}>
                No
              </button>
            </>
          ) : (
            <>
              <button className="button-style group-button" onClick={handleClose}>
                OK
              </button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
