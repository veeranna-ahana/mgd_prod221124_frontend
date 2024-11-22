import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function ReasonAskModal({
  show,
  handleClose,
  handleadd,
  reason,
  selectedGroup,
}) {
  // console.log(selectedGroup)
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "14px" }}>Add Reason</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: "12px" }}>
          <div>
            Are you sure you want to add <strong>{reason}</strong> as Reason for{" "}
            <b>{selectedGroup.GroupName}</b>?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="button-style group-button"
            onClick={() => handleadd()}
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
