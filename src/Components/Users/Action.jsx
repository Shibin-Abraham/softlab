import React,{useContext, useEffect, useState} from 'react'
import DeletePopUp from './PopUps/DeletePopUp'
import { DispatchContext, StateContext } from '../AuthProvider/AuthProvider'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Action(props) {
    let [deletePopUp,setDeletePopUp] = useState(false)
    let [userState,setUserState] = useState('')//props needed here !!!!!!!!!!!!
    let [status,setStatus] = useState('')

    const authData = useContext(StateContext)
    const navigate = useNavigate()

    const dispatch = useContext(DispatchContext)

    function assignUser(){
      axios({
        method: 'POST',
        url: 'http://localhost/soft-lab-api/route/services/access-controller.php',
        headers: {
            'Content-type': 'application/json; charset=utf-8',
            'Authorization': authData.JWT, 
          },
        data: {u_id: props.id,status: props.status}
      }).then((res)=>{
        console.log("onclick resulttttttttttttttttttttttttttt",res)
        if(res.data.statuscode === 200){
          props.getUsersData()
        }else if(res.data.statuscode === 401){ //token expired
            localStorage.removeItem('token')
            dispatch({type:'auth_logout'})
            navigate('/login',{replace:true})
            //setGlobalPopUp({id:3,header:'Token Expired',message:'You need to login again.'})
        }else if(res.data.statuscode === 400){
            props.setGlobalPopUp({id:3,header:'Bad request',message:'please check your request'})
        }else if(res.data.statuscode === 500){
          props.setGlobalPopUp({id:4,header:'Oops',message:'Internal server error'})
      }
      }).catch((err)=>{
        console.log(err)
        props.setGlobalPopUp({id:4,header:`${err.message}!`,message:`${err.message}! please check your network`})
      })
        
    }

    useEffect(()=>{
      setUserState(props.status)
      setStatus(userState==='Assign'?'Pending':'Active')
    },[props.status,userState])

  return (
    <>
    <td style={status==='Active'?{color: "#41f1b6"}:{color: "#ff7782"}}>{status}</td>
    <td>
        <button onClick={()=>assignUser()}>{userState}</button>
        <button onClick={()=>setDeletePopUp(true)}>archive</button>
        {deletePopUp && <DeletePopUp setDeletePopUp={setDeletePopUp} id={props.id} getUsersData={props.getUsersData} setGlobalPopUp={props.setGlobalPopUp} getStockData={props.getStockData} getStockHandlingUsers={props.getStockHandlingUsers} />}
    </td>
    
    </>
  )
}

export default Action
