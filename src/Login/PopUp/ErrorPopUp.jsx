import React,{useEffect,useState} from 'react'
import './ErrorPopUp.css'

function ErrorPopUp(props) {
    let [popUpActive,setPopUpActive] = useState('')
    useEffect(()=>{
        setTimeout(()=>setPopUpActive('popup-active'),1)
        setTimeout(()=>setPopUpActive(''),4000)
    },[])
    
  return (
    <div className='error-popup'>
        <div className={`content ${popUpActive}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff" className="w-6 h-6">
  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
</svg>

        <p>{props.message}</p>
        </div>
    </div>
  )
}

export default ErrorPopUp
