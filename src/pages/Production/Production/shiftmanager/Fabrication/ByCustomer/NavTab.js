import React, {useState} from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// import ByMachineBox from './components/ByMachineBox';
import MachineLogTable from './MachineLogTable';
import ProductionTaskListTable from './ProductionTaskListTable';
import OperationsProgramCompleteTable from './ProgramCompleteTable';
import OperationProgramProcessing from './ProgramProcessing';
import ProgramCompleteTable from './ProgramCompleteTable';
import ProgramProcessing from './ProgramProcessing';
import ShiftReport from './ShiftReport';
// import ByOperations from './components/ByOperations';
// import ByCustomer from './components/ByCustomer';

export default  function NavTab({programProcessing,proramCompleted,
  // onClickPrograms,
  onClickProgram,onClickCustomer}) {
    const [key, setKey] = useState("tabdata");

  return (
    <>
    <div className="d-flex">
    {/* <div className="box01 mt-1">
      {isToggled && <ByMachineBox/>}
      {isClick && <ByOperations/>}
      {isCustomer && <ByCustomer/>}
    </div> */}
    <div>
      <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 mt-3 tab_font"
    >
      <Tab eventKey="tabdata" title="Programs Completed">
      <ProgramCompleteTable 
       proramCompleted={proramCompleted}
       onClickCustomer={onClickCustomer}
      //  onClickProgram={onClickProgram}
      //  onClickPrograms={onClickPrograms}
      />
      </Tab>

      <Tab eventKey="Programs Processing" title="Programs Processing">
      <ProgramProcessing programProcessing={programProcessing}/>
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

