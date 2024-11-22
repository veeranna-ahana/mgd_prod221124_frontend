import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import PrintWeeklyplan from './PrintPriority';
import PrintPriority from './PrintPriority';

 export default function ModalPrintPriority({setOpenPrint,openPrint,priorityTable,location}) {
//   const values = [true, 'sm-down', 'md-down', 'lg-down', 'xl-down', 'xxl-down'];
  const [fullscreen, setFullscreen] = useState(true);


//   function handleShow(breakpoint) {
//     setFullscreen(breakpoint);
//     setShow(true);
//   }

  return (
    <>
      <Modal show={openPrint} fullscreen={fullscreen} onHide={() => setOpenPrint(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Print Priority Table</Modal.Title>
        </Modal.Header>
        <Modal.Body><PrintPriority priorityTable={priorityTable}
        location={location}
        /></Modal.Body>
      </Modal>
    </>
  );
}

