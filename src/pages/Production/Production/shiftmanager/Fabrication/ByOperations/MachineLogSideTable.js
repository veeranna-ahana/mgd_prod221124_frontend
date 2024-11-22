import React from 'react'
import { Table } from 'react-bootstrap'

export default function MachineLogSideTable() {
  return (
    <div className='row mt-1'>
    <div className='col-md-12 col-sm-12'>
     <div style={{height:"250px",overflowY: "scroll", overflowX:"scroll"}}>
     <Table striped className="table-data border" >
       <thead  className="tableHeaderBGColor">
         <tr>
           <th>S-No</th>
           <th>Machine</th>
           {/* <th>From Time</th>
           <th>To Time</th>
           <th>Running Time</th>
           <th>Program</th>
           <th>Operation</th>
           <th>Reset</th>
           <th>Abc</th>
           <th>Xyz</th> */}
         </tr>
       </thead>

{/* {processdataList.map((item,key)=>{
  return(
    <>
    <tbody className='tablebody'>
          <tr onClick={()=>selectedRowFn(item,key)} className={key===selectRow?.index? 'selcted-row-clr':'' }>
             <td>{item.Mprocess}</td>
             <td>{item.TgtRate}</td>
             <td>{item.Id}</td>
             <td>{item.Machine_srl}</td>
             <td>{item.RefProcess}</td>
         </tr>
    </tbody>
    </>
  )
})} */}
 </Table>
     </div>
 </div>
</div>
  )
}
