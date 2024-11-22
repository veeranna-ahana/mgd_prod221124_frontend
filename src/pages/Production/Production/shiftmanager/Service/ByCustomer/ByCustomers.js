import React from "react";
import TreeView from "react-treeview";
import "react-treeview/react-treeview.css";
import { useState, useEffect } from "react";
import axios from "axios";
import NavTab from "./NavTab";
import { baseURL } from "../../../../../../api/baseUrl";

export default function ByCustomer() {
  const [CustomerData, setCustomerData] = useState([]);
  const [selectedLabelIndex, setSelectedLabelIndex] = useState(-1);
  const [selectedMachineIndex, setSelectedMachineIndex] = useState(-1);
  const [isPageRefreshed, setIsPageRefreshed] = useState(true);

  const selectedMachineFun = (item, index) => {
    setSelectedMachineIndex(index);
    setSelectedLabelIndex(-1);
  };

  useEffect(() => {
    axios
      .get(baseURL + "/shiftManagerProfile/orderByCustomers")
      .then((response) => {
        setCustomerData(response.data);
        console.log(response.data);
      });
  }, []);

  const dataSource = [
    {
      type: "Customer",
      collapsed: false,
      serverData: CustomerData.map((data, index) => ({
        ...data,
        labelIndex: index,
      })),
    },
  ];

  const [selectcustomer, setSelectcustomer] = useState("");
  const [custCode, setCustCode] = useState("");
  const onCustomerRowClick = (item, index) => {
    let list = { ...item, index: index };
    // console.log("ScheduleNo",item.ScheduleNo)
    setSelectcustomer(list);
    setCustCode(list.Customer.Cust_Code);
  };

  console.log(custCode);

  const onClickCustomer = (Cust_Code) => {
    console.log("The CustCode Selected is ", Cust_Code);
    axios
      .post(baseURL + "/shiftManagerProfile/CustomerProgramesCompleted", {
        Cust_Code: Cust_Code,
      })
      .then((response) => {
        console.log("Programs Compleated DATA", response.data);
        setProgramCompleted(response.data);
        for (let i = 0; i < response.data.length; i++) {
          if (
            response.data[i].ActualTime <
            0.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#339900";
            //break;
          } else if (
            response.data[i].ActualTime <
            0.75 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#82c2b4";
            //break;
          } else if (
            response.data[i].ActualTime <
            0.9 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
            //break;
          } else if (
            response.data[i].ActualTime <
            1.1 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
            //break;
          } else if (
            response.data[i].ActualTime <
            1.25 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FF7F50";
            //break;
          } else if (
            response.data[i].ActualTime <
            1.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FFA500";
            //break;
          } else {
            response.data[i].rowColor = "#ff0000";
          }
        }
        console.log("AFTER ADDING COLOR", response.data);
      });

    axios
      .post(baseURL + "/shiftManagerProfile/CustomerProgramesProcessing", {
        Cust_Code: Cust_Code,
      })
      .then((response) => {
        console.log("Programs Processing Data is ", response.data);
        setProgramProcessing(response.data);
        for (let i = 0; i < response.data.length; i++) {
          if (
            response.data[i].ActualTime <
            0.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#339900";
            //break;
          } else if (
            response.data[i].ActualTime <
            0.75 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#82c2b4";
            //break;
          } else if (
            response.data[i].ActualTime <
            0.9 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
            //break;
          } else if (
            response.data[i].ActualTime <
            1.1 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
            //break;
          } else if (
            response.data[i].ActualTime <
            1.25 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FF7F50";
            //break;
          } else if (
            response.data[i].ActualTime <
            1.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FFA500";
            //break;
          } else {
            response.data[i].rowColor = "#ff0000";
          }
        }
        console.log("AFTER ADDING COLOR", response.data);
      });
  };

  const [proramCompleted, setProgramCompleted] = useState([]);
  const [programProcessing, setProgramProcessing] = useState([]);

  const onClickCustLabel = (index) => {
    axios
      .get(baseURL + "/shiftManagerProfile/allCompleted")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (
            response.data[i].ActualTime <
            0.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#339900";
          } else if (
            response.data[i].ActualTime <
            0.75 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#82c2b4";
          } else if (
            response.data[i].ActualTime <
            0.9 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
          } else if (
            response.data[i].ActualTime <
            1.1 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
          } else if (
            response.data[i].ActualTime <
            1.25 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FF7F50";
          } else if (
            response.data[i].ActualTime <
            1.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FFA500";
          } else {
            response.data[i].rowColor = "#ff0000";
          }
        }
        console.log("response  machine list", response.data);
        setProgramCompleted(response.data);
      });
    axios
      .get(baseURL + "/shiftManagerProfile/allProcessing")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (
            response.data[i].ActualTime <
            0.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#339900";
          } else if (
            response.data[i].ActualTime <
            0.75 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#82c2b4";
          } else if (
            response.data[i].ActualTime <
            0.9 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
          } else if (
            response.data[i].ActualTime <
            1.1 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
          } else if (
            response.data[i].ActualTime <
            1.25 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FF7F50";
          } else if (
            response.data[i].ActualTime <
            1.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FFA500";
          } else {
            response.data[i].rowColor = "#ff0000";
          }
        }
        console.log("response  machine list", response.data);
        setProgramProcessing(response.data);
        setSelectedLabelIndex(index);
        setSelectedMachineIndex(-1);
        setIsPageRefreshed(false);
        localStorage.setItem("isPageRefreshed", false);
      });
  };

  useEffect(() => {
    onClickCustLabel();
  }, []);

  return (
    <div className="row">
      <div
        className="col-md-3"
        style={{
          height: "270px",
          overflow: "scroll",
        }}
      >
        {CustomerData.length === 0 ? (
          <p>Loading...</p>
        ) : (
          dataSource.map((node, i) => {
            const type = node.type;
            const label = (
              <span
                style={{ fontSize: "14px" }}
                className={`node ${
                  selectedLabelIndex === node.labelIndex
                    ? "selcted-row-clr"
                    : ""
                }`}
                onClick={() => onClickCustLabel(node.labelIndex)}
              >
                {type}
              </span>
            );
            return (
              <TreeView
                key={type + "|" + i}
                nodeLabel={label}
                defaultCollapsed={false}
              >
                {node.serverData.map((data, key) => {
                  const label2 = (
                    <span
                      style={{ fontSize: "12px", backgroundColor: "#C0C0C0" }}
                      onClick={() => {
                        selectedMachineFun(data, key);
                        onClickCustomer(data.Customer.Cust_Code);
                        onCustomerRowClick(data, key);
                      }}
                      className={`node ${
                        key === selectedMachineIndex ? "selcted-row-clr" : ""
                      }`}
                    >
                      {data.Customer.Cust_name}
                    </span>
                  );

                  return (
                    <TreeView
                      nodeLabel={label2}
                      key={data.Customer.Cust_name}
                      defaultCollapsed={true}
                    >
                      <ul>
                        {data.Customer.programs.map((value, key) => (
                          <>
                            <div style={{ fontSize: "11px" }}>
                              {value.PStatus === "Completed" ? (
                                <li
                                  className="completed"
                                  style={{ backgroundColor: "#afbfa1" }}
                                >
                                  {value.TaskNo} / {value.NCProgramNo} /{" "}
                                  {value.PStatus}
                                </li>
                              ) : (
                                <li className="node">
                                  {value.TaskNo} / {value.NCProgramNo} /{" "}
                                  {value.PStatus}
                                </li>
                              )}
                            </div>
                          </>
                        ))}
                      </ul>
                    </TreeView>
                  );
                })}
              </TreeView>
            );
          })
        )}
      </div>

      <div className="col-md-9">
        <NavTab
          proramCompleted={proramCompleted}
          programProcessing={programProcessing}
          onClickCustomer={onClickCustomer}
          setProgramProcessing={setProgramProcessing}
          setProgramCompleted={setProgramCompleted}
          onClickCustLabel={onClickCustLabel}
          custCode={custCode}
        />
      </div>
    </div>
  );
}
