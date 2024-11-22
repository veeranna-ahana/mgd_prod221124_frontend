import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ProgramList from "./ProgramList";
import PartsList from "./PartsList";

function NabTab({
  taskno,
  processrowselect,
  getpartslistdata,
  partlistdata,
  setPartlistdata,
  getProgramlistdata,
  programlistdata,
  setProgramlistdata,
  TaskNo,
}) {
  const [key, setKey] = useState("partlist");

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-1 mt-1 tab_font"
    >
      <Tab eventKey="partlist" title="Parts List">
        <PartsList
          taskno={taskno}
          processrowselect={processrowselect}
          getpartslistdata={getpartslistdata}
          partlistdata={partlistdata}
          setPartlistdata={setPartlistdata}
          TaskNo={TaskNo}
        />
      </Tab>

      <Tab eventKey="programlist" title="Program List">
        <ProgramList
          taskno={taskno}
          processrowselect={processrowselect}
          getProgramlistdata={getProgramlistdata}
          programlistdata={programlistdata}
          setProgramlistdata={setProgramlistdata}
          TaskNo={TaskNo}
        />
      </Tab>
    </Tabs>
  );
}

export default NabTab;
