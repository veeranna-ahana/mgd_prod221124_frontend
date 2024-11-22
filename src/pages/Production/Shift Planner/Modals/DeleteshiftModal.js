import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import axios from 'axios';



export default function DeleteshiftModal({opendeleteshift,setOpendeleteshift,onClickDeleteWeekShift,
  selectedShift,selectedShiftIncharge,selectedWeek,setSelectedShift,setSelectedShiftIncharge}) {

    const handleClose=()=>{
        setOpendeleteshift(false);
    }

    const onClickonClickDeleteWeekShift=()=>{
      onClickDeleteWeekShift();
      handleClose();
      setSelectedShift("");
      setSelectedShiftIncharge("")
    }
    // console.log(selectedShift)

  return (
    <div>
         <Modal show={opendeleteshift} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "14px" }}>Delete Shift</Modal.Title>
        </Modal.Header>

        {selectedShift ? (
          <Modal.Body style={{ fontSize: "12px" }}>Are You sure want to Delete <b> {selectedShift}</b>  shift  for the week?
          </Modal.Body>
        ) : (
          <Modal.Body style={{ fontSize: "12px" }}>
            Please select <b>Shift</b> before deleting
          </Modal.Body>
        )}
        
         
          
        <Modal.Footer>
          {selectedShift ? (
            <>
              <button className="button-style group-button" onClick={onClickonClickDeleteWeekShift}>
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
