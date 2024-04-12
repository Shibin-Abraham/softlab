import React,{useCallback, useContext, useEffect, useState} from 'react'
import './StockDetails.css';
import ViewPopUp from './PopUp/ViewPopUp';
import AddStockPopUp from './PopUp/AddStockPopUp';
import GlobalPopUp from '../GlobalPopUp/GlobalPopUp';
import axios from 'axios';
import { DispatchContext, StateContext } from '../AuthProvider/AuthProvider';
import { useNavigate } from "react-router-dom";

function StockDetails() {
    let [viewPopUp,setViewPopUp] = useState(false)
    let [stockPopUp,setStockPopUp] = useState(false)
    let [globalPopUp,setGlobalPopUp] = useState({})                     // format {id:globalPopUp,message:'Data has been updated'} {id:globalPopUp,message:'Waringgggggggggg'}    {id:globalPopUp,message:'Something went wrong'}      

    let [allStockData,setAllStockData] = useState([])   //allStockData based on users  

    const navigate = useNavigate()

    const authData = useContext(StateContext)
    const dispatch = useContext(DispatchContext)

    let getStockData = useCallback(()=>{
        console.log("userssssssssssssssssssssssssssssssssssssssssssssssssssssssssss")
        axios({
            method: 'POST',
            url: 'http://localhost/soft-lab-api/route/services/stock-data.php',
            headers: {
                'Content-type': 'application/json; charset=utf-8',
                'Authorization': authData.JWT, 
              }
          }).then((res)=>{
            console.log("stock dataa ---------------", res)
            if(res.data.length !== undefined){
                console.log(res.data) 
                setAllStockData(res.data.filter((data)=>data.dump!=="1"))
            }else if(res.data.statuscode === 401){ //token expired
                localStorage.removeItem('token')
                dispatch({type:'auth_logout'})
                navigate('/login',{replace:true})
                //setGlobalPopUp({id:3,header:'Token Expired',message:'You need to login again.'})
            }else if(res.data.statuscode === 400){
                setGlobalPopUp({id:3,header:'Bad request',message:'please check your request'})
            }
          }).catch((err)=>{
            setGlobalPopUp({id:4,header:`${err.message}!`,message:`${err.message}! please check your network`})
          })
    },[authData.JWT,dispatch,navigate])

    useEffect(()=>{
        getStockData()
    },[getStockData])

  return (
    <div className='stock-details'>
        {stockPopUp && <AddStockPopUp setStockPopUp={setStockPopUp} setGlobalPopUp={setGlobalPopUp}/>}
        {viewPopUp && <ViewPopUp setViewPopUp={setViewPopUp} setGlobalPopUp={setGlobalPopUp}/>}
        {globalPopUp.id === 1? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null}
        {globalPopUp.id === 2? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null} 
        {globalPopUp.id === 3? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null}
        {globalPopUp.id === 4? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null}
        <section>
            <h1>Stock Details</h1> 
            <div className='top'>
                    <input type='search' placeholder='  Search...' />
                    <div onClick={()=>setStockPopUp(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>
                        <h3>Add Stock Data</h3>
                    </div>
                </div>
            <div className="container">
                <div className="table-section">
                    <table>
                        <thead>
                            <tr>
                                <th>SI No</th>
                                <th>Stock Name</th>
                                <th>Category</th>
                                <th>Invoice ID</th>
                                <th>Invoice Date</th>
                                <th>Type</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                                {
                                    allStockData.map((data,index)=>{
                                        return (
                                            <tr key={data.id}>
                                                <td>{index+1}</td>
                                                <td><span style={data.role_name!==undefined?{width:"10px",height:"5px",color:"#000000",background: "#6474ff",borderRadius: "10px"}:null}>{data.role_name!==undefined&&`${data.role_name } `}</span>  {data.name}</td>
                                                <td style={data.category===''?{color: "#ff7782"}:null}>{data.category !== '' ? data.category : 'please fill data'}</td>
                                                <td style={data.invoice_id===''?{color: "#ff7782"}:null}>{data.invoice_id !== '' ? data.invoice_id : 'please fill data'}</td>
                                                <td style={data.invoice_date==='0000-00-00'?{color: "#ff7782"}:null}>{data.invoice_date !=='0000-00-00' ? data.invoice_date : 'please fill data'}</td>
                                                <td style={data.type===''?{color: "#ff7782"}:null}>{data.type !== '' ? data.type : 'please fill data'}</td>
                                                <td>
                                                    <svg onClick={()=>setViewPopUp(true)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                                    </svg>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </section>   
    </div>
  )
}

export default StockDetails
