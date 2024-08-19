import React, { useCallback, useContext, useEffect, useState } from 'react'
import './StockDetails.css';
import ViewPopUp from './PopUp/ViewPopUp';
import AddStockPopUp from './PopUp/AddStockPopUp';
import GlobalPopUp from '../GlobalPopUp/GlobalPopUp';
import axios from 'axios';
import { DispatchContext, StateContext } from '../AuthProvider/AuthProvider';
import { useNavigate } from "react-router-dom";

function StockDetails() {
    let [searchPopUp, setSearchPopUp] = useState(0)

    let [viewPopUp, setViewPopUp] = useState(false)
    let [stockPopUp, setStockPopUp] = useState(false)
    let [globalPopUp, setGlobalPopUp] = useState({})                     // format {id:globalPopUp,message:'Data has been updated'} {id:globalPopUp,message:'Waringgggggggggg'}    {id:globalPopUp,message:'Something went wrong'}      

    let [allStockData, setAllStockData] = useState([])   //allStockData based on users  
    let [allStockDataCopy, setAllStockDataCopy] = useState([])   //this is the copy of the allstockdata
    let [stockDataEmpty, setStockDataEmpty] = useState([])
    let [stockRowData, setStockRoWData] = useState({})

    const navigate = useNavigate()

    //const authData = useContext(StateContext)
    const dispatch = useContext(DispatchContext)
    //console.log("userssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",authData)
    let getStockData = useCallback(() => {
        axios({
            method: 'GET',
            url: 'http://localhost:4000/stock/getall',
            headers: {
                'Content-type': 'application/json; charset=utf-8',
            },
            withCredentials: true
        }).then((res) => {

            //console.log("stock dataa ---------------", res)
            if (res.status === 200) {
                setAllStockData(res.data.filter((data) => !data.dump))
                setStockDataEmpty(res.data.filter((data) => data.category === null && !data.dump))
            }
            // if(res.data.length !== undefined){
            //     //console.log(res.data) 
            //     setAllStockData(res.data.filter((data)=>data.dump!=="1"))

            //     setStockDataEmpty(res.data.filter((data)=>data.category===''&&data.dump!=="1"))
            //     //stockDataEmpty.length !== 0 && setGlobalPopUp({id:4,header:'Alert',message:'please fill the stock details'})
            // }else if(res.data.statuscode === 401){ //token expired
            //     localStorage.removeItem('token')
            //     dispatch({type:'auth_logout'})
            //     navigate('/login',{replace:true})
            //     //setGlobalPopUp({id:3,header:'Token Expired',message:'You need to login again.'})
            // }else if(res.data.statuscode === 400){
            //     setGlobalPopUp({id:3,header:'Bad request',message:'please check your request'})
            // }
        }).catch((err) => {
            //setGlobalPopUp({ id: 4, header: `${err.message}!`, message: `${err.message}! please check your network` })
            if (err.response.status === 401) {
                setGlobalPopUp({ id: 3, header: `${err.response.status} ${err.response.data.error}!`, message: `${err.response.data.error} You need to Login again` })
                dispatch({ type: 'auth_logout' })
                navigate('/login', { replace: true })
            } else {
                setGlobalPopUp({ id: 4, header: `${err.response.status} ${err.response.data.error}!`, message: `${err.response.data.error}` })
            }
        })
    }, [dispatch, navigate])

    let searchStock = (e) => {
        if (e.target.value.length !== 0) {
            setSearchPopUp(1)
            let searchData = e.target.value.toLowerCase()
            setAllStockDataCopy(allStockData.filter((data) => {
                let name = data?.name?.toLowerCase()
                let invoice_date = data?.invoice_date
                let invoice_id = data?.invoice_id?.toLowerCase()
                return (name?.includes(searchData) || invoice_date?.includes(searchData) || invoice_id?.includes(searchData))
            }))
        } else {
            setAllStockDataCopy([])
        }

    }
    useEffect(() => {
        getStockData()
    }, [getStockData])
    //console.log("alllllllll",allStockData)
    return (
        <div className='stock-details'>
            {stockPopUp && <AddStockPopUp setStockPopUp={setStockPopUp} setGlobalPopUp={setGlobalPopUp} allStockData={allStockData} getStockData={getStockData} />}
            {viewPopUp && <ViewPopUp setViewPopUp={setViewPopUp} setGlobalPopUp={setGlobalPopUp} stockRowData={stockRowData} getStockData={getStockData} allStockData={allStockData} />}
            {globalPopUp.id === 1 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
            {globalPopUp.id === 2 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
            {globalPopUp.id === 3 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
            {globalPopUp.id === 4 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
            <section>
                <h1>Stock Details</h1>
                <div className='top'>
                    <input type='search' placeholder='  Search...' onChange={(e) => searchStock(e)} />
                    {
                        stockDataEmpty.length !== 0 ? <div onClick={() => setStockPopUp(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                            </svg>
                            <h3>Fill Stock Data</h3>
                        </div> : null
                    }
                </div>
                {
                    searchPopUp === 1 ? <div className="search-data">
                        <ul>
                            {
                                allStockDataCopy.length !== 0 ? allStockDataCopy.map((data, index) => {
                                    return (
                                        <li key={index} onClick={(e) => {
                                            console.log(allStockDataCopy)
                                            setAllStockDataCopy(allStockData.filter((data) => String(data.id) === String(e.currentTarget.value)))
                                            console.log(allStockDataCopy)
                                            setSearchPopUp(0)
                                        }} value={data.id}>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#3e4cce" className="w-4 h-4">
                                                    <path d="M8 7c3.314 0 6-1.343 6-3s-2.686-3-6-3-6 1.343-6 3 2.686 3 6 3Z" />
                                                    <path d="M8 8.5c1.84 0 3.579-.37 4.914-1.037A6.33 6.33 0 0 0 14 6.78V8c0 1.657-2.686 3-6 3S2 9.657 2 8V6.78c.346.273.72.5 1.087.683C4.42 8.131 6.16 8.5 8 8.5Z" />
                                                    <path d="M8 12.5c1.84 0 3.579-.37 4.914-1.037.366-.183.74-.41 1.086-.684V12c0 1.657-2.686 3-6 3s-6-1.343-6-3v-1.22c.346.273.72.5 1.087.683C4.42 12.131 6.16 12.5 8 12.5Z" />
                                                </svg>
                                                {data.name}
                                            </span>
                                            <span>
                                                {
                                                    data.invoice_id !== null ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#00af75d8" className="w-4 h-4">
                                                        <path fillRule="evenodd" d="M11.914 4.086a2 2 0 0 0-2.828 0l-5 5a2 2 0 1 0 2.828 2.828l.556-.555a.75.75 0 0 1 1.06 1.06l-.555.556a3.5 3.5 0 0 1-4.95-4.95l5-5a3.5 3.5 0 0 1 4.95 4.95l-1.972 1.972a2.125 2.125 0 0 1-3.006-3.005L9.97 4.97a.75.75 0 1 1 1.06 1.06L9.058 8.003a.625.625 0 0 0 .884.883l1.972-1.972a2 2 0 0 0 0-2.828Z" clipRule="evenodd" />
                                                    </svg> : null
                                                }

                                                {data.invoice_id}
                                            </span>
                                            <span>
                                                {
                                                    data.invoice_date !== null ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#ff7782" className="w-4 h-4">
                                                        <path fillRule="evenodd" d="M4 1.75a.75.75 0 0 1 1.5 0V3h5V1.75a.75.75 0 0 1 1.5 0V3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2V1.75ZM4.5 6a1 1 0 0 0-1 1v4.5a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-7Z" clipRule="evenodd" />
                                                    </svg> : null
                                                }
                                                {data.invoice_date}
                                            </span>
                                        </li>
                                    )
                                }) : null
                            }
                        </ul>
                    </div> : null
                }

                <div className="container">
                    <div className="table-section">
                        <table>
                            <thead>
                                <tr>
                                    <th>SI No</th>
                                    <th>Stock Name</th>
                                    <th>Category</th>
                                    <th>Invoice ID</th>
                                    <th>Invoice Date</th>
                                    <th>Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allStockDataCopy.length === 0 ? allStockData.map((data, index) => {

                                        return (
                                            <tr key={data.id}>
                                                <td>{index + 1}</td>
                                                <td><span style={data?.role_name ? { width: "10px", height: "5px", color: "#000000", background: "#6474ff", borderRadius: "10px" } : null}>{data?.role_name && `${data?.role_name} `}</span>  {data.name}</td>
                                                <td style={data.category === null ? { color: "#ff7782" } : null}>{data.category !== null ? data.category : 'PLEASE FILL DATA'}</td>
                                                <td style={data.invoice_id === null ? { color: "#ff7782" } : null}>{data.invoice_id !== null ? data.invoice_id : 'PLEASE FILL DATA'}</td>
                                                <td style={data.invoice_date === null ? { color: "#ff7782" } : null}>{data.invoice_date !== null ? data.invoice_date : 'PLEASE FILL DATA'}</td>
                                                <td style={data.type === null ? { color: "#ff7782" } : null}>{data.type !== null ? data.type : 'PLEASE FILL DATA'}</td>
                                                <td>
                                                    {
                                                        data.type !== null ? <svg onClick={() => {
                                                            setViewPopUp(true)
                                                            setStockRoWData({
                                                                id: data.id,
                                                                name: data.name,
                                                                category: data.category,
                                                                invoice_id: data.invoice_id,
                                                                invoice_date: data.invoice_date,
                                                                type: data.type,
                                                                supplier_name: data.supplier_name
                                                            })
                                                        }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                                        </svg> : null

                                                    }
                                                </td>
                                            </tr>
                                        )
                                    }) : allStockDataCopy.map((data, index) => {

                                        return (
                                            <tr key={data.id}>
                                                <td>{index + 1}</td>
                                                <td><span style={data.role_name !== undefined ? { width: "10px", height: "5px", color: "#000000", background: "#6474ff", borderRadius: "10px" } : null}>{data.role_name !== undefined && `${data.role_name} `}</span>  {data.name}</td>
                                                <td style={data.category === null ? { color: "#ff7782" } : null}>{data.category !== null ? data.category : 'PLEASE FILL DATA'}</td>
                                                <td style={data.invoice_id === null ? { color: "#ff7782" } : null}>{data.invoice_id !== null ? data.invoice_id : 'PLEASE FILL DATA'}</td>
                                                <td style={data.invoice_date === null ? { color: "#ff7782" } : null}>{data.invoice_date !== null ? data.invoice_date : 'PLEASE FILL DATA'}</td>
                                                <td style={data.type === null ? { color: "#ff7782" } : null}>{data.type !== null ? data.type : 'PLEASE FILL DATA'}</td>
                                                <td>
                                                    {
                                                        data.type !== null ? <svg onClick={() => {
                                                            setViewPopUp(true)
                                                            setStockRoWData({
                                                                id: data.id,
                                                                name: data.name,
                                                                category: data.category,
                                                                invoice_id: data.invoice_id,
                                                                invoice_date: data.invoice_date,
                                                                type: data.type,
                                                                supplier_name: data.supplier_name
                                                            })
                                                        }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                                        </svg> : null

                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })
                                }


                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default StockDetails
