import React from 'react'
import './ViewItemPopUp.css'
import { useForm } from 'react-hook-form'

function ViewItemPopUp(props) {
    const {register, handleSubmit ,formState:{errors}} = useForm();
    const onSubmit = (data)=>{
        if(data){
            props.setViewPopUp(false)
            props.setGlobalPopUp({id:1,header:'Updated',message:'Data has been updated'})
        }
    }
  return (
    <div className='item-view-popup'>
      <div className="content">
        <div className="top-section">
            <h2>Item Details</h2>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick={()=>props.setViewPopUp(false)}>
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
            </svg>
        </div>
        <div className="data-section">
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    <p> Category</p>
                    {/*<input type='text' {...register("subindent",{required:true,minLength:1,maxLength:10})}/>*/}
                    <select name="" id="">
                        <option value="">category</option>
                    </select>
                    <span>
                    </span>
                </div>
                <div className='input'>
                    <p> Brand</p>
                    <input type='text' {...register("brand",{required:true,minLength:1,maxLength:20})}/>
                    <span>
                        {errors.brand?.type ==="minLength"&& "This field must contain 1 character"}
                        {errors.brand?.type ==="maxLength"&& "This field must be less than 20 length characters"}
                        {errors.brand?.type ==="required"&& "Brand name Required"}
                    </span>
                </div>
                <div className='input'>
                    <p> Model</p>
                    <input type='text' {...register("model",{required:true,minLength:1,maxLength:20})}/>
                    <span>
                        {errors.model?.type ==="required"&& "Model Required"}
                        {errors.model?.type ==="minLength"&& "This field must contain 1 character or number"}
                        {errors.model?.type ==="maxLength"&& "This field must be less than 20 length"}
                    </span>
                </div>
                <div className='input'>
                    <p> Description</p>
                    <input type='text' {...register("description",{required:true,minLength:1,maxLength:50})}/>
                    <span>
                        {errors.description?.type ==="required"&& "Description details Required"}
                        {errors.description?.type ==="minLength"&& "This field must contain 1 character or number"}
                        {errors.description?.type ==="maxLength"&& "This field must be less than 50 length"}
                    </span>
                </div>
                <div className='input'>
                    <p> Warranty</p>
                    <input type='text' {...register("wdate",{required:true,pattern:/^[0-9]{2}[-]{1}[0-9]{2}[-]{1}[0-9]{4}$/g})} placeholder='dd-mm-yyyy'/>
                    <span>
                        {errors.wdate?.type ==="required"&& "Warranty Date Required"}
                        {errors.wdate?.type ==="pattern"&& "DD-MM-YYYY"}
                    </span>
                </div>
                <div className='input'>
                    <p> Type</p>
                    <select name="" id="">
                        <option value="">type</option>
                    </select>
                    <span>
        
                    </span>
                </div>
                <div className='input'>
                    <p> Lab Location</p>
                    <select name="" id="">
                        <option value="">lab location</option>
                    </select>
                    <span>
                        
                    </span>
                </div>
                <div className='input'>
                    <p> Status</p>
                    <select name="" id="">
                        <option value="">status</option>
                    </select>
                    <span>
                        
                    </span>
                </div>
                <div className='input'>
                    <p> Quantity</p>
                    <input type='text' {...register("quantity",{required:true,minLength:1,maxLength:20})}/>
                    <span>
                        {errors.quantity?.type ==="minLength"&& "This field must contain 1 character"}
                        {errors.quantity?.type ==="maxLength"&& "This field must be less than 20 length"}
                        {errors.quantity?.type ==="required"&& "Quantity Required"}
                    </span>
                </div>
                <div className='input'>
                    <p> Price per item</p>
                    <input type='text' {...register("priceperitem",{required:true,minLength:1,maxLength:20})}/>
                    <span>
                        {errors.priceperitem?.type ==="minLength"&& "This field must contain 2 character"}
                        {errors.priceperitem?.type ==="maxLength"&& "This field must be less than 20 length"}
                        {errors.priceperitem?.type ==="required"&& "Price per item Required"}
                    </span>
                </div>
                <div className='input'>
                    <p> Total Price</p>
                    <input type='text' {...register("totalprice",{required:true,minLength: 1,maxLength:20})}/>
                    <span>
                        {errors.totalprice?.type ==="minLength"&& "This field must contain 1 character"}
                        {errors.totalprice?.type ==="maxLength"&& "This field must be less than 20 length"}
                        {errors.totalprice?.type ==="required"&& "Total Price Required"}
                    </span>
                </div>
                <div className="btn">
                <input type="button" value="Dump" onClick={()=>props.setGlobalPopUp({id:2,header:'Deleted',message:'Data has been deleted successfully'})}/>
                    <input type="submit" value="Update" />
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default ViewItemPopUp
