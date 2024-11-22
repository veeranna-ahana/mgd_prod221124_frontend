import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function DeleteGroupModal({
  show,
  handleClose,
  data,
  handleGroup,
}) {
  const handleYesClick = () => {
    handleGroup(data);
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
