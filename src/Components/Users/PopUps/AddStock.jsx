import React, { useContext, useState } from 'react'
import './AddStock.css'
import { DispatchContext, StateContext } from '../../AuthProvider/AuthProvider'
import axios from "axios";
import GlobalPopUp from "../../GlobalPopUp/GlobalPopUp.jsx";
import { useNavigate } from "react-router-dom";

function AddRoleStock(props) {
  let [error, setError] = useState('')
  let [value, setValue] = useState('')
  const [globalPopUp, setGlobalPopUp] = useState({})

  const authData = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  const navigate = useNavigate()

  function getDate() {
    const today = new Date();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let date = today.getDate();
    date = date < 10 ? `0${date}` : date
    month = month < 10 ? `0${month}` : month
    return `${year}-${month}-${date}`;
  }
  function getTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    return `${h}:${m}`;
  }

  function checkStockName(e) {
    setValue(e.target.value)
    setError('')
    value.length < 4 && setError('This field must contain 4 characters')
    props.data.forEach(element => {
      return element.name.toUpperCase() === e.target.value.toUpperCase() && setError(`${e.target.value} already taken, Please enter unique value`)
    });
  }
  function onSubmit() {
    if (value.length !== 0) {
      axios({
        method: 'POST',
        url: 'http://localhost:4000/stock',
        headers: {
          'Content-type': 'application/json; charset=utf-8',
        },
        withCredentials: true,
        data: { stockName: value, date: getDate(), time: getTime() }
      }).then((res) => {
        console.log("status of insertion 333333333333", res)
        if (res.status === 200) {
          props.setGlobalPopUp({ id: 1, header: 'SUCCESS', message: 'Stock successfully added' })
          props.getStockData()
          props.setNewStock(false)
        }
        //   if(res.data.statuscode === 200){
        //     props.setGlobalPopUp({id:1,header:'SUCCESS',message:'Stock successfully added'})
        //     props.getStockData()
        //     props.setNewStock(false)
        //   }else if(res.data.statuscode === 401){ //token expired
        //       localStorage.removeItem('token')
        //       dispatch({type:'auth_logout'})
        //       navigate('/login',{replace:true})
        //       //setGlobalPopUp({id:3,header:'Token Expired',message:'You need to login again.'})
        //   }else if(res.data.statuscode === 400){
        //       setGlobalPopUp({id:3,header:'Bad request',message:'please check your request'})
        //   }else if(res.data.statuscode === 500){
        //       setGlobalPopUp({id:4,header:'Oops',message:'Internal server error'})
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
    } else {
      setError('This field required')
    }
  }


  return (
    <>
      <div className='add-role-popup'>
        {globalPopUp.id === 1 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
        {globalPopUp.id === 2 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
        {globalPopUp.id === 3 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
        {globalPopUp.id === 4 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
        <div className='content '>
          <div className="top-section">
            <h3>New Stock</h3>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick={() => props.setNewStock(false)}>
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="data-section">
            <div>
              <input type="text" placeholder='Enter the Stock Name' onChange={(e) => checkStockName(e)} />
            </div>
            <p>{error}</p>
            {
              error.length === 0 && <input type="button" value="ADD" onClick={() => onSubmit()} />
            }
          </div>
        </div>
        {/*<h2 onClick={()=>props.setPopUpActive(false)}>POPup</h2>*/}
      </div>
    </>
  )
}

export default AddRoleStock
