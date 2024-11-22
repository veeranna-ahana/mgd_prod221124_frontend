import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseURL } from '../../../../../../api/baseUrl';
import TreeView from "react-treeview";

export default function ShiftReport() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(today.getDate()).padStart(2, '0');
  const currentDate = `${year}-${month}-${day}`;
  console.log(currentDate);

  const [reportsTreeViewData, setReportsTreeView] = useState([]);
  useEffect(() => {
    axios.post(baseURL + '/reports/reportsTreeView', { Date: currentDate })
      .then((response) => {
        console.log('RESPONSE', response.data);
        setReportsTreeView(response.data);
      });
  }, []);

  const dataSource = [
    {
      type: "Machines",
      collapsed: true,
      serverData: reportsTreeViewData,
    },
  ];

  return (
    <div>
      <div className='col-md-5' style={{ height: "300px", overflowY: "scroll", fontSize: "14px" }}>
        {dataSource.map((node, i) => {
          const type = node.type;
          const label = <span className="node">{type}</span>;
          return (
            <TreeView
              key={type + "|" + i}
              nodeLabel={label}
              defaultCollapsed={false}
            >
              {node.serverData && node.serverData.map((data) => {
                const label2 = <span style={{ fontSize: "13px" }} className="node">{data.MachineName}</span>;
                return (
                  <TreeView
                    nodeLabel={label2}
                    key={data.name}
                    defaultCollapsed={true}
                  >
                    {data.task && data.task.map((taskData) => {
                      const label3 = <span style={{ fontSize: "12px" }} className="node">{taskData.action} - {taskData.time}</span>;
                      return (
                        <TreeView
                          nodeLabel={label3}
                          key={taskData.name}
                          defaultCollapsed={true}
                        >
                          {taskData.operations && taskData.operations.map((operation) => {
                            const label4 = <span style={{ fontSize: "11px" }} className="node">{operation.Operation} - {operation.time}</span>;
                            return (
                              <TreeView
                                nodeLabel={label4}
                                key={operation.name}
                                defaultCollapsed={true}
                              />
                            )
                          })}
                        </TreeView>
                      )
                    })}
                  </TreeView>
                )
              })}
            </TreeView>
          );
        })}
      </div>
    </div>
  );
}
