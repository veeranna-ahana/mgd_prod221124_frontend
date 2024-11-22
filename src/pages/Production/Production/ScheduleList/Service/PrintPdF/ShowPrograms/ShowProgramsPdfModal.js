import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ShowProgramsPdf from './ShowProgramsPdf';

 export default function ShowProgramsPdfModal({setOpenShowPrograms,openShowPrograms,rowselect,processrowselect,programlistdata,location}) {
  const [fullscreen, setFullscreen] = useState(true);
  console.log(programlistdata);

  return (
    <>
      <Modal show={openShowPrograms} fullscreen={fullscreen} onHide={() => setOpenShowPrograms(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Show Program Report</Modal.Title>
        </Modal.Header>
        <Modal.Body><ShowProgramsPdf 
        rowselect={rowselect}
        processrowselect={processrowselect}
        programlistdata={programlistdata} location={location}/></Modal.Body>
      </Modal>
    </>
  );
}

