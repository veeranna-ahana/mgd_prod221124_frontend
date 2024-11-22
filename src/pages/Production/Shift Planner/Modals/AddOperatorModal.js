
import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import axios from 'axios';



export default function AddOperatorModal({addoperator,setAddoperator}) {

    const handleClose=()=>{
        setAddoperator(false);
    }

  return (
    <div>
         <Modal show={addoperator} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "14px" }}>Add Operator</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ fontSize: "12px" }}>Operator Added</Modal.Body> 

        <Modal.Footer>
          <button className="button-style group-button" onClick={handleClose}>
            OK
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
