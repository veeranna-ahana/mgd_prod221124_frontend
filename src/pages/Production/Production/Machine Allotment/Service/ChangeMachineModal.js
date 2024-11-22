import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ChangeMachineModal({
  openModal,
  setOpenModal,
  selectedRows,
  selectedMachine,
  clickChangeMachine,
  handleClose,
}) {
  console.log("Change Machine Page", selectedMachine);

  return (
    <div>
      <Modal show={openModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "14px" }}>
            Magod Production Manager
          </Modal.Title>
        </Modal.Header>

        {selectedRows[0]?.Machine === undefined || selectedMachine === null ? (
          // If either selectedRows[0]?.Machine is undefined or selectedMachine is null, display a message to select a machine
          <>
            <Modal.Body style={{ fontSize: "12px" }}>
              Please select a <b>Machine</b>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="button-style group-button"
                onClick={handleClose}
              >
                OK
              </button>
            </Modal.Footer>
          </>
        ) : selectedMachine === "" ? (
          // If selectedMachine is an empty string, display the message to select the machine
          <>
            <Modal.Body style={{fontSize:'12px'}}>
              Please Select the <b>Machine</b>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="button-style group-button"
                onClick={handleClose}
              >
                OK
              </button>
            </Modal.Footer>
          </>
        ) : (
          // If both fields are not null, display the original content
          <>
            <Modal.Body style={{fontSize:'12px'}}>
              Do you wish to change the programs from{" "}
              <b>{selectedRows[0]?.Machine}</b> to <b>{selectedMachine}</b>?
            </Modal.Body>
            <Modal.Footer>
              <button
                className="button-style group-button"
                onClick={clickChangeMachine}
              >
                Yes
              </button>
              <button className="button-style group-button" onClick={handleClose}>
                No
              </button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}
