import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import ReasonAskModal from "./ReasonAskModal";
import { baseURL } from "../../../../api/baseUrl";

export default function AddReason({
  openAddReason,
  setOpenAddReason,
  selectedGroup,
  setGetReasonsList,
}) {


  const [openreasonModal, setOpenreasonModal] = useState(false);

  const handleModal = () => {
    if (reason.trim() === "") {
      toast.error("Reason cannot be empty", {
        position: toast.POSITION.TOP_CENTER,
      });
      setOpenreasonModal(false);
    } else {
      setOpenreasonModal(true);
    }
  };

  const newHandleClose = () => {
    setOpenreasonModal(false);
  };

  const [reason, setReason] = useState("");
  const handlereason = (event) => {
    setReason(event.target.value);
  };

  const addReason = async () => {
    try {
      // First API call
      const response1 = await axios.post(baseURL + "/reports/addReason", {
        Reason: reason,
        GroupId: selectedGroup.StoppageGpId,
      });
      console.log(response1.data);
      setOpenreasonModal(false);
      handleClose();
      toast.success("Reason added successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      // Introduce a delay of 1000 milliseconds (1 second)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Second API call after the delay
      const response2 = await axios.post(baseURL + "/reports/getReason", {
        StoppageGpId: selectedGroup?.StoppageGpId,
      });
      console.log(response2.data);
      setGetReasonsList(response2.data);
      setReason("");
    } catch (error) {
      // Handle errors here
      console.error(error);
    }
  };

  const handleClose = () => {
    setOpenAddReason(false);
    setReason("");
  };

  return (
    <Modal show={openAddReason} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: "14px" }}>
          Magod Laser:Add Reason
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {openreasonModal ? null : (
          <div className="col-md-12 col-sm-12 ip-box form-bg">
            <div>
              <div className="row">
                <div className="d-flex col-md-12" style={{ gap: "10px" }}>
                  <label
                    className="form-label"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Group Name
                  </label>
                  <input
                    className="input-field"
                    value={selectedGroup.GroupName}
                    disabled
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="d-flex col-md-12" style={{ gap: "42px" }}>
                  <label className="form-label">Reason</label>
                  <input
                    className="input-field"
                    value={reason}
                    onChange={handlereason}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        {openreasonModal ? null : (
          <button className="button-style group-button" onClick={handleModal}>
            Add
          </button>
        )}
        <button className="button-style group-button" onClick={handleClose}>Exit</button>
      </Modal.Footer>

      <ReasonAskModal
        show={openreasonModal}
        handleClose={newHandleClose}
        handleadd={addReason}
        reason={reason}
        selectedGroup={selectedGroup}
      />
    </Modal>
  );
}
