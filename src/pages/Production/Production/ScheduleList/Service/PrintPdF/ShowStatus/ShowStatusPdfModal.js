import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import PrintShowStatus from './PrintShowStatus';
import { useEffect } from 'react';

 export default function ShowStatusPdfModal({setOpenShowStatus,openShowStatus,showStatusData,location}) {
  const [fullscreen, setFullscreen] = useState(true);

  
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (showStatusData && showStatusData.length > 0) {
      setLoading(false); // Set loading to false when the data is available
    }
  }, [showStatusData]); // Run the effect whenever pdfData changes


  return (
    <>
      <Modal show={openShowStatus} fullscreen={fullscreen} onHide={() => setOpenShowStatus(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Production Status Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {loading ? (
            <div>Loading...</div>
          ) : (
            <PrintShowStatus showStatusData={showStatusData} location={location}/>
          )}
          </Modal.Body>
      </Modal>
    </>
  );
}

