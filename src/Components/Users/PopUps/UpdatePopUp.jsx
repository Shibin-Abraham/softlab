import React, { useContext, useEffect, useState } from 'react'
import './UpdatePopUp.css'
import { DispatchContext, StateContext } from '../../AuthProvider/AuthProvider'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function UpdatePopUp(props) {
  let [updateStock, setUpdateStock] = useState('')
  let [updateRole, setUpdateRole] = useState('')

  const authData = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  const navigate = useNavigate()

  let [error1, setError1] = useState('')
  let [error2, setError2] = useState('')

  let onSubmit = () => {
    if (updateStock !== '') {
      if (updateRole !== '') {
        updateStockHandlingData()
      }
    } else {
      setError1('Please select any option')
    }
  }

  let updateStockHandlingData = () => {
    axios({
      method: 'PUT',
      url: 'http://localhost:4000/stock/handling-data/update',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
      },
      withCredentials: true,
      data: { id: props.stockInHandRowData.id, u_id: props.stockInHandRowData.u_id, s_id: updateStock, role: updateRole }
    }).then((res) => {
      console.log("status code assign stock to user", res)
      if (res.status === 200) {
        props.getStockHandlingUsers()
        props.setGlobalPopUp({ id: 2, header: 'Updated', message: 'Data successfully updated.' })
        props.setUpdatePopUp(false)
        //props.setAssignStockRole(false)
      }
      // if(res.data.statuscode === 200){
      //   props.getStockHandlingUsers()
      //   props.setGlobalPopUp({id:2,header:'Updated',message:'Data successfully updated.'})
      //   props.setUpdatePopUp(false)
      //   //props.setAssignStockRole(false)
      // }else if(res.data.statuscode === 403){
      //   setError1('This user already take same stock')
      // }else if(res.data.statuscode === 401){ //token expired
      //     localStorage.removeItem('token')
      //     dispatch({type:'auth_logout'})
      //     navigate('/login',{replace:true})
      //     //setGlobalPopUp({id:3,header:'Token Expired',message:'You need to login again.'})
      // }else if(res.data.statuscode === 400){
      //     props.setGlobalPopUp({id:3,header:'Bad request',message:'please check your request'})
      // }else if(res.data.statuscode === 500){
      //     props.setGlobalPopUp({id:4,header:'Oops',message:'Internal server error'})
      // }
    }).catch((err) => {
      console.log(err)
      //props.setGlobalPopUp({id:4,header:`${err.message}!`,message:`${err.message}! please check your network`})
      if (err.response?.status === 401) {
        props.setGlobalPopUp({ id: 3, header: `${err.response?.status} ${err.response?.data.error}!`, message: `${err.response?.data.error} You need to Login again` })
        dispatch({ type: 'auth_logout' })
        navigate('/login', { replace: true })
      } else if (err.response.status === 409) {
        setError1('This user already take same stock')
      } else {
        props.setGlobalPopUp({ id: 4, header: `${err.response?.status} ${err.response?.data.error}!`, message: `${err.response?.data.error}` })
      }
    })
  }

  useEffect(() => {
    setUpdateRole(props.stockInHandRowData.role)
  }, [props.stockInHandRowData.role])

  return (
    <div className='popup'>
      <div className='content '>
        <div className="top-section">
          <h3>User Details</h3>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick={() => props.setUpdatePopUp(false)}>
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="data-section">
          <div>
            <p>{props.stockInHandRowData.name}</p>
          </div>
          <div>
            <p>{props.stockInHandRowData.email}</p>
          </div>
          <select defaultValue={props.stockInHandRowData.s_id} onClick={(e) => {
            setError1('')
            setUpdateStock(e.currentTarget.value)
          }}>
            {
              props.allStockData.map((data, index) => {
                return (props.stockInHandRowData.stockInHand[index] === data.name ? <option key={data.id} value={data.id}>{data.name}</option> : <option key={data.id} value={data.id}>{data.name}</option>)
              })
            }
          </select>
          <span>{error1}</span>
          <div>
            <input type='text' placeholder='Enter the Role' onChange={(e) => {
              setError2(e.target.value.length < 4 && 'This field must contaion 4 characters')
              setUpdateRole(e.target.value)
            }} defaultValue={props.stockInHandRowData.role} />
          </div>
          <span>{error2}</span>
          <input type="button" value="Update" onClick={() => onSubmit()} />

        </div>
      </div>
      {/*<h2 onClick={()=>props.setPopUpActive(false)}>POPup</h2>*/}
    </div>
  )
}

export default UpdatePopUp
