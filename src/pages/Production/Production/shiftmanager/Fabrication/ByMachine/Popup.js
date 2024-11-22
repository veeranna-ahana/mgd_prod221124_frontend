import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useState } from 'react';
import {baseURL} from "../../../../../../api/baseUrl"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import MachineChangeModal from './MachineChangeModal';


export default function Popup({openChnageMachine,setOpenChangeMachine,selectProgramProcessing,
   machineData,setSelectProgramProcessing}) {
// console.log(selectProgramProcessing)
// console.log('MACHINE DATA' , machineData[0].refName)
const [selectedMachine, setSelectedMachine] = useState("")

const handleClose = ()=>{
  setOpenChangeMachine(false);
}

const[changeMachineList,setChangeMachineList]=useState([])
const handleMachineChange = (e) => {
  setChangeMachineList(e.target.value);
  setSelectedMachine(e.target.value)
};


const changeMachineonClick = () => {
 changeMachineModal();
}

const[changeMachine,setChangeMachine]=useState('');
const changeMachineModal=()=>{
  setChangeMachine(true)
}

  return (
    <>
    <MachineChangeModal
    changeMachine={changeMachine}
    setChangeMachine={setChangeMachine}
    selectProgramProcessing={selectProgramProcessing}
    setSelectProgramProcessing={setSelectProgramProcessing}
    selectedMachine={selectedMachine}
    setOpenChangeMachine={setOpenChangeMachine}
    />

    <Modal show={openChnageMachine} size='lg'>
    <div 
    className="modal show"
    style={{ display: 'block', position: 'initial'}}
  >
    
    <Modal.Header closeButton  onClick={handleClose}>
          <Modal.Title>Machine Selection Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="col-md-12 col-sm-12">
          <div className="ip-box form-bg ">
            <div className="row">

              <div className="col-md-6">
                <label className="">Program No</label>
                <input  className='in-fields'
                value={selectProgramProcessing.NCProgramNo} />
              </div>

              <div className="col-md-6">
                <label className="">Machine</label>
                <input  className='in-fields' 
                 value={selectProgramProcessing.Machine}/>
              </div>

              <div className="col-md-6 mt-1">
                <label className="">Material</label>
                <input  className='in-fields'
                 value={selectProgramProcessing.Mtrl_Code} />
              </div>
          
              <div className="col-md-6 mb-3">
                 <label className="form-label">Change To</label>
                 <select className='ip-select' onChange={handleMachineChange}>
                    <option selected>Select Machine</option>
                    
                    {machineData.map((machineData) => (
                      <option value={machineData.refName}>{machineData.refName}</option>
                    ))}
                    
                  </select>
              </div>
              
              <div className="col-md-6">
                <label className="">Process</label>
                <input  className='in-fields'
                 value={selectProgramProcessing.MProcess} />
              </div>

             <div className="col-md-5">
              <button style={{ width:"150px"}} className="button-style mt-3 group-button"  onClick={changeMachineonClick}>
              Change Machine
              </button> 
            </div> 

              <div className="col-md-6 mb-3">
                <label className="">Status</label>
                <input  className='in-fields'
                 value={selectProgramProcessing.PStatus} />
              </div>  
            </div>
          </div>
        </div>
        </Modal.Body>
  </div>
  </Modal>

  </>
  )
}


