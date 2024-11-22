import React, { useEffect, useState } from "react";
import ByMachineBox from "./ByMachine/ByMachineBox";
import ByOperations from "./ByOperations/ByOperations";
import ByCustomer from "./ByCustomer/ByCustomers";
import axios from "axios";
import { baseURL } from "../../../../../api/baseUrl";
import { useNavigate } from "react-router-dom";

function Forms() {
  const [text, setText] = useState("");
  const [isToggled, setIsToggled] = useState(true);
  const [isClick, setIsClick] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const byMachine = () => {
    setIsClick(false);
    setIsCustomer(false);
    setIsToggled(!isToggled);
  };

  const byOperation = () => {
    setIsToggled(false);
    setIsCustomer(false);
    setIsClick(!isClick);
  };

  const byCustomer = () => {
    setIsClick(false);
    setIsToggled(false);
    setIsCustomer(!isCustomer);
  };

  const moment = require("moment");
  const today = moment();

  const [shiftDetails, setShiftDetails] = useState([]);
  useEffect(() => {
    var date1 = moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss ");
    console.log(date1);
    const dateArray = date1.split(" ");
    console.log(dateArray[0]);
    console.log(dateArray[1]);
    const timeArray = dateArray[1].split(":");
    console.log(timeArray[0]);
    let Shift = " ";
    if (timeArray[0] >= 6 && timeArray[0] <= 14) {
      Shift = "First";
    } else if (timeArray[0] >= 14 && timeArray[0] <= 22) {
      Shift = "Second";
    } else {
      Shift = "Third";
    }
    console.log("shift is", Shift);
    axios
      .post(baseURL + "/shiftManagerProfile/getShiftInformation", {
        ShiftDate: dateArray[0],
        Shift: Shift,
      })
      .then((response) => {
        console.log("Shift Information", response.data);
        console.log(response.data[0].ShiftDate, "shift Information 1");

        //changing Shift Date
        let dateSplit = response.data[0].ShiftDate.split("-");
        let year = dateSplit[0];
        let month = dateSplit[1];
        let day = dateSplit[2];
        let finalDay = day + "-" + month + "-" + year;
        console.log(finalDay, "shift Information 1");
        response.data[0].ShiftDate = finalDay;

        //changing from date
        let dateSplit1 = response.data[0].FromTime.split(" ");
        let fromtime = dateSplit1[1];
        console.log(fromtime, "shift Information 1");
        let finalDay1 = finalDay + " " + fromtime;
        response.data[0].FromTime = finalDay1;

        //changing to date
        let dateSplit2 = response.data[0].ToTime.split(" ");
        let totime = dateSplit2[1];
        console.log(fromtime, "shift Information 1");
        let finalDay2 = finalDay + " " + totime;
        response.data[0].ToTime = finalDay2;

        //response.data[0].ShiftDate = finalDay
        setShiftDetails(response.data);
      });
  }, []);

  //Close Button
  const navigate = useNavigate();
  const onClickClose = () => {
    navigate("/Production");
  };

  return (
    <>
      {/* {shiftDetails &&
        shiftDetails.map((item) => { */}

      <div className="bg-light" style={{ marginTop: "-8px" }}>
        <label className="form-label ms-2">
          Shift In Charge Monitoring Form
        </label>

        <div className="row">
          <div className="col-md-4">
            <div className="d-flex" style={{ gap: "38px" }}>
              <label className="form-label">Date</label>
              <input
                className="input-field bg-light"
                disabled
                value={shiftDetails[0]?.ShiftDate}
              />
            </div>

            <div className="d-flex" style={{ gap: "38px" }}>
              <label className="form-label">Shift</label>
              <input
                className="input-field"
                type="text"
                disabled
                value={shiftDetails[0]?.Shift}
              />
            </div>

            <div className="d-flex" style={{ gap: "36px" }}>
              <label className="form-label">From</label>
              <input
                className="input-field"
                value={shiftDetails[0]?.FromTime}
                disabled
              />
            </div>

            <div className="d-flex" style={{ gap: "52px" }}>
              <label className="form-label">To</label>
              <input
                className="input-field"
                disabled
                value={shiftDetails[0]?.ToTime}
              />
            </div>

            <div className="d-flex mb-2" style={{ gap: "10px" }}>
              <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                In Charge
              </label>
              <input
                className="input-field"
                type="text"
                disabled
                value={shiftDetails[0]?.Shift_Ic}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="d-flex" style={{ gap: "10px" }}>
              <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                Shift Instructions
              </label>
              <textarea
                className="input-field"
                rows="8"
                id=""
                onChange={handleOnChange}
                style={{ height: "125px", resize: "none", width: "300px" }}
                value={shiftDetails[0]?.Shift_instruction}
                disabled
              ></textarea>
            </div>
          </div>
          <div className="col-md-3">
            <div>
              <label className="form-label" style={{ fontSize: "14px" }}>
                Group Actions
              </label>

              <div
                className="col-md-12 mt-1"
                style={{ display: "flex", gap: "5px" }}
              >
                <label className="form-label" style={{ paddingRight: "4px" }}>
                  {" "}
                  By Machines
                </label>
                <input
                  className="form-check-input mt-2"
                  onChange={byMachine}
                  type="radio"
                  name="working"
                  defaultChecked
                />
              </div>
              <div
                className="col-md-12 mt-1"
                style={{ display: "flex", gap: "5px" }}
              >
                <label className="form-label"> By Operation</label>
                <input
                  className="form-check-input mt-2"
                  onChange={byOperation}
                  type="radio"
                  name="working"
                />
              </div>
              <div
                className="col-md-12 mt-1"
                style={{ display: "flex", gap: "5px" }}
              >
                <label className="form-label" style={{ paddingRight: "3px" }}>
                  {" "}
                  By Customer
                </label>
                <input
                  className="form-check-input mt-2"
                  onChange={byCustomer}
                  type="radio"
                  name="working"
                />
              </div>
            </div>
          </div>
          <div className="col-md-1">
            <button
              className="button-style group-button"
              type="button"
              onClick={onClickClose}
            >
              Close
            </button>
          </div>
        </div>

        {/* <form className="d-flex">
            <div className="box mb-1">
              <div className="col-md-9">
                <label className="form-label">Date</label>
                <input
                  className="in-field bg-light"
                  disabled
                  value={shiftDetails[0]?.ShiftDate}
                />
              </div>

              <div className="col-md-9">
                <label className="form-label">Shift</label>
                <input
                  className="in-field"
                  type="text"
                  disabled
                  value={shiftDetails[0]?.Shift}
                />
              </div>

              <div className="col-md-9">
                <label className="form-label">From</label>
                <input
                  className="in-field"
                  value={shiftDetails[0]?.FromTime}
                  disabled
                />
              </div>

              <div className="col-md-9 ">
                <label className="form-label">To</label>
                <input
                  className="in-field"
                  disabled
                  value={shiftDetails[0]?.ToTime}
                />
              </div>

              <div className="col-md-9 ">
                <label className="form-label">In Charge</label>
                <input
                  className="in-field"
                  type="text"
                  disabled
                  value={shiftDetails[0]?.Shift_Ic}
                />
              </div>
            </div>

            <div className="bg-light box01">
              <div
                className="mb-3"
                style={{ paddingLeft: "2px", width: "450px" }}
              >
                <label
                  htmlFor="myBox"
                  className="bg-ligh tform-title tab_font mb-2"
                >
                  Shift Instructions
                </label>
                <textarea
                  className="form-control sticky-top"
                  rows="8"
                  id=""
                  onChange={handleOnChange}
                  style={{ height: "201px", resize: "none" }}
                  value={shiftDetails[0]?.Shift_instruction}
                  disabled
                ></textarea>
              </div>
            </div>

            <div className="mt-4 ms-5">
              <h8>
                <b>Group Actions</b>
              </h8>
              <div
                className="col-md-12 mt-1"
                style={{ display: "flex", gap: "5px" }}
              >
                <label className="" style={{ paddingRight: "4px" }}>
                  {" "}
                  By Machines
                </label>
                <input
                  className="form-check-input mt-2"
                  onChange={byMachine}
                  type="radio"
                  name="working"
                  defaultChecked
                />
              </div>
              <div
                className="col-md-12 mt-1"
                style={{ display: "flex", gap: "5px" }}
              >
                <label className=""> By Operation</label>
                <input
                  className="form-check-input mt-2"
                  onChange={byOperation}
                  type="radio"
                  name="working"
                />
              </div>
              <div
                className="col-md-12 mt-1"
                style={{ display: "flex", gap: "5px" }}
              >
                <label className="" style={{ paddingRight: "3px" }}>
                  {" "}
                  By Customer
                </label>
                <input
                  className="form-check-input mt-2"
                  onChange={byCustomer}
                  type="radio"
                  name="working"
                />
              </div>
              <button
                className="button-style mt-4 group-button"
                type="button"
                style={{ width: "120px" }}
                onClick={onClickClose}
              >
                Close
              </button>
            </div>
          </form> */}
      </div>

      {/* })} */}

      <div>
        <div className="box01 mt-1">
          {isToggled && <ByMachineBox />}
          {isClick && <ByOperations />}
          {isCustomer && <ByCustomer />}
        </div>
      </div>
    </>
  );
}

export default Forms;
