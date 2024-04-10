import React,{useContext, useEffect, useState} from 'react';
import './Users.css';
import Action from './Action';
import AddStock from './PopUps/AddStock';
import UpdatePopUp from './PopUps/UpdatePopUp'
import AssignStockRole from './PopUps/AssignStockRole';
import { DispatchContext, StateContext } from '../AuthProvider/AuthProvider';
import axios from "axios";
import GlobalPopUp from "../GlobalPopUp/GlobalPopUp";
import { useNavigate } from "react-router-dom";
import { useCallback } from 'react';

function Users() {
    const [globalPopUp,setGlobalPopUp] = useState({})
    let [newStock,setNewStock] = useState(false)
    let [assignStockRole,setAssignStockRole] = useState(false)
    let [updatePopUp,setUpdatePopUp] = useState(false)
    
    let [allUsersData,setAllUsersData] = useState([])

    const navigate = useNavigate()

    const authData = useContext(StateContext)
    const dispatch = useContext(DispatchContext)

    let getUsersData = useCallback(()=>{
        console.log("userssssssssssssssssssssssssssssssssssssssssssssssssssssssssss")
        axios({
            method: 'POST',
            url: 'http://localhost/soft-lab-api/route/services/users-data.php',
            headers: {
                'Content-type': 'application/json; charset=utf-8',
                'Authorization': authData.JWT, 
              }
          }).then((res)=>{
            console.log("active users 11111111",res)
            if(res.data.length !== undefined){
                console.log(res.data) 
                setAllUsersData(res.data.filter((data)=>data.r_id!=="1"))
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
        getUsersData()
    },[getUsersData])

  return (
    <div className='users'>
        {globalPopUp.id === 1? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null}
        {globalPopUp.id === 2? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null} 
        {globalPopUp.id === 3? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null}
        {globalPopUp.id === 4? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null}
      <section>
        <div className="top-container">
            <h1>Users</h1>
            <button onClick={()=>setNewStock(true)}>Add New Stock</button>
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
                                
                                <th>Status</th>
                                <th>Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allUsersData.map((data)=>{
                                    return(
                                        <tr key={data.id}>
                                            <td> {data.name}</td>
                                            <td> {data.email}</td>
                                            <td>{data.phone}</td>
                                            <td> {data.join_date}</td>
                                            
                                            {<Action 
                                                status={data.status==="1"?"Reject":"Assign"} 
                                                id={data.id} 
                                                getUsersData={getUsersData} 
                                                setGlobalPopUp={setGlobalPopUp}
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
                        <tr>
                            <td>TEQIP-01</td>
                        </tr>
                        <tr>
                            <td>TEQIP-02</td>
                        </tr>
                        <tr>
                            <td>TEQIP-03</td>
                        </tr>
                        <tr>
                            <td>TEQIP-04</td>
                        </tr>
                    </tbody>
                </table>
                {newStock && <AddStock setNewStock={setNewStock} />}
                {assignStockRole && <AssignStockRole setAssignStockRole={setAssignStockRole} />}
            </div>
            <div className='container-3-control'>
                <h2>Stock Handling Users</h2>
                <button onClick={()=>setAssignStockRole(true)}>Assign Stock & Role to User</button>
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
                            <tr>
                                <td> soft lab</td>
                                <td> softlab@gmail.com</td>
                                <td>TEQP-01</td>
                                <td> Manager</td>
                                <td><button onClick={()=>setUpdatePopUp(true)}>Update</button></td>
                            </tr>
                            <tr>
                                <td> soft lab</td>
                                <td> softlab@gmail.com</td>
                                <td>TEQP-02</td>
                                <td> Assistent</td>
                                <td><button onClick={()=>setUpdatePopUp(true)}>Update</button></td>
                            </tr>
                            <tr>
                                <td> soft lab</td>
                                <td> softlab@gmail.com</td>
                                <td>TEQP-03</td>
                                <td> Assistent</td>
                                <td><button onClick={()=>setUpdatePopUp(true)}>Update</button></td>
                            </tr>
                            <tr>
                                <td> soft lab</td>
                                <td> softlab@gmail.com</td>
                                <td>TEQP-04</td>
                                <td> Assistent</td>
                                <td><button onClick={()=>setUpdatePopUp(true)}>Update</button></td>
                                {updatePopUp && <UpdatePopUp setUpdatePopUp={setUpdatePopUp} />}
                            </tr>
                            
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
      </section>
    </div>
  )
}

export default Users
