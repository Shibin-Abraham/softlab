import React from 'react'
import { useForm } from 'react-hook-form'
import './ViewPopUp.css'
import { useContext } from 'react'
import { DispatchContext, StateContext } from '../../AuthProvider/AuthProvider'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function ViewPopUp(props) {
    const authData = useContext(StateContext)
    const dispatch = useContext(DispatchContext)
    

    const navigate = useNavigate()
    const {register, handleSubmit ,formState:{errors}} = useForm();

    const onSubmit = (data)=>{
        console.log("form dataaaaaaaaaaaattttttttt",data)
        if(data){
            axios({
                method: 'POST',
                url: 'http://localhost/soft-lab-api/route/services/update-stock-details.php',
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                    'Authorization': authData.JWT, 
                    },
                data: {stockid: props.stockRowData.id, 
                        stockcategory: data.category, 
                        sname: data.sname,
                        invoiceid: data.invoiceid,
                        stocktype: data.stocktype,
                        stock_name: data.stockname,
                        date: data.date,
                        current_date: getDate(),
                        current_time: getTime()
                        }
                }).then((res)=>{
                console.log("status code update stock",res)
                if(res.data.statuscode === 200){
                    props.getStockData()
                    props.setViewPopUp(false)
                    props.setGlobalPopUp({id:1,header:'Updated',message:'Data has been updated'}) // show the success message
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

    /*const dumpStock = (data)=>{
            axios({
                method: 'POST',
                url: 'http://localhost/soft-lab-api/route/services/dump-stock.php',
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                    'Authorization': authData.JWT, 
                    },
                data: {stockid: props.stockRowData.id,
                        current_date: getDate(),
                        current_time: getTime()
                        }
                }).then((res)=>{
                console.log("status code update stock",res)
                if(res.data.statuscode === 200){
                    props.getStockData()
                    props.setViewPopUp(false)
                    props.setGlobalPopUp({id:2,header:'Dumped',message:'Stock Dumped'}) // show the success message
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
    }*/

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
    <div className='view-popup'>
      <div className="content">
        <div className="top-section">
            <h2>Stock Details</h2>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick={()=>props.setViewPopUp(false)}>
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
            </svg>
        </div>
        <div className="data-section">
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className='input'>
                <p> Stock Name</p>
                <input type='text' {...register("stockname",{required:true,minLength:4,maxLength:20})} value={props.stockRowData.name} />
                <span>
                    {errors.stockname?.type ==="minLength"&& "Stock name must contain 4 character or number"}
                    {errors.stockname?.type ==="maxLength"&& "Stock name must be less than 20 length "}
                    {errors.stockname?.type ==="required"&& "Stock name Required"}
                </span>
            </div>
            <div className='input'>
                <p> Category</p>
                <input type='text' {...register("category",{required:true,minLength:2,maxLength:20})} defaultValue={props.stockRowData.category}/>
                <span>
                    {errors.category?.type ==="required"&& "Category Required"}
                    {errors.category?.type ==="minLength"&& "This field must contain 2 character"}
                    {errors.category?.type ==="maxLength"&& "This field must be less than 20 length"}
                </span>
            </div>
            <div className='input'>
                <p> Stock type</p>
                <input type='text' {...register("stocktype",{required:true,minLength:2,maxLength:20})} defaultValue={props.stockRowData.type}/>
                <span>
                    {errors.stocktype?.type ==="minLength"&& "This field must contain 2 character"}
                    {errors.stocktype?.type ==="maxLength"&& "This field must be less than 20 length characters"}
                    {errors.stocktype?.type ==="required"&& "Stock type Required"}
                </span>
            </div>
            <div className='input'>
                <p> Invoice ID</p>
                <input type='text' {...register("invoiceid",{required:true,minLength:2,maxLength:50})} defaultValue={props.stockRowData.invoice_id}/>
                <span>
                    {errors.invoiceid?.type ==="required"&& "Invoice ID Required"}
                    {errors.invoiceid?.type ==="minLength"&& "This field must contain 2 character or number"}
                    {errors.invoiceid?.type ==="maxLength"&& "This field must be less than 50 length"}
                </span>
            </div>
            <div className='input'>
                <p> Invoice Date</p>
                <input type='text' {...register("date",{required:true,pattern:/^[0-9]{2}[-]{1}[0-9]{2}[-]{1}[0-9]{4}$/g})} defaultValue={props.stockRowData.invoice_date}/>
                <span>
                    {errors.date?.type ==="required"&& "Invoice Date Required"}
                    {errors.date?.type ==="pattern"&& "DD-MM-YYYY"}
                </span>
            </div>
            
            <div className='input'>
                <p> Supplier Name</p>
                <input type='text' {...register("sname",{required:true,minLength:2,maxLength:20})} defaultValue={props.stockRowData.supplier_name}/>
                <span>
                    {errors.sname?.type ==="minLength"&& "This field must contain 2 character"}
                    {errors.sname?.type ==="maxLength"&& "This field must be less than 20 length"}
                    {errors.sname?.type ==="required"&& "Supplier name Required"}
                </span>
            </div>
            <div className="btn">
                {
                    /*authData.r_id!=='3'?<><input type="button" value="Dump" onClick={()=>dumpStock()}/>*/
                    <input type="submit" value="Update" />
                }
            </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default ViewPopUp
