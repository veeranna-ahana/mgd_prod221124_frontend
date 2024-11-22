import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ProductionListPdf from './ProductionListPdf';
import { useGlobalContext } from '../../../../../../../Context/Context';

 export default function ProductionListModalFabrication({openProductionList,setOpenProductionList,rowselect,processrowselect,partlistdata}) {
  const [fullscreen, setFullscreen] = useState(true);

  const { selectedRowsFabrication } = useGlobalContext();


  return (
    <>
      <Modal show={openProductionList} fullscreen={fullscreen} onHide={() => setOpenProductionList(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Production List</Modal.Title>
        </Modal.Header>
        <Modal.Body><ProductionListPdf selectedRows={selectedRowsFabrication} /></Modal.Body>
      </Modal>
    </>
  );
}

