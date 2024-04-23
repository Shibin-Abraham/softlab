import React,{useContext, useEffect,useState} from 'react'
import './AddItemPopUp.css'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { DispatchContext, StateContext } from '../../AuthProvider/AuthProvider'

function AddItemPopUp(props) {
    let [popUpActive,setPopUpActive] = useState('')
    let [error,setError] = useState('')
    let [error1,setError1] = useState('')
    let [error2,setError2] = useState('')
    let [filterdStock,setFiltredStock] = useState([])

    let navigate = useNavigate()

    const authData = useContext(StateContext)
    const dispatch = useContext(DispatchContext)

    useEffect(()=>{
        setTimeout(()=>setPopUpActive('popup-active'),1)
        setFiltredStock(props.allStockData.filter((data)=>data.category!==''))
    },[setFiltredStock,props.allStockData])

    const {register, handleSubmit ,formState:{errors}} = useForm();
    const onSubmit = (datas)=>{
        if(datas){
            axios({
                method: 'POST',
                url: 'http://localhost/soft-lab-api/route/services/insert-item-data.php',
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                    'Authorization': authData.JWT, 
                  },
                data: {...datas,date: getDate(),time: getTime()}
              }).then((res)=>{
                console.log("status of insertion 333333333333",res)
                if(res.data.statuscode === 200){
                    props.getItemData()
                    setPopUpActive('')//close AddStockPopUp 
                    props.setGlobalPopUp({id:1,header:'Inserted',message:'Data has been saved successfully'}) // show the success message
                    setTimeout(()=>{props.setAddItemPopUp(false)},300)
                    
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
            
            
            //data submited then close the AddStockPopUo and show the success message
            //setPopUpActive('')//close AddStockPopUp 
            //props.setGlobalPopUp({id:1,header:'SUCCESS',message:'Data has been saved successfully'}) // show the success message
            //setTimeout(()=>{props.setAddItemPopUp(false)},300)
            console.log(datas)
        }else{
            props.setGlobalPopUp({id:4,header:'Invalid input',message:'Please check your inputs'})
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
    <div className='item-popup'>
      <div className={`content ${popUpActive}`}>
        <div className="top">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick={()=>{
                setPopUpActive('')
                setTimeout(()=>{
                    props.setAddItemPopUp(false)},300)
                }}>
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z" clipRule="evenodd" />
            </svg>
            <h2>Add Item</h2>
        </div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className='input'>
                <p> Item Name</p>
                <input type='text' {...register("itemno",{required:true,minLength:2,maxLength:10})} onChange={(e)=>{
                    setError('')
                    props.allItemsData.forEach(element => {
                        return element.name.toUpperCase() === e.target.value.toUpperCase()&&setError(`${e.target.value} already taken, Please enter unique value`)
                      });
                }}/>
                <span>
                    {error}
                </span>
                <span>
                    {errors.itemno?.type ==="minLength"&& "Item Name must contain 2 character or number"}
                    {errors.itemno?.type ==="maxLength"&& "Item Name must be less than 10 length "}
                    {errors.itemno?.type ==="required"&& "Item Name Required"}
                </span>
            </div>
            <div className='input'>
                <p>Select Stock</p>
                <select {...register("stockid",{required:true})} onClick={(e)=>{
                    setError1('')
                    //setStockName(props.allStockData.filter((data)=>data.id===e.currentTarget.value))
                }}>
                    {
                        filterdStock.length!==0?filterdStock.map((data)=>{
                            return(
                                <option key={data.id} value={data.id}>{data.name}</option>
                            )
                        }):<option> No data</option>
                    }
                    
                </select>
                <span>
                    {error1}
                </span>
            </div>
            <div className='input'>
                <p> Select Brand</p>
                <select {...register("brandId",{required:true})} onClick={(e)=>{
                    setError2('')
                }}>
                    {
                        props.brandData.length!==0?props.brandData.map((data)=>{
                            return(
                                <option key={data.b_id} value={data.b_id}>{data.b_name}</option>
                            )
                        }):<option> No data</option>
                    }
                    
                </select>
                <span>
                    {error2}
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
                <input type='text' {...register("wdate",{required:true,pattern:/^[0-9]{4}[-]{1}[0-9]{2}[-]{1}[0-9]{2}$/g})} placeholder='yyyy-mm-dd'/>
                <span>
                    {errors.wdate?.type ==="required"&& "Warranty Date Required"}
                    {errors.wdate?.type ==="pattern"&& "YYYY-MM-DD"}
                </span>
            </div>
            <div className='input'>
                <p> Item Type</p>
                <input type='text' {...register("Itype",{required:true,minLength:1,maxLength:50})}/>
                <span>
                    {errors.Itype?.type ==="required"&& "This field Required"}
                    {errors.Itype?.type ==="minLength"&& "This field must contain 1 character or number"}
                    {errors.Itype?.type ==="maxLength"&& "This field must be less than 50 length"}
                </span>
            </div>
            <div className='input'>
                <p> Lab Location</p>
                <input type='text' {...register("location",{required:true,minLength:1,maxLength:50})}/>
                <span>
                    {errors.location?.type ==="required"&& "This field Required"}
                    {errors.location?.type ==="minLength"&& "This field must contain 1 character or number"}
                    {errors.location?.type ==="maxLength"&& "This field must be less than 50 length"}
                </span>
            </div>
            <div className='input'>
                <p> Item Status</p>
                <input type='text' {...register("status",{required:true,minLength:1,maxLength:50})}/>
                <span>
                    {errors.status?.type ==="required"&& "This field Required"}
                    {errors.status?.type ==="minLength"&& "This field must contain 1 character or number"}
                    {errors.status?.type ==="maxLength"&& "This field must be less than 50 length"}
                </span>
            </div>
            <div className='input'>
                <p> Price</p>
                <input type='number' {...register("totalprice",{required:true,minLength: 1,maxLength:20})}/>
                <span>
                    {errors.totalprice?.type ==="minLength"&& "This field must contain 1 character"}
                    {errors.totalprice?.type ==="maxLength"&& "This field must be less than 20 length"}
                    {errors.totalprice?.type ==="required"&& "This field Required"}
                </span>
            </div>
            <div className="btn">
                {error.length===0?<input type="submit" value="Add Item" />:null}
                
            </div>
            </form>
      </div>
    </div>
  )
}

export default AddItemPopUp
