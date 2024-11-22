import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useGlobalContext } from "../../../../../Context/Context";
import { baseURL } from "../../../../../api/baseUrl";

export default function AlertAddprocess({
  alert,
  setAlert,
  processform,
  setProcessform,
  selectedRow,
  getprocessdataList,
  submitProcessform,
}) {
  let addprocessState = {
    RefProcess: "",
    TgtRate: "",
    Machine_srl: "",
    Mprocess: "",
  };

  const handleClose = () => {
    setAlert(false);
    // processform.reset();
    setProcessform({
      RefProcess: "",
      TgtRate: "",
      Machine_srl: "",
      Mprocess: "",
    });
  };

  return (
    <div>
      <Modal show={alert} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "14px" }}>
            Magod Production Manager{" "}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ fontSize: "12px" }}>
          {" "}
          Are You sure you want add <b>{processform.RefProcess}</b>(
          <b>{processform.Mprocess}</b>) with Target Rate &nbsp;
          <b>{processform.TgtRate}</b>/hour to <b>{selectedRow.refName}?</b>
        </Modal.Body>

        <Modal.Footer>
          <button
            className="button-style group-button"
            onClick={() => submitProcessform()}
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
