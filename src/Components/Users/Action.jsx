import React,{useContext, useEffect, useState} from 'react'
import DeletePopUp from './PopUps/DeletePopUp'
import { StateContext } from '../AuthProvider/AuthProvider'
import axios from "axios";

function Action(props) {
    let [deletePopUp,setDeletePopUp] = useState(false)
    let [userState,setUserState] = useState('')//props needed here !!!!!!!!!!!!
    let [status,setStatus] = useState('')

    const authData = useContext(StateContext)
    
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
        props.getUsersData()
        /*setUserState((previous)=>{
            previous==='Assign'?setStatus('Active'):setStatus('Pending')
            return previous==='Assign'?'Reject':'Assign'
        })*/
        /*setUserState((previous)=>{
            previous==='Assign'?setStatus('Active'):setStatus('Pending')
            return previous==='Assign'?'Reject':'Assign'
        })*/
        /*if(res.data.length !== undefined){
            console.log(res.data) 
            setRecentActivityData(res.data.sort((a,b)=>b.id - a.id)) //sort by decending order for show latest data
        }else if(res.data.statuscode === 401){ //token expired
            localStorage.removeItem('token')
            dispatch({type:'auth_logout'})
            navigate('/login',{replace:true})
            //setGlobalPopUp({id:3,header:'Token Expired',message:'You need to login again.'})
        }else if(res.data.statuscode === 400){
            setGlobalPopUp({id:3,header:'Bad request',message:'please check your request'})
        }*/
      }).catch((err)=>{
        console.log(err)
        //setGlobalPopUp({id:4,header:`${err.message}!`,message:`${err.message}! please check your network`})
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
    </td>
    {deletePopUp && <DeletePopUp setDeletePopUp={setDeletePopUp} />}
    </>
  )
}

export default Action
