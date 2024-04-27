import React, { useContext } from 'react'
import './ViewBorrowerPopUp.css'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { DispatchContext, StateContext } from '../../AuthProvider/AuthProvider';
import axios from 'axios';

function ViewBorrowerPopUp(props) {
    console.log(props)
    const {register, handleSubmit ,formState:{errors}} = useForm();

    let navigate = useNavigate()

    const authData = useContext(StateContext)
    const dispatch = useContext(DispatchContext)

    const onSubmit = (data)=>{
        if(data){
            console.log(data)
            axios({
                method: 'POST',
                url: 'http://localhost/soft-lab-api/route/services/update-borrower-data.php',
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                    'Authorization': authData.JWT, 
                  },
                data: {...data,bId: props.borrowerRowData.bId,date: getDate(),time: getTime()}
              }).then((res)=>{
                console.log("status of return 333333333333",res)
                if(res.data.statuscode === 200){
                    props.getBorrowersData()
                    props.setViewBorrowerPopUp(false)
                    props.setGlobalPopUp({id:1,header:'Updated',message:'Data has been updated'})
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
    <div className='borrower-view-popup'>
      <div className="content">
        <div className="top-section">
            <h2>Borrower Details <p>{props.borrowerRowData.sName}</p></h2>
            <svg onClick={()=>props.setViewBorrowerPopUp(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
            </svg>
        </div>
        <div className="data-section">
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className='input'>
                <p> Name</p>
                <input type='text' {...register("bname",{required:true,minLength:1,maxLength:10})} value={props.borrowerRowData.bName}/>
                <span>
                    {errors.bname?.type ==="minLength"&& "Name must contain 1 character"}
                    {errors.bname?.type ==="maxLength"&& "Name No must be less than 10 length "}
                    {errors.bname?.type ==="required"&& "Name No Required"}
                </span>
            </div>
            <div className='input'>
                <p> Admission No</p>
                <input type='text' {...register("admissionno",{required:true,maxLength:4,pattern:/^[0-9]{4}$/g})} value={props.borrowerRowData.admno}/>
                <span>
                    {errors.admissionno?.type ==="pattern"&& "This field must be number"}
                    {errors.admissionno?.type ==="maxLength"&& " This field must be less than 5 length "}
                    {errors.admissionno?.type ==="required"&& "Admmission No Required"}
                </span>
            </div>
            <div className='input'>
                <p> Branch</p>
                <input type='text' {...register("branch",{required:true,minLength:1,maxLength:10})} value={props.borrowerRowData.branch}/>
                <span>
                    {errors.branch?.type ==="minLength"&& "item No must contain 1 character or number"}
                    {errors.branch?.type ==="maxLength"&& "item No must be less than 10 length "}
                    {errors.branch?.type ==="required"&& "item No Required"}
                </span>
            </div>
            <div className='input'>
                <p> Semester</p>
                <input type='text' {...register("semester",{required:true,minLength:1,maxLength:10})} value={props.borrowerRowData.sem} />
                <span>
                    {errors.semester?.type ==="minLength"&& "item No must contain 1 character or number"}
                    {errors.semester?.type ==="maxLength"&& "item No must be less than 10 length "}
                    {errors.semester?.type ==="required"&& "item No Required"}
                </span>
            </div>
            <div className='input'>
                <p> Item</p>
                <input type='text' {...register("itemno",{required:true,minLength:1,maxLength:10})} value={props.borrowerRowData.name}/>
                <span>
                    {errors.itemno?.type ==="minLength"&& "item No must contain 1 character or number"}
                    {errors.itemno?.type ==="maxLength"&& "item No must be less than 10 length "}
                    {errors.itemno?.type ==="required"&& "item No Required"}
                </span>
            </div>
            <div className='input'>
                <p> Phone number</p>
                <input type='text' {...register("phone",{required:true,maxLength:10,pattern:/^[0-9]{10}$/g})} value={props.borrowerRowData.phone}/>
                <span>
                    {errors.phone?.type ==="required"&& "Phone Number Required"}
                    {errors.phone?.type ==="pattern"&& "This field must contain 10 numbers"}
                    {errors.phone?.type ==="maxLength"&& "This field must be less than 11 length"}
                </span>
            </div>
            <div className='input'>
                <p> Lent On</p>
                <input type='text' {...register("bdate",{required:true,pattern:/^[0-9]{4}[-]{1}[0-9]{2}[-]{1}[0-9]{2}$/g})} placeholder='yyyy-mm-dd' value={props.borrowerRowData.date}/>
                <span>
                    {errors.bdate?.type ==="required"&& "Warranty Date Required"}
                    {errors.bdate?.type ==="pattern"&& "YYYY-MM-DD"}
                </span>
            </div>
                <div className="btn">
                
                <input type="submit" value="Returned" onClick={()=>props.setGlobalPopUp({id:2,header:'Success',message:'Borrower successfully returned Item'})}/>
                    
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default ViewBorrowerPopUp
