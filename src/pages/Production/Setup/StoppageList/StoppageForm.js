import React, { useEffect, useState } from "react";
import AddGroupName from "./AddGroupName";
import AddReason from "./AddReason";
import DeleteResonModal from "./DeleteResonModal";
import StoppageReasonTable from "./StoppageReasonTable";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteGroupModal from "./DeleteGroupModal";
import { baseURL } from "../../../../api/baseUrl";
import { useNavigate } from "react-router-dom";

export default function StoppageForm({
  selectedGroup,
  getGroupName,
  setGetGroupNameList,
  setSelectedGroup,
  getGroupNameList,
}) {
  const [getReasonsList, setGetReasonsList] = useState([]);

  const getReasons = () => {
    axios
      .post(baseURL + "/reports/getReason", {
        StoppageGpId: selectedGroup?.StoppageGpId,
      })
      .then((response) => {
        setGetReasonsList(response.data);
      });
  };

  useEffect(() => {
    getReasons();
  }, [selectedGroup]);

  const [selectedReason, setSelectedReason] = useState({});

  const selectReasonFun = (item, index) => {
    let list = { ...item, index: index };
    setSelectedReason(list);
  };


  //open AddGroupName
  const [openAddGroup, setOpenAddGroup] = useState(false);
  const openAddGroupNameModal = () => {
    setOpenAddGroup(true);
  };

  //open Reason
  const [openAddReason, setOpenAddReason] = useState(false);
  const openAddReasonModal = () => {
    setOpenAddReason(true);
  };

  //Delete GroupName
  const [showModal, setShowModal] = useState(false);
  const [showReasonModal, setshowReasonModal] = useState(false);
  const [modalData, setModalData] = useState({
    title: "Delete GroupName",
    content: `Are you sure you want to delete ${selectedGroup?.Stoppage}?`,
  });

  const [ReasonmodalData, setReasonModalData] = useState({
    title: "Delete Reason",
    content: `Are you sure you want to delete ${selectedReason?.Stoppage}?`,
  });

  const handleShowModal = (data) => {
    setModalData(data);
    setShowModal(true);
  };

  const handleShowReaonModal = (data) => {
    setReasonModalData(data);
    setshowReasonModal(true);
  };

  const handleCloseReasonModal = () => {
    setshowReasonModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const DeleteGroup = async () => {
    try {
      // First API call
      const response1 = await axios.post(baseURL + "/reports/deleteGroup", {
        StoppageGpId: selectedGroup?.StoppageGpId,
      });
      setShowModal(false);
      toast.success("Group Deleted successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      // Introduce a delay of 1000 milliseconds (1 second)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Second API call after the delay
      const response2 = await axios.get(baseURL + "/reports/getGroupName", {});
      console.log(response2.data);
      setGetGroupNameList(response2.data);
    } catch (error) {
      // Handle errors here
      console.error(error);
    }
    setSelectedGroup({ ...getGroupNameList[0], index: 0 });
  };

  const DeleteReason = () => {
    console.log(selectedReason.StoppageID);
    axios
      .post(baseURL + "/reports/deleteReason", {
        StoppageID: selectedReason.StoppageID,
      })
      .then((response) => {
        console.log("delete function called");
        setshowReasonModal(false);
        toast.success("Reason Deleted successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        axios
          .post(baseURL + "/reports/getReason", {
            StoppageGpId: selectedGroup?.StoppageGpId,
          })
          .then((response) => {
            setGetReasonsList(response.data);
          });
      });
  };

  const navigate = useNavigate();
  const onClickClose = () => {
    navigate("/Production");
  };

  return (
    <div>
      <div className="ip-box form-bg">
        <AddGroupName
          openAddGroup={openAddGroup}
          setOpenAddGroup={setOpenAddGroup}
          getGroupName={getGroupName}
          setGetGroupNameList={setGetGroupNameList}
        />

        <AddReason
          openAddReason={openAddReason}
          setOpenAddReason={setOpenAddReason}
          selectedGroup={selectedGroup}
          setGetReasonsList={setGetReasonsList}
        />

        <DeleteResonModal
          show={showReasonModal}
          handleClose={handleCloseReasonModal}
          data={ReasonmodalData}
          handleDelete={DeleteReason}
          selectedReason={selectedReason}
        />

        <DeleteGroupModal
          show={showModal}
          handleClose={handleCloseModal}
          data={modalData}
          handleGroup={DeleteGroup}
        />

        <div className="row">
          <div className="col-md-9">
            <div className="d-flex col-md-12" style={{ gap: "10px" }}>
              <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                Group Name
              </label>

              <input
                className="input-field"
                value={selectedGroup.GroupName || " "}
                disabled
              />
            </div>
          </div>
        </div>

        <div className="row mt-1 mb-1">
          <div>
            <button
              className="button-style group-button"
              type="button"
              onClick={openAddGroupNameModal}
            >
              Add Group Name
            </button>

            <button
              className="button-style group-button"
              onClick={() =>
                handleShowModal({
                  title: "Delete GroupName",
                  content: (
                    <div>
                      Are you sure you want to delete{" "}
                      <strong>{selectedGroup.GroupName}</strong> from selected
                      Group Name
                    </div>
                  ),
                })
              }
            >
              Delete Group
            </button>

            <button
              className="button-style group-button"
              type="button"
              onClick={openAddReasonModal}
            >
              Add Reason
            </button>

            <button
              className="button-style group-button"
              type="button"
              onClick={() => {
                console.log("Delete Reason button clicked");

                handleShowReaonModal({
                  title: "Delete Reason",

                  content: (
                    <div>
                      Are you sure you want to Delete{" "}
                      <strong>{selectedReason?.Stoppage}</strong>?
                    </div>
                  ),
                });
              }}
            >
              Delete Reason
            </button>

            <button
              className="button-style group-button"
              type="button"
              onClick={onClickClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <div>
        <StoppageReasonTable
          selectedGroup={selectedGroup}
          selectedReason={selectedReason}
          selectReasonFun={selectReasonFun}
          getReasonsList={getReasonsList}
        />
      </div>
    </div>
  );
}
