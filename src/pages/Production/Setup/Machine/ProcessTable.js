import axios from "axios";
import React, { useState, useMemo, useEffect } from "react";
import Table from "react-bootstrap/Table";

export default function ProcessTable({
  selectedRowFun,
  selectRow,
  processdataList,
}) {
  // const [refprocess,setRefprocess]=useState({...processdataList})

  // console.log(selectRow)
  //  console.log(processdataList)
  return (
    <div className="">
      <div style={{ height: "220px", overflowY: "scroll", maxWidth: "850px" }}>
        <Table striped className="table-data border">
          <thead className="tableHeaderBGColor">
            <tr>
              <th>Process</th>
              <th className="textAllign">TgtRate</th>
              <th className="textAllign">Id</th>
              <th className="textAllign">Machine_srl</th>
              <th>refProcess</th>
            </tr>
          </thead>

          <tbody className="tablebody">
            {processdataList.map((item, key) => {
              return (
                <>
                  <tr
                    onClick={() => selectedRowFun(item, key)}
                    className={
                      key === selectRow?.index ? "selcted-row-clr" : ""
                    }
                  >
                    <td style={{ whiteSpace: "nowrap" }}>{item.Mprocess}</td>
                    <td className="textAllign">{item.TgtRate}</td>
                    <td className="textAllign">{item.Id}</td>
                    <td className="textAllign">{item.Machine_srl}</td>
                    <td style={{ whiteSpace: "nowrap" }}>{item.RefProcess}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
