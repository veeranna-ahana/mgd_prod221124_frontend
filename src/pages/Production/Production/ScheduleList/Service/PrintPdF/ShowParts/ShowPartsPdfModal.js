import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ShowPartsPdf from './ShowPartsPdf';

 export default function ShowPartsPdfModal({setOpenShowParts,openShowparts,rowselect,processrowselect,partlistdata,location}) {
  const [fullscreen, setFullscreen] = useState(true);


  return (
    <>
      <Modal show={openShowparts} fullscreen={fullscreen} onHide={() => setOpenShowParts(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Show Parts Pdf</Modal.Title>
        </Modal.Header>
        <Modal.Body><ShowPartsPdf 
        rowselect={rowselect}
        processrowselect={processrowselect}
        partlistdata={partlistdata} location={location}/></Modal.Body>
      </Modal>
    </>
  );
}

