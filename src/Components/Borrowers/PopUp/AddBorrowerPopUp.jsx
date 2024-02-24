import React,{useState,useEffect} from 'react'
import './AddBorrowerPopUp.css'
import { useForm } from 'react-hook-form'

function AddBorrowerPopUp(props) {
  let [popUpActive,setPopUpActive] = useState('')
    useEffect(()=>{
        setTimeout(()=>setPopUpActive('popup-active'),1)
    },[])

    const {register, handleSubmit ,formState:{errors}} = useForm();
    const onSubmit = (data)=>{
        if(data){//data submited then close the AddStockPopUo and show the success message
            setPopUpActive('')//close AddStockPopUp 
            props.setGlobalPopUp({id:1,header:'SUCCESS',message:'Data has been saved successfully'}) // show the success message
            setTimeout(()=>{props.setAddBorrowerPopUp(false)},300)
        }else{
            props.setGlobalPopUp(4)
        }
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
                <select name="" id="">
                    <option value="">CSE</option>
                    <option value="">IT</option>
                    <option value="">EC</option>
                    <option value="">EEE</option>
                    <option value="">ME</option>
                </select>
                <span>
    
                </span>
            </div>
            <div className='input'>
                <p> Semester</p>
                <select name="" id="">
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                    <option value="">4</option>
                    <option value="">5</option>
                    <option value="">6</option>
                    <option value="">7</option>
                    <option value="">8</option>
                </select>
                <span>
    
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
                <p> Borrowed Date</p>
                <input type='text' {...register("bdate",{required:true,pattern:/^[0-9]{2}[-]{1}[0-9]{2}[-]{1}[0-9]{4}$/g})} placeholder='dd-mm-yyyy'/>
                <span>
                    {errors.bdate?.type ==="required"&& "Warranty Date Required"}
                    {errors.bdate?.type ==="pattern"&& "DD-MM-YYYY"}
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
