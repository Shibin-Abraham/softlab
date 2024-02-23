import React,{useState,useEffect} from 'react'
import './GlobalPopUp.css'

function GlobalPopUp(props) {
    let [popUpActive,setPopUpActive] = useState('')
    useEffect(()=>{
        setTimeout(()=>setPopUpActive('g-p-active'),1)
    },[])
    let data
   if(props.data.id ===1 && props.data.message !== null){//success 
        data = <div className='g-popup'>
                    <div className={`container ${popUpActive}`} style={{background: '#7380ec'}}>
                    <div className="top">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <h3>{props.data.header}</h3>
                    </div>
                    <div className="bottom">
                        <p>{props.data.message}</p>
                    </div>
                    </div>
                </div>
    }else if(props.data.id === 2 && props.data.message !== null){ //updated
        data = <div className='g-popup'>
                    <div className={`container ${popUpActive}`} style={{background: '#25ad80'}}>
                    <div className="top">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <h3>{props.data.header}</h3>
                    </div>
                    <div className="bottom">
                        <p>{props.data.message}</p>
                    </div>
                    </div>
                </div>
    }else if(props.data.id === 3 && props.data.message !== null){ //warning
        data = <div className='g-popup'>
                    <div className={`container ${popUpActive}`} style={{background: '#cd9541'}}>
                    <div className="top">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                        </svg>
                        <h3>{props.data.header}</h3>
                    </div>
                    <div className="bottom">
                        <p>{props.data.message}</p>
                    </div>
                    </div>
                </div>
    }else if(props.data.id === 4 && props.data.message !== null){ //error
        data = <div className='g-popup'>
                    <div className={`container ${popUpActive}`} style={{background: '#c5515b'}}>
                    <div className="top">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                        <h3>{props.data.header}</h3>
                    </div>
                    <div className="bottom">
                        <p>{props.data.message}</p>
                    </div>
                    </div>
                </div>  
    }else{
        console.error("props obj{id=1-4 message=can't be empty}");
    }
    setTimeout(()=>setPopUpActive(''),4000)
    setTimeout(()=>props.setGlobalPopUp(false),5000)
  return (
    <>
    {data}
    </>
  )
}

export default GlobalPopUp
