import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ProductionListPdf from './ProductionListPdf';
import { useGlobalContext } from '../../../../../../../Context/Context';

 export default function ProductionListModal({openProductionList,setOpenProductionList,rowselect,processrowselect,partlistdata,location}) {
  const [fullscreen, setFullscreen] = useState(true);

  const { selectedRows } = useGlobalContext();


  return (
    <>
      <Modal show={openProductionList} fullscreen={fullscreen} onHide={() => setOpenProductionList(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Production List</Modal.Title>
        </Modal.Header>
        <Modal.Body><ProductionListPdf selectedRows={selectedRows}
        location={location}
         /></Modal.Body>
      </Modal>
    </>
  );
}

