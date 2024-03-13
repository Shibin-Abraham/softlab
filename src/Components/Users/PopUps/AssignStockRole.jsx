import React from 'react'
import './AssignStockRole.css'
import '../../GlobalPopUp/GlobalPopUp.jsx'

function AssignStockRole(props) {
  return (
    <>
        <div className='assign-stock-role-popup'>
        <div className='content '>
            <div className="top-section">
              <h3>Assign Stock & Role</h3>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick={()=>props.setAssignStockRole(false)}>
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
            </svg>
            </div>
            <div className="data-section">
                <div>
                    <p>Name</p>
                </div>
                <select>
                  <option value="">Email</option>
                  <option value="">softlab@gmail.com</option>
                  <option value="">softlab@gmail.com</option>
              </select>
              <select>
                  <option value="">TEQIP</option>
                  <option value="">TEQIP</option>
                  <option value="">TEQIP</option>
              </select>
                <div>
                    <input type="text" placeholder='Enter the Role'/>
                </div>
              
                    <input type="button" value="Submit"/>
            </div>
        </div>
      {/*<h2 onClick={()=>props.setPopUpActive(false)}>POPup</h2>*/}
    </div>
    </>
  )
}

export default AssignStockRole
