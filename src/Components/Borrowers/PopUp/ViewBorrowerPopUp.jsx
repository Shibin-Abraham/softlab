import React from 'react'
import './ViewBorrowerPopUp.css'
import { useForm } from 'react-hook-form'

function ViewBorrowerPopUp(props) {
    const {register, handleSubmit ,formState:{errors}} = useForm();
    const onSubmit = (data)=>{
        if(data){
            props.setViewBorrowerPopUp(false)
            props.setGlobalPopUp({id:1,header:'Updated',message:'Data has been updated'})
        }
    }
  return (
    <div className='borrower-view-popup'>
      <div className="content">
        <div className="top-section">
            <h2>Borrower Details</h2>
            <svg onClick={()=>props.setViewBorrowerPopUp(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
            </svg>
        </div>
        <div className="data-section">
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className='input'>
                <p> Name</p>
                <input type='text' {...register("bname",{required:true,minLength:1,maxLength:10})}/>
                <span>
                    {errors.bname?.type ==="minLength"&& "Name must contain 1 character"}
                    {errors.bname?.type ==="maxLength"&& "Name No must be less than 10 length "}
                    {errors.bname?.type ==="required"&& "Name No Required"}
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
                <input type='text' {...register("branch",{required:true,minLength:1,maxLength:10})}/>
                <span>
                    {errors.branch?.type ==="minLength"&& "item No must contain 1 character or number"}
                    {errors.branch?.type ==="maxLength"&& "item No must be less than 10 length "}
                    {errors.branch?.type ==="required"&& "item No Required"}
                </span>
            </div>
            <div className='input'>
                <p> Semester</p>
                <input type='text' {...register("semester",{required:true,minLength:1,maxLength:10})}/>
                <span>
                    {errors.semester?.type ==="minLength"&& "item No must contain 1 character or number"}
                    {errors.semester?.type ==="maxLength"&& "item No must be less than 10 length "}
                    {errors.semester?.type ==="required"&& "item No Required"}
                </span>
            </div>
            <div className='input'>
                <p> Item No</p>
                <input type='text' {...register("itemno",{required:true,minLength:1,maxLength:10})}/>
                <span>
                    {errors.itemno?.type ==="minLength"&& "item No must contain 1 character or number"}
                    {errors.itemno?.type ==="maxLength"&& "item No must be less than 10 length "}
                    {errors.itemno?.type ==="required"&& "item No Required"}
                </span>
            </div>
            <div className='input'>
                <p> Phone number</p>
                <input type='text' {...register("phone",{required:true,maxLength:10,pattern:/^[0-9]{10}$/g})}/>
                <span>
                    {errors.phone?.type ==="required"&& "Phone Number Required"}
                    {errors.phone?.type ==="pattern"&& "This field must contain 10 numbers"}
                    {errors.phone?.type ==="maxLength"&& "This field must be less than 11 length"}
                </span>
            </div>
            <div className='input'>
                <p> Lent On</p>
                <input type='text' {...register("bdate",{required:true,pattern:/^[0-9]{2}[-]{1}[0-9]{2}[-]{1}[0-9]{4}$/g})} placeholder='dd-mm-yyyy'/>
                <span>
                    {errors.bdate?.type ==="required"&& "Warranty Date Required"}
                    {errors.bdate?.type ==="pattern"&& "DD-MM-YYYY"}
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
