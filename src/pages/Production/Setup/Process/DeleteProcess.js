import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function DeleteProcess({
  show,
  handleClose,
  data,
  handleDelete,
}) {
  const handleYesClick = () => {
    handleDelete();
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "14px" }}>{data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: "12px" }}>
          <p>{data.content}</p>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="button-style group-button"
            onClick={handleYesClick}
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
