import React,{useState, useEffect} from 'react' 
import { Button, Modal } from 'react-bootstrap';
import { Table } from 'react-bootstrap'
import axios from "axios";
import Popup from "./Popup"
import { baseURL } from '../../../../../../api/baseUrl';


export default function ProgramProcessingModal({show, setShow,selectProgramProcessing,machineData,taskNoOnClick,setSelectProgramProcessing
}) {
  const blockInvalidChar = e => ['e', 'E', '+', '-','.'].includes(e.key) && e.preventDefault();

  const [fullscreen, setFullscreen] = useState(true);

  const[programCompleteData,setProgramCompleteData]=useState([]);
  const[newprogramCompleteData,setNewProgramCompleteData]=useState([]);

  const[newpartlistdata,setNewPartlistdata]=useState([])

  const modalTable=()=>{
    axios.post(baseURL+'/shiftManagerProfile/shiftManagerncProgramTaskList',
    {...selectProgramProcessing})
   .then((response) => {
     console.log(response.data);
     setProgramCompleteData(response.data)
 })
  }

  
  useEffect(() => {
    modalTable();
  }, [selectProgramProcessing])

  const handleClose = () => setShow(false);

  //console.log(programCompleteData);

//Open Popup
const[openChnageMachine,setOpenChangeMachine]=useState('');
const openChangeMachineModal=()=>{
    setOpenChangeMachine(true);
}

  const clearAllButton = () => {
    console.log('Clear All button Clicked' , programCompleteData)
    const constProgramCompleteData = programCompleteData;
    console.log('Const Program Complete Data is ' , constProgramCompleteData)
    //console.log('TYPE OF' , typeof(constProgramCompleteData[0].QtyCleared))
    for(let i =0 ; i<constProgramCompleteData.length ; i++) {
      constProgramCompleteData[i].QtyCleared = constProgramCompleteData[i].QtyCut - constProgramCompleteData[i].QtyRejected
    }
    console.log('Updated Const Program Complete Data is ' , constProgramCompleteData)
    // setProgramCompleteData(constProgramCompleteData)
    //setProgramCompleteData([])
    setProgramCompleteData(constProgramCompleteData)
    setNewProgramCompleteData(constProgramCompleteData)
    setNewPartlistdata(constProgramCompleteData)
    setProgramCompleteData(constProgramCompleteData)
    setNewProgramCompleteData(constProgramCompleteData)
    //modalTable();
    axios.post(baseURL+'/shiftManagerProfile/shiftManagerCloseProgram',
    programCompleteData)
   .then((response) => {
     console.log('Current State of programCompleteData' , response.data);
     //setProgramCompleteData(response.data)
 })
  }

  

  const onChangeRejected = (e, item, key) => {
    console.log("onChange Rejected" , "e is " , e.target.value, " item is " , item, " key is " , key)
    const newconstprogramCompleteData = programCompleteData
    newconstprogramCompleteData[key].QtyRejected = Number(e.target.value)
    //newconstprogramCompleteData[key].QtyCleared = Number(0)
    console.log('NEW CONST PROGRAM COMPLETE DATA IS ' , newconstprogramCompleteData)
    setProgramCompleteData(newconstprogramCompleteData)
    setNewProgramCompleteData(newconstprogramCompleteData)
    
  }

  const onClickCloseProgram = () => {
    console.log('Close Program button is clicked')
    axios.post(baseURL+'/shiftManagerProfile/shiftManagerCloseProgram',
    programCompleteData)
   .then((response) => {
     console.log('Current State of programCompleteData' , response.data);
     //setProgramCompleteData(response.data)
 })
  }
  //console.log(newprogramCompleteData , 'After Updating newprogramCompleteData')  
  console.log(programCompleteData , 'After Updating')  
  const onChangeCleared = (e, item, key) => {
    console.log(" On CHANGE CLEARED " , " e.target.value is " , e.target.value, " item is " , item, " key is " , key)
    // //item is not required , e.target.value contains the entered value in the input box, and key contains the index of the array
    // console.log(' PART LIST IS ' , partlistdata)
     const newconstprogramCompleteData = programCompleteData
    // if(e.target.value <= newconstprogramCompleteData[key].QtyProduced) {
       newconstprogramCompleteData[key].QtyCleared = Number(e.target.value)
    // }
    setProgramCompleteData(newconstprogramCompleteData)
    setNewProgramCompleteData(newconstprogramCompleteData)
     console.log('NEW CONST PROGRAM COMPLETE DATA IS ' , newconstprogramCompleteData)
     setNewProgramCompleteData(newconstprogramCompleteData)
    
     setNewPartlistdata(newconstprogramCompleteData)
  }

  const onChangeRemarks = (e,item, key) => {
    console.log(" On CHANGE REMARKS" , " e.target.value is " , e.target.value, " item is " , item, " key is " , key)
    const newconstprogramCompleteData = programCompleteData
    newconstprogramCompleteData[key].Remarks= e.target.value
    setProgramCompleteData(newconstprogramCompleteData)
    setNewProgramCompleteData(newconstprogramCompleteData)
  }



return (
  <div>
    <Modal size='lg' show={show} fullscreen={fullscreen} onHide={handleClose}>
      <Modal.Header closeButton>
      <Modal.Title style={{width:"100%"}} className='title'>Program Parts Inspection Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="col-md-12 col-sm-12">
        <div className="ip-box form-bg ">
          <div className="row">
            <div className="col-md-3">
              <label className="form-label"> Task No</label>
              <input  className='in-fields'
              value={selectProgramProcessing.TaskNo}/>
            </div>
            <div className="col-md-2">
              <label className="form-label"> Quantity</label>
              <input  className='in-fields'
              value={selectProgramProcessing.Qty} />
            </div>
            <div className="col-md-5">
              <label className="form-label"> Material</label>
              <input  className='in-fields'
              value={selectProgramProcessing.Mtrl_Code} />
            </div>

           

            <div className="col-md-3">
              <label className="form-label"> Program No</label>
              <input  className='in-fields'
              value={selectProgramProcessing.NCProgramNo} />
            </div>

            <div className="col-md-2">
              <label className="form-label">Alloted</label>
              <input  className='in-fields'
              value={selectProgramProcessing.QtyAllotted} />
            </div>

            <div className="col-md-2">
               <label className="form-label">Process</label>
               <input  className='in-fields'
               value={selectProgramProcessing.MProcess} />
            </div>

            <div className="col-md-3">
               <label className="form-label">Status</label>
               <input  className='in-fields's
                value={selectProgramProcessing.PStatus} />
            </div>

            <div className="col-md-3">
               <label className="form-label">Machine</label>
               <input  className='in-fields' 
               value={selectProgramProcessing.Machine}/>
            </div>

            <div className="col-md-2">
               <label className="form-label">Processed</label>
               <input  className='in-fields'
               value={selectProgramProcessing.QtyCut} />
            </div>

            <div className="col-md-2">
               <label className="form-label">Dwgs</label>
               <input  className='in-fields'
               value={selectProgramProcessing.NoOfDwgs} />
            </div>

            <div className="col-md-3">
               <label className="form-label">Parts</label>
               <input  className='in-fields' 
               value={selectProgramProcessing.TotalParts
               }/>
            </div>

          
            <div className="col-md-3">
               <label className="form-label">Process Time</label>
               <input  className='in-fields'
               value={selectProgramProcessing.ActualTime
               } />
            </div>

            <div className="col-md-2">
               <label className="form-label">Estimated</label>
               <input  className='in-fields'
               value={selectProgramProcessing.EstimatedTime
               } />
            </div>

            <div className="col-md-2 mb-2">
               <label className="form-label">Machine</label>
               <input  className='in-fields's 
               value={selectProgramProcessing.Machine}/>
            </div>

            <div className="col-md-2 mt-4">
            <button className="button-style mt-3 group-button ms-2"
            style={{ width:"120px"}}
            onClick = {clearAllButton}>
             Clear Parts 
            </button>
            </div>

            <div className="col-md-2 mt-4 " style={{marginLeft:"-60px"}}>
            <button style={{ width:"130px"}} className="button-style mt-3 group-button" onClick={openChangeMachineModal}>
             Change Machine
            </button>
            </div>

          </div>
        </div>
      </div>

      <div className='row mt-1'>
  <div className='col-md-12 col-sm-12 mt-2' style={{marginLeft:"-15px"}}>
   <div style={{height:"200px",maxWidth:'1000px',overflowY: "scroll", overflowX:'scroll'}}>
   <Table striped className="table-data border">
     <thead className="tableHeaderBGColor">
     <tr>
         <th style={{whiteSpace:"nowrap"}}>Dwg Name</th>
         {/* <th style={{whiteSpace:"nowrap"}}>Total Qty Nested</th> */}
         <th style={{whiteSpace:"nowrap"}}>To Produce</th>
         <th>Produced</th>
         <th>Rejected</th>
         <th>Cleared</th>
         
         <th>Remarks</th>
         {/* <th>New Cleared</th> */}
       </tr>
     </thead>

{ programCompleteData.map((item,key)=>{
return(
  <>
  
  <tbody className='tablebody'>
        <tr >
           <td style={{whiteSpace:"nowrap"}}>{item.DwgName}</td>
           {/* <td>{item.TotQtyNested}</td> */}
           <td>{item.QtyNested}</td>
           <td>{item.QtyCut}</td>
           <td >
            <div key={item.QtyRejected}>
           <input className='table-cell-editor '
                 name="cleared"
                 type='number'
                 onKeyDown={blockInvalidChar}
                 defaultValue={item.QtyRejected}
                 onChange={(e)=>onChangeRejected(e,  item, key)}
                 placeholder="Type Cleared"
                />
                </div>
            </td>
           <td>

          <div key={item.QtyCleared || item.QtyRejected} >
          <input className='table-cell-editor '
         name="cleared"
         defaultValue={item.QtyCleared}
         //value = {item.QtyCleared}
         key={`cleared:${item.QtyCleared || "default"}`}
         //key={"OKAYG_" + (10000 + Math.random() * (1000000 - 10000))}
         type="number"
         onChange={(e)=>onChangeCleared(e,  item, key)}
         placeholder="Type Cleared"
       />
          </div>
          {/* <td>{item.QtyCleared}</td> */}
          
          
            
            
            </td>
           <td>
              <input className='table-cell-editor '
                 name="cleared"
                 defaultValue={item.Remarks}
                  onChange={(e)=>onChangeRemarks(e,item, key)}
                 placeholder="Type Cleared"
                />
            </td>
            {/* <td >
              <div key={item.QtyCleared}>
              {item.QtyCleared}
                </div></td> */}
       </tr>
  </tbody>
  
  </>
)
})}
</Table>
   </div>
   <Popup openChnageMachine={openChnageMachine}
   setOpenChangeMachine={setOpenChangeMachine}
   selectProgramProcessing={selectProgramProcessing}
   machineData={machineData}
   taskNoOnClick={taskNoOnClick}
   setSelectProgramProcessing={setSelectProgramProcessing}
   />
</div>
</div>
      </Modal.Body>
    </Modal>
  </div>
)
}
