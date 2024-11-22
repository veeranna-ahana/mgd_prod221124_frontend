import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function DeleteOperatorForDayAsk({ openmodal, setOpenModal, data, onDeleteOperatorForDay }) {
  let ShiftDate = data?.ShiftDate ? data.ShiftDate.split(" ") : null;

  const handleClose = () => {
    setOpenModal(false);
  };


//Date format for shiftDate.
let formattedDate = '0';
  if (ShiftDate && ShiftDate[0]) {
    const shiftDate = ShiftDate[0]; 
    const [year, month, day] = shiftDate.split("-");
    formattedDate = `${day}/${month}/${year}`;
  }
  return (
    <div>
      <Modal show={openmodal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "14px" }}>Delete Operator For A Day</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: "12px" }}>
          Are You Sure You want to delete <b>{data.Operator}</b> for <b>{data.Machine}</b> on {ShiftDate ? <b>{formattedDate}</b> : 'N/A'}?
        </Modal.Body>
        <Modal.Footer>
          <button className="button-style group-button" onClick={()=>{onDeleteOperatorForDay()
        handleClose()}}>Yes</button>
          <button className="button-style group-button" onClick={handleClose}>No</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
