import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateDayshiftModal from "./Modals/UpdateDayshiftModal";
import DeleteDayShiftModal from "./Modals/DeleteDayShiftModal";
import ModalPrintDailyShift from "./PdfPrinter/DailyshiftTable/ModalPrintDailyShift";
import { baseURL } from "../../.././api/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import SpecialShiftModal from "./Modals/SpecialShiftModal";

function SingleDayShiftEditor({
  getSingleDayShiftPlan4thTable,
  rowselectDailyShiftTable,
  getSecondTableData,
  rowselect,
  rowSelectFunForDailyShiftTable,
  condition,
  selectedWeek,
  machineOperatorTableData,
  selectedShift,
  SelectedShiftIncharge,
  setSelectedShiftInchargeForSpecialShift,
}) {
  // console.log(rowselectDailyShiftTable.Shift_Ic);
  //PRINT DAILY SHIFT
  // let navigate=useNavigate();

  const [openPrintModal, setOpenPrintModal] = useState("");
  const openDailyShiftPrinter = () => {
    // console.log(rowselect);
    if (rowselect.item === "" && rowselect.index === 0) {
      toast.error("Please select a Date", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setOpenPrintModal(true);
    }
  };

  const [dataShiftIncharge, setDataShiftIncharge] = useState([]);
  const [selectedShiftIncharge, setSelectedShiftIncharge] = useState([]);

  const getShiftInchargeData = async () => {
    const { data } = await axios.get(
      baseURL + `/shiftEditor/shiftInchargeList`
    );
    setDataShiftIncharge(data);
  };

  const handleShiftIncharge = (e) => {
    setSelectedShiftIncharge(e.target.value);
  };

  useEffect(() => {
    getShiftInchargeData();
  }, []);

  useEffect(() => {
    setSelectedShiftIncharge(rowselectDailyShiftTable?.Shift_Ic);
  }, [rowselectDailyShiftTable]);

  const onClickUpdateDayShift = () => {
    axios
      .post(baseURL + "/shiftEditor/updateSingleDaySihiftIncharge", {
        ...rowselectDailyShiftTable,
        newShift_Ic: selectedShiftIncharge,
      })
      .then((response) => {
        getSingleDayShiftPlan4thTable();
        getSecondTableData();
        toast.success("Shift Instructor Updated", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const onClickDeleteDayShiftPlan = () => {
    axios
      .post(
        baseURL + "/shiftEditor/deleteSingleDayShift",
        rowselectDailyShiftTable
      )
      .then((response) => {
        getSingleDayShiftPlan4thTable();
        getSecondTableData();
      });
  };

  //UPDATE DAYSHIFT MODAL
  const [updatedayshift, setUpdatedayshift] = useState("");
  const openUpdatedayshift = () => {
    setUpdatedayshift(true);
  };

  //DELETEDAYSHIFTMODAL
  const [deletedayshift, setDeletedayshift] = useState("");
  const openDeletedayshift = () => {
    if (machineOperatorTableData.length === 0) {
      setDeletedayshift(true);
    } else {
      toast.warning("Please Delete Machine Operator Before Deleting Shift", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const [open, setOpen] = useState(false);

  const handleAddSpecialShift = () => {
    setOpen(true);
  };

  const ShiftDate = rowselectDailyShiftTable?.ShiftDate;

  /////////////////////
  let date = rowselect.item;

  let dateSplit = date.split("/");
  let year = dateSplit[2];
  let month = dateSplit[1];
  let day = dateSplit[0];
  let finalday = year + "-" + month + "-" + day;

  // console.log(finalday);

  //First Shift
  const [newData, setNewdata] = useState([]);

  const getDailyMachineoperatorData = () => {
    axios
      .post(baseURL + "/shiftEditor/printdayShiftPlan", {
        ShiftDate: finalday,
      })
      .then((response) => {
        setNewdata(response.data);
        openDailyShiftPrinter();
      });
  };

  return (
    <>
      <div
        className="col-md-4"
        style={{
          width: "215px",
          // textAlign: "center",
          backgroundColor: "#d3d3d3",
          fontSize: "12px",
        }}
      >
        <div className="" style={{ textAlign: "center" }}>
          <label className="form-label">Daily Shift Editor</label>
        </div>
        <div className="ms-1" style={{ color: "red" }}>
          {" "}
          <b>
            Date : {rowselectDailyShiftTable?.ShiftDate} /{" "}
            {rowselectDailyShiftTable?.Shift}
          </b>
        </div>
        {/* <div className="mt-1" style={{ color: "red" }}>
          <b>Shift : {rowselectDailyShiftTable?.Shift}</b>
        </div> */}

        <div
          className="ms-1 col-md-8 d-flex"
          style={{ width: "120px", gap: "5px" }}
        >
          <label className="form-label" style={{ whiteSpace: "nowrap" }}>
            Shift InCharge
          </label>
          <select
            className="ip-select"
            onChange={handleShiftIncharge}
            value={selectedShiftIncharge}
            style={{ width: "110px" }}
          >
            {selectedShiftIncharge === undefined ? (
              <option value="" disabled>
                Select ShiftIncharge
              </option>
            ) : (
              <>
                <option value="" disabled>
                  Select ShiftIncharge
                </option>
                {dataShiftIncharge.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
        <div className="ms-1 d-flex" style={{ gap: "25px" }}>
          <div>
            <label className="form-label" style={{ whiteSpace: "nowrap" }}>
              From Time
            </label>
          </div>
          <div
            className="mt-1"
            style={{
              backgroundColor: "white",
              width: "112px",
            }}
          >
            {rowselectDailyShiftTable?.FromTime}
          </div>
        </div>

        <div className="ms-1 d-flex" style={{ gap: "20%" }}>
          <div>
            <label className="form-label">To Time</label>
          </div>
          <div
            className="mt-1"
            style={{
              backgroundColor: "white",
              width: "112px",
            }}
          >
            {rowselectDailyShiftTable?.ToTime}
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div className="d-flex ms-1">
            <div>
              <button
                className={`button-style group-button  ${
                  condition !== true ? "disabled" : ""
                }`}
                disabled={condition !== true}
                onClick={handleAddSpecialShift}
              >
                Add Spcl Shift
              </button>
            </div>
            <div>
              <button
                className={`button-style group-button ${
                  condition !== true ? "disabled" : ""
                }`}
                disabled={condition !== true}
                onClick={openUpdatedayshift}
              >
                Updt Day Shift
              </button>
            </div>
          </div>
          <div className="d-flex ms-2">
            <div>
              <button
                className={`button-style group-button ${
                  condition !== true ? "disabled" : ""
                }`}
                onClick={() => openDeletedayshift()}
                disabled={condition !== true}
              >
                Del Day Shift
              </button>
            </div>
            <div>
              <button
                className="button-style group-button mb-2"
                onClick={getDailyMachineoperatorData}
              >
                Print Day Shift
              </button>
            </div>
          </div>
        </div>

        <UpdateDayshiftModal
          updatedayshift={updatedayshift}
          setUpdatedayshift={setUpdatedayshift}
          onClickUpdateDayShift={onClickUpdateDayShift}
          rowselectDailyShiftTable={rowselectDailyShiftTable}
          selectedShiftIncharge={selectedShiftIncharge}
          selectedWeek={selectedWeek}
        />

        <DeleteDayShiftModal
          setDeletedayshift={setDeletedayshift}
          deletedayshift={deletedayshift}
          rowselectDailyShiftTable={rowselectDailyShiftTable}
          onClickDeleteDayShiftPlan={onClickDeleteDayShiftPlan}
        />

        <ModalPrintDailyShift
          openPrintModal={openPrintModal}
          setOpenPrintModal={setOpenPrintModal}
          rowselect={rowselect}
          newData={newData}
          setNewdata={setNewdata}
        />

        <SpecialShiftModal
          open={open}
          setOpen={setOpen}
          rowselectDailyShiftTable={rowselectDailyShiftTable}
          selectedShift={selectedShift}
          SelectedShiftIncharge={SelectedShiftIncharge}
          ShiftDate={ShiftDate}
          getSingleDayShiftPlan4thTable={getSingleDayShiftPlan4thTable}
          getSecondTableData={getSecondTableData}
          setSelectedShiftInchargeForSpecialShift={setSelectedShiftInchargeForSpecialShift}
        />
      </div>
    </>
  );
}

export default SingleDayShiftEditor;
