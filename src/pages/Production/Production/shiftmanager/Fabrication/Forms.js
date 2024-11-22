import React,{useEffect, useState} from 'react'
// import Iframe from './Iframe'
import ByMachineBox from './ByMachine/ByMachineBox';
import ByOperations from './ByOperations/ByOperations';
import ByCustomer from './ByCustomer/ByCustomers';
import axios from 'axios';
import { baseURL } from '../../../../../api/baseUrl';

function Forms() {
    const [text, setText] = useState("");
    const [isToggled, setIsToggled] = useState(true);
    const [isClick, setIsClick] = useState(false);
    const [isCustomer, setIsCustomer] = useState(false);

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;


    const handleOnChange = (event)=>{
        setText(event.target.value);
    }

    const byMachine = ()=>{
        setIsClick(false)
        setIsCustomer(false)
        setIsToggled(!isToggled)
    }

    const byOperation = ()=>{
        setIsToggled(false)
        setIsCustomer(false)
        setIsClick(!isClick)
    }

    const byCustomer = ()=>{
        setIsClick(false)
        setIsToggled(false)
        setIsCustomer(!isCustomer)
    }

    const moment = require('moment');
    const today = moment();
    // let Date=today.format("HH:mm DD-MMMM-YYYY");
    //  console.log(Date);
    

    const[shiftDetails,setShiftDetails]=useState([])
    useEffect(()=>{
        var date1 = moment()
      .utcOffset('+05:30')
      .format('YYYY-MM-DD HH:mm:ss ');
      console.log(date1)
      const dateArray =date1.split(' ')
      console.log(dateArray[0])
      console.log(dateArray[1])
       const timeArray = dateArray[1].split(':')
       console.log(timeArray[0])
      let Shift = " "
      if( (timeArray[0]>=6) && (timeArray[0]<=14)) {
        Shift = "First"
      }else if((timeArray[0]>=14) && (timeArray[0]<=22)) {
        Shift = "Second"
      } else {
        Shift = "Third"
      }
      console.log("shift is",Shift)
        axios.post(baseURL+'/shiftManagerProfile/getShiftInformation',
        {ShiftDate : dateArray[0], Shift : Shift})
        .then((response) => {
          console.log('Shift Information' , response.data);
          setShiftDetails(response.data);
       }) 
    },[]);

    
  return (
    <>
    {shiftDetails && shiftDetails.map((item) => {
         return (
            (
                <div>
                        <div className='bg-light'>
        <div className="my-0" style={{margin: '40px'}}>

          <div className='row'>
                <h8 style={{marginLeft:"-30px"}}><b>Shift In Charge Monitoring Form</b></h8>
            </div>
            <form className='d-flex'>
            <div className="box mb-3" style={{width:'300px', marginRight:'-60px'}}>

            <div className="col-md-9">
                <label className="form-label">Date</label>
                <input className="in-field bg-light" 
                 value={date}/>
            </div>

            <div className="col-md-9">
                <label className="form-label">Shift</label>
                <input className="in-field" type="text"  disabled
                 value={shiftDetails[0].Shift}
                />
            </div>

            <div className="col-md-9">
                <label className="form-label">From</label>
                <input className="in-field" 
                 value={shiftDetails[0].FromTime} 
                disabled/>
            </div>

            <div className="col-md-9 ">
                <label className="form-label">To</label>
                <input className="in-field"   disabled
                 value={shiftDetails[0].ToTime}
                />
            </div>

            <div className="col-md-9 ">
                <label className="form-label">In Charge</label>
                <input className="in-field" type="text"  disabled
                 value={shiftDetails[0].Shift_Ic}
                />
            </div>
            </div>

            <div className="bg-light box01">
            <div className="mb-3" style={{paddingLeft: '2px', width: '450px' }}> 
                <label htmlFor="myBox" className="bg-ligh tform-title tab_font mb-2">Shift Instructions</label>
                <textarea className="form-control sticky-top" rows='8' id=""  onChange={handleOnChange} style={{height:'201px', resize:'none'}} value={shiftDetails[0].Shift_instruction} disabled></textarea>
                </div>
            </div>

            <div  className='mt-4 ms-5'>
            <h8><b>Group Actions</b></h8>
              <div className="col-md-12 mt-1" style={{display:"flex",gap:"5px"}}>
                <label className="" style={{paddingRight:'4px'}}> By Machines</label>
                <input className="form-check-input mt-2" onChange={byMachine} type="radio" name='working' defaultChecked/>
            </div>
              <div className="col-md-12 mt-1" style={{display:"flex",gap:"5px"}}>
                <label className=""> By Operation</label>
                <input className="form-check-input mt-2" onChange={byOperation} type="radio"  name='working'/>
            </div>
              <div className="col-md-12 mt-1" style={{display:"flex",gap:"5px"}}>
                <label className="" style={{paddingRight:'3px'}}> By Customer</label>
                <input className="form-check-input mt-2" onChange={byCustomer} type="radio" name='working'/>
            </div>
            </div>
            </form>
     </div>
    </div>
                </div>
               )
         )
           
        
    })
   
    }

    <div>
     <div className="box01 mt-1">
      {isToggled && <ByMachineBox/>}
      {isClick && <ByOperations/>}
      {isCustomer && <ByCustomer/>}
     </div>
    </div>
    </>
  )
}

export default Forms
