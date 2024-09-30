import React, { useCallback, useContext, useEffect, useState } from 'react'
import './AuditLog.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { DispatchContext, StateContext } from '../AuthProvider/AuthProvider'
import GlobalPopUp from '../GlobalPopUp/GlobalPopUp'

function AuditLog() {
    const [globalPopUp, setGlobalPopUp] = useState({})
    let [recentActivityData, setRecentActivityData] = useState([])

    const authData = useContext(StateContext)
    const dispatch = useContext(DispatchContext)

    const navigate = useNavigate()

    let getRecentActivityData = useCallback(() => {
        axios({
            method: 'GET',
            url: 'http://localhost:4000/recent-activies',
            headers: {
                'Content-type': 'application/json; charset=utf-8',
            },
            withCredentials: true
        }).then((res) => {
            console.log("recent activity data", res)
            if (res.status === 200) {
                console.log(res.data)
                setRecentActivityData(res.data)
            }

            // else if(res.data.statuscode === 401){ //token expired
            //     localStorage.removeItem('token')
            //     dispatch({type:'auth_logout'})
            //     navigate('/login',{replace:true})
            //     //setGlobalPopUp({id:3,header:'Token Expired',message:'You need to login again.'})
            // }else if(res.data.statuscode === 400){
            //     setGlobalPopUp({id:3,header:'Bad request',message:'please check your request'})
            // }
        }).catch((err) => {
            if (err.response.status === 401) {
                setGlobalPopUp({ id: 3, header: `${err.response.status} ${err.response.data.error}!`, message: `${err.response.data.error} You need to Login again` })
                dispatch({ type: 'auth_logout' })
                navigate('/login', { replace: true })
            } else {
                setGlobalPopUp({ id: 4, header: `${err.response.status} ${err.response.data.error}!`, message: `${err.response.data.error}` })
            }
        })
    }, [dispatch, navigate])

    useEffect(() => {
        getRecentActivityData()
    }, [getRecentActivityData])
    return (
        <div className='audit-log'>
            {globalPopUp.id === 1 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
            {globalPopUp.id === 2 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
            {globalPopUp.id === 3 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
            {globalPopUp.id === 4 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
            {globalPopUp.id === 5 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
            <section>
                <div className="top">
                    <h1>Audit Log</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff" className="w-6 h-6" onClick={() => setGlobalPopUp({ id: 5, header: 'Feature Update', message: 'Currently in development. Anticipated release soon' })}>
                        <path fillRule="evenodd" d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 0 0 3 3h.27l-.155 1.705A1.875 1.875 0 0 0 7.232 22.5h9.536a1.875 1.875 0 0 0 1.867-2.045l-.155-1.705h.27a3 3 0 0 0 3-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0 0 18 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM16.5 6.205v-2.83A.375.375 0 0 0 16.125 3h-8.25a.375.375 0 0 0-.375.375v2.83a49.353 49.353 0 0 1 9 0Zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 0 1-.374.409H7.232a.375.375 0 0 1-.374-.409l.526-5.784a.373.373 0 0 1 .333-.337 41.741 41.741 0 0 1 8.566 0Zm.967-3.97a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H18a.75.75 0 0 1-.75-.75V10.5ZM15 9.75a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V10.5a.75.75 0 0 0-.75-.75H15Z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="container">
                    <div className='box'>
                        {
                            recentActivityData.map((data) => {

                                const userName = data.user.name.charAt(0).toUpperCase() + data.user.name.slice(1)
                                const operation = data.operation.charAt(0).toUpperCase() + data.operation.slice(1)
                                const details = data.details.charAt(0).toUpperCase() + data.details.slice(1)
                                return (
                                    <div className="card" key={data.id}>
                                        <h4> {data.date} {data.time} </h4>
                                        <p>&nbsp;{userName} {operation} {details}</p>
                                        <h5>By: {userName}{` (${data.user.email})`}</h5>
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
