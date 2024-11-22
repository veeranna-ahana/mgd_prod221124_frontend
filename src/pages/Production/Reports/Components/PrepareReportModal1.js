import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PrepareReportModal2 from './PrepareReportModal2';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function PrepareReportModal1({prepareReport1,setPrepareReport,dateSelect,setStatus,preparedby}) {

  // console.log("preparedby in next modal is",preparedby,"type is",typeof(preparedby));

    const handleClose=()=>{
        setPrepareReport(false);
    }

    const[prepareReport2,setPrepareReport2]=useState('')
    const openprepareReport2=()=>{
      if(!preparedby || preparedby.trim() === '' ){
        handleClose();
        toast.error('Enter Your Name in Prepared By box', {
          position: toast.POSITION.TOP_CENTER,
        });     
       }
      else{
        handleClose();
        setPrepareReport2(true);
      }
    }
  return (
    <div>
      <PrepareReportModal2
      prepareReport2={prepareReport2}
      setPrepareReport2={setPrepareReport2}
      dateSelect={dateSelect}
      setStatus={setStatus}
      />

        <Modal show={prepareReport1} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Magod Production Manager</Modal.Title>
        </Modal.Header>

        <Modal.Body>Machine Utilisation Report OK</Modal.Body>

        <Modal.Footer>
          <Button
            style={{ backgroundColor: "#2b3a55", border: "#2b3a55"}}
            onClick={openprepareReport2}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
