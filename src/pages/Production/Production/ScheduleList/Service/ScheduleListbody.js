import React, { useMemo, useState } from "react";
import ProcessTable from "./ProcessTable";
import ScheduleListtable from "./ScheduleListtable";
import NavTab from "../Service/Components/NavTab";
import axios from "axios";
import { useGlobalContext } from "../../../../../Context/Context";
import { baseURL } from "../../../../../api/baseUrl";

export default function ScheduleListbody({
  rowselect,
  setRowselect,
  rowSelectFun,
  scheduleid,
  processrowselect,
  setProcessrowselect,
  processtableSelectFun,
  taskno,
  getpartslistdata,
  partlistdata,
  setPartlistdata,
  getProgramlistdata,
  programlistdata,
  setProgramlistdata,
  TaskNo,
  scheduleList,
  custcode,
  processtable,
  getprocessTabledata,
  OrdSchNo,
}) {
  const { schedulelistservicedata } = useGlobalContext();

  //First Table Row Select
  // useMemo(() => {
  //   setRowselect({ ...schedulelistservicedata[0], index: 0 });
  // }, [schedulelistservicedata[0]]);
  console.log(rowselect);

  //Process Table(Right First table) data

  useMemo(() => {
    setProcessrowselect({ ...processtable[0], index: 0 });
  }, [processtable[0]]);

  return (
    <div className="row">
      <div className="col-md-6 col-sm-12 mt-2">
        <ScheduleListtable
          rowSelectFun={rowSelectFun}
          rowselect={rowselect}
          setRowselect={setRowselect}
        />
      </div>

      <div className="col-md-6 col-sm-12">
        <div className="col-md-12 col-sm-12 mt-2">
          <ProcessTable
            scheduleid={scheduleid}
            processtable={processtable}
            getprocessTabledata={getprocessTabledata}
            processrowselect={processrowselect}
            processtableSelectFun={processtableSelectFun}
            OrdSchNo={OrdSchNo}
            scheduleList={scheduleList}
            custcode={custcode}
          />
        </div>
        <div>
          {" "}
          <NavTab
            taskno={taskno}
            processrowselect={processrowselect}
            getpartslistdata={getpartslistdata}
            partlistdata={partlistdata}
            setPartlistdata={setPartlistdata}
            getProgramlistdata={getProgramlistdata}
            programlistdata={programlistdata}
            setProgramlistdata={setProgramlistdata}
            TaskNo={TaskNo}
          />
        </div>
      </div>
    </div>
  );
}
