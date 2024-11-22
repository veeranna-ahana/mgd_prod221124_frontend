import React, { useState, useEffect, useMemo, useRef } from "react";
import Table from "react-bootstrap/Table";
import MachineOperatorTable from "./MachineOperatorTable";
import axios from "axios";
import DailyOperator from "./DailyOperator";
import SingleDayShiftEditor from "./SingleDayShiftEditor";
import { baseURL } from "../../../api/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function DailyShiftTable({
  SingleDayShiftPlan4thTable,
  rowSelectFunForDailyShiftTable,
  rowselectDailyShiftTable,
  getMachineOperatorTableData,
  machineOperatorTableData,
  setRowselectDailyShiftTable,
  getSingleDayShiftPlan4thTable,
  getSecondTableData,
  selectedWeek,
  rowselect,
  setSingleDayShiftPlan4thTable,
  condition,
  selectedShift,
  SelectedShiftIncharge,
  setSelectedShiftInchargeForSpecialShift,
}) {
  useEffect(() => {
    getMachineOperatorTableData();
  }, [rowselectDailyShiftTable]);

  // useMemo(() => {
  //   setRowselectDailyShiftTable({ ...SingleDayShiftPlan4thTable[0], index: 0 });
  // }, [SingleDayShiftPlan4thTable[0]]);

  const [shiftinstruction, setShiftinstruction] = useState("");

  const onChangeInput = (e, rowIndex) => {
    const { value } = e.target;
    setShiftinstruction(value);
    const updatedTable = SingleDayShiftPlan4thTable;
    updatedTable[rowIndex].Shift_instruction = value;
    setSingleDayShiftPlan4thTable(updatedTable);
  };

  useEffect(() => {
    if (SingleDayShiftPlan4thTable.length > 0) {
      rowSelectFunForDailyShiftTable(SingleDayShiftPlan4thTable[0], 0);
    }
  }, [SingleDayShiftPlan4thTable]);

  const updateShiftinstruction = () => {
    // Check if the shift instruction is null or empty
    // console.log(shiftinstruction);
    if (!shiftinstruction || shiftinstruction.trim() === "") {
      toast.error("Shift Instructions cannot be empty!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      axios
        .post(baseURL + "/shiftEditor/updateSingleDaySihiftInstructions", {
          ...rowselectDailyShiftTable,
          shiftInstruction: shiftinstruction,
        })
        .then((response) => {
          // Update the Shift_instruction in rowselectDailyShiftTable
          setRowselectDailyShiftTable((prevRowselect) => ({
            ...prevRowselect,
            Shift_instruction: shiftinstruction,
          }));
          toast.success("Shift Instructions Saved", {
            position: toast.POSITION.TOP_CENTER,
          });
        })
        .catch((error) => {
          toast.error("An error occurred while saving Shift Instructions", {
            position: toast.POSITION.TOP_CENTER,
          });
        });
      setShiftinstruction("");
    }
  };

  //Machine Operator Table Rowselect
  const [rowselectMachineOperator, setRowselectMachineOperator] = useState({});
  const rowSelectFun = (item, index) => {
    let list = { ...item, index: index };
    setRowselectMachineOperator(list);
  };


    //
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const requestSort = (key) => {
      let direction = "asc";
      if (sortConfig.key === key && sortConfig.direction === "asc") {
        direction = "desc";
      }
      setSortConfig({ key, direction });
    };
  
    const sortedData = () => {
      const dataCopy = [...SingleDayShiftPlan4thTable];
      if (sortConfig.key) {
        dataCopy.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "asc" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "asc" ? 1 : -1;
          }
          return 0;
        });
      }
      return dataCopy;
    };

  return (
    <div style={{ display: "flex" }}>
      <div className="col-md-4 mx-1">
        <div className="col-md-4">
          <SingleDayShiftEditor
            rowselectDailyShiftTable={rowselectDailyShiftTable}
            getSingleDayShiftPlan4thTable={getSingleDayShiftPlan4thTable}
            getSecondTableData={getSecondTableData}
            selectedWeek={selectedWeek}
            rowselect={rowselect}
            rowSelectFunForDailyShiftTable={rowSelectFunForDailyShiftTable}
            condition={condition}
            machineOperatorTableData={machineOperatorTableData}
            selectedShift={selectedShift}
            SelectedShiftIncharge={SelectedShiftIncharge}
            setSelectedShiftInchargeForSpecialShift={setSelectedShiftInchargeForSpecialShift}
          />
        </div>

        <div className="col-md-12">
          <DailyOperator
            data={rowselectDailyShiftTable}
            selectMachineOperatorData={rowselectDailyShiftTable}
            rowselectMachineOperator={rowselectMachineOperator}
            getMachineOperatorTableData={getMachineOperatorTableData}
            condition={condition}
          />
        </div>
      </div>

      <div className="col-md-4">
        <div
          className="col-md-12 ms-1"
          style={{
            width: "420px",
            height: "auto",
            fontSize: "15px",
            overflowX: "scroll",
            overflowY: "scroll",
          }}
        >
          <Table
            striped
            className="table-data border table-space"
            style={{ border: "1px" }}
          >
            <thead className="tableHeaderBGColor">
              <tr>
                <th  onClick={() => requestSort("Shift")}>Shift</th>
                <th  onClick={() => requestSort("Incharge")}>Incharge</th>
                <th   onClick={() => requestSort("From")}>From</th>
                <th   onClick={() => requestSort("To Time")}>To Time</th>
                <th   onClick={() => requestSort("Shift Instructions")}>Shift Instructions</th>
                <th   onClick={() => requestSort("Save Shift Instruction")}>Save Shift Instruction</th>
              </tr>
            </thead>

            <tbody className="tablebody">
              {SingleDayShiftPlan4thTable.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No data to show
                  </td>
                </tr>
              ) : (
                sortedData().map((rank, i, row) => (
                  <tr
                    onClick={() => rowSelectFunForDailyShiftTable(rank, i)}
                    className={
                      i === rowselectDailyShiftTable?.index
                        ? "selcted-row-clr"
                        : ""
                    }
                  >
                    <td >{rank.Shift}</td>
                    <td >{rank.Shift_Ic}</td>
                    <td >{rank.FromTime}</td>
                    <td >{rank.ToTime}</td>
                    <td >
                      <div key={rank.DayShiftId}>
                        <input
                          className="table-cell-editor"
                          value={rank.Shift_instruction || ""}
                          onChange={(e) => onChangeInput(e, i)}
                          placeholder="Type Shift_instruction"
                        />
                      </div>
                    </td>

                    <td >
                      <button
                        className="button-style group-button"
                        style={{ width: "100px" }}
                        onClick={() => updateShiftinstruction()}
                      >
                        Save
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
        <div className="col-md-12 mt-1">
          <MachineOperatorTable
            rowselectDailyShiftTable={rowselectDailyShiftTable}
            rowselectMachineOperator={rowselectMachineOperator}
            setRowselectMachineOperator={setRowselectMachineOperator}
            rowSelectFun={rowSelectFun}
            machineOperatorTableData={machineOperatorTableData}
            getMachineOperatorTableData={getMachineOperatorTableData}
            selectedWeek={selectedWeek}
            rowselect={rowselect}
          />
        </div>
      </div>
    </div>
  );
}

export default DailyShiftTable;
