import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ThirdModal from "./ThirdModule";
import axios from "axios";
import { useGlobalContext } from "../../../../../Context/Context";
import { baseURL } from "../../../../../api/baseUrl";

export default function MachineModal({ open, setOpen, formdata, setFormdata }) {
  // useEffect(()=>{
  //   handleC();
  // },[])

  // console.log("Im data",formdata.refName)

  const { MachineTabledata } = useGlobalContext();
  const [finalresponse, setFinalresponse] = React.useState("");
  let initialState = {
    manufacturer: "",
    refName: "",
    model: "",
    machine_Type: "",
  };
  const handleClose = () => {
    setOpen(false);
    setFormdata({ manufacturer: "", refName: "", model: "", Machine_Type: "" });
  }
  
  const [modalopen, setModalopen] = React.useState(false);

  const openThirdmodal = () => {
    // console.log(formdata);
    setModalopen(true);
    setOpen(false);
    axios
      .post(baseURL + "/productionSetup/addNewMachine", {
        ...formdata,
      })
      .then((response) => {
        // console.log("sent", response)
        // console.log("final response", response.data)
        setFinalresponse(response.data);
        setFormdata(initialState);
        MachineTabledata();
      });
  };

  return (
    <div>
      {
        <ThirdModal
          modalopen={modalopen}
          setModalopen={setModalopen}
          finalresponse={finalresponse}
        />
      }

      {/* <Button variant="primary" >Launch demo modal</Button> */}

      {/* <div className="row justify-content-center mt-3 mb-2">
        <Button variant="primary" onClick={handleShow}>
            Save Changes
          </Button>
    </div> */}

      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "14px" }}>
            Magod Production Manager
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ fontSize: "12px" }}>
          Do you wish to add <b>{formdata.manufacturer}</b>,
          <b>{formdata.model}</b> as &nbsp;
          <b>{formdata.refName}</b>
          &nbsp; to Magod Machine List?
        </Modal.Body>

        <Modal.Footer>
          <button
            className="button-style group-button"
            onClick={() => openThirdmodal()}
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
