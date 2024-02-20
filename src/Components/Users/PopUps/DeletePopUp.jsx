import React from 'react'
import './DeletePopUp.css'

function DeletePopUp(props) {
  return (
    <div className='delete-popup'>
      <div className="content">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
  <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
</svg>


        <p>Are you sure you want to delete? </p>
        <div className='btn'>
            <button id='cancel' onClick={()=>props.setDeletePopUp(false)}>Cancel</button>
            <button id='delete' onClick={()=>props.setDeletePopUp(false)}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default DeletePopUp
