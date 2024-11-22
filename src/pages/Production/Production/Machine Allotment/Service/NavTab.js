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
  const [key, setKey] = useState("ncprogram");

  return (
    <div className="">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-1 mt-1 tab_font "
      >
        <Tab eventKey="ncprogram" title="Nc programs">
          <PriorityTable
            machineSelect={machineSelect}
            ncProgramsTableData={ncProgramsTableData}
            //selectRowNcProgram={selectRowNcProgram}
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
  );
}
