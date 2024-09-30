import React, { useCallback, useContext, useEffect, useState } from 'react'
import './IndentLog.css'
import noDataAvailable from '../../assets/no-data-available.png'
import AddIndentPopUp from './PopUp/AddIndentPopUp'
import { useNavigate } from 'react-router-dom'
import { DispatchContext, StateContext } from '../AuthProvider/AuthProvider'
import GlobalPopUp from '../GlobalPopUp/GlobalPopUp'
import axios from 'axios'
import ViewIndentPopUp from './PopUp/ViewIndentPopUp'

function IndentLog() {
    let [addIndentPopUp, setAddIndentPopUp] = useState(false)
    let [viewIndentPopUp, setViewIndentPopUp] = useState(false)
    let [globalPopUp, setGlobalPopUp] = useState({})
    let [allStockData, setAllStockData] = useState([])
    let [allIndentData, setAllIndentData] = useState([])
    let [indenRowData, setIndentRowData] = useState({})

    const navigate = useNavigate()

    const authData = useContext(StateContext)
    const dispatch = useContext(DispatchContext)

    let getStockData = useCallback(() => {
        axios({
            method: 'GET',
            url: 'http://localhost:4000/stock/getall',
            headers: {
                'Content-type': 'application/json; charset=utf-8',
            },
            withCredentials: true
        }).then((res) => {
            if (res.status === 200) {
                setAllStockData(res.data.filter((data) => !data.dump))
            }

            // else if(res.data.statuscode === 401){ //token expired
            //     localStorage.removeItem('token')
            //     dispatch({type:'auth_logout'})
            //     navigate('/login',{replace:true})
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

    let getIndentData = useCallback(() => {
        axios({
            method: 'GET',
            url: 'http://localhost:4000/indent/getall',
            headers: {
                'Content-type': 'application/json; charset=utf-8',
            },
            withCredentials: true
        }).then((res) => {
            if (res.status === 200) {
                setAllIndentData(res.data)
            }
            // else if (res.data.statuscode === 401) { //token expired
            //     localStorage.removeItem('token')
            //     dispatch({ type: 'auth_logout' })
            //     navigate('/login', { replace: true })
            // } else if (res.data.statuscode === 400) {
            //     setGlobalPopUp({ id: 3, header: 'Bad request', message: 'please check your request' })
            // }
        }).catch((err) => {
            console.log(err)
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
        getStockData()
        getIndentData()
    }, [getStockData, getIndentData])

    return (
        <div className='indent-log'>
            {globalPopUp.id === 1 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
            {globalPopUp.id === 2 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
            {globalPopUp.id === 3 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
            {globalPopUp.id === 4 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
            <section>
                <div className="top">
                    <h1>Indent Log</h1>
                    <div onClick={() => setAddIndentPopUp(true)}>
                        <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m17.5 11c2.484 0 4.5 2.016 4.5 4.5s-2.016 4.5-4.5 4.5-4.5-2.016-4.5-4.5 2.016-4.5 4.5-4.5zm.5 4v-1.5c0-.265-.235-.5-.5-.5s-.5.235-.5.5v1.5h-1.5c-.265 0-.5.235-.5.5s.235.5.5.5h1.5v1.5c0
                     .265.235.5.5.5s.5-.235.5-.5c0-.592 0-1.5 0-1.5h1.5c.265 0 .5-.235.5-.5s-.235-.5-.5-.5c-.592 0-1.5 0-1.5 0zm-6.479 1c.043.522.153 1.025.321 1.5h-9.092c-.414 0-.75-.336-.75-.75s.336-.75.75-.75zm1.106-4c-.328.456-.594.96-.785
                      1.5h-9.092c-.414 0-.75-.336-.75-.75s.336-.75.75-.75zm7.373-3.25c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0
                       .75-.336.75-.75z" fillRule="nonzero" />
                        </svg>
                    </div>
                </div>
                <div className="container">
                    {
                        allIndentData.length !== 0 ? allIndentData.map((data, index) => {
                            console.log(data)
                            return (
                                <div className="card" key={index} onClick={() => {
                                    setViewIndentPopUp(true)
                                    setIndentRowData({ img: data.fullImageURL, stockName: data.stock?.name })
                                }}>
                                    <div className="img-section">
                                        <img src={data.fullImageURL} alt={data.fullImageURL} />
                                    </div>
                                    <div className="control-section">
                                        <div className='tag'>
                                            <p>{data.stock?.name}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : <div className="card">
                            <div className="img-section">
                                <img src={noDataAvailable} alt='' />
                            </div>
                            <div className="control-section">
                                <div className='tag' style={{ background: "var(--color-light)" }}>
                                    <p style={{ color: "var(--color-danger)" }}>No data available</p>
                                </div>
                            </div>
                        </div>
                    }

                </div>
            </section>
            {addIndentPopUp && <AddIndentPopUp setGlobalPopUp={setGlobalPopUp} setAddIndentPopUp={setAddIndentPopUp} allStockData={allStockData} allIndentData={allIndentData} getIndentData={getIndentData} />}
            {viewIndentPopUp && <ViewIndentPopUp indenRowData={indenRowData} setViewIndentPopUp={setViewIndentPopUp} />}
        </div>
    )
}

export default IndentLog
