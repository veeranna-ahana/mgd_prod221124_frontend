import React , {useState, useEffect,useMemo, useRef} from 'react';
import Table from "react-bootstrap/Table";
import MachineOperatorTable from './MachineOperatorTable';
import axios from "axios";
import DailyOperator from './DailyOperator';
import SingleDayShiftEditor from './SingleDayShiftEditor';
import { baseURL } from '../../../api/baseUrl';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function DailyShiftTable({SingleDayShiftPlan4thTable,rowSelectFunForDailyShiftTable
,rowselectDailyShiftTable,getMachineOperatorTableData,machineOperatorTableData,
setRowselectDailyShiftTable,getSingleDayShiftPlan4thTable,getSecondTableData,selectedWeek,
rowselect}) {

  //  console.log(selectedWeek)
       useEffect(() => {
        getMachineOperatorTableData();
       },[rowselectDailyShiftTable]) 

      
       useMemo(()=>{
        setRowselectDailyShiftTable({...SingleDayShiftPlan4thTable
        [0],index:0})
      },[SingleDayShiftPlan4thTable[0]])

      const [shiftinstruction,setShiftinstruction]=useState('')     
      
       const onChangeInput = (e, Shift_instruction) => {
        const { name, value } = e.target
        setShiftinstruction(value);
      }

      const updateShiftinstruction = () => {
        // Check if the shift instruction is null or empty
        if (!shiftinstruction || shiftinstruction.trim() === "") {
          toast.error('Shift Instructions cannot be empty!', {
            position: toast.POSITION.TOP_CENTER
          });
        } else {
          axios.post(baseURL + '/shiftEditor/updateSingleDaySihiftInstructions', {
              ...rowselectDailyShiftTable,
              shiftInstruction: shiftinstruction
            })
            .then((response) => {
              toast.success('Shift Instructions Saved', {
                position: toast.POSITION.TOP_CENTER
              });
            })
            .catch((error) => {
              toast.error('An error occurred while saving Shift Instructions', {
                position: toast.POSITION.TOP_CENTER
              });
            });
        }
      };

//Machine Operator Table Rowselect
const [rowselectMachineOperator,setRowselectMachineOperator]=useState({})
const rowSelectFun=(item,index)=>{
  let list={...item,index:index}
console.log("ScheduleNo",item.ScheduleNo)
// setScheduleid(item.OrdSchNo);
 setRowselectMachineOperator(list);
}



    return (
        
        <div style={{display:"flex"}}>
        <div>
           

        <DailyOperator data={rowselectDailyShiftTable}
         selectMachineOperatorData={rowselectDailyShiftTable}
         rowselectMachineOperator={rowselectMachineOperator}
         getMachineOperatorTableData={getMachineOperatorTableData}/>
        </div>
         
 <div >
 <div >

       </div>
       <MachineOperatorTable
        rowselectDailyShiftTable={rowselectDailyShiftTable}
        rowselectMachineOperator={rowselectMachineOperator}
        setRowselectMachineOperator={setRowselectMachineOperator}
        rowSelectFun={rowSelectFun}
        machineOperatorTableData={machineOperatorTableData}
        // setMachineOperatorTableData={setMachineOperatorTableData}
        getMachineOperatorTableData={getMachineOperatorTableData}
        selectedWeek={selectedWeek}/>

       </div>   
        </div>
    );
}

export default DailyShiftTable;