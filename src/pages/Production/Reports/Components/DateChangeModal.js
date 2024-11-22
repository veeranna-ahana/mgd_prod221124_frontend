import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function DateChangeModal({ alert, setAlert, machineLogSelectedRow }) {
  const [fromTime, setFromTime] = useState(machineLogSelectedRow.FromTime);
  const [toTime, setToTime] = useState(machineLogSelectedRow.ToTime);

  const handleClose = () => {
    setAlert(false);
  };

  const handleFromTimeChange = (event) => {
    setFromTime(event.target.value);
  };

  const handleToTimeChange = (event) => {
    setToTime(event.target.value);
  };

  const handleSubmit = () => {
    if (fromTime < toTime) {
      // Update the machineLogSelectedRow array with the new values
      machineLogSelectedRow.FromTime = fromTime;
      machineLogSelectedRow.ToTime = toTime;
    } else {
      alert('FromTime should not be greater than ToTime');
    }
    handleClose();
  };

  return (
    <div>
      <Modal show={alert} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Magod Production Manager</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className='row'>
            <div className="col-md-6">
              <label className="form-label">FromTime</label>
              <input className='in-field' value={fromTime} onChange={handleFromTimeChange} />
            </div>

            <div className="col-md-6">
              <label className="form-label">ToTime</label>
              <input className='in-field' value={toTime} onChange={handleToTimeChange} />
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            style={{ backgroundColor: "#2b3a55", border: "#2b3a55", marginRight: "180px", width: "120px" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
