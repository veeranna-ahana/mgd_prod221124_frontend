import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import GlobalModal from "../../GlobalModal";
import axios from "axios";
import { baseURL } from "../../../../api/baseUrl";
import { ToastContainer, toast } from "react-toastify";

export default function AddOperatorModal({
  openAdd,
  setOpenAdd,
  getOperatorData,
}) {
  const handleClose = () => {
    setOpenAdd(false);
  };

  const [Operator, setOperator] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [status, setStatus] = useState("");

  const handleChangeShiftIc = (e) => {
    setOperator(e.target.value);
  };

  const handleChangeSkillLevel = (e) => {
    setSkillLevel(e.target.value);
  };

  const handleChangeStaus = (e) => {
    setStatus(e.target.value);
  };

  const [AddShiftInChargeModal, setAddShiftInChargeModal] = useState(false);
  const addShiftInCharge = () => {
    setOpenAdd(false);
    setAddShiftInChargeModal(true);
  };

  const handleSubmit = () => {
    axios
      .post(baseURL + "/EditOperator/addOperator", {
        Name: Operator,
        skilllevel: skillLevel,
        status: status,
      })
      .then((response) => {
        setOpenAdd(false);
        setAddShiftInChargeModal(false);
        if (response.data === "Name already present") {
          toast.error("Operator already present", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else if (response.data === "Insert successful") {
          toast.success("Operator Added Successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          console.log("");
        }
        getOperatorData();
      });
  };

  const handleCloseAdd = () => {
    setAddShiftInChargeModal(false);
  };

  return (
    <>
      <Modal show={openAdd} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "14px" }}>
            Magod Laser:Add Operator
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="col-md-12 col-sm-12 ip-box form-bg">
            <div className="row">
              <div className="d-flex col-md-12" style={{ gap: "15px" }}>
                <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                  Operator
                </label>
                <input className="input-field" onChange={handleChangeShiftIc} />
              </div>
            </div>

            <div className="row">
              <div className="d-flex col-md-12" style={{ gap: "10px" }}>
                <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                  Skill Level
                </label>
                <input
                  className="input-field"
                  onChange={handleChangeSkillLevel}
                />
              </div>
            </div>

            <div className="row">
              <div className="d-flex col-md-12 mb-2" style={{ gap: "30px" }}>
                <label className="form-label">Status</label>
                <input className="input-field" onChange={handleChangeStaus} />
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button
            className="button-style group-button"
            onClick={addShiftInCharge}
          >
            Add
          </button>

          <button className="button-style group-button" onClick={handleClose}>
            Exit
          </button>
        </Modal.Footer>
      </Modal>
      {AddShiftInChargeModal && (
        <GlobalModal
          show={AddShiftInChargeModal}
          title="magod_Operator"
          content={
            <h5 style={{ fontSize: "12px" }}>
              Are You sure you want to add <strong>{Operator}</strong> ?
            </h5>
          }
          onYesClick={handleSubmit}
          onNoClick={handleCloseAdd}
          onClose={handleCloseAdd}
        />
      )}
    </>
  );
}
