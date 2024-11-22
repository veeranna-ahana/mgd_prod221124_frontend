import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ThirdModal({ modalopen, setModalopen, finalresponse }) {
  const handleClose = () => setModalopen(false);

  // console.log("IM final response",finalresponse)

  return (
    <div>
      <Modal show={modalopen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "14px" }}>
            Magod Production Manager
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: "12px" }}>{finalresponse}</Modal.Body>
        <Modal.Footer>
          <button className="button-style group-button" onClick={handleClose}>
            OK
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
