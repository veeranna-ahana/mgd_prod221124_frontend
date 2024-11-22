import axios from 'axios'
import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import {baseURL} from '../../../../../../api/baseUrl'
import { useState } from 'react'

export default function MachineLogSideTable() {
const [machineList,setMachineList]=useState([])
  useEffect(() => {
    axios.get(baseURL+'/shiftManagerProfile/profileListMachinesTaskNo')
        .then((response) => {
          console.log("response  machine list",response.data)
          setMachineList(response.data);
        })
}, [])

const[selectmachinelog,setSelectmachinelog]=useState({})
const selectMachineLog=(item,index)=>{
  let list={...item,index:index}
  setSelectmachinelog(list)
}

console.log("selected machine in Machine Log table is",selectmachinelog)
  return (
    <div className='row mt-1'>
    <div className='col-md-12 col-sm-12'>
     <div style={{height:"250px",overflowY: "scroll", overflowX:"scroll"}}>
     <Table striped className="table-data border" >
       <thead className="tableHeaderBGColor">
         <tr>
           <th>Machine</th>
         </tr>
       </thead>

{machineList.map((item,key)=>{
  return(
    <>
    <tbody className='tablebody'>
          <tr 
          onClick={()=>selectMachineLog(item,key)} className={key===selectmachinelog?.index? 'selcted-row-clr':'' }
          >
             <td>{item.MachineName}</td>
         </tr>
    </tbody>
    </>
  )
})}
 </Table>
     </div>
 </div>
</div>
  )
}
