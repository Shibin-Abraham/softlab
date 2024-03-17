import React,{useEffect,useState} from 'react'
import './AddStockPopUp.css'
import { useForm } from 'react-hook-form'

function AddStockPopUp(props) {
    let [popUpActive,setPopUpActive] = useState('')
    useEffect(()=>{
        setTimeout(()=>setPopUpActive('popup-active'),1)
    },[])

    const {register, handleSubmit ,formState:{errors}} = useForm();
    const onSubmit = (data)=>{
        if(data){//data submited then close the AddStockPopUo and show the success message
            setPopUpActive('')//close AddStockPopUp 
            props.setGlobalPopUp({id:1,header:'SUCCESS',message:'Data has been saved successfully'}) // show the success message
            setTimeout(()=>{props.setStockPopUp(false)},300)
        }else{
            props.setGlobalPopUp(4)
        }
    }

  return (
    <div className='stock-popup'>
      <div className={`content ${popUpActive}`}>
        <div className="top">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick={()=>{
                setPopUpActive('')
                setTimeout(()=>{
                    props.setStockPopUp(false)},300)
                }}>
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z" clipRule="evenodd" />
            </svg>
            <h2>Add Stock Details</h2>
        </div>
            <form onSubmit={handleSubmit(onSubmit)}>
            
            <div className='input'>
                <p> Stock type</p>
                <select>
                    <option>TEQIP</option>
                    <option>TEQIP</option>
                    <option>TEQIP</option>
                    <option>TEQIP</option>
                </select>
                <span>
                    
                </span>
            </div>
            <div className='input'>
                <p> Invoice ID</p>
                <input type='text' {...register("invoiceid",{required:true,minLength:1,maxLength:20})}/>
                <span>
                    {errors.invoiceid?.type ==="required"&& "Invoice ID Required"}
                    {errors.invoiceid?.type ==="minLength"&& "This field must contain 1 character or number"}
                    {errors.invoiceid?.type ==="maxLength"&& "This field must be less than 20 length"}
                </span>
            </div>
            <div className='input'>
                <p> Invoice Date</p>
                <input type='text' {...register("date",{required:true,pattern:/^[0-9]{2}[-]{1}[0-9]{2}[-]{1}[0-9]{4}$/g})} placeholder='dd-mm-yyyy'/>
                <span>
                    {errors.date?.type ==="required"&& "Invoice Date Required"}
                    {errors.date?.type ==="pattern"&& "DD-MM-YYYY"}
                </span>
            </div>
            <div className='input'>
                <p> Category</p>
                <input type='text' {...register("category",{required:true,minLength:2,maxLength:20})}/>
                <span>
                    {errors.category?.type ==="required"&& "Category Required"}
                    {errors.category?.type ==="minLength"&& "This field must contain 2 character"}
                    {errors.category?.type ==="maxLength"&& "This field must be less than 20 length"}
                </span>
            </div>
            <div className='input'>
                <p> Supplier Name</p>
                <input type='text' {...register("sname",{required:true,minLength:2,maxLength:20})}/>
                <span>
                    {errors.sname?.type ==="minLength"&& "This field must contain 2 character"}
                    {errors.sname?.type ==="maxLength"&& "This field must be less than 20 length"}
                    {errors.sname?.type ==="required"&& "Supplier name Required"}
                </span>
            </div>
            <div className='input'>
                <p> Reference Page</p>
                <input type='number' {...register("refno",{required:true,minLength:1,maxLength:4})}/>
                <span>
                    {errors.refno?.type ==="minLength"&& "This field must contain 1 digit"}
                    {errors.refno?.type ==="maxLength"&& "This field must be less than 5 digit"}
                    {errors.refno?.type ==="required"&& "Reference page no Required"}
                </span>
            </div>
            <div className="btn">
                <input type="submit" value="SUBMIT" />
            </div>
            </form>
      </div>
    </div>
  )
}

export default AddStockPopUp
