import React from "react"; 
import TreeView from "react-treeview";
import "react-treeview/react-treeview.css";
import { useState,useEffect } from "react";
import axios from "axios";
import NavTab from "./NavTab";
import { baseURL } from "../../../../../../api/baseUrl";


export default function ByCustomer() {

 const[CustomerData,setCustomerData]=useState([])
  useEffect(() => {
    axios.get(baseURL+'/shiftManagerProfile/orderByCustomers')
        .then((response) => {
          setCustomerData(response.data);
          console.log(response.data)
        })
}, [])

const dataSource = [
  {
      type: "Customer",
      collapsed: false,
      serverData: CustomerData,
  },
];

const [selectcustomer,setSelectcustomer]=useState('');
    const onCustomerRowClick=(item,index)=>{
      let list={...item,index:index}
      // console.log("ScheduleNo",item.ScheduleNo)
      setSelectcustomer(list);
    }

const onClickCustomer = (Cust_Code) => {
    console.log('The CustCode Selected is ' , Cust_Code)
    axios.post(baseURL+'/shiftManagerProfile/CustomerProgramesCompleted' , { Cust_Code : Cust_Code})
          .then((response) => {
            console.log('Programs Compleated DATA' , response.data);                  
            setProgramCompleted(response.data);
            for(let i = 0; i< response.data.length ; i++) {
              if(response.data[i].ActualTime < (0.5)*response.data[i].EstimatedTime){
                response.data[i].rowColor = "#339900"
                //break;
              } else if (response.data[i].ActualTime < (0.75)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#82c2b4"
                //break;
              } else if (response.data[i].ActualTime < (0.9)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#f08080"
                //break;
              }
              else if (response.data[i].ActualTime < (1.1)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#f08080"
                //break;
              } 
              else if (response.data[i].ActualTime < (1.25)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#FF7F50"
                //break;
              } 
              else if (response.data[i].ActualTime < (1.5)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#FFA500"
                //break;
              } else {
                response.data[i].rowColor = "#ff0000"
              }
            }
             console.log('AFTER ADDING COLOR' , response.data)
          })

          axios.post(baseURL+'/shiftManagerProfile/CustomerProgramesProcessing',{ Cust_Code : Cust_Code})
          .then((response) => {
            console.log('Programs Processing Data is ' , response.data);
            setProgramProcessing(response.data);
            for(let i = 0; i< response.data.length ; i++) {
              if(response.data[i].ActualTime < (0.5)*response.data[i].EstimatedTime){
                response.data[i].rowColor = "#339900"
                //break;
              } else if (response.data[i].ActualTime < (0.75)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#82c2b4"
                //break;
              } else if (response.data[i].ActualTime < (0.9)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#f08080"
                //break;
              }
              else if (response.data[i].ActualTime < (1.1)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#f08080"
                //break;
              } 
              else if (response.data[i].ActualTime < (1.25)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#FF7F50"
                //break;
              } 
              else if (response.data[i].ActualTime < (1.5)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#FFA500"
                //break;
              } else {
                response.data[i].rowColor = "#ff0000"
              }
            }
             console.log('AFTER ADDING COLOR' , response.data)
          })
}



const[proramCompleted,setProgramCompleted]=useState([])
const[programProcessing,setProgramProcessing]=useState([])


  return (
    <div className="d-flex">
        <div>
            <div className="" style={{ height: "323px", overflowY: "scroll",overflowX:'scroll',width:'330px'}}>   
                {dataSource.map((node, i) => {
                    const type = node.type;
                    const label = <span className="node">{type}</span>;
                    return (
                        <TreeView
                            key={type + "|" + i}
                           nodeLabel={label}
                            defaultCollapsed={false}>

                            {node.serverData.map((data,key) => {
                                const label2 = <span style={{fontSize:"13px",backgroundColor:"#C0C0C0"}} onClick={() => {onClickCustomer(data.Customer.Cust_Code)
                                  onCustomerRowClick(data,key)}} className={key===selectcustomer?.index? 'selcted-row-clr':'' }>
                                  {data.Customer.Cust_name}</span>;
                                
                                
                                return (
                                    <TreeView
                                        nodeLabel={label2}
                                        key={data.Customer.Cust_name }
                                        defaultCollapsed={true}
                                    > 
                                        <ul>
                                        {data.Customer.programs.map((value,key) => {
                                            const label3 = <span>{value.TaskNo}  / {value.NCProgramNo} / {value.Machine} / {value.PStatus}</span>
                                            return (
                                                <>
                                                <div style={{fontSize:"11px"}}
                                                //  onClick={() => onClickPrograms(value.NCProgramNo, data.Customer.Cust_name )}
                                                 >
                                                {/* <li>
                                                {value.TaskNo}  / {value.NCProgramNo} / {value.Machine} / {value.PStatus}
                                                </li> */}

                                                {value.PStatus==="Completed" ? (
                                                <li className="completed" style={{backgroundColor:'#afbfa1'}}>{value.TaskNo} / {value.NCProgramNo} / {value.PStatus}</li> 
                                             ):<li className="node">{value.TaskNo} / {value.NCProgramNo} / {value.PStatus}</li> 
                                                   
                                             }
                                                </div>
                                                </>
                                            )
                                        })}
                                        </ul>
                                       
                                    </TreeView>);
                            })}
                        </TreeView>
                    );
                })}


            </div>
            
        </div>   
            <div>
            <NavTab proramCompleted={proramCompleted}
            programProcessing={programProcessing}
            // onClickPrograms={onClickPrograms}
            // onClickProgram={onClickProgram}
            onClickCustomer={onClickCustomer}/>
            </div>
        </div>
  );
}
