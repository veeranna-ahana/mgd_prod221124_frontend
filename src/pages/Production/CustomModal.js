import React from "react";
import { Button, Modal } from "react-bootstrap";

const CustomModal = ({ show, handleClose, data }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: "14px" }}>{data.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontSize: "12px" }}>
        <p>{data.content}</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="button-style group-button" onClick={handleClose}>
          OK
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
