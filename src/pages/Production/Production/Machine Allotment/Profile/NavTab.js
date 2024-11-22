import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import PriorityTable from "./NCprogrmTab/PriorityTable";
import AllotmentTables from "./MachineAlltmntTab/AllotmentTables";
import { useState } from "react";

export default function NavTab({
  machineSelect,
  ncProgramsTableData,
  selectNcProgram,
  setNcProgramsTableData,
  handleCheckboxChange,
}) {
  const [key, setKey] = useState("ncprograms");

  return (
    <div className="">
      <div className="col-md-12">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-2 mt-1 tab_font "
        >
          <Tab eventKey="ncprograms" title="Nc programs">
            <PriorityTable
              machineSelect={machineSelect}
              ncProgramsTableData={ncProgramsTableData}
              selectNcProgram={selectNcProgram}
              setNcProgramsTableData={setNcProgramsTableData}
              handleCheckboxChange={handleCheckboxChange}
            />
          </Tab>

          <Tab eventKey="machineAllotment" title="Machine Allotment">
            <AllotmentTables />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
