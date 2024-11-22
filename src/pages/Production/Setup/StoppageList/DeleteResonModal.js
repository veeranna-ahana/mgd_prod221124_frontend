import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function DeleteResonModal({
  show,
  handleClose,
  data,
  handleDelete,
}) {
  const handleYesClick = () => {
    handleDelete(data);
    handleClose(true);
  };
  console.log("Data is reaching here", data);
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
