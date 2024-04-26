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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                    </svg>
                        <h3>{props.data.header}</h3>
                    </div>
                    <div className="bottom">
                        <p>{props.data.message}</p>
                    </div>
                    </div>
                </div>  
    }else if(props.data.id === 5 && props.data.message !== null){ //error
        data = <div className='g-popup'>
                    <div className={`container ${popUpActive}`} style={{background: '#029393f2'}}>
                    <div className="top">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clipRule="evenodd" />
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
