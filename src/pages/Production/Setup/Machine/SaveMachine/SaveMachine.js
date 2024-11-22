import React,{useEffect, useState}from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function SaveMachine({opensavemachine,setOpensavemachine,selectedRow}) {
    const handleClose = () => setOpensavemachine(false);
    // console.log(selectedRow.refName)
    
  return (
    <div>
      <Modal show={opensavemachine} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>SAVE MACHINE</Modal.Title>
        </Modal.Header>

        <Modal.Body> Machine  Details saved</Modal.Body>

        <Modal.Footer>
          <Button style={{backgroundColor:"#2b3a55",border:"#2b3a55"}} onClick={handleClose} >
            OK
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}
