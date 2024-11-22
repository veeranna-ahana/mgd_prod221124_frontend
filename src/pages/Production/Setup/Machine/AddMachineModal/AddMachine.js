import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import MachineModal from "./MachineModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { useGlobalContext } from "../../../../../Context/Context";

export default function AddMachine({ show, setShow, machinetypes }) {
  let initialState = {
    manufacturer: "",
    refName: "",
    model: "",
    Machine_Type: "",
  };
  const [formdata, setFormdata] = useState(initialState);
  function handleFormChange(e) {
    let { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  }
  // console.log(formdata)

  const formSchema = Yup.object().shape({
    refName: Yup.string().required("This Field is required"),
    manufacturer: Yup.string().required("This Field is requiredy"),
    model: Yup.string().required("This Field is required"),
    Machine_Type: Yup.string().required("This Field is required"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  useEffect(() => {
    // reset form with user data
    reset(formdata);
  }, [formdata]);

  const [open, setOpen] = React.useState(false);

  const onSubmit = () => {
    setOpen(true);
    setShow(false);
  };

  const handleClose = () => {
    setShow(false);
    setFormdata({ manufacturer: "", refName: "", model: "", Machine_Type: "" });
  };

  return (
    <div>
      {
        <MachineModal
          open={open}
          setOpen={setOpen}
          handleC={handleClose}
          formdata={formdata}
          setFormdata={setFormdata}
        />
      }
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "14px" }}>
            Magod Laser:Add New Machine
          </Modal.Title>
        </Modal.Header>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div className="col-md-12 col-sm-12 ip-box form-bg">
              <div>
                <div className="row">
                  <div className="d-flex col-md-12" style={{ gap: "10px" }}>
                    <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {" "}
                      Machine Reference Name
                    </label>
                    <input
                      name="refName"
                      value={formdata.refName}
                      {...register("refName")}
                      className={`input-field ${
                        errors.refName ? "is-invalid" : ""
                      }`}
                      required
                      maxLength={100}
                      onChange={(e) => handleFormChange(e)}
                    />
                  </div>

                  <div className="d-flex col-md-12" style={{ gap: "77px" }}>
                    <label className="form-label"> Manufacturer</label>
                    <input
                      value={formdata.manufacturer}
                      {...register("manufacturer")}
                      className={`input-field ${
                        errors.manufacturer ? "is-invalid" : ""
                      }`}
                      required
                      name="manufacturer"
                      onChange={(e) => handleFormChange(e)}
                    />
                  </div>

                  <div className="d-flex col-md-12" style={{ gap: "117px" }}>
                    <label className="form-label"> Model</label>
                    <input
                      {...register("model")}
                      value={formdata.model}
                      className={`input-field ${
                        errors.model ? "is-invalid" : ""
                      }`}
                      required
                      name="model"
                      onChange={(e) => handleFormChange(e)}
                    />
                  </div>

                  <div
                    className="d-flex col-md-12 mb-4 "
                    style={{ gap: "74px" }}
                  >
                    <label className="form-label">Machine_Type</label>
                    <select
                      {...register("Machine_Type")}
                      value={formdata.Machine_Type}
                      className={`ip-select ${
                        errors.Machine_Type ? "is-invalid" : ""
                      }`}
                      required
                      name="Machine_Type"
                      onChange={(e) => handleFormChange(e)}
                    >
                      <option value="">Select Machine_Type</option>
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
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="button-style group-button" type="submit">
              Save
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
