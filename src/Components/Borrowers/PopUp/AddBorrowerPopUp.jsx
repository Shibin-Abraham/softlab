import React,{useState,useEffect, useContext} from 'react'
import './AddBorrowerPopUp.css'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { DispatchContext, StateContext } from '../../AuthProvider/AuthProvider'
import axios from 'axios'

function AddBorrowerPopUp(props) {
    console.log(props)
    let [popUpActive,setPopUpActive] = useState('')
    let [error,setError] = useState([])

    let navigate = useNavigate()

    const authData = useContext(StateContext)
    const dispatch = useContext(DispatchContext)

    useEffect(()=>{
        setTimeout(()=>setPopUpActive('popup-active'),1)
    },[])

    const {register, handleSubmit ,formState:{errors}} = useForm();
    const onSubmit = (data)=>{
        if(data){
            if(error.length===0){
                console.log(data)
                axios({
                    method: 'POST',
                    url: 'http://localhost/soft-lab-api/route/services/add-borrower.php',
                    headers: {
                        'Content-type': 'application/json; charset=utf-8',
                        'Authorization': authData.JWT, 
                      },
                    data: {...data,date: getDate(),time: getTime()}
                  }).then((res)=>{
                    console.log("status of insertion 333333333333",res)
                    if(res.data.statuscode === 200){
                        props.getBorrowersData()
                        setPopUpActive('')//close AddStockPopUp 
                        props.setGlobalPopUp({id:1,header:'SUCCESS',message:'Data has been saved successfully'}) // show the success message
                        setTimeout(()=>{props.setAddBorrowerPopUp(false)},300)
                        
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
                props.setGlobalPopUp({id:4,header:'Item Already Borrowed',message:'Please select any other items.'})
            }
            
            //data submited then close the AddStockPopUo and show the success message
            
        }else{
            props.setGlobalPopUp(4)
        }
    }

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
  return (
    <div className='add-borrower-popup'>
      <div className={`content ${popUpActive}`}>
        <div className="top">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick={()=>{
                setPopUpActive('')
                setTimeout(()=>{
                    props.setAddBorrowerPopUp(false)},300)
                }}>
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z" clipRule="evenodd" />
            </svg>
            <h2>Add Borrower</h2>
        </div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className='input'>
                <p> Name</p>
                <input type='text' {...register("bname",{required:true,minLength:1,maxLength:10})} placeholder='Borrower name'/>
                <span>
                    {errors.bname?.type ==="minLength"&& "Name must contain 1 character"}
                    {errors.bname?.type ==="maxLength"&& "Name No must be less than 10 length "}
                    {errors.bname?.type ==="required"&& "Name Required"}
                </span>
            </div>
            <div className='input'>
                <p> Admission No</p>
                <input type='text' {...register("admissionno",{required:true,maxLength:4,pattern:/^[0-9]{4}$/g})}/>
                <span>
                    {errors.admissionno?.type ==="pattern"&& "This field must be number"}
                    {errors.admissionno?.type ==="maxLength"&& " This field must be less than 5 length "}
                    {errors.admissionno?.type ==="required"&& "Admmission No Required"}
                </span>
            </div>
            <div className='input'>
                <p> Branch</p>
                <select {...register("branch",{required:true})}>
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="EC">EC</option>
                    <option value="EEE">EEE</option>
                    <option value="ME">MECH</option>
                </select>
                <span>
    
                </span>
            </div>
            <div className='input'>
                <p> Semester</p>
                <select {...register("semester",{required:true})}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                </select>
                <span>
    
                </span>
            </div>
            <div className='input'>
                <p> Item</p>
                <select {...register("itemno",{required:true})} onClick={(e)=>{
                    setError(props.borrowersData.filter((data)=>data.item_id===e.currentTarget.value&&data.return_status==='0'))
                }}>
                    <option value=''>Select</option>
                    {
                        props.itemsData.length!==0?props.itemsData.map((data)=>{
                            return(
                                <option key={data.id} value={data.id}>{data.name}</option>
                            )
                        }):<option> No data</option>
                    }
                </select>
                <span>
                    {errors.itemno?.type ==="required"&& "Please select any option"}
                    {error.map((data)=>data.name+' alredy taken please select other items')}
                </span>
            </div>
            <div className='input'>
                <p> Phone number</p>
                <input type='text' {...register("phone",{required:true,maxLength:10,pattern:/^[0-9]{10}$/g})} placeholder='Borrower phone number'/>
                <span>
                    {errors.phone?.type ==="required"&& "Phone Number Required"}
                    {errors.phone?.type ==="pattern"&& "This field must contain 10 numbers"}
                    {errors.phone?.type ==="maxLength"&& "This field must be less than 11 length"}
                </span>
            </div>
            <div className='input'>
                <p> Borrowed Date</p>
                <input type='text' {...register("bdate",{required:true,pattern:/^[0-9]{4}[-]{1}[0-9]{2}[-]{1}[0-9]{2}$/g})} placeholder='yyyy-mm-dd'/>
                <span>
                    {errors.bdate?.type ==="required"&& "Warranty Date Required"}
                    {errors.bdate?.type ==="pattern"&& "YYYY-MM-DD"}
                </span>
            </div>
            
            <div className="btn">
                <input type="submit" value="Submit" />
            </div>
            </form>
      </div>
    </div>
  )
}

export default AddBorrowerPopUp
