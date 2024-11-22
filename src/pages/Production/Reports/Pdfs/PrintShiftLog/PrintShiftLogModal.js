import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import DailyReportsPdf from './ShiftLogPdf';
import ShiftLogPdf from './ShiftLogPdf';

 export default function PrintShiftLogModal({openShiftLog,setOpenShiftLog,sortedMachineLogs,dateSelect,location}) {
  const [fullscreen, setFullscreen] = useState(true);


  return (
    <>
      <Modal show={openShiftLog} fullscreen={fullscreen} onHide={() => setOpenShiftLog(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Show Parts Pdf</Modal.Title>
        </Modal.Header>
        <Modal.Body><ShiftLogPdf sortedMachineLogs={sortedMachineLogs}
        dateSelect={dateSelect}
        location={location}
        /></Modal.Body>
      </Modal>
    </>
  );
}

