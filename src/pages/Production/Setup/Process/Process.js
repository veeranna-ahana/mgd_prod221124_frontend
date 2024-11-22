import React from "react";
import ProcessTable from "./ProcessTable";
import ProcessForm from "./ProcessForm";
import { baseURL } from "../../../../api/baseUrl";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

export default function Process() {
  const [processTab, setProcessTab] = useState([]);
  const [selectRow, setSelectRow] = useState({});

  const getProcessList = () => {
    axios
      .get(baseURL + "/productionSetup/getAllProcessList")
      .then((response) => {
        setProcessTab(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProcessList();
  });

  const selectedRowFun = (item, index) => {
    let list = { ...item, index: index };
    setSelectRow(list);
  };

  useEffect(() => {
    if (processTab.length > 0 && !selectRow.ProcessID) {
      selectedRowFun(processTab[0], 0); // Select the first row
    }
  }, [processTab, selectedRowFun]);

  return (
    <div className="row">
      <h4 className="title mb-1">Process Definition Form</h4>
      <div className="col-md-6 col-sm-12">
        <ProcessTable
          processTab={processTab}
          setProcessTab={setProcessTab}
          selectRow={selectRow}
          selectedRowFun={selectedRowFun}
        />
      </div>
      <div className="col-md-6 col-sm-12">
        <ProcessForm
          selectRow={selectRow}
          setSelectRow={setSelectRow}
          processTab={processTab}
          setProcessTab={setProcessTab}
        />
      </div>
    </div>
  );
}
