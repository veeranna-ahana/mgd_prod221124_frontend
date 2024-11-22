import React, { useEffect, useState, useRef, useMemo } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import Table from "react-bootstrap/Table";
import axios from "axios";
import SecondTable from "./SecondTable";
import DailyShiftTable from "./DailyShiftTable";
import CreateweekModal from "./Modals/CreateweekModal";
import SetMachineModal from "./Modals/SetMachineModal";
import DeleteshiftModal from "./Modals/DeleteshiftModal";
import DeleteMachineoperatorweekModal from "./Modals/DeleteMachineoperatorweekModal";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../api/baseUrl";
import ModalPrintWeeklyPlan from "./PdfPrinter/WeeklyshiftTable/ModalPrintWeeklyPlan";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function NewCalender(props) {
  ////
  const [selectedcompWeek, setselectedcompWeek] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedWeek, setSelectedWeek] = useState([""]);

  useEffect(() => {
    handleDateSelect(currentDate);
  }, []); // Run this effect only once on component mount

  const handleDateSelect = (date) => {
    const selectedDay = new Date(date);
    const startOfWeek = new Date(selectedDay);

    // Adjust the startOfWeek to start from Monday
    const dayOfWeek = selectedDay.getDay();
    const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Handle Sunday as special case
    startOfWeek.setDate(selectedDay.getDate() - diff);

    const weekArray = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      const formattedDate = formatDate(day); // Format the date
      weekArray.push(formattedDate);
    }
    setselectedcompWeek(weekArray);
    setCurrentDate(date);
    setSelectedWeek(weekArray);
  };

  const [disablestatus, setdisableStatus] = useState(false);
  useEffect(() => {
    axios
      .post(baseURL + "/shiftEditor/buttondisabledata", selectedWeek)
      .then((response) => {
        setdisableStatus(response.data); // Update state based on the API response
      })
      .catch((error) => {
        console.error("There was an error making the request:", error);
        // Handle the error appropriately
      });
  }, [selectedWeek]);

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();
    return `${day < 10 ? "0" : ""}${day}/${
      month < 10 ? "0" : ""
    }${month}/${year}`;
  };

  //////
  //Header Component
  const [dataShiftTypes, setDataShiftTypes] = useState([]);
  const [selectedShift, setSelectedShift] = useState("");

  const [dataShiftIncharge, setDataShiftIncharge] = useState([]);
  const [selectedShiftIncharge, setSelectedShiftIncharge] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState("");
  const [dataMachineList, setGetShiftTypesData] = useState([]);
  const [dataOperatorList, setDataOperatorList] = useState([]);
  const [selectedOperator, setSelectedOperator] = useState("");

  const getShiftTypesData = async () => {
    const { data } = await axios.get(baseURL + `/shiftEditor/typesOfShifts`);
    setDataShiftTypes(data);
  };

  const getMachineListData = async () => {
    const { data } = await axios.get(baseURL + `/shiftEditor/getMachineList`);
    setGetShiftTypesData(data);
  };

  const getOperatorListData = async () => {
    const { data } = await axios.get(
      baseURL + `/shiftEditor/getMachineOperators`
    );
    setDataOperatorList(data);
  };

  const getShiftInchargeData = async () => {
    const { data } = await axios.get(
      baseURL + `/shiftEditor/shiftInchargeList`
    );
    setDataShiftIncharge(data);
  };

  const handleShiftTypeChange = (e) => {
    setSelectedShift(e.target.value);
  };

  const handleShiftIncharge = (e) => {
    setSelectedShiftIncharge(e.target.value);
  };

  const handleMachineChange = (e) => {
    setSelectedMachine(e.target.value);
  };

  const handleOperatorList = (e) => {
    setSelectedOperator(e.target.value);
  };

  useEffect(() => {
    getShiftTypesData();
    getMachineListData();
    getShiftInchargeData();
    getOperatorListData();
  }, []);

  //Calender Component
  const [date, setDate] = useState(new Date());

  const [checkedState, setCheckedState] = useState(new Array(7).fill(false));
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);
  const [isChecked5, setIsChecked5] = useState(false);
  const [isChecked6, setIsChecked6] = useState(false);
  const [isChecked7, setIsChecked7] = useState(true);

  const handleOnChangeCheckBox1 = () => {
    setIsChecked(!isChecked);
  };

  const handleOnChangeCheckBox2 = () => {
    setIsChecked2(!isChecked2);
  };

  const handleOnChangeCheckBox3 = () => {
    setIsChecked3(!isChecked3);
  };

  const handleOnChangeCheckBox4 = () => {
    setIsChecked4(!isChecked4);
  };
  const handleOnChangeCheckBox5 = () => {
    setIsChecked5(!isChecked5);
  };
  const handleOnChangeCheckBox6 = () => {
    setIsChecked6(!isChecked6);
  };
  const handleOnChangeCheckBox7 = () => {
    setIsChecked7(!isChecked7);
  };

  useEffect(() => {
    // Check if selectedWeek changes, and uncheck all checkboxes when it does
    setIsChecked(false);
    setIsChecked2(false);
    setIsChecked3(false);
    setIsChecked4(false);
    setIsChecked5(false);
    setIsChecked6(false);
  }, [selectedWeek]);

  const [weekState, setWeekState] = useState([]);
  const [weekState1, setWeekState1] = useState([]);
  // const [secondTableShiftState, setSecondTableShiftState] = useState([])

  // useEffect(() => {
  //   const res =  axios.post('http://172.16.20.61:5000/shiftEditor/getWeeklyShiftPlanSecondTable', weekState).then((response) => {console.log(response)
  //   setSecondTableShiftState(response.data)})
  // },[weekState])

  //const [checkedItems, setCheckedItems] = useState(allIsHolidayCheckboxes); //plain object as state
  let sunday = selectedWeek[6];
  const checkbox1 = useRef();
  const checkbox2 = useRef();
  const checkbox3 = useRef();
  const checkbox4 = useRef();
  const checkbox5 = useRef();
  const checkbox6 = useRef();
  const checkbox7 = useRef();

  //Modal for CreateWeek shift
  const [openweekshift, setOpenweekshift] = React.useState("");
  const openCreateshiftmodal = () => {
    setOpenweekshift(true);
    // setOpenweekshift(true);
  };

  //WeekTable Component
  const createWeeklyShiftPlan = async (data) => {
    setWeekState([
      {
        checkboxValue: 0,
        isChecked: checkbox1.current.checked,
        ShiftDate: selectedWeek[0],
        Shift: selectedShift,
        Shift_Ic: selectedShiftIncharge,
      },
      {
        checkboxValue: 1,
        isChecked: checkbox2.current.checked,
        ShiftDate: selectedWeek[1],
        Shift: selectedShift,
        Shift_Ic: selectedShiftIncharge,
      },
      {
        checkboxValue: 2,
        isChecked: checkbox3.current.checked,
        ShiftDate: selectedWeek[2],
        Shift: selectedShift,
        Shift_Ic: selectedShiftIncharge,
      },
      {
        checkboxValue: 3,
        isChecked: checkbox4.current.checked,
        ShiftDate: selectedWeek[3],
        Shift: selectedShift,
        Shift_Ic: selectedShiftIncharge,
      },
      {
        checkboxValue: 4,
        isChecked: checkbox5.current.checked,
        ShiftDate: selectedWeek[4],
        Shift: selectedShift,
        Shift_Ic: selectedShiftIncharge,
      },
      {
        checkboxValue: 5,
        isChecked: checkbox6.current.checked,
        ShiftDate: selectedWeek[5],
        Shift: selectedShift,
        Shift_Ic: selectedShiftIncharge,
      },
      {
        checkboxValue: 6,
        isChecked: checkbox7.current.checked,
        ShiftDate: selectedWeek[6],
        Shift: selectedShift,
        Shift_Ic: selectedShiftIncharge,
      },
    ]);

    const NewWeekState = [...weekState];
  };

  //Calender Component Function
  const selectWeek = (e) => {
    setDate(e);
    createWeek(e);
  };

  const dateFormatter = (inputDate) => {
    let intermediateDate = moment(inputDate).format();
    const onlyDate = intermediateDate.split("T");
    let dateSplit = onlyDate[0].split("-");
    let year = dateSplit[0];
    let month = dateSplit[1];
    let day = dateSplit[2];
    let finalDay = day + "/" + month + "/" + year;
    return finalDay;
  };

  const createWeek = (cuurentDate) => {
    setMachineOperatorTableData([]);
    let weekArray = [];
  
    // Reset all checkboxes
    setIsChecked(false);
    setIsChecked2(false);
    setIsChecked3(false);
    setIsChecked4(false);
    setIsChecked5(false);
    setIsChecked6(false);
    setIsChecked7(true); // Set Checkbox7 to checked
  
    if (cuurentDate.toString().includes("Mon")) {
      for (let i = 0; i < 7; i++) {
        var datenew = new Date(cuurentDate);
        datenew.setDate(datenew.getDate() + i);
        let newDate = dateFormatter(datenew);
        weekArray.push(newDate);
      }
      setSelectedWeek(weekArray);
    } else if (cuurentDate.toString().includes("Tue")) {
      for (let i = 1; i > 0; i--) {
        var datenew = new Date(cuurentDate);
        datenew.setDate(datenew.getDate() - i);
        let newDate = dateFormatter(datenew);
        weekArray.push(newDate);
      }
  
      for (let i = 0; i < 6; i++) {
        var datenew = new Date(cuurentDate);
        datenew.setDate(datenew.getDate() + i);
        let newDate = dateFormatter(datenew);
        weekArray.push(newDate);
      }
      setSelectedWeek(weekArray);
    } else if (cuurentDate.toString().includes("Wed")) {
      for (let i = 2; i > 0; i--) {
        var datenew = new Date(cuurentDate);
        datenew.setDate(datenew.getDate() - i);
        let newDate = dateFormatter(datenew);
        weekArray.push(newDate);
      }
  
      for (let i = 0; i < 5; i++) {
        var datenew = new Date(cuurentDate);
        datenew.setDate(datenew.getDate() + i);
        let newDate = dateFormatter(datenew);
        weekArray.push(newDate);
      }
      setSelectedWeek(weekArray);
    }
    // Add the other conditions for Thu, Fri, Sat, and Sun similarly
  };
  

  const [rowselect, setRowselect] = useState({});
  const rowSelectFun = (item, index) => {
    let list = { item, index: index };
    setRowselect(list);
  };

  // Default row select for Date table
  useMemo(() => {
    setRowselect({ item: selectedWeek[0], index: 0 });
  }, [selectedWeek[0]]);

  const [SingleDayShiftPlan4thTable, setSingleDayShiftPlan4thTable] = useState(
    []
  );

  const [isDataAvailable, setIsDataAvailable] = useState(""); // Initialize with true or false based on your requirement
  const getSingleDayShiftPlan4thTable = () => {
    axios
      .post(baseURL + "/shiftEditor/getDailyShiftPlanTable", {
        ShiftDate: rowselect,
      })
      .then((response) => {
        const processedData = response.data.map((item) => {
          let dateSplit = item.ShiftDate.split("-");
          let year = dateSplit[2];
          let month = dateSplit[1];
          let day = dateSplit[0];
          let finalDay = year + "-" + month + "-" + day;
          item.ShiftDate = finalDay;

          let dateSplitFromTime = item.FromTime.split("-");
          let yearFromTime = dateSplitFromTime[0];
          let monthFromTime = dateSplitFromTime[1];
          let dayFromTimeINITIAL = dateSplitFromTime[2].split(" ");
          let dayFromTimeFinal = dayFromTimeINITIAL[0];
          let time = dayFromTimeINITIAL[1];
          let finalDayFromTime =
            dayFromTimeFinal +
            "-" +
            monthFromTime +
            "-" +
            yearFromTime +
            " " +
            time;
          item.FromTime = finalDayFromTime;
          let dateSplitToTime = item.ToTime.split("-");
          let yearToTime = dateSplitToTime[0];
          let monthToTime = dateSplitToTime[1];
          let dayToTimeINITIAL = dateSplitToTime[2].split(" ");
          let dayToTimeFinal = dayToTimeINITIAL[0];
          let time1 = dayToTimeINITIAL[1];
          let finalDayToTime =
            dayToTimeFinal + "-" + monthToTime + "-" + yearToTime + " " + time1;
          item.ToTime = finalDayToTime;

          return item; // Return the processed item
        });
        setSingleDayShiftPlan4thTable(processedData);
        if (response.data.length === 0) {
          // console.log("response data is null");
          setIsDataAvailable(false); // Set the state to false if data is empty
        } else {
          setIsDataAvailable(true); // Set the state to true if data is not empty
        } // Process and display data in the table
      });
  };

  useEffect(() => {
    getSingleDayShiftPlan4thTable();
  }, [rowselect]);

  ///
  const [secondTableShiftState, setSecondTableShiftState] = useState([]);
  const [forFilterDate, setForFilterDate] = useState([]);
  // console.log(selectedWeek);
  const getSecondTableData = () => {
    const res = axios
      .post(
        baseURL + "/shiftEditor/getWeeklyShiftPlanSecondTable",
        selectedWeek
      )
      .then((response) => {
        // console.log("Api response is ", response);
        if (response.data === "") {
          // console.log("response data is null");
        } else {
          setSecondTableShiftState(response.data);

          // Group data based on Shift property
          const groupedData = response.data.reduce((acc, item) => {
            if (!acc[item.Shift]) {
              acc[item.Shift] = [];
            }
            acc[item.Shift].push(item);
            return acc;
          }, {});

          // Transform the grouped data into an array of objects
          const transformedData = Object.keys(groupedData).map((shift) => ({
            Shift: shift,
            data: groupedData[shift],
          }));

          setForFilterDate(transformedData);
        }
      });
  };

  useEffect(() => {
    getSecondTableData();
  }, [selectedWeek]);

  const onSetMachineOperators = () => {
    setWeekState1([
      {
        checkboxValue: 0,
        isChecked: checkbox1.current.checked,
        ShiftDate: selectedWeek[0],
        Shift: selectedShift,
        Shift_Ic: selectedShiftIncharge,
        Machine: selectedMachine,
        Operator: selectedOperator,
      },
      {
        checkboxValue: 1,
        isChecked: checkbox2.current.checked,
        ShiftDate: selectedWeek[1],
        Shift: selectedShift,
        Shift_Ic: selectedShiftIncharge,
        Machine: selectedMachine,
        Operator: selectedOperator,
      },
      {
        checkboxValue: 2,
        isChecked: checkbox3.current.checked,
        ShiftDate: selectedWeek[2],
        Shift: selectedShift,
        Shift_Ic: selectedShiftIncharge,
        Machine: selectedMachine,
        Operator: selectedOperator,
      },
      {
        checkboxValue: 3,
        isChecked: checkbox4.current.checked,
        ShiftDate: selectedWeek[3],
        Shift: selectedShift,
        Shift_Ic: selectedShiftIncharge,
        Machine: selectedMachine,
        Operator: selectedOperator,
      },
      {
        checkboxValue: 4,
        isChecked: checkbox5.current.checked,
        ShiftDate: selectedWeek[4],
        Shift: selectedShift,
        Shift_Ic: selectedShiftIncharge,
        Machine: selectedMachine,
        Operator: selectedOperator,
      },
      {
        checkboxValue: 5,
        isChecked: checkbox6.current.checked,
        ShiftDate: selectedWeek[5],
        Shift: selectedShift,
        Shift_Ic: selectedShiftIncharge,
        Machine: selectedMachine,
        Operator: selectedOperator,
      },
      {
        checkboxValue: 6,
        isChecked: checkbox7.current.checked,
        ShiftDate: selectedWeek[6],
        Shift: selectedShift,
        Shift_Ic: selectedShiftIncharge,
        Machine: selectedMachine,
        Operator: selectedOperator,
      },
    ]);
  };

  const [rowselectDailyShiftTable, setRowselectDailyShiftTable] = useState({});
  const rowSelectFunForDailyShiftTable = (item, index) => {
    let list = { ...item, index: index };
    setRowselectDailyShiftTable(list);
  };

  useEffect(() => {
    if (isDataAvailable === false) {
      setRowselectDailyShiftTable(null);
    }
  }, [SingleDayShiftPlan4thTable]);

  // console.log(rowselectDailyShiftTable)
  //Open Set Machine Modal
  const [opensetmachine, setOpensetmachine] = useState("");
  const openSetMachinemodal = () => {
    setOpensetmachine(true);
  };

  //MachineOperator Table
  const [machineOperatorTableData, setMachineOperatorTableData] = useState([]);

  const getMachineOperatorTableData = () => {
    // console.log(rowselectDailyShiftTable);
    if (rowselectDailyShiftTable === null) {
      // If rowselectDailyShiftTable is null, set an empty array
      setMachineOperatorTableData([]);
    } else {
      axios
        .post(
          baseURL + "/shiftEditor/getMachineOperatorsShift",
          rowselectDailyShiftTable
        )
        .then((response) => {
          setMachineOperatorTableData(response.data);
        });
    }
  };

  //Delete Weekshift
  const [opendeleteshift, setOpendeleteshift] = useState("");
  const openDeleteshiftmodal = () => {
    setOpendeleteshift(true);
  };
  const onClickDeleteWeekShift = () => {
    //  console.log('Delete Week Shift Clicked ', 'Shift Selected is ', selectedShift, 'selected week is ', selectedWeek)
    axios
      .post(baseURL + "/shiftEditor/deleteWeekShift", {
        selectedShift: selectedShift,
        selectedWeek: selectedWeek,
      })
      .then((response) => {
        // console.log(response);
        getSecondTableData();
        getSingleDayShiftPlan4thTable();
      });
  };

  //DELETE MACHINE OPERATOR FOR WEEK
  const onClickDeleteWeekOperatorMachine = () => {
    axios
      .post(baseURL + "/shiftEditor/deleteWeekOperatorForMachine", {
        selectedShift: selectedShift,
        selectedWeek: selectedWeek,
        selectedMachine: selectedMachine,
        selectedOperator: selectedOperator,
      })
      .then((response) => {
        // console.log(response);
        getMachineOperatorTableData();
        getSecondTableData();
        setWeekState1("");
      });
  };

  const [opendeleteoperator, setOpendeleteoperator] = useState("");
  const openDeletemachineoperator = () => {
    setOpendeleteoperator(true);
  };

  const createWeekPlannEW = async () => {
    const { data } = await axios.post(
      baseURL + "/shiftEditor/getWeeklyShiftPlanSecondTable",
      selectedWeek
    );
  };

  // Open Print Pdf
  const [openPrintModal, setOpenPrintModal] = useState(false);
  const openPdfmodel = () => {
    if (selectedWeek[0] === "") {
      toast.error("Please Select Dates", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setOpenPrintModal(true);
    }
  };

  ///////////////////////
  const firstShiftDates = forFilterDate
    .map((filterData) => filterData?.data) // Extract the data arrays
    .filter((data) => data !== null) // Filter out null data arrays
    .flatMap((data) => data.map((item) => item.ShiftDate)); // Map and flatten the ShiftDate values

  if (firstShiftDates.length === 0) {
    firstShiftDates.push(null); // If no non-null data arrays were found, add null
  }

  // Assuming 'firstShiftDates' contains the array of dates
  const formattedDates = firstShiftDates.map((date) => {
    if (date) {
      const parts = date.split("-");
      const formattedDate = `${parts[0]}/${parts[1]}/${parts[2]}`;
      return formattedDate;
    } else {
      return null; // Handle the case where date is null
    }
  });

  // Assuming you have the 'selectedWeek' array and 'formattedDates' array
  const dateExistsArray = selectedWeek.map(
    (date) => !formattedDates.includes(date)
  );
  // Check if all values in dateExistsArray are true
  const allValuesTrue = dateExistsArray.every((value) => value);
  // If all values are true, set dateExistsArray to an array of false values
  if (allValuesTrue) {
    dateExistsArray.fill(false);
  }
  // ///

  const [currentDateComp, setCurrentDateComp] = useState(new Date());
  const [isButtoncheck, setisButtoncheck] = useState(false);
  const CompareDate = rowselect?.item; // Your date string in dd/mm/yyyy format
  const todayDate = new Date();
  const day = todayDate.getDate().toString().padStart(2, "0");
  const month = (todayDate.getMonth() + 1).toString().padStart(2, "0");
  const year = todayDate.getFullYear();
  const formattedTodayDate = `${year}-${month}-${day}`;
  const [condition, setCondition] = useState(false);

  useEffect(() => {
    // Convert CompareDate to yyyy-mm-dd format before comparison
    const [compareDay, compareMonth, compareYear] = CompareDate.split("/");
    const formattedCompareDate = `${compareYear}-${compareMonth}-${compareDay}`;
    if (new Date(formattedCompareDate) >= new Date(formattedTodayDate)) {
      setCondition(true);
    } else {
      setCondition(false);
    }
  }, [CompareDate, formattedTodayDate]);

  //WeeklyPlan Data
  const [newTry, setNewTry] = useState([]);
  const TryPdfData = () => {
    // console.log(selectedWeek);
    axios
      .post(baseURL + "/shiftEditor/TryWeeklyPdf", {
        ShiftDate: selectedWeek,
      })
      .then((response) => {
        setNewTry(response.data);
      });
  };
  const flatTryData = [];
  newTry.forEach((dayData) => {
    const day = dayData[0]?.day; // Get the day from the first element

    if (day) {
      const shifts = [];
      const operators = [];

      dayData.forEach((entry) => {
        operators.push({
          ShiftIc: entry.ShiftIc,
          Shift: entry.Shift,
          day: entry.day,
          machineOperators: entry.machineOperators,
        });
      });

      flatTryData.push({
        day,
        shifts,
        operators,
      });
    }
  });

  useEffect(() => {
    TryPdfData();
  }, [selectedWeek]);

  //Close Button
  const navigate = useNavigate();
  const onClickClose = () => {
    navigate("/Production");
  };

  const SelectedShiftIncharge = selectedShiftIncharge;

  useEffect(() => {
    if (!selectedMachine) {
      // This will force the input to re-render and display the correct value
      setSelectedMachine("");
    }
  
    if (!selectedOperator) {
      setSelectedOperator("");
    }
  }, [selectedMachine, selectedOperator]);
  

  return (
    <>
      <ModalPrintWeeklyPlan
        openPrintModal={openPrintModal}
        setOpenPrintModal={setOpenPrintModal}
        selectedWeek={selectedWeek}
        newTry={flatTryData}
      />

      <div className="row">
        <h4 className="title">Production Department: Shift Editor</h4>
      </div>

      <div className="row">
        <div className="col-md-3">
          <label className="form-label" style={{ fontSize: "14px" }}>
            Weekly Shift Editor
          </label>
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="d-flex col-md-4" style={{ gap: "65px" }}>
              <label className="form-label">Shift</label>
              <select
                className="ip-select"
                value={selectedShift}
                onChange={handleShiftTypeChange}
              >
                <option value="">Select Shift</option>
                {dataShiftTypes.map((dataShiftType) => (
                  <option key={dataShiftType} value={dataShiftType}>
                    {dataShiftType}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <button
                className={`button-style group-button ${
                  disablestatus === true ? "disabled" : ""
                }`}
                disabled={disablestatus === true}
                onClick={() => {
                  openCreateshiftmodal();
                  createWeeklyShiftPlan();
                }}
              >
                Create Week Shift
              </button>
            </div>
            <div className="d-flex col-md-3" style={{ gap: "10px" }}>
              <label className="form-label">Machine</label>
              <select className="ip-select"  value={selectedMachine} onChange={handleMachineChange}>
                <option selected>Select Machine</option>
                {dataMachineList.map((dataMachineList) => (
                  <option value={dataMachineList.refName}>
                    {dataMachineList.refName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <button
                className={`button-style group-button ${
                  disablestatus === true ? "disabled" : ""
                }`}
                disabled={disablestatus === true}
                onClick={() => {
                  onSetMachineOperators();
                  openSetMachinemodal();
                }}
              >
                Set Machine Operator
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ////// */}

      <div className="row">
        <div className="col-md-3">
          <div>
            <label className="form-label" style={{ color: "red" }}>
              {selectedWeek[0]} Monday To {selectedWeek[6]} Sunday
            </label>
          </div>
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="d-flex col-md-4" style={{ gap: "10px" }}>
              <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                Shift Incharge
              </label>
              <select
                className="ip-select"
                value={selectedShiftIncharge}
                onChange={handleShiftIncharge}
              >
                <option value="">Select Shift Incharge</option>
                {dataShiftIncharge.map((dataShiftIncharge) => (
                  <option key={dataShiftIncharge} value={dataShiftIncharge}>
                    {dataShiftIncharge}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              {/* <button
                  className="button-style mt-2 group-button mt-3"
                  style={{ width: "150px" }}
                  onClick={() => {
                    onClickDeleteWeekShift();
                    openDeleteshiftmodal();
                  }}
                >
                  Delete Week Shift
                </button> */}
              <button
                className="button-style group-button"
                onClick={() => {
                  openPdfmodel();
                  TryPdfData();
                }}
              >
                Print Weekly Plan
              </button>
            </div>{" "}
            <div className="d-flex col-md-3" style={{ gap: "10px" }}>
              <label className="form-label">Operator</label>
              <select className="ip-select" value={selectedOperator} onChange={handleOperatorList}>
                <option selected>Select Operator</option>
                {dataOperatorList.map((dataOperatorList) => (
                  <option value={dataOperatorList.Name}>
                    {dataOperatorList.Name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              {/* <button
                  className="button-style mt-2 group-button mt-3"
                  style={{ width: "200px" }}
                  onClick={openDeletemachineoperator}
                >
                  Delete Machine Operator
                </button> */}
              <button
                className="button-style group-button"
                type="button"
                onClick={onClickClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-12">
        <div className="row">
          <div className="col-md-3"></div>

          <div className="col-md-9">
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-3" style={{ marginTop: "20px" }}>
                {/*  */}
              </div>{" "}
              <div className="col-md-3"></div>
            </div>
          </div>
        </div>
      </div>

      {/* ////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      <div style={{ display: "flex" }}>
        <div>
          <div style={{ width: "213px", fontSize: "11px" }}>
            <ReactCalendar
              onChange={(e) => {
                selectWeek(e);
              }}
              value={currentDate}
              onClickDay={handleDateSelect}
              showWeekNumbers
              showFixedNumberOfWeeks
            />
          </div>

          <div style={{ display: "flex" }}>
            <div>
              {/* <div> */}
              {/* <div> */}
              <div style={{ width: "106px", border: "1px" }}>
                <Table bordered style={{ height: "200px" }}>
                  <thead style={{ textAlign: "center" }}>
                    <tr>
                      <th>Date</th>
                    </tr>
                  </thead>

                  <tbody className="tablebody">
                    {selectedWeek.map((rank, i, row) => {
                      return (
                        <>
                          <tr
                            onClick={() => rowSelectFun(rank, i)}
                            className={
                              i === rowselect?.index ? "selcted-row-clr" : ""
                            }
                          >
                            <td>{rank}</td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </div>

            <div>
              <Table bordered style={{ width: "106px" }}>
                <thead style={{ textAlign: "center" }}>
                  <tr>
                    <th>Holiday</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ height: "18px" }}>
                    <td>
                      <div>
                        <input
                          type="checkbox"
                          ref={checkbox1}
                          checked={isChecked}
                          onChange={handleOnChangeCheckBox1}
                          style={{ marginTop: "5px" }}
                          // disabled={isDataAvailable}
                        />
                      </div>
                    </td>
                  </tr>

                  <tr style={{ height: "18px" }}>
                    <td>
                      <div>
                        <input
                          type="checkbox"
                          ref={checkbox2}
                          checked={isChecked2}
                          onChange={handleOnChangeCheckBox2}
                          style={{ marginTop: "5px" }}
                          // disabled={isDataAvailable}
                        />
                      </div>
                    </td>
                  </tr>

                  <tr style={{ height: "18px" }}>
                    <td>
                      <div>
                        <input
                          type="checkbox"
                          ref={checkbox3}
                          checked={isChecked3}
                          onChange={handleOnChangeCheckBox3}
                          style={{ marginTop: "5px" }}
                          // disabled={isDataAvailable}
                        />
                      </div>
                    </td>
                  </tr>

                  <tr style={{ height: "18px" }}>
                    <td>
                      <div>
                        <input
                          type="checkbox"
                          ref={checkbox4}
                          checked={isChecked4}
                          onChange={handleOnChangeCheckBox4}
                          style={{ marginTop: "5px" }}
                          // disabled={isDataAvailable}
                        />
                      </div>
                    </td>
                  </tr>

                  <tr style={{ height: "18px" }}>
                    <td>
                      <div>
                        <input
                          type="checkbox"
                          ref={checkbox5}
                          checked={isChecked5}
                          onChange={handleOnChangeCheckBox5}
                          style={{ marginTop: "5px" }}
                          // disabled={isDataAvailable}
                        />
                      </div>
                    </td>
                  </tr>

                  <tr style={{ height: "18px" }}>
                    <td>
                      <div>
                        <input
                          type="checkbox"
                          ref={checkbox6}
                          checked={isChecked6}
                          onChange={handleOnChangeCheckBox6}
                          style={{ marginTop: "5px" }}
                          // disabled={isDataAvailable}
                        />
                      </div>
                    </td>
                  </tr>

                  <tr style={{ height: "18px" }}>
                    <td>
                      <div>
                        <input
                          type="checkbox"
                          ref={checkbox7}
                          defaultChecked={true}
                          checked={isChecked7}
                          onChange={handleOnChangeCheckBox7}
                          style={{ marginTop: "5px" }}
                          // disabled={isDataAvailable}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
        {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

        <div>
          <SecondTable week={secondTableShiftState} />
        </div>

        <DailyShiftTable
          SingleDayShiftPlan4thTable={SingleDayShiftPlan4thTable}
          setSingleDayShiftPlan4thTable={setSingleDayShiftPlan4thTable}
          rowSelectFunForDailyShiftTable={rowSelectFunForDailyShiftTable}
          rowselectDailyShiftTable={rowselectDailyShiftTable}
          selectedWeek={selectedWeek}
          getMachineOperatorTableData={getMachineOperatorTableData}
          machineOperatorTableData={machineOperatorTableData}
          setRowselectDailyShiftTable={setRowselectDailyShiftTable}
          getSingleDayShiftPlan4thTable={getSingleDayShiftPlan4thTable}
          getSecondTableData={getSecondTableData}
          rowselect={rowselect}
          condition={condition}
          selectedShift={selectedShift}
          SelectedShiftIncharge={SelectedShiftIncharge}
          setSelectedShiftInchargeForSpecialShift={setSelectedShiftIncharge}
        />
      </div>

      <CreateweekModal
        openweekshift={openweekshift}
        setOpenweekshift={setOpenweekshift}
        selectedShift={selectedShift}
        selectedShiftIncharge={selectedShiftIncharge}
        selectedWeek={selectedWeek}
        weekState={weekState}
        getSingleDayShiftPlan4thTable={getSingleDayShiftPlan4thTable}
        getSecondTableData={getSecondTableData}
        setWeekState={setWeekState}
        createWeeklyShiftPlan={createWeeklyShiftPlan}
        setSelectedShift={setSelectedShift}
        setSelectedMachine={setSelectedMachine}
        setSelectedShiftIncharge={setSelectedShiftIncharge}
        setSelectedOperator={setSelectedOperator}
        setIsChecked={setIsChecked}
        setIsChecked2={setIsChecked2}
        setIsChecked3={setIsChecked3}
        setIsChecked4={setIsChecked4}
        setIsChecked5={setIsChecked5}
        setIsChecked6={setIsChecked6}
      />

      <SetMachineModal
        opensetmachine={opensetmachine}
        setOpensetmachine={setOpensetmachine}
        selectedMachine={selectedMachine}
        selectedOperator={selectedOperator}
        selectedWeek={selectedWeek}
        weekState1={weekState1}
        setWeekState1={setWeekState1}
        getSecondTableData={getSecondTableData}
        getMachineOperatorTableData={getMachineOperatorTableData}
        getSingleDayShiftPlan4thTable={getSingleDayShiftPlan4thTable}
        selectedShift={selectedShift}
        rowselectDailyShiftTable={rowselectDailyShiftTable}
        setMachineOperatorTableData={setMachineOperatorTableData}
        setSelectedShift={setSelectedShift}
        setSelectedMachine={setSelectedMachine}
        setSelectedShiftIncharge={setSelectedShiftIncharge}
        setSelectedOperator={setSelectedOperator}
      />

      <DeleteshiftModal
        opendeleteshift={opendeleteshift}
        setOpendeleteshift={setOpendeleteshift}
        onClickDeleteWeekShift={onClickDeleteWeekShift}
        selectedShiftIncharge={selectedShiftIncharge}
        selectedShift={selectedShift}
        selectedWeek={selectedWeek}
        setSelectedShiftIncharge={setSelectedShiftIncharge}
        setSelectedOperator={setSelectedOperator}
      />

      <DeleteMachineoperatorweekModal
        opendeleteoperator={opendeleteoperator}
        setOpendeleteoperator={setOpendeleteoperator}
        openDeletemachineoperator={openDeletemachineoperator}
        onClickDeleteWeekOperatorMachine={onClickDeleteWeekOperatorMachine}
        selectedShift={selectedShift}
        selectedMachine={selectedMachine}
        selectedWeek={selectedWeek}
        selectedOperator={selectedOperator}
      />
    </>
  );
}

export default NewCalender;
