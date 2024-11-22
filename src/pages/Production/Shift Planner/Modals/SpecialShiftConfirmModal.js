import react from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../../../api/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function SpecialShiftConfirmModal({
  setOpen,
  specialConfirmModal,
  specialShiftFromDate,
  setSpecialShiftConfirmModal,
  specialShiftToDate,
  handleSubmit,
  setSelectedShiftInchargeForSpecialShift,
}) {
  const handleClose = () => {
    setOpen(true);
    setSpecialShiftConfirmModal(false);
  };

  const handleSubmitYes = () => {
    handleSubmit();
    setSpecialShiftConfirmModal(false);
    setSelectedShiftInchargeForSpecialShift([]);
  };
  return (
    <div>
      <Modal show={specialConfirmModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "14px" }}>Special_shift</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: "12px" }}>
          Are You sure want to create special shift from{" "}
          <b>{specialShiftFromDate}</b> to <b>{specialShiftToDate}</b> ?
        </Modal.Body>

        <Modal.Footer>
          <button
            className="button-style group-button"
            onClick={handleSubmitYes}
          >
            Yes
          </button>
          <button className="button-style group-button" onClick={handleClose}>
            No
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
