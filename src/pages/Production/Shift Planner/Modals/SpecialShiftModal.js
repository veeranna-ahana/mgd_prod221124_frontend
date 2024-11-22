import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { format } from "date-fns";
import enGB from "date-fns/locale/en-GB";
import { toast } from "react-toastify";
import { baseURL } from "../../../../api/baseUrl";
import { stubFalse } from "lodash";
import SpecialShiftConfirmModal from "./SpecialShiftConfirmModal";

registerLocale("en-GB", enGB);
setDefaultLocale("en-GB");

export default function SpecialShiftModal({
  open,
  setOpen,
  rowselectDailyShiftTable,
  SelectedShiftIncharge,
  ShiftDate,
  getSingleDayShiftPlan4thTable,
  getSecondTableData,
  setSelectedShiftInchargeForSpecialShift,
}) {
  const [specialConfirmModal, setSpecialShiftConfirmModal] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const handleDateTimeChange = (date) => {
    setSelectedDateTime(date);
  };
  useEffect(() => {
    setSelectedDateTime("");
  }, [rowselectDailyShiftTable?.FromTime]);

  const [selectedToDateTime, setSelectedToDateTime] = useState(null);
  const handleToDateTimeChange = (date) => {
    setSelectedToDateTime(date);
  };

  useEffect(() => {
    setSelectedToDateTime("");
  }, [rowselectDailyShiftTable?.ToTime]);

  const handleClose = () => {
    setOpen(false);
  };

  const specialShiftFromDate = selectedDateTime
    ? format(selectedDateTime, "yyyy-MM-dd HH:mm:ss")
    : "";
  const specialShiftToDate = selectedToDateTime
    ? format(selectedToDateTime, "yyyy-MM-dd HH:mm:ss")
    : "";

  const specialShiftFromDate1 = selectedDateTime
    ? format(selectedDateTime, "dd-MM-yyyy HH:mm:ss")
    : "";
  const specialShiftToDate1 = selectedToDateTime
    ? format(selectedToDateTime, "dd-MM-yyyy HH:mm:ss")
    : "";

  const handleSubmit = () => {
    // console.log("onclick of submit", specialShiftFromDate);

    axios
      .post(baseURL + "/shiftEditor/createSpecialShift", {
        ShiftDate: ShiftDate,
        Shift_Ic: SelectedShiftIncharge,
        FromTime: specialShiftFromDate,
        ToTime: specialShiftToDate,
      })
      .then((response) => {
        // Request was successful
        toast.success("Special Shift Added Successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        getSingleDayShiftPlan4thTable();
        getSecondTableData();
      })
      .catch((error) => {
        // Request failed
        toast.error("Its a Holiday You cant create a Special Shift", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const handleOpenSpecialModal = () => {
    if (
      specialShiftFromDate === "" ||
      specialShiftToDate === "" ||
      SelectedShiftIncharge.length === 0 ||
      ShiftDate === ""
    ) {
      toast.error("Please select all the fields", {
        position: toast.POSITION.TOP_CENTER,
      });
      return; // Exit the function if any of the conditions is true
    } else {
      setSpecialShiftConfirmModal(true);
      setOpen(false);
    }
  };

  return (
    <div>
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "14px" }}>
            Create Special Shift
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ fontSize: "12px" }}>
          <label className="form-label">From Time</label>
          <div style={{ width: "100%", textAlign: "left" }}>
            <DatePicker
              className="w-100"
              style={{
                textAlign: "center",
                fontSize: "13px",
                backgroundColor: "white",
                width: "100%",
              }}
              selected={selectedDateTime}
              onChange={handleDateTimeChange}
              showTimeSelect
              dateFormat="dd-MM-yyyy HH:mm:ss"
              value={selectedDateTime}
              placeholderText={rowselectDailyShiftTable?.FromTime}
            />
          </div>

          <label className="form-label">To Time</label>
          <div style={{ width: "100%" }}>
            <DatePicker
              className="w-100"
              style={{
                textAlign: "center",
                fontSize: "13px",
                backgroundColor: "white",
                width: "100%",
              }}
              selected={selectedToDateTime}
              onChange={handleToDateTimeChange}
              showTimeSelect
              dateFormat="dd-MM-yyyy HH:mm:ss"
              value={selectedToDateTime}
              placeholderText={rowselectDailyShiftTable?.ToTime}
            ></DatePicker>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button
            className="button-style group-button"
            onClick={handleOpenSpecialModal}
          >
            Add
          </button>
          <button className="button-style group-button" onClick={handleClose}>
            No
          </button>
        </Modal.Footer>
      </Modal>

      {specialConfirmModal && (
        <SpecialShiftConfirmModal
          specialConfirmModal={specialConfirmModal}
          setSpecialShiftConfirmModal={setSpecialShiftConfirmModal}
          specialShiftFromDate={specialShiftFromDate1}
          specialShiftToDate={specialShiftToDate1}
          setOpen={setOpen}
          handleSubmit={handleSubmit}
          setSelectedShiftInchargeForSpecialShift={
            setSelectedShiftInchargeForSpecialShift
          }
        />
      )}
    </div>
  );
}
