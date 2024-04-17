import React, { useContext, useEffect, useState } from 'react'
import './AddBrand.css'
import { useNavigate } from 'react-router-dom'
import { DispatchContext, StateContext } from '../../AuthProvider/AuthProvider'
import axios from 'axios'

function AddBrand(props) {

    let [popUpActive,setPopUpActive] = useState('')
    let [value,setValue] = useState('')
    let [error,setError] = useState('')

    let navigate = useNavigate()

    const authData = useContext(StateContext)
    const dispatch = useContext(DispatchContext)

    function getDate() {
        const today = new Date();
        let month = today.getMonth() + 1;
        let year = today.getFullYear();
        let date = today.getDate();
        date = date<10?`0${date}`:date
        month = month<10?`0${month}`:month
        return `${year}-${month}-${date}`;
      }
      function getTime() {
        const today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        return `${h}:${m}`;
      }

    function checkBrandName(e){
        setValue(e.target.value)
        setError('')
        value.length<1&&setError('This field must contain 1 characters')
        props.brandData.forEach(element => {
          return element.b_name.toUpperCase() === e.target.value.toUpperCase()&&setError(`'${e.target.value}' already exist, Please enter different brand`)
        });
      }

      function onSubmit(){
        if(value.length!==0){
          axios({
            method: 'POST',
            url: 'http://localhost/soft-lab-api/route/services/insert-brand-name.php',
            headers: {
                'Content-type': 'application/json; charset=utf-8',
                'Authorization': authData.JWT, 
              },
            data: {b_name: value,date: getDate(),time: getTime()}
          }).then((res)=>{
            console.log("status of insertion 333333333333",res)
            if(res.data.statuscode === 200){
                props.getBrandData()
                props.setGlobalPopUp({id:1,header:'SUCCESS',message:'Brand successfully added'})
                setPopUpActive('')
                    setTimeout(()=>{
                        props.setAddBrandPopUp(false)
                    },300)
              //props.getBrandData(false)
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
        }else{
          setError('This field required')
        }
      }

    useEffect(()=>{
        setTimeout(()=>setPopUpActive('popup-active'),1)
    },[])
  return (
    <>
        <div className='add-brand-popup'>
            <div className={`content ${popUpActive}`}>
                <div className="top-section">
                <h3>Add Brand</h3>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick={()=>{
                    setPopUpActive('')
                    setTimeout(()=>{
                        props.setAddBrandPopUp(false)
                    },300)
                }}>
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                </svg>
                </div>
                <div className="data-section">
                <div>
                    <input type="text" placeholder='Enter the Brand Name' onChange={(e)=>checkBrandName(e)}/>
                    {//
                    }
                </div>
                <p>{error}</p>
                {
                   error.length===0&&<input type="button" value="ADD" onClick={()=>onSubmit()} />//onClick={()=>onSubmit()}
                
                }
                </div>
            </div>
      {/*<h2 onClick={()=>props.setPopUpActive(false)}>POPup</h2>*/}
    </div>
    </>
  )
}

export default AddBrand
