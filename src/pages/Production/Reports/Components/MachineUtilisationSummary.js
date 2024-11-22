import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import { baseURL } from "../../../../api/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useGlobalContext } from "../../../../Context/Context";
import CustomModal from "../../CustomModal";

export default function MachineUtilisationSummary({ dateSelect, status }) {
  const {
    multiplerowSelect,
    setMultipleRowSelect,
    handleCheckboxChange1,
    machineutilisationSummartdata,
    setMachineutilisationSummarydata,
  } = useGlobalContext();

  const [rowSelected, setRowSelected] = useState({});

  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState(rowSelected.LaserOn || "");
  const [modalShow6, setModalShow6] = useState(false);

  //row select function
  const selectedRowFun = (item, index) => {
    let list = { ...item, index: index };
    setRowSelected(list);
  };

  //update button
  const updateUtilisationSummary = () => {
    axios
      .post(baseURL + "/reports/updateProductionMachineUtilsationSummary", {
        Date: dateSelect,
      })
      .then((res) => {
        // console.log(res.data);
        setMachineutilisationSummarydata(res.data);
      });
  };

  //TotalOff handle Change
  const handleInputChange1 = (event) => {
    if (event.target.value < 0) {
      toast.error("Please give a Positive Number", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (event.target.value > 1440) {
      toast.error("Total Off Cannot be greater than 1440", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setInputValue1(event.target.value);
    }
  };

  //Laser On handle Change
  const handleInputChange2 = (event) => {
    const newValue = event.target.value;
    if (newValue < 0) {
      toast.error("Please give a Positive Number", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (newValue > 1440) {
      toast.error("Laser On Cannot be greater than 1440", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const updatedMachineUtilisationData = [...machineutilisationSummartdata];
      // Find the index of the selected machine in the machineutilisationSummartdata array
      const selectedIndex = updatedMachineUtilisationData.findIndex(
        (item) => item.Machine === rowSelected.Machine
      );
      // Update the LaserOn value of the selected machine
      updatedMachineUtilisationData[selectedIndex].LaserOn = newValue;
      // Update the machineutilisationSummartdata with the updated data
      setMachineutilisationSummarydata(updatedMachineUtilisationData);
      setInputValue2(newValue);
    }
  };

  //table inputfield handle change
  const onValueChange = (index, field, value) => {
    if (value < 0) {
      toast.error("Please give a Positive Number", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (value > 1440) {
      toast.error("Cannot be greater than 1440", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const updatedMachineUtilisationSummary = [
        ...machineutilisationSummartdata,
      ];
      // Create a copy of the array
      // Update the specific item's field with the new value
      updatedMachineUtilisationSummary[index] = {
        ...updatedMachineUtilisationSummary[index],
        [field]: value,
      };
      setMachineutilisationSummarydata(updatedMachineUtilisationSummary);

      // Update rowSelected
      const updatedRowSelected = { ...rowSelected };
      updatedRowSelected[field] = value;
      setRowSelected(updatedRowSelected);
    }
  };

  //save machine utilisation
  const saveUtilisationSummary = () => {
    let Remainingvalue = 1440 - rowSelected.ProdON;
    if (inputValue1 > Remainingvalue) {
      toast.error(`Total Off Cannot be greater than ${Remainingvalue}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      let NonProd = rowSelected.NonProdOn;
      if (!rowSelected || !inputValue1) {
        // Check if rowSelected and inputValue1 are valid
        return;
      }
      // Calculate NonProdOn based on the condition
      let NonProdOn1;
      if (NonProd === 0) {
        NonProdOn1 = 1440 - inputValue1;
      } else {
        NonProdOn1 = NonProd - inputValue1;
      }

      // Ensure NonProdOn1 is not less than 0
      if (NonProdOn1 < 0) {
        NonProdOn1 = 0;
      }

      const updatedRow = {
        ...rowSelected,
        TotalOff: inputValue1,
        TotalOn: 1440 - inputValue1,
        NonProdOn: NonProdOn1,
        LaserOn: inputValue2,
      };
      // Update the selected row in the machineutilisationSummartdata array
      const updatedData = machineutilisationSummartdata.map((item, index) =>
        index === rowSelected.index ? updatedRow : item
      );

      // Update the machineutilisationSummartdata with the updatedData
      setMachineutilisationSummarydata(updatedData);

      // console.log("updatedData in save ",updatedData);

      axios
        .post(baseURL + "/reports/saveMachineUtilisationSummary", {
          machineutilisationSummartdata: updatedData,
          Date: dateSelect,
        })
        .then((res) => {
          setModalShow6(true);
          // setTimeout(() => {
          //   axios
          //     .post(baseURL + "/reports/muData", {
          //       Date: dateSelect,
          //     })
          //     .then((res) => {
          //       // console.log(res.data);
          //       setMachineutilisationSummarydata(res.data);
          //       // toast.success("Changes Saved", {
          //       //   position: toast.POSITION.TOP_CENTER,
          //       // });
          //     });
          // }, 1000); // 1000 milliseconds = 1 second
        });
      // }
    }
  };

  const closeModal = () => {
    setModalShow6(false);
  };
  const modalData = {
    title: "Reports",
    content: "Changes Saved",
  };

  useEffect(() => {
    setInputValue2(rowSelected.LaserOn || "");
  }, [rowSelected]);

  useEffect(() => {
    setInputValue1(rowSelected.TotalOff || 0);
    setInputValue2(rowSelected.LaserOn || "");
  }, [rowSelected]);

  /////
  // useEffect(() => {
  //   if (machineutilisationSummartdata.length > 0 && !rowSelected.Machine) {
  //     selectedRowFun(machineutilisationSummartdata[0], 0); // Select the first row
  //   }
  // }, [machineutilisationSummartdata, rowSelected, selectedRowFun]);

  ///sorting table
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const dataCopy = [...machineutilisationSummartdata];
    if (sortConfig.key) {
      dataCopy.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return dataCopy;
  };

  return (
    <>
      <div className="row mt-1">
        <div className="col-md-5">
          <div>
            <label className="form-label">{rowSelected.Machine}</label>
          </div>
          <div>
            <label className="form-label">Total On {rowSelected.TotalOn}</label>
          </div>
          <div>
            <label className="form-label">
              Production {rowSelected.ProdON}
            </label>{" "}
          </div>
          <div>
            <label className="form-label">
              Non Production{" "}
              <span style={{ textDecoration: "none" }}>
                {rowSelected.NonProdOn}
              </span>
            </label>
          </div>
          <div className="d-flex mt-2" style={{ gap: "10px" }}>
            <div className="d-flex col-md-6" style={{ gap: "10px" }}>
              <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                Total Off
              </label>
              <input
                className="in-field"
                name={inputValue1}
                value={inputValue1}
                onChange={handleInputChange1}
              />
            </div>
            <div className="col-md-6">
              <button
                className={`button-style group-button ${
                  status ? "disabled" : ""
                }`}
                type="button"
                onClick={() => updateUtilisationSummary()}
                // disabled={status}
              >
                Update Production
              </button>
            </div>
          </div>
          <div className="d-flex" style={{ gap: "10px" }}>
            <div className="d-flex col-md-6 mt-2" style={{ gap: "10px" }}>
              <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                Laser ON
              </label>
              <input
                className="in-field"
                name="laserOn"
                value={inputValue2}
                onChange={handleInputChange2}
              />
            </div>

            <div className="col-md-6">
              <button
                className={`button-style group-button ${
                  status ? "disabled" : ""
                }`}
                type="button"
                onClick={saveUtilisationSummary}
                // disabled={status}
              >
                Save
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-7">
          <div
            style={{
              overflowX: "scroll",
              height: "360px",
              overflowY: "scroll",
            }}
          >
            <Table striped className="table-data border">
              <thead className="tableHeaderBGColor">
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={
                        multiplerowSelect?.length ===
                        machineutilisationSummartdata?.length
                      }
                      onChange={() =>
                        setMultipleRowSelect((prevRows) =>
                          prevRows.length ===
                          machineutilisationSummartdata?.length
                            ? []
                            : machineutilisationSummartdata
                        )
                      }
                    />
                  </th>

                  <th onClick={() => requestSort("Machine")}>Machine</th>
                  <th onClick={() => requestSort("TotalOn")}>TotalOn</th>
                  <th
                    className="textAllign"
                    onClick={() => requestSort("TotalOff")}
                  >
                    TotalOff
                  </th>
                  <th
                    className="textAllign"
                    onClick={() => requestSort("ProdOn")}
                  >
                    ProdOn
                  </th>
                  <th
                    className="textAllign"
                    onClick={() => requestSort("NonProdOn")}
                  >
                    NonProdOn
                  </th>
                </tr>
              </thead>

              <tbody className="tablebody">
                {sortedData().map((item, key) => {
                  return (
                    <tr
                      key={key}
                      onClick={() => selectedRowFun(item, key)}
                      className={
                        key === rowSelected?.index ? "selcted-row-clr" : ""
                      }
                    >
                      <td>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={multiplerowSelect.includes(item)}
                          onChange={() => handleCheckboxChange1(item)}
                        />
                      </td>
                      <td style={{ whiteSpace: "nowrap" }}>{item.Machine}</td>

                      <td className="table-cell-align">
                        <input
                          className="table-cell-editor"
                          value={item.TotalOn}
                          onChange={(e) =>
                            onValueChange(key, "TotalOn", e.target.value)
                          }
                        />
                      </td>

                      <td className="table-cell-align">
                        <input
                          className="table-cell-editor textAllign"
                          value={item.TotalOff}
                          onChange={(e) =>
                            onValueChange(key, "TotalOff", e.target.value)
                          }
                        />
                      </td>

                      <td className="table-cell-align">
                        <input
                          className="table-cell-editor textAllign"
                          value={item.ProdON}
                          onChange={(e) =>
                            onValueChange(key, "ProdON", e.target.value)
                          }
                        />
                      </td>

                      <td className="table-cell-align">
                        <input
                          className="table-cell-editor textAllign"
                          value={item.NonProdOn}
                          onChange={(e) =>
                            onValueChange(key, "NonProdOn", e.target.value)
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <CustomModal
        show={modalShow6}
        handleClose={closeModal}
        data={modalData}
      />
    </>
  );
}
