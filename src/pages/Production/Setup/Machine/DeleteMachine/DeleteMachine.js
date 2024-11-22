import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

export default function DeleteMachine({
  opendeletemachine,
  setOpendeletemachine,
  selectedRow,
  deleteMachine,
}) {
  // console.log(selectedRow);
  const handleClose = () => setOpendeletemachine(false);

  return (
    <div>
      <Modal show={opendeletemachine} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{fontSize:'14px'}}>DELETE MACHINE</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{fontSize:'12px'}}>
          Are You sure want to delete Machine :<b> {selectedRow.refName}</b> ?
        </Modal.Body>

        <Modal.Footer>
          <button
            className="button-style group-button"
            onClick={() => {
              deleteMachine();
              handleClose();
            }}
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
