import React, { useEffect, useMemo, useState } from "react";
import MachineForm from "./MachineForm";
import MachineTable from "./MachineTable";
import axios from "axios";
import { useGlobalContext } from "../../../../Context/Context";
import { baseURL } from "../../../../api/baseUrl";

export default function Machine() {
  const { post, MachineTabledata } = useGlobalContext();
  const [selectedRow, setSelectedRow] = useState({
    refName: "",
    remarks: "",
    installDate: "",
    uninstallDate: "",
    targetRate: "",
    Working: "",
    location: "",
    RegnNo: "",
  });
  const [machine_srl, setMachine_srl] = React.useState("");
  const [processdataList, setProcessdataList] = useState([]);

  useEffect(() => {
    MachineTabledata();
  }, []);

  // useMemo(()=>{
  //   setSelectedRow({...post[0],index:0})
  // },[post[0]])

  const selectedRowFn = (item, index) => {
    let list = { ...item, index: index };
    setMachine_srl(item.Machine_srl);
    // api call
    let {
      refName,
      manufacturer,
      Model,
      Machine_Type,
      remarks,
      InstallDate,
      UnistallDate,
      TgtRate,
      Working,
      location,
      RegnNo,
      Machine_srl,
      isRegnNumberPresent,
      isLocationPresent,
      isInstallDatePresent,
    } = list;
    location = location ? location : "";
    remarks = remarks ? remarks : "";
    InstallDate = InstallDate ? InstallDate : "";
    UnistallDate = UnistallDate ? UnistallDate : "";
    TgtRate = TgtRate ? TgtRate : "";
    RegnNo = RegnNo ? RegnNo : "";
    Working = Working ? Working : 0;
    setSelectedRow({
      refName,
      manufacturer,
      Model,
      Machine_Type,
      remarks,
      InstallDate,
      UnistallDate,
      TgtRate,
      Working,
      location,
      RegnNo,
      Machine_srl,
      isRegnNumberPresent,
      isLocationPresent,
      isInstallDatePresent,
      index: index,
    });
  };

  //Default first row select
  useEffect(() => {
    if (post.length > 0 && !selectedRow.refName) {
      selectedRowFn(post[0], 0); // Select the first row
    }
  }, [post, selectedRow, selectedRowFn]);

  const getprocessdataList = () => {
    axios
      .post(baseURL + "/productionSetup/getProcessForMachine", {
        Machine_srl: machine_srl,
      })
      .then((response) => {
        // console.log('data',response)
        setProcessdataList(response.data);
      });
  };

  return (
    <>
      <h4 className="title">Machine Process Setup Form</h4>
      <div className="d-flex">
        <div className="col-md-6 col-sm-12">
          <MachineTable
            selectedRowFn={selectedRowFn}
            selectedRow={selectedRow}
            getprocessdataList={getprocessdataList}
          />
        </div>

        <div className="col-md-6 col-sm-12">
          <MachineForm
            selectedRow={selectedRow}
            getprocessdataList={getprocessdataList}
            processdataList={processdataList}
            setSelectedRow={setSelectedRow}
          />
          {/* <div className='mt-5'>
        </div> */}
        </div>
      </div>
    </>
  );
}
