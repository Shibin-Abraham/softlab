import React, { useContext, useState } from 'react'
import './AssignStockRole.css'
import GlobalPopUp from "../../GlobalPopUp/GlobalPopUp.jsx";
import { DispatchContext, StateContext } from '../../AuthProvider/AuthProvider.jsx'
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AssignStockRole(props) {
  const [globalPopUp,setGlobalPopUp] = useState({})
  let [name,setName] = useState('')
  let [nameId,setNameId] = useState('')
  let [stockId,setStockId] = useState('')
  let [roleName,setRoleName] = useState('')
  let [error1,setError1] = useState('')
  let [error2,setError2] = useState('')
  let [error3,setError3] = useState('')

  const authData = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  const navigate = useNavigate()

  let checkName = (id)=>{
    setError1('')
    setNameId(id)
    setName(props.allUsersData.map((d)=>{
      return String(d.id) === String(id)?d.name:null
    }))
  }

  let onSubmit = ()=>{
    if(nameId!==''){
      if(stockId!==''){
        if(roleName!==''){
          apiCall()
        }else{
          setError3('This field required')
        }
      }else{
        setError2('Please select any option')
      }
    }else{
      setError1('Please select any option')
    }
  }

  let apiCall = ()=>{
    axios({
      method: 'POST',
      url: 'http://localhost/soft-lab-api/route/services/assign-stock-to-user.php',
      headers: {
          'Content-type': 'application/json; charset=utf-8',
          'Authorization': authData.JWT, 
        },
      data: {u_id: nameId,s_id: stockId,role: roleName}
    }).then((res)=>{
      console.log("status code assign stock to user",res)
      if(res.data.statuscode === 200){
        props.getStockHandlingUsers()
        props.setAssignStockRole(false)
      }else if(res.data.statuscode === 401){ //token expired
          localStorage.removeItem('token')
          dispatch({type:'auth_logout'})
          navigate('/login',{replace:true})
          //setGlobalPopUp({id:3,header:'Token Expired',message:'You need to login again.'})
      }else if(res.data.statuscode === 403){
        setGlobalPopUp({id:4,header:'This user already take this stock',message:''})
        setError2('This user already take this stock, pleace select different stock')
      }else if(res.data.statuscode === 400){
          setGlobalPopUp({id:3,header:'Bad request',message:'please check your request'})
      }else if(res.data.statuscode === 500){
          setGlobalPopUp({id:4,header:'Oops',message:'Internal server error'})
      }
      }).catch((err)=>{
        console.log(err)
        setGlobalPopUp({id:4,header:`${err.message}!`,message:`${err.message}! please check your network`})
      })
  }

  return (
    <>
        <div className='assign-stock-role-popup'>
        {globalPopUp.id === 1? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null}
        {globalPopUp.id === 2? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null} 
        {globalPopUp.id === 3? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null}
        {globalPopUp.id === 4? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null}
        <div className='content '>
            <div className="top-section">
              <h3>Assign Stock & Role</h3>
      
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick={()=>props.setAssignStockRole(false)}>
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
            </svg>
            </div>
            <div className="data-section">
                <div>
                    <p>{name}</p>
                </div>
                <select onClick={(e)=>{checkName(e.currentTarget.value)}}>
                  {
                    props.allUsersData.map((data)=>{
                      return data.status === '1'?<option key={data.id} value={data.id}>{data.email}</option>:null
                    })
                  }
              </select>
              <span>{error1}</span>
              <select onClick={(e)=>{
                setError2('')
                  setStockId(e.currentTarget.value)
                  }}>
                {
                  props.allStockData.map((data)=>{
                    let stock_name = data.name.toLowerCase()
                    return(
                      <option key={data.id} value={data.id}>{stock_name}</option>
                    )
                  })
                }
              </select>
              <span>{error2}</span>
                <div>
                    <input type="text" placeholder='Enter the Role' 
                      onChange={(e)=>{
                        setError3(e.target.value.length<4&&'This field must contaion 4 characters')
                        setRoleName(e.target.value)
                      }} 
                    />
                </div>
                <span>{error3}</span>
                      
                    <input type="button" value="Submit" onClick={()=>onSubmit()}/>
            </div>
        </div>
      {/*<h2 onClick={()=>props.setPopUpActive(false)}>POPup</h2>*/}
    </div>
    </>
  )
}

export default AssignStockRole
