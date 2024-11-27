import React, { useState, useEffect } from "react";
import axios from "axios";
import AddOperatorModal from "./Modals/AddOperatorModal";
import DeleteOperatorForDay from "./Modals/DeleteOperatorfordayModal";
import { baseURL } from "../../../api/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import DeleteOperatorForDayAsk from "./Modals/DeleteOperatorForDayAsk";

function DailyOperator(props) {
  const [selectedMachine, setSelectedMachine] = useState("");
  const [dataMachineList, setDataMachineList] = useState([]);
  const [dataOperatorList, setDataOperatorList] = useState([]);
  const [selectedOperator, setSelectedOperator] = useState("");
  const [openmodal, setOpenModal] = useState("");

  const getMachineListData = async () => {
    const { data } = await axios.get(baseURL + `/shiftEditor/getMachineList`);
    setDataMachineList(data);
    // console.log(data);
  };

  const getOperatorListData = async () => {
    const { data } = await axios.get(
      baseURL + `/shiftEditor/getMachineOperators`
    );
    setDataOperatorList(data);
  };

  const handleMachineChange = (e) => {
    setSelectedMachine(e.target.value);
  };

  const handleOperatorChange = (e) => {
    setSelectedOperator(e.target.value);
  };

  let isCreateInProgress = false; // Flag to track if a creation is already in progress

  const createDailyOperatorList = () => {
    if (isCreateInProgress) {
      return; // Exit the function if a creation is already in progress
    }
    if (!selectedOperator || !selectedMachine) {
      toast.error("Please select a machine and an operator.", {
        position: toast.POSITION.TOP_CENTER,
      });
      return; // Exit the function if inputs are missing
    }
    isCreateInProgress = true; // Set the flag to indicate a creation is in progress
    axios
      .post(baseURL + "/shiftEditor/setMachineOperatorDay", {
        ShiftDate: props.data.ShiftDate,
        Shift: props.data.Shift,
        FromTime: props.data.FromTime,
        ToTime: props.data.ToTime,
        Machine: selectedMachine,
        Operator: selectedOperator,
        DayShiftID: props.data.DayShiftId,
      })
      .then((response) => {
        // console.log(response.data);
        if (response.data === "Operator/Machine is already present") {
          toast.error("Operator/Machine is already present", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else if (response.data === "Data Successfully Added") {
          toast.success("Operator successfully added for the day", {
            position: toast.POSITION.TOP_CENTER,
          });
          props.getMachineOperatorTableData();
        } else {
          // Handle other cases if needed
        }
        isCreateInProgress = false; // Reset the flag after the request is completed
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        isCreateInProgress = false; // Reset the flag in case of an error
        setSelectedMachine(""); // Reset the selectedMachine to an empty string
        setSelectedOperator(""); // Reset the selectedOperator to an empty string
      });
  };

  const onDeleteOperatorForDay = () => {
    axios
      .post(
        baseURL + "/shiftEditor/deleteMachineOperatorDay",
        props.rowselectMachineOperator
      )
      .then((response) => {
        // console.log(response);
        props.getMachineOperatorTableData();
        toast.success("Machine Operator Deleted", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  useEffect(() => {
    getMachineListData();
    getOperatorListData();
    setSelectedMachine(props.rowselectMachineOperator.Machine);
    setSelectedOperator(props.rowselectMachineOperator.Operator);
  }, [props.rowselectMachineOperator]);

  useEffect(() => {}, []);

  const openAddOperator = () => {
    // Implement your logic for opening the AddOperatorModal here
  };

  const openDeleteOperator = () => {
    // Implement your logic for opening the DeleteOperatorForDay modal here
  };
  const openModal = () => {
    setOpenModal(true);
  };

  return (
    <div
      style={{
        width: "215px",
        textAlign: "center",
        backgroundColor: "lightgrey",
        marginTop: "5px",
        fontSize: "12px",
      }}
    >
      <div>
        <div className="mb-1" style={{ color: "red" }}>
          <b>{props.data?.Shift} Shift</b>
        </div>
      </div>
      <div className="col-md-11 d-flex" style={{ gap: "15px" }}>
        <div className="ms-1">
          <label className="form-label">Machine</label>
        </div>
        <div>
          <select
            className="ip-select"
            onChange={handleMachineChange}
            value={selectedMachine || ""}
            style={{ width: "115px" }}
          >
            <option value="" disabled={!selectedMachine}>
              Select machine
            </option>
            {dataMachineList.map((data) => (
              <option key={data.refName} value={data.refName}>
                {data.refName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="col-md-11 d-flex" style={{ gap: "10px" }}>
        <div className="ms-1">
          <label className="form-label">Operator</label>
        </div>
        <div>
          <select
            className="ip-select"
            onChange={handleOperatorChange}
            value={selectedOperator || ""}
          >
            <option value="" disabled={!selectedOperator}>
              Select operator
            </option>
            {dataOperatorList.map((data) => (
              <option key={data.Name} value={data.Name}>
                {data.Name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        className={`button-style group-button ${
          props.condition !== true ? "disabled" : ""
        }`}
        onClick={createDailyOperatorList}
        disabled={props.condition !== true}
      >
        Add Operator for Day
      </button>

      <button
        className={`button-style group-button mb-2 ${
          props.condition !== true ? "disabled" : ""
        }`}
        onClick={openModal}
        disabled={props.condition !== true}
      >
        Delete Operator For Day
      </button>
      {/* 
      <AddOperatorModal
        addoperator={addoperator}
        setAddoperator={setAddoperator}
      />

      <DeleteOperatorForDay
        deleteoperator={deleteoperator}
        setDeleteoperator={setDeleteoperator}
      /> */}
      <DeleteOperatorForDayAsk
        openmodal={openmodal}
        setOpenModal={setOpenModal}
        onDeleteOperatorForDay={onDeleteOperatorForDay}
        data={props.rowselectMachineOperator}
      />
    </div>
  );
}

export default DailyOperator;
