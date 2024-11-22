import React from 'react';
import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

export default function ChangeMachinePopUp({open, setOpen}) {

    const handleClose=()=>{
        setOpen(false)
    }
  return (
    <div>
       <Modal show={open}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Magod Production Manager</Modal.Title>
        </Modal.Header>
        <Modal.Body>   
            <p>Do you wish change machinr  from Laser 23 to Laser 27 </p>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" type='submit' >
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No 
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}
