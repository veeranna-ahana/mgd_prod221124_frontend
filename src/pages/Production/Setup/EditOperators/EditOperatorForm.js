import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import AddShiftInChargeModal from "./AddOperatorModal";
import axios from "axios";
import { baseURL } from "../../../../api/baseUrl";
import GlobalModal from "../../GlobalModal";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function EditOperatorForm({
  rowselectOperator,
  getOperatorData,
  setRowSelectOperator,
  getOperatorlist,
}) {
  // Open Add Modal
  const [openAdd, setOpenAdd] = useState("");
  const onClickAdd = () => {
    setOpenAdd(true);
  };

  // Open Delete Modal
  const [deleteShitIc, setDeleteShiftIc] = useState("");
  const onClickDeleteShiftIc = () => {
    setDeleteShiftIc(true);
  };

  //close delete
  const handlecloseDelete = () => {
    setDeleteShiftIc(false);
  };

  //handle submit DELETE
  const handleSubmit = () => {
    axios
      .post(baseURL + "/EditOperator/deleteOperator", { rowselectOperator })
      .then((response) => {
        // console.log(response.data);
        handlecloseDelete();
        toast.success("Operator Deleted Successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        getOperatorData();
        setRowSelectOperator({ ...getOperatorlist[0], index: 0 });
      });
  };

  // Save button
  const saveOperatorData = () => {
    axios
      .post(baseURL + "/EditOperator/saveOperator", { rowselectOperator })
      .then((response) => {
        toast.success("Saved Successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        // console.log(response.data);
        getOperatorData();
      });
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the corresponding property in rowselectOperator
    setRowSelectOperator((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //close
  const navigate = useNavigate();
  const onClickClose = () => {
    navigate("/Production");
  };

  return (
    <div className="ip-box form-bg">
      <GlobalModal
        show={deleteShitIc}
        title="magod_shiftIncharge"
        content={
          <h5 style={{ fontSize: "12px" }}>
            Are You sure you want to Delete{" "}
            <strong>{rowselectOperator.Name}</strong> ?
          </h5>
        }
        onYesClick={handleSubmit}
        onNoClick={handlecloseDelete}
        onClose={handlecloseDelete}
      />

      <div className="d-flex col-md-7" style={{ gap: "10px" }}>
        <label className="form-label" style={{ whiteSpace: "nowrap" }}>
          Shift InCharge
        </label>
        <input
          className="input-field"
          name="Name"
          value={rowselectOperator.Name || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="d-flex col-md-7" style={{ gap: "34px" }}>
        <label className="form-label" style={{ whiteSpace: "nowrap" }}>
          Skill Level
        </label>
        <input
          className="input-field"
          name="Skill_Level"
          value={rowselectOperator.Skill_Level || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="d-flex col-md-7" style={{ gap: "55px" }}>
        <label className="form-label">Status</label>
        <input
          className="input-field"
          name="Status"
          value={rowselectOperator.Status || ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="mt-1 mb-2">
        <button className="button-style group-button" onClick={onClickAdd}>
          Add
        </button>
        <button
          className="button-style group-button"
          onClick={saveOperatorData}
        >
          Save
        </button>
        <button
          className="button-style group-button"
          onClick={onClickDeleteShiftIc}
        >
          Delete
        </button>
        <button className="button-style group-button" onClick={onClickClose}>
          Close
        </button>
      </div>

      <AddShiftInChargeModal
        openAdd={openAdd}
        setOpenAdd={setOpenAdd}
        getOperatorData={getOperatorData}
      />
    </div>
  );
}
