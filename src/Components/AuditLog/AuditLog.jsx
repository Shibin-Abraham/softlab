import React, { useCallback, useContext, useEffect, useState } from 'react'
import './AuditLog.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { DispatchContext, StateContext } from '../AuthProvider/AuthProvider'
import GlobalPopUp from '../GlobalPopUp/GlobalPopUp'

function AuditLog() {
    const [globalPopUp,setGlobalPopUp] = useState({})
    let [recentActivityData,setRecentActivityData] = useState([])

    const authData = useContext(StateContext)
    const dispatch = useContext(DispatchContext)

    const navigate = useNavigate()

    let getRecentActivityData = useCallback(()=>{
        axios({
            method: 'POST',
            url: 'http://localhost/soft-lab-api/route/services/recent-activity-data.php',
            headers: {
                'Content-type': 'application/json; charset=utf-8',
                'Authorization': authData.JWT, 
              }
          }).then((res)=>{
            console.log("recent activity data",res)
            if(res.data.length !== undefined){
                console.log(res.data) 
                setRecentActivityData(res.data.sort((a,b)=>b.id - a.id)) //sort by decending order for show latest data
            }else if(res.data.statuscode === 401){ //token expired
                localStorage.removeItem('token')
                dispatch({type:'auth_logout'})
                navigate('/login',{replace:true})
                //setGlobalPopUp({id:3,header:'Token Expired',message:'You need to login again.'})
            }else if(res.data.statuscode === 400){
                setGlobalPopUp({id:3,header:'Bad request',message:'please check your request'})
            }
          }).catch((err)=>{
            setGlobalPopUp({id:4,header:`${err.message}!`,message:`${err.message}! please check your network`})
          })
    },[authData.JWT,dispatch,navigate])

    useEffect(()=>{
        getRecentActivityData()
    },[getRecentActivityData])
  return (
    <div className='audit-log'>
        {globalPopUp.id === 1? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null}
        {globalPopUp.id === 2? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null} 
        {globalPopUp.id === 3? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null}
        {globalPopUp.id === 4? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null}
        <section>
            <div className="top">
                <h1>Audit Log</h1>
            </div>
            <div className="container">
                <div className='box'>
                    {
                        recentActivityData.map((data)=>{
                            return (
                                <div className="card">
                                    <h4> {data.date} {data.time}</h4>
                                    <p> Data {data.operation} for {data.details}</p>
                                    <h5>By: {data.name}</h5>
                                </div>
                            )
                        })
                    }
                    
                    
                    {/*<div className="card">
                        <h4> 02-18-2024 15:40:14</h4>
                        <p>Item Details updated for item No:LAP-001, indent:lab-stock-2</p>
                        <h5>By: Soft lab</h5>
                    </div>
                    <div className="card">
                        <h4> 02-18-2024 15:40:14</h4>
                        <p>Stock Details updated for Stock No:lab-stock-2, indent:lab-stock-2</p>
                        <h5>By: Soft lab</h5>
                    </div>
                    <div className="card">
                        <h4> 02-18-2024 15:40:14</h4>
                        <p>Stock Details updated for Stock No:lab-stock-3, indent:lab-stock-6</p>
                        <h5>By: Soft lab</h5>
                    </div>*/}
                
                </div>
                
            </div>
        </section> 
    </div>
  )
}

export default AuditLog
