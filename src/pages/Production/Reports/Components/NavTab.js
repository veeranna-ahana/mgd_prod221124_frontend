import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import MachineLog from "./MachineLog";
import MachineUtilisationSummary from "./MachineUtilisationSummary";
import ProductionTaskSummary from "./ProductionTaskSummary";

export default function NabTab({
  machineutilisationSummartdata,
  productionTaskSummary,
  machineLogData,
  dateSelect,
  setMachineLogData,
  setMachineutilisationSummarydata,
  selectedRows,
  setSelectedRows,
  machinelogRowSelect,
  status,
  machineName,location,selectedShift
}) {
  const [key, setKey] = useState("machineLog");

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mt-1 tab_font"
    >
      <Tab eventKey="machineLog" title="Machine Log">
        <MachineLog
          machineLogData={machineLogData}
          setMachineLogData={setMachineLogData}
          dateSelect={dateSelect}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          machinelogRowSelect={machinelogRowSelect}
          status={status}
          machineName={machineName}
          location={location}
          selectedShift={selectedShift}
        />
      </Tab>

      <Tab
        eventKey="machineutilisationsummary"
        title="Machine Utilisation Summary"
      >
        <MachineUtilisationSummary
          machineutilisationSummartdata={machineutilisationSummartdata}
          setMachineutilisationSummarydata={setMachineutilisationSummarydata}
          dateSelect={dateSelect}
          status={status}
        />
      </Tab>

      <Tab eventKey="productiontasksummary" title="Production Task Summary">
        <ProductionTaskSummary productionTaskSummary={productionTaskSummary} />
      </Tab>
    </Tabs>
  );
}
