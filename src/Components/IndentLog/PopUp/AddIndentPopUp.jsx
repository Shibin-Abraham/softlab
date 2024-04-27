import React, { useEffect, useState } from 'react'
import './AddIndentPopUp.css'

function AddIndentPopUp(props) {
    let [popUpActive,setPopUpActive] = useState('')

    useEffect(()=>{
        setTimeout(()=>setPopUpActive('popup-active'),1)
    },[])
  return (
    <div className='add-indent-popup'>
            <div className={`content ${popUpActive}`}>
                <div className="top-section">
                <h3>Add Indent</h3>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick={()=>{
                    setPopUpActive('')
                    setTimeout(()=>{
                        props.setAddIndentPopUp(false)
                    },300)
                }}>
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                </svg>
                </div>
                <div className="data-section">
                <div>
                <select >
                    {
                                <option value="">select</option>
                    }
                    
                </select>
                </div>
                <p></p>
                <input type="file" id="images" accept="image/*" required></input>
                <input type="button" value="ADD"  />
                </div>
            </div>
      {/*<h2 onClick={()=>props.setPopUpActive(false)}>POPup</h2>*/}
    </div>
  )
}

export default AddIndentPopUp
