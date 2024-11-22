import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import PrintShowStatus from './PrintShowStatus';

export default function ShowStatusPdfModal({ setOpenShowStatus, openShowStatus, showStatusData,location }) {
  const [fullscreen, setFullscreen] = useState(true);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    // Debugging the showStatusData and its structure
    console.log("showStatusData:", showStatusData);
  
    // Check if showStatusData is not empty
    if (showStatusData && showStatusData.length > 0) {
      // Check if all 'data' arrays inside showStatusData have content
      const allDataLoaded = showStatusData.every(item => item.data && Array.isArray(item.data) && item.data.length > 0);
      console.log("allDataLoaded:", allDataLoaded);
      
      // Delay setting loading to false to ensure UI updates properly
      setTimeout(() => {
        setLoading(!allDataLoaded); // Set loading to false if all data arrays are loaded
      }, 100); // Adjust delay to your preference
    } else {
      // If showStatusData is empty or undefined, keep loading state true
      setLoading(true);
    }
  }, [showStatusData]); // Runs every time showStatusData changes

  console.log("showStatusData is",showStatusData);
  console.log("showStatusData is",showStatusData.length);


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
