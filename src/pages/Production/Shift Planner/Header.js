import React from 'react'

export default function Header() {
  return (
    <div className='row'>
       <div className='col-md-4 col-sm-12 mt-4'>
         <div>
           <h4 className="form-title">Production Department: Shift Editor</h4>
         </div>
       </div>

    <div className="col-md-8 col-sm-12">
        <div className="ip-box form-bg mt-3 ">
          <div className='row'>
               <div className="col-md-3">
                 <label className="form-label">Shift</label>
                 <select className="ip-select">
                    <option value="option 1"> First</option>
                    <option value="option 1">Second</option>
                    <option value="option 1">Third</option>
                 </select>
              </div>

            <button className="button-style mt-2 group-button mt-4"
              style={{ width: "120px"}}>
              Print Weekly Plan
            </button>

               <div className="col-md-3">
                 <label className="form-label">Machine</label>
                 <select className="ip-select">
                    <option value="option 1"> First</option>
                    <option value="option 1">Second</option>
                    <option value="option 1">Third</option>
                 </select>
              </div>

            <button className="button-style mt-2 group-button mt-4"
               style={{ width: "140px"}}>
               Create Day Shift
            </button>
          </div>
      </div>
    </div>

    <div className='col-md-4 col-sm-12'>
         <div>
           <p>Display Date</p>
        </div>
       </div>

    <div className="col-md-8 col-sm-12">
        <div className="ip-box form-bg mt-3 ">
          <div className='row'>
               <div className="col-md-3">
                 <label className="form-label">Shift Incharge</label>
                 <select className="ip-select">
                    <option value="option 1"> Name</option>
                    <option value="option 1">Name</option>
                    <option value="option 1">Name</option>
                 </select>
              </div>

            <button className="button-style mt-2 group-button mt-4"
              style={{ width: "120px"}}>
              Create Week Shift
            </button>

               <div className="col-md-3">
                 <label className="form-label">Operator</label>
                 <select className="ip-select">
                    <option value="option 1"> ABCD</option>
                    <option value="option 1">EFGH</option>
                    <option value="option 1">JKL</option>
                 </select>
              </div>

            <button className="button-style mt-2 group-button mt-4"
               style={{ width: "140px"}}>
               Set Machine Operator
            </button>
          </div>
      </div>
    </div>
  </div>
  )
}
