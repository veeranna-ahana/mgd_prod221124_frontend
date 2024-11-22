import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
// import ByMachineBox from './components/ByMachineBox';
import MachineLogTable from "./MachineLogTable";
import ProductionTaskListTable from "./ProductionTaskListTable";
import OperationsProgramCompleteTable from "./ProgramCompleteTable";
import OperationProgramProcessing from "./ProgramProcessing";
import ProgramCompleteTable from "./ProgramCompleteTable";
import ProgramProcessing from "./ProgramProcessing";
import ShiftReport from "./ShiftReport";
// import ByOperations from './components/ByOperations';
// import ByCustomer from './components/ByCustomer';

export default function NavTab({
  programProcessing,
  proramCompleted,
  onClickProgram,
  onClickCustomer,
  setProgramProcessing,
  setProgramCompleted,
  onClickCustLabel,
  custCode,
}) {
  const [key, setKey] = useState("tabdata");

  return (
    <>
      <div>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mt-1 tab_font"
        >
          <Tab eventKey="tabdata" title="Programs Completed">
            <ProgramCompleteTable
              proramCompleted={proramCompleted}
              onClickCustomer={onClickCustomer}
              setProgramCompleted={setProgramCompleted}
              custCode={custCode}
            />
          </Tab>

          <Tab eventKey="Programs Processing" title="Programs Processing">
            <ProgramProcessing
              programProcessing={programProcessing}
              setProgramProcessing={setProgramProcessing}
              onClickCustLabel={onClickCustLabel}
              custCode={custCode}
            />
          </Tab>

          <Tab eventKey="Machine Log" title="Machine Log">
            <MachineLogTable />
          </Tab>

          <Tab eventKey="Production Task List" title="Production Task List">
            <ProductionTaskListTable />
          </Tab>

          <Tab eventKey="Shift Report" title="Shift Report">
            <ShiftReport />
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
