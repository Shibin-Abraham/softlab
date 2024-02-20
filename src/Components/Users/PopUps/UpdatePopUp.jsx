import React from 'react'
import './UpdatePopUp.css'

function UpdatePopUp(props) {

  return (
    <div className='popup'>
        <div className='content '>
            <div className="top-section">
              <h3>User Details</h3>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick={()=>props.setUpdatePopUp(false)}>
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
            </svg>
            </div>
            <div className="data-section">
              <div>
                <p>Name</p>
              </div>
              <div>
                <p>Email</p>
              </div>
              <div>
                <p>Phone</p>
              </div>
              <div>
                <p>Join Date</p>
              </div>
              <div>
                <p>Status</p>
              </div>
              
                <select>
                  <option value="">Lab Manager</option>
                  <option value="">Lab Assistent</option>
                </select>
              
                <input type="button" value="Update" />
              
            </div>
        </div>
      {/*<h2 onClick={()=>props.setPopUpActive(false)}>POPup</h2>*/}
    </div>
  )
}

export default UpdatePopUp
