import React, { useMemo, useState, useEffect } from "react";
import AddMachine from "./AddMachineModal/AddMachine";
import AddProcessmodal from "./AddProcess/AddProcessmodal";
import axios from "axios";
import { formatDate } from "./Dateconverter";
import { useGlobalContext } from "../../../../Context/Context";
import ProcessTable from "./ProcessTable";
import DeleteProcess from "./Delete Process/DeleteProcess";
import DeleteMachine from "./DeleteMachine/DeleteMachine";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import SaveMachine from "./SaveMachine/SaveMachine";
import { baseURL } from "../../../../api/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ({ selectedRow, setSelectedRow }) {
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault();
  
  const blockInvalidCharReg = (e) => {
    const invalidChars = [
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "_",
      "-",
      "+",
      "=",
      "|",
      "}",
      "{",
      "[",
      "]",
      ".",
      ",",
      "/",
      "?",
      '"',
      "<",
      ">",
      "`",
      "~",
      ";",
      ":",
    ];
    if (invalidChars.includes(e.key) || e.key === "'" || e.key === "\\") {
      e.preventDefault();
    }
  };

  const formSchema = Yup.object().shape({
    // RegnNo: Yup.string().required("This Field is required"),
    // location: Yup.string().required("This Field is requiredy"),
    // InstallDate: Yup.string().required("This Field is requiredy"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const [Mprocess, setMprocess] = React.useState("");
  const [RefProcess, setRefProcess] = React.useState("");
  const [TgtRate, setTgRate] = React.useState("");

  const { MachineTabledata, post } = useGlobalContext();
  const [finaldata, setFinaldata] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [addprocess, setAddprocess] = React.useState(false);
  const [machineData, setMachineData] = useState({});

  let savemachineInitialState = {
    refNmae: "",
    manufacturer: "",
    model: "",
    Working: 0,
    TgtRate: "",
    reamrks: "",
    InstallDate: "",
    UnistallDate: "",
    location: "",
    RegnNo: "",
  };

  // PROCESSLIST FOR SELECT INPUT
  const [machinetypes, setMachinetypes] = React.useState([]);
  const getSelectmachinetypes = () => {
    axios.get(baseURL + "/productionSetup/getMachineTypes").then((response) => {
      setMachinetypes(response.data);
    });
  };

  useEffect(() => {
    getSelectmachinetypes();
  }, []);

  //SELECT PROCESS TABLE DATA
  const [mach_srl, setMarh_srl] = useState("");
  const [process, setProcess] = useState("");
  const [selectRow, setSelectRow] = useState({});

  const selectedRowFun = (item, index) => {
    let list = { ...item, index: index };
    setMarh_srl(item.Machine_srl);
    setProcess(item.Mprocess);
    setSelectRow(list);
    // console.log(index);
  };

  //PROCESSLIST
  const [processdataList, setProcessdataList] = useState([]);
  useEffect(() => {
    getprocessdataList(selectedRow.Machine_srl);
  }, [selectedRow]);

  const getprocessdataList = (machine_srl) => {
    axios
      .post(baseURL + "/productionSetup/getProcessForMachine", {
        Machine_srl: machine_srl,
      })
      .then((response) => {
        //  console.log('data',response)
        setProcessdataList(response.data);
      });
  };

  useMemo(() => {
    setSelectRow({ ...processdataList[0], index: 0 });
  }, [processdataList[0]]);

  //DELETE PROCESS
  const [opendeleteprocess, setOpendeleteprocess] = useState("");
  const openDeleteProcess = () => {
    setOpendeleteprocess(true);
  };

  //DELETE MACHINE
  const [opendeletemachine, setOpendeletemachine] = useState("");
  const openDeletemachine = () => {
    setOpendeletemachine(true);
  };

  let referencename = selectedRow.refName;
  // console.log("delete machine",referencename)
  const deleteMachine = () => {
    axios
      .post(baseURL + "/productionSetup/deleteMachine", {
        refName: referencename,
      })
      .then((response) => {
        // console.log("deleted",response)
        setSelectedRow({ ...post[0], index: 0 });
        MachineTabledata();
      });
  };

  //GET MACHINE DETAILS
  const getmachineDetails = () => {
    axios
      .post(baseURL + "/productionSetup/getMachine", {
        refName: referencename,
      })
      .then((response) => {
        // console.log("Required data",response[0]);
        setFinaldata(response.data);
      });
  };

  useMemo(() => {
    setMachineData({ ...selectedRow });
  }, [selectedRow]);

  const handleMachineChange = (e) => {
    let { name, value } = e.target;
    if (name === "Working") {
      let status = "";
      if (e.target.checked) {
        status = 1;
      } else {
        status = 0;
      }
      setMachineData({ ...machineData, Working: status });
      return;
    }
    setMachineData({ ...machineData, [name]: value });
    // console.log(value);
  };

  const openAddprocess = () => {
    //clear the state of the add process model here
    setRefProcess("");
    setTgRate("");
    setAddprocess(true);
  };

  const addMachine = () => {
    setShow(true);
    // console.log("hi")
  };

  //SAVE MACHINE
  const [opensavemachine, setOpensavemachine] = useState("");
  const openSavemachine = () => {
    setOpensavemachine(true);
  };

  const saveMachine = () => {
    if (machineData.TgtRate === null || machineData.TgtRate === "") {
      // Show an error toast using Toastify
      toast.error("Target Rate is required", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      axios
        .post(baseURL + "/productionSetup/saveMachine", {
          ...machineData,
        })
        .then((response) => {
          MachineTabledata();
          toast.success("Machine Details Saved", {
            position: toast.POSITION.TOP_CENTER,
          });

          // Update the state properties after successful save
          setMachineData((prevMachineData) => ({
            ...prevMachineData,
            isInstallDatePresent: true, // Update to the desired value
            isLocationPresent: true, // Update to the desired value
            isRegnNumberPresent: true, // Update to the desired value
          }));
        });
    }
  };

  //Close Button
  const navigate = useNavigate();
  const onClickClose = () => {
    navigate("/Production");
  };

  return (
    <div>
      {<AddMachine show={show} setShow={setShow} machinetypes={machinetypes} />}

      {opendeletemachine && (
        <DeleteMachine
          opendeletemachine={opendeletemachine}
          setOpendeletemachine={setOpendeletemachine}
          selectedRow={selectedRow}
          deleteMachine={deleteMachine}
        />
      )}

      {opendeleteprocess && (
        <DeleteProcess
          opendeleteprocess={opendeleteprocess}
          setOpendeleteprocess={setOpendeleteprocess}
          selectRow={selectRow}
          // deleteProcess={deleteProcess}
          processdataList={processdataList}
          getprocessdataList={getprocessdataList}
        />
      )}

      {
        <AddProcessmodal
          addprocess={addprocess}
          setAddprocess={setAddprocess}
          selectedRow={selectedRow}
          getprocessdataList={getprocessdataList}
          setMprocess={setMprocess}
          setRefProcess={setRefProcess}
          setTgRate={setTgRate}
          Mprocess={Mprocess}
          RefProcess={RefProcess}
          TgtRate={TgtRate}
        />
      }

      {opensavemachine && (
        <SaveMachine
          opensavemachine={opensavemachine}
          setOpensavemachine={setOpensavemachine}
          selectedRow={selectedRow}
        />
      )}

      <form className="form" onSubmit={handleSubmit(saveMachine)}>
        <div className="ip-box form-bg">
          <div className="row">
            <div className="row">
              <div className="d-flex col-md-12" style={{ gap: "10px" }}>
                <div className="d-flex col-md-6" style={{ gap: "10px" }}>
                  <label
                    className="form-label"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Reference Name
                  </label>
                  <input
                    className="input-field"
                    value={machineData.refName}
                    disabled={true}
                    name="refName"
                    onChange={(e) => handleMachineChange(e)}
                  />
                </div>

                <div className="d-flex col-md-6" style={{ gap: "10px" }}>
                  <label
                    className="form-label"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Manufacturer
                  </label>
                  <input
                    className="input-field"
                    name="manufacturer"
                    value={machineData.manufacturer || " "}
                    disabled={true}
                    onChange={(e) => handleMachineChange(e)}
                  />
                </div>
              </div>
            </div>

            {/* <div className="row">
              <div className="d-flex col-md-12" style={{ gap: "24px" }}>
                <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                  Manufacturer
                </label>
                <input
                  className="input-field"
                  name="manufacturer"
                  value={machineData.manufacturer || " "}
                  disabled={true}
                  onChange={(e) => handleMachineChange(e)}
                />
              </div>
            </div> */}

            <div className="row">
              <div className="col-md-9">
                <div className="d-flex col-md-12" style={{ gap: "64px" }}>
                  <label className="form-label">Model</label>
                  <input
                    className="input-field"
                    value={machineData.Model || " "}
                    disabled={true}
                    name="model"
                    onChange={(e) => handleMachineChange(e)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div
                  className="col-md-12 mt-1"
                  style={{ display: "flex", gap: "5px" }}
                >
                  <label className="form-label">Working</label>
                  <input
                    className="form-check-input mt-2"
                    type="checkbox"
                    checked={machineData.Working === 1 ? true : false}
                    name="Working"
                    onChange={(e) => handleMachineChange(e)}
                    id="flexCheckDefault"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="d-flex col-md-12" style={{ gap: "35px" }}>
                  <label
                    className="form-label"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    RegnNo <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    value={machineData.RegnNo}
                    name="RegnNo"
                    disabled={
                      machineData.isRegnNumberPresent === true ? true : false
                    }
                    onKeyDown={blockInvalidCharReg}
                    {...register("RegnNo")}
                    className={`input-field ${
                      errors.RegnNo ? "is-invalid" : ""
                    }`}
                    required
                    onChange={(e) => handleMachineChange(e)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex col-md-12" style={{ gap: "34px" }}>
                  <label
                    className="form-label"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Location <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    name="location"
                    value={machineData.location}
                    disabled={
                      machineData.isLocationPresent === true ? true : false
                    }
                    {...register("location")}
                    className={`input-field ${
                      errors.location ? "is-invalid" : ""
                    }`}
                    required
                    onChange={(e) => handleMachineChange(e)}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="d-flex col-md-12" style={{ gap: "10px" }}>
                  <label
                    className="form-label"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Machine_Type
                  </label>
                  <select
                    className="ip-select"
                    value={machineData.Machine_Type}
                    name="Machine_Type"
                    onChange={(e) => handleMachineChange(e)}
                  >
                    {machinetypes.map((value, key) => {
                      return (
                        <>
                          <option value={value}>{value}</option>
                        </>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <div className="d-flex col-md-12" style={{ gap: "25px" }}>
                  <label
                    className="form-label"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Target Rate
                  </label>
                  <input
                    className="input-field"
                    type="number"
                    onKeyDown={blockInvalidChar}
                    value={machineData.TgtRate}
                    name="TgtRate"
                    onChange={(e) => handleMachineChange(e)}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="d-flex col-md-12" style={{ gap: "16px" }}>
                  <label
                    className="form-label"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Install Date <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    name="InstallDate"
                    value={formatDate(machineData.InstallDate)}
                    type="date"
                    disabled={
                      machineData.isInstallDatePresent === true ? true : false
                    }
                    {...register("InstallDate")}
                    className={`input-field ${
                      errors.InstallDate ? "is-invalid" : ""
                    }`}
                    required
                    onChange={(e) => handleMachineChange(e)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex col-md-12" style={{ gap: "10px" }}>
                  <label
                    className="form-label"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Uninstall Date
                  </label>
                  <input
                    className="input-field"
                    name="UnistallDate"
                    value={formatDate(machineData.UnistallDate)}
                    type="date"
                    min={machineData.InstallDate}
                    onChange={(e) => handleMachineChange(e)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="d-flex col-md-12" style={{ gap: "40px" }}>
                <label className="form-label">Remarks</label>
                <input
                  className="input-field"
                  name="remarks"
                  value={machineData.remarks}
                  onChange={(e) => handleMachineChange(e)}
                />
              </div>
            </div>
          </div>

          <div className="row mt-1 mb-1">
            <div className="col-md-12" style={{ marginLeft: "10px" }}>
              <button
                className="button-style mt-2 group-button"
                type="button"
                onClick={() => addMachine()}
              >
                Add Machine
              </button>

              <button className="button-style mt-2 group-button" type="submit">
                Save Machine
              </button>

              <button
                className="button-style mt-2 group-button"
                type="button"
                onClick={() => {
                  openDeletemachine();
                }}
              >
                Delete Machine
              </button>

              <button
                className="button-style mt-2 group-button"
                type="button"
                onClick={() => openAddprocess()}
              >
                Add Process
              </button>

              <button
                className="button-style mt-2 group-button"
                type="button"
                onClick={() => {
                  openDeleteProcess();
                }}
              >
                Delete Process
              </button>

              <button
                className="button-style mt-2 group-button"
                type="button"
                onClick={onClickClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="mt-1">
        <ProcessTable
          processdataList={processdataList}
          selectedRowFun={selectedRowFun}
          // selectedRow={selectedRow}
          selectRow={selectRow}
          getprocessdataList={getprocessdataList}
        />
      </div>
    </div>
  );
}
