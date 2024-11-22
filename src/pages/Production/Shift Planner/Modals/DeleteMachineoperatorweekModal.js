
import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import axios from 'axios';

export default function DeleteMachineoperatorweekModal({opendeleteoperator,setOpendeleteoperator,
    onClickDeleteWeekOperatorMachine,selectedOperator,selectedWeek,selectedMachine,selectedShift}) {

    const handleClose=()=>{
        setOpendeleteoperator(false);
    }

  return (
    <div>
         <Modal show={opendeleteoperator} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "14px" }}>Delete Machine Operator for week</Modal.Title>
        </Modal.Header>

        
        {selectedOperator && selectedMachine && selectedShift ? (
         <Modal.Body style={{ fontSize: "12px" }}>Are you sure want to delete <b>{selectedOperator}</b> for <b>{selectedMachine}</b> for 
         <b>{selectedShift}</b> shift?
        </Modal.Body> 
        ) : (
          <Modal.Body style={{ fontSize: "12px" }}>
            Please select <b>Shift</b> ,<b>Operator</b> and <b>Machine</b> before deleting
          </Modal.Body>
        )}
        

        <Modal.Footer>
          {selectedOperator && selectedMachine && selectedShift ? (
            <>
             <button className="button-style group-button" onClick={()=>{handleClose()
          onClickDeleteWeekOperatorMachine()}}>
           Yes
          </button>
          <button className="button-style group-button" onClick={handleClose}>
          No
          </button>
            </>
          ) : (
            <button className="button-style group-button" onClick={handleClose}>
              OK
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  )
}
