import React, { useContext, useEffect, useState } from 'react';
import './Users.css';
import Action from './Action';
import AddStock from './PopUps/AddStock';
import UpdatePopUp from './PopUps/UpdatePopUp'
import AssignStockRole from './PopUps/AssignStockRole';
import { DispatchContext } from '../AuthProvider/AuthProvider';
import axios from "axios";
import GlobalPopUp from "../GlobalPopUp/GlobalPopUp";
import { useNavigate } from "react-router-dom";
import { useCallback } from 'react';
import Loader from '../Loader/Loader';

function Users() {
    const [globalPopUp, setGlobalPopUp] = useState({})
    let [newStock, setNewStock] = useState(false)
    let [assignStockRole, setAssignStockRole] = useState(false)
    let [updatePopUp, setUpdatePopUp] = useState(false)

    let [allUsersData, setAllUsersData] = useState([])
    let [allStockData, setAllStockData] = useState([])
    let [allStockHandlingData, setAllStockHandlingData] = useState([])
    let [loader, setLoader] = useState(true)

    let [stockInHandRowData, setStockInHandRowData] = useState({})

    const navigate = useNavigate()

    const dispatch = useContext(DispatchContext)

    let getUsersData = useCallback(() => {
        //console.log("userssssssssssssssssssssssssssssssssssssssssssssssssssssssssss")
        axios({
            method: 'GET',
            url: 'http://localhost:4000/users',
            headers: {
                'Content-type': 'application/json; charset=utf-8',
            },
            withCredentials: true
        }).then((res) => {
            //console.log("active users 11111111", res)
            if (res.status === 200) {
                setAllUsersData(res.data.filter((data) => data.r_name !== "HOD"))
                setLoader(false)
            }
            // if(res.data.length !== undefined){
            //     console.log(res.data)
            //     setAllUsersData(res.data.filter((data)=>data.r_id!=="1"))
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
            //console.log(err)
            if (err.response.status === 401) {
                setGlobalPopUp({ id: 3, header: `${err.response.status} ${err.response.data.error}!`, message: `${err.response.data.error} You need to Login again` })
                dispatch({ type: 'auth_logout' })
                navigate('/login', { replace: true })
            } else {
                setGlobalPopUp({ id: 4, header: `${err.response.status} ${err.response.data.error}!`, message: `${err.response.data.error}` })
            }
        })
    }, [dispatch, navigate])

    let getStockData = useCallback(() => {
        //console.log("userssssssssssssssssssssssssssssssssssssssssssssssssssssssssss")
        axios({
            method: 'GET',
            url: 'http://localhost:4000/stock/getall',
            headers: {
                'Content-type': 'application/json; charset=utf-8',
            },
            withCredentials: true
        }).then((res) => {
            //console.log("stock dataa 222222222", res)
            if (res?.status === 200) {
                setAllStockData(res?.data?.filter((data) => !data.dump))
            }
            // if (res.data.length !== undefined) {
            //     console.log(res.data)
            //     setAllStockData(res.data.filter((data) => data.dump !== "1"))
            // } else if (res.data.statuscode === 401) { //token expired
            //     localStorage.removeItem('token')
            //     dispatch({ type: 'auth_logout' })
            //     navigate('/login', { replace: true })
            //     //setGlobalPopUp({id:3,header:'Token Expired',message:'You need to login again.'})
            // } else if (res.data.statuscode === 400) {
            //     setGlobalPopUp({ id: 3, header: 'Bad request', message: 'please check your request' })
            // }
        }).catch((err) => {
            //setGlobalPopUp({ id: 4, header: `${err.message}!`, message: `${err.message}! please check your network` })
            if (err?.response?.status === 401) {
                setGlobalPopUp({ id: 3, header: `${err.response.status} ${err.response.data.error}!`, message: `${err.response.data.error} You need to Login again` })
                dispatch({ type: 'auth_logout' })
                navigate('/login', { replace: true })
            } else {
                setGlobalPopUp({ id: 4, header: `${err.response.status} ${err.response.data.error}!`, message: `${err.response.data.error}` })
            }
        })
    }, [dispatch, navigate])

    let getStockHandlingUsers = useCallback(() => {
        //console.log("userssssssssssssssssssssssssssssssssssssssssssssssssssssssssss")
        axios({
            // method: 'POST',
            // url: 'http://localhost/soft-lab-api/route/services/get-stock-handling-users-data.php',
            // headers: {
            //     'Content-type': 'application/json; charset=utf-8',
            //     'Authorization': authData.JWT,
            // }
            method: 'GET',
            url: 'http://localhost:4000/stock/handling-data',
            headers: {
                'Content-type': 'application/json; charset=utf-8',
            },
            withCredentials: true

        }).then((res) => {
            //console.log("stock dataa 222222222", res)
            if (res.status === 200) {
                setAllStockHandlingData(res.data)
            }
            // if (res.data.length !== undefined) {
            //     console.log(res.data)
            //     setAllStockHandlingData(res.data)
            // } else if (res.data.statuscode === 401) { //token expired
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
        getUsersData()
        getStockData()
        getStockHandlingUsers()
    }, [getUsersData, getStockData, getStockHandlingUsers])

    return (
        <div className='users'>
            {globalPopUp.id === 1 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
            {globalPopUp.id === 2 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
            {globalPopUp.id === 3 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
            {globalPopUp.id === 4 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
            {loader && <Loader />}
            <section>
                <div className="top-container">
                    <h1>Users</h1>
                    <button onClick={() => setNewStock(true)}>Add New Stock</button>
                </div>
                <div className="mid-box">
                    <div className='container'>
                        <div className='table-section'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Join Date</th>
                                        <th>Position</th>
                                        <th>Status</th>
                                        <th>Operation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allUsersData.map((data) => {
                                            return (
                                                <tr key={data.id}>
                                                    <td> {data.name}</td>
                                                    <td> {data.email}</td>
                                                    <td>{data.phone}</td>
                                                    <td> {data.join_date.slice(0, 10)}</td>
                                                    <td> {data.r_name}</td>
                                                    {<Action
                                                        status={data.status ? "Reject" : "Assign"}
                                                        id={data.id}
                                                        getUsersData={getUsersData}
                                                        setGlobalPopUp={setGlobalPopUp}
                                                        getStockData={getStockData}
                                                        getStockHandlingUsers={getStockHandlingUsers}
                                                    />}
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>

                    </div>

                    <div className="container-2">
                        <table>
                            <thead>
                                <tr>
                                    <th>Stock Name</th>
                                </tr>
                            </thead>
                            <tbody>

                                {allStockData.length !== 0 ? allStockData.map((data) => {
                                    return (
                                        <tr key={data.id}>
                                            <td>{data.name}</td>
                                        </tr>
                                    )
                                }) : <tr><td>Data not available</td></tr>
                                }

                            </tbody>
                        </table>
                        {newStock && <AddStock setNewStock={setNewStock} data={allStockData} getStockData={getStockData} setGlobalPopUp={setGlobalPopUp} />}
                        {assignStockRole && <AssignStockRole setAssignStockRole={setAssignStockRole} allStockData={allStockData} allUsersData={allUsersData} getStockHandlingUsers={getStockHandlingUsers} setGlobalPopUp={setGlobalPopUp} />}
                    </div>
                    <div className='container-3-control'>
                        <h2>Stock Handling Users</h2>
                        <button onClick={() => setAssignStockRole(true)}>Assign Stock & Role to User</button>
                    </div>
                    <div className='container-3'>
                        <div className='table-section'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Stock in hand</th>
                                        <th>Role</th>
                                        <th>Operation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allStockHandlingData.length !== 0 ? allStockHandlingData.map((data) => {
                                            // let userName = allUsersData.map((u) => {
                                            //     return (
                                            //         u.id === data.u_id && u.name
                                            //     )
                                            // })
                                            // let userEmail = allUsersData.map((u) => {
                                            //     return (
                                            //         u.id === data.u_id && u.email
                                            //     )
                                            // })
                                            // let stockInHand = allStockData.map((s) => {
                                            //     return (
                                            //         s.id === data.s_id && s.name
                                            //     )
                                            // })
                                            //console.log("stockhandlinggggggggggggggggg", stockInHand)
                                            return (
                                                <tr key={data.id}>
                                                    <td>{data.user.name}</td>
                                                    <td>{data.user.email}</td>
                                                    <td>{data.stock.name}</td>
                                                    <td> {data.role_name}</td>
                                                    <td>
                                                        <button onClick={() => {
                                                            setUpdatePopUp(true)
                                                            setStockInHandRowData({
                                                                id: data.id,
                                                                name: data.user.name,
                                                                email: data.user.email,
                                                                stockInHand: data.stock.name,
                                                                role: data.role_name,
                                                                u_id: data.user.id,
                                                                s_id: data.stock.id
                                                            })
                                                        }}>
                                                            Update</button>
                                                    </td>
                                                </tr>
                                            )
                                        }) : <tr><td>No data available</td><td>No data available</td><td>No data available</td><td>No data available</td><td>No data available</td></tr>
                                    }


                                </tbody>
                            </table>
                            {updatePopUp && <UpdatePopUp
                                setUpdatePopUp={setUpdatePopUp}
                                stockInHandRowData={stockInHandRowData}
                                getStockHandlingUsers={getStockHandlingUsers}
                                allStockData={allStockData}
                                setGlobalPopUp={setGlobalPopUp}
                            />}
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default Users
