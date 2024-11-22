import React from 'react'
import { Table } from 'react-bootstrap'
import MachineLogSideTable from './MachineLogSideTable'

export default function MachineLogTable() {
  return (
    <>
    <div className="d-flex">
    <div className="box" style={{width:'205px'}}>
        <MachineLogSideTable/>
    </div>

    <div className='row mt-1'>
    <div className='col-md-12 col-sm-12'>
     <div style={{height:"250px",overflowY: "scroll", overflowX:"scroll",width:'600px'}}>
     <Table striped className="table-data border" >
       <thead className="tableHeaderBGColor">
         <tr>
           <th>Processed</th>
           <th>FromTime</th>
           <th>ToTime</th>
           <th>RunningTime</th>
           <th>Program</th>
           <th>Operation</th>
           <th>Remarks</th>
           <th>Locked</th>
           <th>Operator</th>
           {/* <th>Abc</th>
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
</div>
</>
  )
}
