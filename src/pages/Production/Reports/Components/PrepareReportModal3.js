import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useEffect } from 'react';
import { baseURL } from '../../../../api/baseUrl';

export default function PrepareReportModal3({prepareReport3,setPrepareReport3,dateSelect,setStatus}) {
    const handleClose=()=>{
        setPrepareReport3(false);   
    }
    const [prepareReportStatus, setPrepareReportStatus] = useState('');

    const getBoolean = () => {
      axios.post(baseURL+'/reports/prepare-report', { Date: dateSelect })
        .then((response) => {
          if (response.data.success && prepareReportStatus !== true) {
            setPrepareReportStatus(response.data.success);
          }
        })
        .catch((error) => {
          // Handle the error here
          console.error(error);
        })
        .finally(() => {
          handleClose();
          setStatus(true);
        });
    }
    
    // console.log(prepareReportStatus);
    
  return (
    <div>
        <Modal show={prepareReport3} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Magod Production Manager</Modal.Title>
        </Modal.Header>

        <Modal.Body>Export to HO will be implemented in later versions</Modal.Body>

        <Modal.Footer>
          <Button
            style={{ backgroundColor: "#2b3a55", border: "#2b3a55"}} onClick={getBoolean}>
             OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
