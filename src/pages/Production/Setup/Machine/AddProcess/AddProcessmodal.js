import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AlertAddprocess from "./AlertAddprocess";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { baseURL } from "../../../../../api/baseUrl";
//import {process} from './ProcessList'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function AddProcessmodal({
  addprocess,
  setAddprocess,
  selectedRow,
  getprocessdataList,
  setTgRate,
  setRefProcess,
  setMprocess,
  Mprocess,
  RefProcess,
  TgtRate,
}) {
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault();

  const formSchema = Yup.object().shape({
    RefProcess: Yup.string().required("This Field is required"),
    TgtRate: Yup.string().required("This Field is required"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const [alert, setAlert] = React.useState(false);
  const [processList, setProcessList] = React.useState([]);

  //  const [Machinesrl,setMachinesrl]=React.useState('')

  let addprocessState = {
    RefProcess: "",
    TgtRate: "",
    Machine_srl: "",
    Mprocess: "",
  };
  const [processform, setProcessform] = React.useState(addprocessState);
  function handleFormChange(e) {
    let { name, value } = e.target;
    setProcessform({ ...processform, [name]: value });
  }

  const handleClose = () => {
    setAddprocess(false);
    // console.log("Onclick Exit", processform);
    setProcessform({
      RefProcess: "",
      TgtRate: "",
      Machine_srl: "",
      Mprocess: "",
    });
  };

  useEffect(() => {
    // reset form with user data
    reset(processform);
  }, [processform]);

  useEffect(() => {
    axios
      .get(baseURL + "/productionSetup/getAllProcessList")
      .then((response) => {
        setProcessList(response.data);
      });
  }, []);

  // console.log("processform",processList);

  const findmprocess = (processDescription) => {
    // console.log('inside function' ,processList)
    let newArray = processList.filter(function (processList) {
      return processList.ProcessDescription == processDescription;
    });
    setMprocess(newArray[0].ProcessID);
    return newArray[0].ProcessID;
  };

  const showAlert = () => {
    setAlert(true);
    setAddprocess(false);
    // console.log("machineSRL IS ", selectedRow.Machine_srl);
    let foundedMprocess = findmprocess(processform.RefProcess);
    setProcessform({
      ...processform,
      Mprocess: foundedMprocess,
      Machine_srl: selectedRow.Machine_srl,
    });
    setMprocess(foundedMprocess);
    let Mprocess = addprocessState.Mprocess;
    // console.log("last console of state process form ", processform);
  };

  const submitProcessform = () => {
    setAlert(false);
    axios
      .post(baseURL + "/productionSetup/addProcessToMachine", {
        ...processform,
      })
      .then((response) => {
        // console.log("sent", response);
        // console.log("final response", response.data);
        // console.log(selectedRow);
        getprocessdataList(selectedRow.Machine_srl);
        setProcessform(addprocessState);
      });
    toast.success("Process Added Sucessfully", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <div>
      {alert && (
        <AlertAddprocess
          alert={alert}
          setAlert={setAlert}
          processform={processform}
          selectedRow={selectedRow}
          setProcessform={setProcessform}
          getprocessdataList={getprocessdataList}
          submitProcessform={submitProcessform}
        />
      )}
      <Modal show={addprocess} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "14px" }}>
            Magod Laser:Machine Process
          </Modal.Title>
        </Modal.Header>

        <form className="form" onSubmit={handleSubmit(showAlert)}>
          <Modal.Body>
            <label className="form-label ms-2">{selectedRow.refName}</label>
            <div className="col-md-12 col-sm-12 ip-box form-bg">
              <div>
                <div className="row">
                  <div
                    className="d-flex col-md-12 mb-1"
                    style={{ gap: "35px" }}
                  >
                    <label className="form-label">Process</label>
                    <select
                      name="RefProcess"
                      value={processform.RefProcess}
                      {...register("RefProcess")}
                      className={`ip-select  ${
                        errors.RefProcess ? "is-invalid" : ""
                      }`}
                      required
                      onChange={(e) => {
                        handleFormChange(e);
                        setRefProcess(e.target.value);
                      }}
                    >
                      <option value="">Select Process</option>
                      {processList.map((value, key) => {
                        return (
                          <>
                            <option value={value.ProcessDescription}>
                              {value.ProcessDescription}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>

                  <div
                    className="d-flex col-md-12 mb-2"
                    style={{ gap: "10px" }}
                  >
                    <label className="form-label">Rate(/Hour)</label>
                    <input
                      value={processform.TgtRate}
                      name="TgtRate"
                      type="number"
                      onKeyDown={blockInvalidChar}
                      {...register("TgtRate")}
                      className={`in-field2 ${
                        errors.TgtRate ? "is-invalid" : ""
                      }`}
                      required
                      onChange={(e) => {
                        handleFormChange(e);
                        setTgRate(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <button className="button-style group-button" type="submit">
              Add Process
            </button>
            <button className="button-style group-button" onClick={handleClose}>
              Exit
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
