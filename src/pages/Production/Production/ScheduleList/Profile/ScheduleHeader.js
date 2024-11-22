import React from "react";
import { useGlobalContext } from "../../../../../Context/Context";
import { useState } from "react";
import ShowStatusPdfModal from "./PrintPdF/ShowStatus/ShowStatusPdfModal";
import ShowPartsPdfModal from "./PrintPdF/ShowParts/ShowPartsPdfModal";
import { baseURL } from "../../../../../api/baseUrl";
import axios from "axios";
import ShowProgramsPdfModal from "./PrintPdF/ShowPrograms/ShowProgramsPdfModal";
import { Typeahead } from "react-bootstrap-typeahead";
import { useEffect } from "react";
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
import ProductionListModal from "./PrintPdF/ProductionList/ProductionListModal";

export default function ScheduleHeader({
  rowselect,
  processrowselect,
  partlistdata,
  programlistdata,
  custdata,
  selectCust,
  getShowPartsData,
  showParts,
}) {
  const { schedulelistdata, setSchedulelistdata, schedulelistdatas } =
    useGlobalContext();
  const [allotmentTable, setAllotmentTable] = useState([]);

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

  const [openProductionList, setOpenProductionList] = useState("");
  const openProductionListPdf = () => {
    setOpenProductionList(true);
  };

  // const searchText = (e) => {
  //   let number = e.target.value;
  //   let filteredData = schedulelistdata.filter((data) => {
  //     return data.OrdSchNo.startsWith(number);
  //   });
  //   if (filteredData.length > 0) {
  //     setSchedulelistdata(filteredData);
  //   }
  //   if (e.target.value.length === 0) {
  //     setSchedulelistdata(schedulelistdatas);
  //   }
  // };

  const [programmedtatus, setProgrammedstatus] = useState([]);
  const [completedStatus, setCompletedStatus] = useState([]);
  const [productionStatus, setProductionStatus] = useState([]);
  const [taskedStatus, setTaskedStatus] = useState([]);

  // const[showStatusdata,setShowStatusdata]=useState({})

  const handleChangeCustomer = (e) => {
    // setSelectedCustomer(e.target.value);
  };

  const getPrintStatus = () => {
    // Programmed Status
    axios
      .get(baseURL + "/scheduleListProfile/schedulesListStatusProgrammed")
      .then((response) => {
        setProgrammedstatus(response.data);
      });
    //  Completed Status
    axios
      .get(baseURL + "/scheduleListProfile/schedulesListStatusCompleted")
      .then((response) => {
        setCompletedStatus(response.data);
      });

    //Production Status
    axios
      .get(baseURL + "/scheduleListProfile/schedulesListStatusProduction")
      .then((response) => {
        setProductionStatus(response.data);
      });

    //Tasked Status
    axios
      .get(baseURL + "/scheduleListProfile/schedulesListStatusTasked")
      .then((response) => {
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

  const [getCustomerDetails, setGetCustomerDetails] = useState([]);
  const getCustomerList = () => {
    axios
      .get(baseURL + "/scheduleListProfile/allcustomersData")
      .then((response) => {
        console.log(response.data);
        setGetCustomerDetails(response.data);
      });
  };

  useEffect(() => {
    getCustomerList();
  }, []);

  //TRY SEARCH
  const [searchInput, setSearchInput] = useState("");
  const searchText1 = (e) => {
    const searchText = e.target.value;
    const sanitizedSearchText = searchText.replace(/[^0-9 ]/g, ""); // Remove non-numeric characters except spaces
    setSearchInput(sanitizedSearchText);

    // Apply the filter on allotmentTable based on the search input value
    const filteredData = schedulelistdatas.filter((data) =>
      data.OrdSchNo.startsWith(sanitizedSearchText)
    );

    setSchedulelistdata(filteredData);
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
        <div className="col-md-3" style={{ marginTop: "6px" }}>
          <Form.Group controlId="CustName">
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
          <input
            className="input-field"
            placeholder="Search Schedule"
            onKeyDown={blockInvalidChar}
            type="text" // Change the input type to "text"
            value={searchInput} // Set the value to the state variable
            onChange={searchText1} // Call the searchText function on change
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
            className="button-style  group-button"
            onClick={openShowProgram}
          >
            Show Programs
          </button>

          <button
            className="button-style  group-button"
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
        location={location}
      />

      <ShowPartsPdfModal
        openShowparts={openShowparts}
        setOpenShowParts={setOpenShowParts}
        rowselect={rowselect}
        processrowselect={processrowselect}
        partlistdata={showParts}
        location={location}
      />

      <ShowProgramsPdfModal
        openShowPrograms={openShowPrograms}
        setOpenShowPrograms={setOpenShowPrograms}
        rowselect={rowselect}
        processrowselect={processrowselect}
        programlistdata={programlistdata}
        location={location}
      />

      <ProductionListModal
        openProductionList={openProductionList}
        setOpenProductionList={setOpenProductionList}
        location={location}
      />
    </div>
  );
}
