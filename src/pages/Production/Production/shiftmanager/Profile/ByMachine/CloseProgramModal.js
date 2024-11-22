import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function CloseProgramModal({
  openCloseProgram,
  setCloseProgram,
  data,
}) {
  const handleClose = () => {
    setCloseProgram(false);
  };
  console.log(data);

  return (
    <Modal show={openCloseProgram}>
      <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title style={{ fontSize: "14px" }}>
          Production Manager
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontSize: "12px" }}>{data}</Modal.Body>
      <Modal.Footer>
        <button className="button-style group-button" onClick={handleClose}>
          OK
        </button>
      </Modal.Footer>
    </Modal>
  );
}
