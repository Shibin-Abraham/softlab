import React, { useEffect, useState } from 'react'
import './AddIndentPopUp.css'
import { useForm } from 'react-hook-form';

function AddIndentPopUp(props) {
    console.log(props)
    let [popUpActive,setPopUpActive] = useState('')
    let [filteredStock,setFilteredStock] = useState([])
    let [error,setError] = useState('')

    const {register, handleSubmit ,formState:{errors}} = useForm();

    let onSubmit = (data)=>{
        if(data && error.length===0){
            console.log(data)
        }
    }

    useEffect(()=>{
        props.allStockData.forEach((d)=>{
            console.log('sir',d.id)
            for(let i=0;i<props.allIndentData.length;i++){
                if(props.allIndentData[i].stock_id !== d.id){
                    let obj = [id: d.id,name: d.name]
                    setFilteredStock((prev)=>[prev,...obj])
                    console.log("**",filteredStock)
                    break
                }
            }
            
        })
        //setFilteredStock(props.allStockData.filter((data,index)=>index!==props.allIndentData.lenght?props.allIndentData[index].stock_id!==data.id:null
        //))

        setTimeout(()=>setPopUpActive('popup-active'),1)
    },[props.allIndentData,props.allStockData,filteredStock])
  return (
    <div className='add-indent-popup'>
            <div className={`content ${popUpActive}`}>
                <div className="top-section">
                <h3>Add Indent</h3>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick={()=>{
                    setPopUpActive('')
                    setTimeout(()=>{
                        props.setAddIndentPopUp(false)
                    },300)
                }}>
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12
                 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06
                  12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                </svg>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="data-section">
                    <div>
                    <select {...register("stockid",{required:true})}>
                        {
                               filteredStock.map((data,index)=>{
                                return(
                                    <option key={index} value={data.id}>{data.name}</option>
                                )
                               })   
                        }
                        
                    </select>
                    <p>
                        {errors.stockid?.type ==="required"&& "Please select one option"}
                        
                    </p>
                    </div>
                    
                    <input type="file" accept="image/png,image/jpeg" {...register("img",{required:true})}/>
                    <p>
                        {errors.img?.type ==="required"&& "Please upload one img"}
                    </p>
                    <input type="submit" value="Submit"  />
                    </div>
                </form>
                
            </div>
      {/*<h2 onClick={()=>props.setPopUpActive(false)}>POPup</h2>*/}
    </div>
  )
}

export default AddIndentPopUp
