import React, { useEffect } from 'react'
import { useState } from 'react';
import { Table } from 'react-bootstrap'
import { useGlobalContext } from '../../../../../../Context/Context';

export default function ProductionTaskListTable() {

const {productionTaskList,SetProductionTaskList,getProductionTaskListData}=useGlobalContext();
console.log(productionTaskList);

useEffect(()=>{
  getProductionTaskListData();
},[productionTaskList])

  return (
    <div className='row mt-1'>
    <div className='col-md-12 col-sm-12'>
     <div style={{height:"250px",overflowX: "scroll",maxWidth:"850px",overflowY:'scroll'}}>
     <Table striped className="table-data border">
       <thead className="tableHeaderBGColor table-space">
         <tr>
           <th>TaskNo</th>
           <th>Operation</th>
           <th>Mtrl_Code</th>
           <th>NoOfSheets</th>
           <th>NoOfDwgs</th>
           <th>DwgsNo</th>
           <th>DwgsNested</th>
           <th>PartsNested</th>
           <th>TotalParts</th>
           <th>NestCount</th>
           <th>Priority</th>
           <th>EstimatedTime</th>
           <th>TaskProcessTime</th>
           <th>TaskPgmTime</th>
         </tr>
       </thead>

      
{productionTaskList.map((item,key)=>{
  return(
    <>
    <tbody className='tablebody table-space'>
          <tr>
             <td>{item.TaskNo}</td>
             <td>{item.Operation}</td>
             <td>{item.Mtrl_Code}</td>
             <td>{item.NoOfSheets}</td>
             <td>{item.DwgsNested}</td>
             <td>{item.NoOfDwgs}</td>
             <td>{item.PartsNested}</td>
             <td>{item.TotalParts}</td>
             <td>{item.NestCount}</td>
             <td>{item.Priority}</td>
             <td>{item.EstimatedTime}</td>
             <td>{item.NestCount}</td>
             <td></td>
             <td></td>
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

