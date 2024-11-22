import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import DeleteAskModal from "../StoppageList/DeleteAskModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../../../../api/baseUrl";

export default function AddGroupName({
  openAddGroup,
  setOpenAddGroup,
  getGroupName,
  setGetGroupNameList,
}) {


  const [showInnerModal, setShowInnerModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    if (groupName.trim() === "") {
      // Display an error toast message if the input field is empty
      toast.error("Group Name cannot be empty", {
        position: toast.POSITION.TOP_CENTER,
      });
      setShowInnerModal(false);
    } else {
      // Open the modal or perform other actions if the input is valid
      setShowInnerModal(true);
    }
  };
  const newHandleClose = () => {
    setOpenModal(false);
  };

  const addGroupName = async () => {
    try {
      // First API call
      const response1 = await axios.post(baseURL + "/reports/addGroupName", {
        GroupName: groupName,
      });


      setOpenModal(false);
      setOpenAddGroup(false);

      toast.success("Group name added successfully", {
        position: toast.POSITION.TOP_CENTER,
      });

      // Introduce a delay of 1000 milliseconds (1 second)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Second API call after the delay
      const response2 = await axios.get(baseURL + "/reports/getGroupName", {});

      setGetGroupNameList(response2.data);
    } catch (error) {
      // Handle errors here
      console.error(error);
    }
  };

  const [groupName, setGroupName] = useState("");
  const handlegroupname = (event) => {
    const addedtext = event.target.value;
    setGroupName(addedtext);
  };

  const handleClose = () => {
    setOpenAddGroup(false);
    setGroupName("");

  };

  return (
    <Modal show={openAddGroup} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: "14px" }}>
          Magod Laser:Add Group Name
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ display: showInnerModal ? "none" : "block" }}>
        {/* <h5 className='ms-2'>{selectedRow.refName}</h5> */}
        <div className="col-md-12 col-sm-12 ip-box form-bg">
          <div>
            <div className="row">
              <div className="d-flex col-md-12 mb-4" style={{ gap: "10px" }}>
                <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                  Group Name
                </label>
                <input
                  className="input-field"
                  value={groupName}
                  onChange={handlegroupname}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <button
          className="button-style group-button"
          onClick={() => {
            handleModal();
          }}
        >
          Add
        </button>

        <button className="button-style group-button" onClick={handleClose}>
          Exit
        </button>
      </Modal.Footer>

      {showInnerModal && (
        <DeleteAskModal
          show={showInnerModal}
          handleClose={() => {
            setShowInnerModal(false);
            setOpenAddGroup(true); // Show the outer modal again if needed
          }}
          data={{
            title: <span style={{ fontSize: "14px" }}>Add GroupName</span>,
            content: (
              <div style={{ fontSize: "12px" }}>
                Are you sure you want to add <strong>{groupName}</strong> for
                GroupName?
              </div>
            ),
          }}
          handleDelete={addGroupName}
          groupName={groupName}
        />
      )}
    </Modal>
  );
}
