import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PrepareReportModal3 from './PrepareReportModal3';

export default function PrepareReportModal2({prepareReport2,setPrepareReport2,dateSelect,setStatus}) {
    const handleClose=()=>{
      setPrepareReport2(false);
    }

    const[prepareReport3,setPrepareReport3]=useState('');
    const openprepareReport3=()=>{
      // console.log("function Called")
      setPrepareReport3(true);
      setPrepareReport2(false);
    }
  return (
    <div>
      <PrepareReportModal3
      prepareReport3={prepareReport3}
      setPrepareReport3={setPrepareReport3}
      dateSelect={dateSelect}
      setStatus={setStatus}
      />

        <Modal show={prepareReport2} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Magod Production Manager</Modal.Title>
        </Modal.Header>

        <Modal.Body>You Will not be able to make Any Changes after this to the Day Report.Do you wish to Countinue</Modal.Body>

        <Modal.Footer>
          <Button
            style={{ backgroundColor: "#2b3a55", border: "#2b3a55"}} onClick={openprepareReport3}>
             Yes
          </Button>
          <Button
            variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
