import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import PrintDailyShift from './PrintDailyShift';

export default function ModalPrintDailyShift({openPrintModal,setOpenPrintModal,rowselect,newData,setNewdata}) {
    const [fullscreen, setFullscreen] = useState(true);

  return (
   <>
    <Modal show={openPrintModal} fullscreen={fullscreen} onHide={() => setOpenPrintModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Print Daily Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body><PrintDailyShift rowselect={rowselect}
        newData={newData}
        setNewdata={setNewdata}
        /></Modal.Body>
      </Modal>
   </>
  )
}
