import axios from "axios";
import React,{useState , useEffect} from "react";
import TreeView from "react-treeview";
import "react-treeview/react-treeview.css";
import { baseURL } from "../../../../../api/baseUrl";

export default function ByMachineBox() {

  const [machineProcessData, setMachineProcessData] = useState([])

  useEffect(() => {
      axios.get(baseURL+'/shiftManagerProfile/profileListMachines')
          .then((response) => {
              setMachineProcessData(response.data)
          })
  }, [])


  const dataSource = [
      {
          type: "Machines",
          collapsed: false,
          serverData: machineProcessData,
      },
  ];

  return (
    <div className="MainDiv" style={{ height: "323px", overflowY: "scroll",width:'338px', overflowX:'scroll' }}>
            <div className="container">   
                {dataSource.map((node, i) => {
                    const type = node.type;
                    const label = <span className="node">{type}</span>;
                    return (
                        <TreeView
                            key={type + "|" + i}
                           nodeLabel={label}
                            defaultCollapsed={true} >

                            {node.serverData.map((data) => {
                                const label2 = <span className="node">{data.MachineName}</span>;
                                
                                return (
                                    <TreeView
                                        nodeLabel={label2}
                                        key={data.name }
                                        defaultCollapsed={true}
                                    >
                                        
                                        {data.process.map((value) => {
                                            return (
                                                <>
                                              
                                                <div>
                                             <span className="node">{value.RefProcess}</span>
                                                </div>
                                               
                                                </>
                                            )
                                        })}  
                                     
                                    </TreeView>);
                            })}
                        </TreeView>
                    );
                })}
            </div>
        </div>
  );
}
