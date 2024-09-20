import React, { useCallback, useContext, useEffect, useState } from 'react'
import './Dump.css'
import { useNavigate } from 'react-router-dom'
import { DispatchContext, StateContext } from '../AuthProvider/AuthProvider'
import axios from 'axios'
import GlobalPopUp from '../GlobalPopUp/GlobalPopUp'

function Dump() {
    let [globalPopUp, setGlobalPopUp] = useState({})
    let [allStockData, setAllStockData] = useState([])   //allStockData based on users  
    let [dumpItemsData, setDumpItemsData] = useState([])
    let [dumpItemsDataCopy, setDumpItemsDataCopy] = useState([])
    let [stockName, setStockName] = useState('')

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
            console.log("dump ---------------", res)
            if (res.status === 200) {
                console.log(res.data)
                setStockName(res.data[0].name.toUpperCase())
                setAllStockData(res.data.filter((data) => data.category !== null))
                //setStockDataEmpty(res.data.filter((data)=>data.category===''&&data.dump!=="1"))
                //stockDataEmpty.length !== 0 && setGlobalPopUp({id:4,header:'Alert',message:'please fill the stock details'})
            }
            // else if (res.data.statuscode === 401) { //token expired
            //     localStorage.removeItem('token')
            //     dispatch({ type: 'auth_logout' })
            //     navigate('/login', { replace: true })
            //     //setGlobalPopUp({id:3,header:'Token Expired',message:'You need to login again.'})
            // } else if (res.data.statuscode === 400) {
            //     setGlobalPopUp({ id: 3, header: 'Bad request', message: 'please check your request' })
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

    let getDumpItemData = useCallback(() => {
        axios({
            method: 'GET',
            url: 'http://localhost:4000/item/get',
            headers: {
                'Content-type': 'application/json; charset=utf-8',
            },
            withCredentials: true
        }).then((res) => {
            console.log("active users 11111111", res)
            if (res.status === 200) {
                console.log("item data;;;;;;;;;;;;;", res.data)
                const filterdData = res.data.filter((data) => data.dump === true)
                setDumpItemsData(filterdData)
                //setDumpItemsDataCopy(filterdData)
                //setAllUsersData(res.data.filter((data)=>data.r_id!=="1"))
            }

            // else if (res.data.statuscode === 401) { //token expired
            //     localStorage.removeItem('token')
            //     dispatch({ type: 'auth_logout' })
            //     navigate('/login', { replace: true })
            //     //setGlobalPopUp({id:3,header:'Token Expired',message:'You need to login again.'})
            // } else if (res.data.statuscode === 400) {
            //     setGlobalPopUp({ id: 3, header: 'Bad request', message: 'please check your request' })
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
        getStockData()
        getDumpItemData()
    }, [getStockData, getDumpItemData])

    return (
        <div className='dump-data'>
            {globalPopUp.id === 1 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
            {globalPopUp.id === 2 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
            {globalPopUp.id === 3 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
            {globalPopUp.id === 4 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
            <section>
                <div className="top">
                    <h1>Dump Data</h1>
                </div>
                <div className="container">
                    <div className="right-section">
                        {
                            allStockData.length !== 0 ? allStockData.map((data) => {
                                let name = data.name.toUpperCase()
                                let category = data.category.toUpperCase()
                                let type = data.type.toUpperCase()
                                let supplier_name = data.supplier_name.toUpperCase()

                                return (
                                    <div className={`card ${stockName === name ? `selected` : null}`} key={data.id} onClick={() => {
                                        setStockName(name)
                                        setDumpItemsDataCopy(dumpItemsData.filter((d) => d.stock.id === data.id))
                                    }}>
                                        <div className="svg">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                <path d="M11.644 1.59a.75.75 0 0 1 .712 0l9.75 5.25a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.712 0l-9.75-5.25a.75.75 0 0 1 0-1.32l9.75-5.25Z" />
                                                <path d="m3.265 10.602 7.668 4.129a2.25 2.25 0 0 0 2.134 0l7.668-4.13 1.37.739a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.71 0l-9.75-5.25a.75.75 0 0 1 0-1.32l1.37-.738Z" />
                                                <path d="m10.933 19.231-7.668-4.13-1.37.739a.75.75 0 0 0 0 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 0 0 0-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 0 1-2.134-.001Z" />
                                            </svg>
                                        </div>
                                        <h4>{name}</h4>
                                        <div className='discription'>
                                            <span>{data.category !== null ? `Category: ${category}, Invoice-ID: ${data.invoice_id}, Invoice-Date: ${data.invoice_date}, Type: ${type}, Supplier-Name: ${supplier_name}` : `No data available`}</span>
                                        </div>
                                    </div>
                                )
                            }) : <div className="card">
                                <div className="svg">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M11.644 1.59a.75.75 0 0 1 .712 0l9.75 5.25a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.712 0l-9.75-5.25a.75.75 0 0 1 0-1.32l9.75-5.25Z" />
                                        <path d="m3.265 10.602 7.668 4.129a2.25 2.25 0 0 0 2.134 0l7.668-4.13 1.37.739a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.71 0l-9.75-5.25a.75.75 0 0 1 0-1.32l1.37-.738Z" />
                                        <path d="m10.933 19.231-7.668-4.13-1.37.739a.75.75 0 0 0 0 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 0 0 0-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 0 1-2.134-.001Z" />
                                    </svg>
                                </div>
                                <h4>No data available</h4>
                                <div className='discription'>
                                    <span></span>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="left-section">
                        {
                            dumpItemsDataCopy.length !== 0 ? dumpItemsDataCopy.map((data, index) => {
                                return (
                                    <div className="card" key={index}>
                                        <div className="svg">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clipRule="evenodd" />
                                                <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <h4>{data.name}</h4>
                                        <div className='discription'>
                                            <span>{`${data.brand.name.toUpperCase()}, ${data.model}, ${data.description}`}</span>
                                        </div>
                                        <div className='bottom'>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                                <span>{data.amount}</span>
                                            </div>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                    <path fillRule="evenodd" d="M10 4.5c1.215 0 2.417.055 3.604.162a.68.68 0 0 1 .615.597c.124 1.038.208 2.088.25 3.15l-1.689-1.69a.75.75 0 0 0-1.06 1.061l2.999 3a.75.75 0 0 0 1.06 0l3.001-3a.75.75 0 1 0-1.06-1.06l-1.748 1.747a41.31 41.31 0 0 0-.264-3.386 2.18 2.18 0 0 0-1.97-1.913 41.512 41.512 0 0 0-7.477 0 2.18 2.18 0 0 0-1.969 1.913 41.16 41.16 0 0 0-.16 1.61.75.75 0 1 0 1.495.12c.041-.52.093-1.038.154-1.552a.68.68 0 0 1 .615-.597A40.012 40.012 0 0 1 10 4.5ZM5.281 9.22a.75.75 0 0 0-1.06 0l-3.001 3a.75.75 0 1 0 1.06 1.06l1.748-1.747c.042 1.141.13 2.27.264 3.386a2.18 2.18 0 0 0 1.97 1.913 41.533 41.533 0 0 0 7.477 0 2.18 2.18 0 0 0 1.969-1.913c.064-.534.117-1.071.16-1.61a.75.75 0 1 0-1.495-.12c-.041.52-.093 1.037-.154 1.552a.68.68 0 0 1-.615.597 40.013 40.013 0 0 1-7.208 0 .68.68 0 0 1-.615-.597 39.785 39.785 0 0 1-.25-3.15l1.689 1.69a.75.75 0 0 0 1.06-1.061l-2.999-3Z" clipRule="evenodd" />
                                                </svg>
                                                <span>{data.warranty}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <h4 className='no-data'>{stockName} don't have any Dumped Items</h4>
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Dump
