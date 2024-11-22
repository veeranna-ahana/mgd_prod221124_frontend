import React, { useEffect } from "react";
import { useGlobalContext } from "../../../../../Context/Context";
import { useState } from "react";
import ShowStatusPdfModal from "./PrintPdF/ShowStatus/ShowStatusPdfModal";
import ShowPartsPdfModal from "./PrintPdF/ShowParts/ShowPartsPdfModal";
import { baseURL } from "../../../../../api/baseUrl";
import axios from "axios";
import ShowProgramsPdfModal from "./PrintPdF/ShowPrograms/ShowProgramsPdfModal";
import { Typeahead } from "react-bootstrap-typeahead";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Row,
  Col,
  Form,
  FormLabel,
  FormCheck,
  Button,
} from "react-bootstrap";
import ProductionListModalFabrication from "./PrintPdF/ProductionList/ProductionListModal";

export default function ScheduleHeader({
  rowselect,
  processrowselect,
  partlistdata,
  programlistdata,
  custdata,
  selectCust,
  showParts,
  getShowPartsData,
}) {
  const {
    schedulelistfabricationdata,
    setSchedulelistfabricationdata,
    schedulelistfabricationdatas,
  } = useGlobalContext();
  // console.log(rowselect,"selected row in left table");
  // console.log("selected row in right table",processrowselect)

  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault();

  const [openShowStatus, setOpenShowStatus] = useState("");
  const openShowStatusPdf = () => {
    setOpenShowStatus(true);
  };

  const [openShowparts, setOpenShowParts] = useState("");
  const openShowPartsPdf = () => {
    setOpenShowParts(true);
    getShowPartsData();
  };

  const [openShowPrograms, setOpenShowPrograms] = useState("");
  const openShowProgram = () => {
    setOpenShowPrograms(true);
  };

  const [programmedtatus, setProgrammedstatus] = useState([]);
  const [completedStatus, setCompletedStatus] = useState([]);
  const [productionStatus, setProductionStatus] = useState([]);
  const [taskedStatus, setTaskedStatus] = useState([]);
  // const[showStatusdata,setShowStatusdata]=useState({})

  const getPrintStatus = () => {
    // Programmed Status
    axios
      .get(baseURL + "/scheduleListProfile/schedulesListStatusProgrammed")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          // FOR TgtDelDate
          let dateSplit = response.data[i].schTgtDate.split(" ");
          let date = dateSplit[0].split("-");
          let year = date[0];
          let month = date[1];
          let day = date[2];
          let finalDay = day + "-" + month + "-" + year + " " + dateSplit[1];
          response.data[i].schTgtDate = finalDay;
        }
        for (let i = 0; i < response.data.length; i++) {
          // Delivery_date
          let dateSplit1 = response.data[i].Delivery_Date.split(" ");
          let date1 = dateSplit1[0].split("-");
          let year1 = date1[0];
          let month1 = date1[1];
          let day1 = date1[2];
          let finalDay1 =
            day1 + "-" + month1 + "-" + year1 + " " + dateSplit1[1];
          response.data[i].Delivery_Date = finalDay1;
        }
        setProgrammedstatus(response.data);
        console.log(response.data);
      });
    //  Completed Status
    axios
      .get(baseURL + "/scheduleListProfile/schedulesListStatusCompleted")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          // FOR TgtDelDate
          let dateSplit = response.data[i].schTgtDate.split(" ");
          let date = dateSplit[0].split("-");
          let year = date[0];
          let month = date[1];
          let day = date[2];
          let finalDay = day + "-" + month + "-" + year + " " + dateSplit[1];
          response.data[i].schTgtDate = finalDay;
        }
        for (let i = 0; i < response.data.length; i++) {
          // Delivery_date
          let dateSplit1 = response.data[i].Delivery_Date.split(" ");
          let date1 = dateSplit1[0].split("-");
          let year1 = date1[0];
          let month1 = date1[1];
          let day1 = date1[2];
          let finalDay1 =
            day1 + "-" + month1 + "-" + year1 + " " + dateSplit1[1];
          response.data[i].Delivery_Date = finalDay1;
        }
        setCompletedStatus(response.data);
        //  console.log(response)
      });

    //Production Status
    axios
      .get(baseURL + "/scheduleListProfile/schedulesListStatusProduction")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          // FOR TgtDelDate
          let dateSplit = response.data[i].schTgtDate.split(" ");
          let date = dateSplit[0].split("-");
          let year = date[0];
          let month = date[1];
          let day = date[2];
          let finalDay = day + "-" + month + "-" + year + " " + dateSplit[1];
          response.data[i].schTgtDate = finalDay;
        }
        for (let i = 0; i < response.data.length; i++) {
          // Delivery_date
          let dateSplit1 = response.data[i].Delivery_Date.split(" ");
          let date1 = dateSplit1[0].split("-");
          let year1 = date1[0];
          let month1 = date1[1];
          let day1 = date1[2];
          let finalDay1 =
            day1 + "-" + month1 + "-" + year1 + " " + dateSplit1[1];
          response.data[i].Delivery_Date = finalDay1;
        }
        setProductionStatus(response.data);
        //  console.log(response)
      });

    //Tasked Status
    axios
      .get(baseURL + "/scheduleListProfile/schedulesListStatusTasked")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          // FOR TgtDelDate
          let dateSplit = response.data[i].schTgtDate.split(" ");
          let date = dateSplit[0].split("-");
          let year = date[0];
          let month = date[1];
          let day = date[2];
          let finalDay = day + "-" + month + "-" + year + " " + dateSplit[1];
          response.data[i].schTgtDate = finalDay;
        }
        for (let i = 0; i < response.data.length; i++) {
          // Delivery_date
          let dateSplit1 = response.data[i].Delivery_Date.split(" ");
          let date1 = dateSplit1[0].split("-");
          let year1 = date1[0];
          let month1 = date1[1];
          let day1 = date1[2];
          let finalDay1 =
            day1 + "-" + month1 + "-" + year1 + " " + dateSplit1[1];
          response.data[i].Delivery_Date = finalDay1;
        }
        setTaskedStatus(response.data);
        //  console.log(response)
      });
  };

  const showStatusData = [
    { status: "Programmed", data: programmedtatus },
    // { status: "Completed", data: completedStatus },
    { status: "Production", data: productionStatus },
    { status: "Tasked", data: taskedStatus },
  ];

  // const jsonData=JSON.stringify(arrays)
  // console.log(arrays);

  const [openProductionList, setOpenProductionList] = useState("");
  const openProductionListPdf = () => {
    setOpenProductionList(true);
  };

  //TRY SEARCH
  const [searchInput, setSearchInput] = useState("");
  const searchText1 = (e) => {
    const searchText = e.target.value;
    const sanitizedSearchText = searchText.replace(/[^0-9 ]/g, ""); // Remove non-numeric characters except spaces
    setSearchInput(sanitizedSearchText);
    // Apply the filter on allotmentTable based on the search input value
    const filteredData = schedulelistfabricationdatas.filter((data) =>
      data.OrdSchNo.startsWith(sanitizedSearchText)
    );
    setSchedulelistfabricationdata(filteredData);
  };

  const navigate = useNavigate();
  const onClickClose = () => {
    navigate("/Production");
  };

   //location
   const[location,setlocation]=useState([]);
   useEffect(()=>{
     axios
     .post(baseURL + "/location/getlocation", {})
     .then((response) => {
       setlocation(response.data);
     });
   },[])
 

  return (
    <div>
      <h4 className="title">Production Schedules Information</h4>

      <div className="row">
        <div className="col-md-3">
          <Form.Group controlId="CustName" style={{ marginTop: "9px" }}>
            {/* <label className="form-label">Customer Name </label>
              <Form.Label
                style={{
                  color: "#f20707",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                *
              </Form.Label> */}
            {custdata.length > 0 ? (
              <Typeahead
                options={custdata}
                placeholder="Search Customer"
                onChange={(label, event) => selectCust(label)}
              />
            ) : (
              ""
            )}
          </Form.Group>
        </div>
        <div className="col-md-2">
          {/* <label className="form-label mt-2">Find Schedule</label> */}
          <input
            className="input-field mt-2"
            onKeyDown={blockInvalidChar}
            placeholder="Search Schedule"
            type="text"
            onChange={(e) => searchText1(e)}
          />
        </div>
        <div className="col-md-2"></div>
        <div className="col-md-5">
          <button
            className="button-style group-button"
            onClick={() => {
              openShowStatusPdf();
              getPrintStatus();
            }}
          >
            Show Status
          </button>

          <button
            className="button-style group-button"
            onClick={openShowPartsPdf}
          >
            Show Parts
          </button>

          <button
            className="button-style group-button"
            onClick={openShowProgram}
          >
            Show Programs
          </button>

          <button
            className="button-style group-button"
            onClick={openProductionListPdf}
          >
            Production list
          </button>
          <button
            className="button-style group-button"
            type="button"
            onClick={onClickClose}
          >
            Close
          </button>
        </div>
      </div>

      <ShowStatusPdfModal
        openShowStatus={openShowStatus}
        setOpenShowStatus={setOpenShowStatus}
        showStatusData={showStatusData}
        location={location[0]?.UnitName}
      />

      <ShowPartsPdfModal
        openShowparts={openShowparts}
        setOpenShowParts={setOpenShowParts}
        rowselect={rowselect}
        processrowselect={processrowselect}
        partlistdata={showParts}
        location={location[0]?.UnitName}
      />

      <ShowProgramsPdfModal
        openShowPrograms={openShowPrograms}
        setOpenShowPrograms={setOpenShowPrograms}
        rowselect={rowselect}
        processrowselect={processrowselect}
        programlistdata={programlistdata}
        location={location[0]?.UnitName}
      />

      <ProductionListModalFabrication
        openProductionList={openProductionList}
        setOpenProductionList={setOpenProductionList}
      />
    </div>
  );
}
