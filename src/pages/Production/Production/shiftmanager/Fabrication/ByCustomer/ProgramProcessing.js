import React from 'react'
// import { Link } from 'react-router-dom';
// import { Schedulelistdata4 } from '../../ScheduleList/ScheduleListdata';
import { Table } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../../../../../../api/baseUrl';
import ProcessingModal from './ProcessingModal';

export default function ProgramProcessing({programProcessing}) {

  const [show, setShow] = useState(false);
  const [ machineData, setMachineData] = useState([])

    // const getHeadings2 = () => {
    //     return Object.keys(Schedulelistdata4[0]);
    //   };

    const handaleClick =()=>{
       setShow(true);
    }

    const[selectProgramProcessing,setSelectProgramProcessing]=useState('');
    const programProcessingrow=(item,index)=>{
      let list={...item,index:index}
      // console.log("ScheduleNo",item.ScheduleNo)
      setSelectProgramProcessing(list);
    }

    // useEffect(() => {

    // })

    useEffect(()=>{
  axios.get(baseURL+'/shiftManagerProfile/profileMachines',)
  .then((response) => {
    console.log('Current State of programCompleteData' , response.data);
    setMachineData(response.data)
 })
},[])


  return (
    <>
    <div> 
    <div className="row mt-2">
       <button className="button-style mt-2 group-button"
          style={{ width: "150px",marginLeft:"20px" }} onClick={handaleClick}>
          Open Programs
        </button>
    </div>   

    <div className='row mt-3'>
    <div className='col-md-12 col-sm-12'>
     <div style={{height:"200px",overflowY: "scroll", overflowX:'scroll',width:'850px'}}>
     <Table striped className="table-data border">
       <thead className="tableHeaderBGColor">
         <tr>
           <th style={{whiteSpace:"nowrap"}}>Task No</th>
           <th>Machine</th>
           <th>Operation</th>
           <th style={{whiteSpace:"nowrap"}}>Program No</th>
           <th style={{whiteSpace:"nowrap"}}>Plan Time</th>
           <th style={{whiteSpace:"nowrap"}}>Actual Time</th>
           <th>QTY</th>
           <th>Allotted</th>
           <th>Processed</th>
         </tr>
       </thead>

       {programProcessing && programProcessing.map((item,key)=>{
  return(
    <>
    <tbody className='tablebody'>
          <tr style={{backgroundColor:item.rowColor}}
           onClick={()=>programProcessingrow(item,key)} className={key===selectProgramProcessing?.index? 'selcted-row-clr':'' } >
             <td style={{whiteSpace:"nowrap"}}>{item.TaskNo}</td>
             <td style={{whiteSpace:"nowrap"}}>{item.Machine}</td>
             <td style={{whiteSpace:"nowrap"}}>{item.Operation}</td>
             <td>{item.NCProgramNo}</td>
             <td>{item.EstimatedTime}</td>
             <td>{item.ActualTime}</td>
             <td>{item.Qty}</td>
             <td>{item.QtyAllotted}</td>
             <td>{item.QtyCut}</td>
         </tr>
    </tbody>
    </>
  )
})}
 </Table>
     </div>
     <ProcessingModal show={show}
     setShow={setShow}
     selectProgramProcessing={selectProgramProcessing}
     machineData={machineData}
    //  taskNoOnClick={taskNoOnClick}
     />

 </div>
</div>



    {/* <div className="col-md-12 col-sm-12 mt-3">
      <div
        className="table-data"
        style={{overflowY: "scroll" }}>
        <Tables theadData={getHeadings2()} tbodyData={Schedulelistdata4} />
      </div>
    </div> */}
</div>

{/* {
  (
    <CustomModal 
    show={show}
     setShow={setShow}/>
  )
} */}
</>
  )
}
