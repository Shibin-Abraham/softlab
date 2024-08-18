import React from 'react'
import './InActive.css'
import { useNavigate } from 'react-router-dom'

function InActive() {
  let navigate = useNavigate()
  return (
    <div className='inactive'>
      <div className="content">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clipRule="evenodd" />
        </svg>
        <h2>Access Denied</h2>
        <span>You do not have permission to access this system, Please contact your Administrator to gain access</span>
        {/*<p onClick={()=>navigate('/login',{replace:true})}>Back to login</p>*/}
      </div>
    </div>
  )
}

export default InActive
