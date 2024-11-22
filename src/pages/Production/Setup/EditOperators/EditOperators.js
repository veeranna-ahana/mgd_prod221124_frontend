import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../../../api/baseUrl";
import EditOperatorTable from "./EditOperatorTable";
import EditOperatorForm from "./EditOperatorForm";

export default function EditOperators() {
  const [getOperatorlist, setgetOperatorList] = useState([]);
  const getOperatorData = () => {
    axios.get(baseURL + "/EditOperator/getOperator", {}).then((response) => {
      // console.log(response.data);
      setgetOperatorList(response.data);
    });
  };

  useEffect(() => {
    getOperatorData();
  }, []);

  //row select shiftIncharge
  const [rowselectOperator, setRowSelectOperator] = useState({});
  const selectedRowFunOperator = (item, index) => {
    let list = { ...item, index: index };
    setRowSelectOperator(list);
  };

  //Default first row select
// Define a state variable to track default selection
const [defaultSelectionDone, setDefaultSelectionDone] = useState(false);

// Default first row select
useEffect(() => {
  if (!defaultSelectionDone && getOperatorlist.length > 0 && !rowselectOperator.Name) {
    selectedRowFunOperator(getOperatorlist[0], 0); // Select the first row
    setDefaultSelectionDone(true); // Set default selection flag to true
  }
}, [getOperatorlist, rowselectOperator, selectedRowFunOperator, defaultSelectionDone]);



  return (
    <>
      <h4 className="title mb-1">Edit Operator Setup Form</h4>
      <div className="row">
        <div className="col-md-6">
          <EditOperatorTable
            getOperatorlist={getOperatorlist}
            rowselectOperator={rowselectOperator}
            selectedRowFunOperator={selectedRowFunOperator}
          />
        </div>
        <div className="col-md-6">
          <EditOperatorForm
            rowselectOperator={rowselectOperator}
            getOperatorlist={getOperatorlist}
            setgetOperatorList={setgetOperatorList}
            setRowSelectOperator={setRowSelectOperator}
            getOperatorData={getOperatorData}
          />
        </div>
      </div>
    </>
  );
}
