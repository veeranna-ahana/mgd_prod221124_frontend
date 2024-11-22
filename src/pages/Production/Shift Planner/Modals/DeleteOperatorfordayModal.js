
import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import axios from 'axios';



export default function DeleteOperatorfordayModal({deleteoperator,setDeleteoperator}) {

    const handleClose=()=>{
        setDeleteoperator(false);
    }

  return (
    <div>
         <Modal show={deleteoperator} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "14px" }}>Delete Oprator</Modal.Title>
        </Modal.Header>
        

        <Modal.Body style={{ fontSize: "12px" }}> Machine Operator Deleted</Modal.Body> 

        <Modal.Footer>
          <button className="button-style group-button" onClick={handleClose}>
            OK
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
