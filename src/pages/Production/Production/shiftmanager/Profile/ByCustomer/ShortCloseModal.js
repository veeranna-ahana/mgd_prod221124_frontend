import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { baseURL } from '../../../../../../api/baseUrl';
import axios from 'axios';

export default function ShortCloseModal({openShortClose,setOpenShortClose,response1,selectProgramCompleted,custCode,setSelectProgramCompleted,setProgramCompleted}) {
    const handleClose=()=>{
        setOpenShortClose(false)
    }

    const onClickYes=()=>{
        axios
    .post(
      baseURL + "/shiftManagerProfile/updateClosed",
      selectProgramCompleted
    )
    .then((response) => {
        console.log(response.data)
    });
    handleClose();
    axios
      .post(baseURL + "/shiftManagerProfile/CustomerProgramesCompleted", {
        Cust_Code: custCode,
      })
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (
            response.data[i].ActualTime <
            0.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#339900";
          } else if (
            response.data[i].ActualTime <
            0.75 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#82c2b4";
          } else if (
            response.data[i].ActualTime <
            0.9 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
          } else if (
            response.data[i].ActualTime <
            1.1 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
          } else if (
            response.data[i].ActualTime <
            1.25 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FF7F50";
          } else if (
            response.data[i].ActualTime <
            1.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FFA500";
          } else {
            response.data[i].rowColor = "#ff0000";
          }
        }
        setProgramCompleted(response.data);
        setSelectProgramCompleted({...response.data[0],index:0})
        console.log("AFTER ADDING COLOR", response.data);
      });
    }

    const onClickNo=()=>{
        axios
    .post(
      baseURL + "/shiftManagerProfile/updateMtrlIssue",
      selectProgramCompleted
    )
    .then((response) => {
        console.log(response.data)
    });
    handleClose();
    axios
      .post(baseURL + "/shiftManagerProfile/CustomerProgramesCompleted", {
        Cust_Code: custCode,
      })
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (
            response.data[i].ActualTime <
            0.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#339900";
          } else if (
            response.data[i].ActualTime <
            0.75 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#82c2b4";
          } else if (
            response.data[i].ActualTime <
            0.9 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
          } else if (
            response.data[i].ActualTime <
            1.1 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
          } else if (
            response.data[i].ActualTime <
            1.25 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FF7F50";
          } else if (
            response.data[i].ActualTime <
            1.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FFA500";
          } else {
            response.data[i].rowColor = "#ff0000";
          }
        }
        setProgramCompleted(response.data);
        setSelectProgramCompleted({...response.data[0],index:0})
        console.log("AFTER ADDING COLOR", response.data);
      });
    }


  return (
    <Modal show={openShortClose}>
    <Modal.Header closeButton  onClick={handleClose}>
          <Modal.Title>Production Manager</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         {response1}
        </Modal.Body>
        <Modal.Footer>
        <Button style={{backgroundColor:"#2b3a55",border:"#2b3a55"}} onClick={onClickYes} >
           Yes
          </Button>
          <Button variant='secondary' onClick={onClickNo}>
           No
          </Button>
        </Modal.Footer>
  </Modal>

  )
}
