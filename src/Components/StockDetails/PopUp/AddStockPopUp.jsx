import React,{useContext, useEffect,useState} from 'react'
import './AddStockPopUp.css'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { DispatchContext, StateContext } from '../../AuthProvider/AuthProvider'

function AddStockPopUp(props) {
    console.log("AddStockPopUp ",props)

    const authData = useContext(StateContext)
    const dispatch = useContext(DispatchContext)

    const navigate = useNavigate()

    let [popUpActive,setPopUpActive] = useState('')
    let [stockName,setStockName] = useState([])
    let [error1,setError1] = useState('')

    useEffect(()=>{
        setTimeout(()=>setPopUpActive('popup-active'),1)
    },[])

    const {register, handleSubmit ,formState:{errors}} = useForm();
    const onSubmit = (data)=>{
        if(data&&stockName.length!==0){//data submited then close the AddStockPopUo and show the success message
            axios({
                method: 'POST',
                url: 'http://localhost/soft-lab-api/route/services/update-stock-details.php',
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                    'Authorization': authData.JWT, 
                    },
                data: {...data,current_date: getDate(),current_time: getTime(),stock_name: stockName[0].name}
                }).then((res)=>{
                console.log("status code update stock",res)
                if(res.data.statuscode === 200){
                    props.getStockData()
                    setPopUpActive('')//close AddStockPopUp 
                    props.setGlobalPopUp({id:2,header:'UPDATED',message:'Stock data successfully updated'}) // show the success message
                    setTimeout(()=>{props.setStockPopUp(false)},300)
                    //props.setAssignStockRole(false)
                }else if(res.data.statuscode === 403){
                    setError1('This user already take same stock')
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
            setError1('plese select stock name')
            //props.setGlobalPopUp({id:4,header:'Error',message:'Data not accept'})
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
                <p> Stock Name</p>
                <select {...register("stockid",{required:true})} onClick={(e)=>{
                    setError1('')
                    setStockName(props.allStockData.filter((data)=>data.id===e.currentTarget.value))
              }}>
                    {
                        props.allStockData.length!==0?props.allStockData.map((data)=>{
                            return(
                                data.category===''?<option key={data.id} value={data.id}>{data.name}</option>:null
                            )
                        }):<option> No data</option>
                    }
                    
                </select>
                <span>
                    {error1}
                </span>
            </div>
            <div className='input'>
                <p> Stock Category</p>
                <input type='text' {...register("stockcategory",{required:true,minLength:2,maxLength:20})}/>
                <span>
                    {errors.stockcategory?.type ==="required"&& "Stock Category Required"}
                    {errors.stockcategory?.type ==="minLength"&& "This field must contain 2 character"}
                    {errors.stockcategory?.type ==="maxLength"&& "This field must be less than 20 length"}
                </span>
            </div>
            <div className='input'>
                <p> Stock type</p>
                <input type='text' {...register("stocktype",{required:true,minLength:2,maxLength:20})}/>
                <span>
                    {errors.stocktype?.type ==="required"&& "Stock Type Required"}
                    {errors.stocktype?.type ==="minLength"&& "This field must contain 2 character"}
                    {errors.stocktype?.type ==="maxLength"&& "This field must be less than 20 length"}
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
                <p> Supplier Name</p>
                <input type='text' {...register("sname",{required:true,minLength:2,maxLength:20})}/>
                <span>
                    {errors.sname?.type ==="minLength"&& "This field must contain 2 character"}
                    {errors.sname?.type ==="maxLength"&& "This field must be less than 20 length"}
                    {errors.sname?.type ==="required"&& "Supplier name Required"}
                </span>
            </div>
            {/*
            <div className='input'>
                <p> Reference Page</p>
                <input type='number' {...register("refno",{required:true,minLength:1,maxLength:4})}/>
                <span>
                    {errors.refno?.type ==="minLength"&& "This field must contain 1 digit"}
                    {errors.refno?.type ==="maxLength"&& "This field must be less than 5 digit"}
                    {errors.refno?.type ==="required"&& "Reference page no Required"}
                </span>
            </div>
            */}
            <div className="btn">
                <input type="submit" value="SUBMIT" />
            </div>
            </form>
      </div>
    </div>
  )
}

export default AddStockPopUp
