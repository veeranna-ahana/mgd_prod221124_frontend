import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import PrintWeeklyplan from "./PrintWeeklyplan";
import axios from "axios";
import { baseURL } from "../../../../../api/baseUrl";

export default function ModalPrintWeeklyPlan({
  openPrintModal,
  setOpenPrintModal,
  selectedWeek,
  newTry
}) {

  console.log("selectedWeek in Modal is",selectedWeek)

  const [fullscreen, setFullscreen] = useState(true);
  const [pdfShifts, setPdfShifts] = useState([]);
  const [pdfMOData, setPdfMoData] = useState([]);

  // const getWeeklyshiftPrint1 = () => {
  //   axios
  //     .post(baseURL + "/shiftEditor/getFullWeekDetailPlan", {
  //       ShiftDate: selectedWeek,
  //     })
  //     .then((response) => {
  //       // console.log(response.data);
  //       setPdfShifts(response.data);
  //     });
  // };

  // const getMachineOperatorTableData = () => {
  //   axios
  //     .post(baseURL + "/shiftEditor/getPdfMachineOperator", {
  //       ShiftDate: selectedWeek,
  //     })
  //     .then((response) => {
  //       // console.log(response.data);
  //       setPdfMoData(response.data);
  //     });
  // };

  //TryPDF
  

  return (
    <>
      <Modal
        show={openPrintModal}
        fullscreen={fullscreen}
        onHide={() => setOpenPrintModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Print Weekly Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PrintWeeklyplan selectedWeek={selectedWeek} pdfShifts={newTry} />
        </Modal.Body>
      </Modal>
    </>
  );
}
