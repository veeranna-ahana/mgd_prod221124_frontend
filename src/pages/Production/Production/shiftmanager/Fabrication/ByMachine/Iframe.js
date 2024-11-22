import React, {useState} from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ProgramCompletedData from './ProgramCompletedData';
// import ByMachineBox from './components/ByMachineBox';
import TabData from './TabData';
import MachineLogTable from './MachineLogTable';
import ProductionTaskListTable from './ProductionTaskListTable';
import ShiftReport from './ShiftReport';
// import ByOperations from './components/ByOperations';
// import ByCustomer from './components/ByCustomer';

function Iframe({isToggled, isClick, isCustomer, machineProgramesCompleted, machineProgramesProcessing
,taskNoOnClick,MachineOnClick}) {
    const [key, setKey] = useState("tabdata");

    console.log('data from i frame is ' , machineProgramesCompleted)

  return (
    <>
    <div className="d-flex">
    {/* <div className="box01 mt-1">
      {isToggled && <ByMachineBox/>}
      {isClick && <ByOperations/>}
      {isCustomer && <ByCustomer/>}
    </div> */}
    <div style={{width:"100%"}}>
      <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 mt-3 tab_font"
    >
      <Tab eventKey="tabdata" title="Programs Completed">
      <ProgramCompletedData machineProgramesCompleted = {machineProgramesCompleted}
      taskNoOnClick={taskNoOnClick} MachineOnClick={MachineOnClick}/>
      </Tab>

      <Tab eventKey="Programs Processing" title="Programs Processing">
      <TabData machineProgramesProcessing= {machineProgramesProcessing}
      taskNoOnClick={taskNoOnClick} MachineOnClick={MachineOnClick}/>
      </Tab>

      <Tab eventKey="Machine Log" title="Machine Log">
        <MachineLogTable/>
      </Tab>

      <Tab eventKey="Production Task List" title="Production Task List">
      <ProductionTaskListTable/>
      </Tab>

      <Tab eventKey="Shift Report" title="Shift Report">
        <ShiftReport/>
      </Tab>
    </Tabs>
    </div>
    </div>
    </>
  )
}

export default Iframe
