import React, { useState, useEffect } from 'react';
import TreeView from "react-treeview";
import axios from 'axios';
import { baseURL } from '../../../../../../api/baseUrl';
export default function List2() {

    const [machineProcessData, setMachineProcessData] = useState([])

    useEffect(() => {
        axios.get(baseURL+'/machineAllotment/getMachineProcess')
            .then((response) => {
             //   console.log("byww", response.data)
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
        <div className="MainDiv" style={{  overflowY: "scroll" }}>
            <div className="container">
                {dataSource.map((node, i) => {
                    const type = node.type;
                    const label = <span className="node">{type}</span>;
                    // console.log(type,i);
                    // console.log(label);
                    return (
                        <TreeView
                            key={type + "|" + i}
                           nodeLabel={label}
                            defaultCollapsed={true} >

                            {node.serverData.map((data) => {
                                const label2 = <span className="node">hiiii{data.MachineName}</span>;
                                
                                return (
                                    <TreeView
                                        nodeLabel={label2}
                                        key={data.name }
                                        defaultCollapsed={true}
                                    >
                                        
                                        {data.process.map((value) => {
                                           // console.log("222222",value.RefProcess);
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
