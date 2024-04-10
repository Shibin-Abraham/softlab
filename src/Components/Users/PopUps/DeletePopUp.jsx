import React from 'react'
import './DeletePopUp.css'
import {useNavigate} from "react-router-dom"
import { useContext } from 'react'
import { DispatchContext, StateContext } from '../../AuthProvider/AuthProvider'
import axios from "axios";

function DeletePopUp(props) {

  const navigate = useNavigate()

  const dispatch = useContext(DispatchContext)
  const authData = useContext(StateContext)

  function setArchiveUser(){
    axios({
      method: 'POST',
      url: 'http://localhost/soft-lab-api/route/services/set-archive-user.php',
      headers: {
          'Content-type': 'application/json; charset=utf-8',
          'Authorization': authData.JWT, 
        },
      data: {u_id: props.id}
    }).then((res)=>{
      console.log("archive user",res)
      if(res.data.statuscode === 200){
        console.log("archive userrrrrrrrrrr",res.data)
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
  
  return (
    <>
    <div className='delete-popup'>
      <div className="content">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
      </svg>

        <p>Are you sure you want to Archive? </p>
        <div className='btn'>
            <button id='cancel' onClick={()=>props.setDeletePopUp(false)}>Cancel</button>
            <button id='delete' onClick={()=>setArchiveUser()}>Yes</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default DeletePopUp
