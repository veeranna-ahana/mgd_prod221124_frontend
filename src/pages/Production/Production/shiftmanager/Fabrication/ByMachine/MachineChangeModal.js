import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { baseURL } from '../../../../../../api/baseUrl';


export default function MachineChangeModal({changeMachine,setChangeMachine,selectProgramProcessing,setSelectProgramProcessing,selectedMachine,setOpenChangeMachine}) {
    const handleClose=()=>{
        setChangeMachine(false);
        setOpenChangeMachine(false);
    }

    const onClickYes=()=>{
        axios.post(baseURL+'/shiftManagerProfile/changeMachine',{...selectProgramProcessing,NewMachine : selectedMachine })
        .then((response) => {
          console.log('Current State of programCompleteData' , response.data);
          handleClose();
           const constSelectProgramCompleted = selectProgramProcessing;
           constSelectProgramCompleted.Machine = selectedMachine;
           setSelectProgramProcessing(constSelectProgramCompleted)
      
       })
        toast.success('Machine Name Changed',{
            position: toast.POSITION.TOP_CENTER
        })
        handleClose();
    }
  return (
    <>
    <Modal show={changeMachine}>
    <Modal.Header closeButton  onClick={handleClose}>
          <Modal.Title>Machine Selection Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you wish to shift Program No {selectProgramProcessing.NCProgramNo} from {selectProgramProcessing.Machine} To laser {selectedMachine}?
        </Modal.Body>
        <Modal.Footer>
        <Button style={{backgroundColor:"#2b3a55",border:"#2b3a55"}} onClick={onClickYes} >
           Yes
          </Button>
          <Button variant="secondary"  onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
  </Modal>

  </>
  )
}


