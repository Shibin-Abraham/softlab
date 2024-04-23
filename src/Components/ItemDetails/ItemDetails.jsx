import React,{useCallback, useContext, useEffect, useState} from 'react'
import './ItemDetails.css'
import AddItemPopUp from './PopUp/AddItemPopUp'
import GlobalPopUp from '../GlobalPopUp/GlobalPopUp'
import ViewItemPopUp from './PopUp/ViewItemPopUp'
import AddBrand from './PopUp/AddBrand'
import { useNavigate } from 'react-router-dom'
import { DispatchContext, StateContext } from '../AuthProvider/AuthProvider'
import axios from 'axios'

function ItemDetails() {
  //let [viewPopUp,setViewPopUp] = useState(false)
  let [addItemPopUp,setAddItemPopUp] = useState(false)
  let [addBrandPopUp,setAddBrandPopUp] = useState(false)
  let [rotate,setRotate] = useState('')
  let [viewPopUp,setViewPopUp] = useState(false)
  let [globalPopUp,setGlobalPopUp] = useState({})  
  let [allStockData,setAllStockData] = useState([])

  let [itemRowData,setItemRowData] = useState({})

  let navigate = useNavigate()

  const authData = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  let [brandData,setBrandData] = useState([])
  let [itemsData,setItemsData] = useState([])
  let [allItemsData,setAllItemsData] = useState([])

  let getBrandData = useCallback(()=>{
    axios({
      method: 'POST',
      url: 'http://localhost/soft-lab-api/route/services/brand-data.php',
      headers: {
          'Content-type': 'application/json; charset=utf-8',
          'Authorization': authData.JWT, 
        }
    }).then((res)=>{
      console.log("active users 11111111",res)
      if(res.data.length !== undefined){
          console.log(res.data) 
          setBrandData(res.data)
          //setAllUsersData(res.data.filter((data)=>data.r_id!=="1"))
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


  let getItemData = useCallback(()=>{
    axios({
      method: 'POST',
      url: 'http://localhost/soft-lab-api/route/services/item-data.php',
      headers: {
          'Content-type': 'application/json; charset=utf-8',
          'Authorization': authData.JWT, 
        }
    }).then((res)=>{
      console.log("active users 11111111",res)
      if(res.data.length !== undefined){
          console.log("item data;;;;;;;;;;;;;",res.data) 
          setItemsData(res.data)
          //setAllUsersData(res.data.filter((data)=>data.r_id!=="1"))
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

  let getAllItemData = useCallback(()=>{
    axios({
      method: 'POST',
      url: 'http://localhost/soft-lab-api/route/services/all-items.php',
      headers: {
          'Content-type': 'application/json; charset=utf-8',
          'Authorization': authData.JWT, 
        }
    }).then((res)=>{
      console.log("active users 11111111",res)
      if(res.data.length !== undefined){
          console.log("Alllllllitem data;;;;;;;;;;;;;",res.data) 
          setAllItemsData(res.data)
          //setAllUsersData(res.data.filter((data)=>data.r_id!=="1"))
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


  let getStockData = useCallback(()=>{
    axios({
        method: 'POST',
        url: 'http://localhost/soft-lab-api/route/services/stock-data.php',
        headers: {
            'Content-type': 'application/json; charset=utf-8',
            'Authorization': authData.JWT, 
          }
      }).then((res)=>{
        //console.log("stock dataa ---------------", res)
        if(res.data.length !== undefined){
            //console.log(res.data) 
            setAllStockData(res.data.filter((data)=>data.dump!=="1"))
            
            //setStockDataEmpty(res.data.filter((data)=>data.category===''&&data.dump!=="1"))
            //stockDataEmpty.length !== 0 && setGlobalPopUp({id:4,header:'Alert',message:'please fill the stock details'})
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
  getBrandData()
  getItemData()
  getStockData()
  getAllItemData()//for checking unique item name
},[getBrandData,getItemData,getStockData,getAllItemData])
  return (
    <div className='item-details'>
        {viewPopUp && <ViewItemPopUp setViewPopUp={setViewPopUp} setGlobalPopUp={setGlobalPopUp} itemRowData={itemRowData} allStockData={allStockData} brandData={brandData} getItemData={getItemData}/>}
        {globalPopUp.id === 1? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null}
        {globalPopUp.id === 2? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null} 
        {globalPopUp.id === 3? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null}
        {globalPopUp.id === 4? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null}
      <section>
        <div className="head-1">
          <h1>Item Details</h1> 
          <svg onClick={()=>{
            setRotate('active')
              getBrandData()
              getItemData()
              getStockData()
              getAllItemData()
            setTimeout(()=>{
              setRotate('')
            },1000)
            
          }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={rotate}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </div>
        
          <div className='top'>
            <input type='search' placeholder='  Search...' />
            <div onClick={()=>setAddBrandPopUp(true)} className='brand-icon'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M2 3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v8.5a2.5 2.5 0 0 1-5 0V3Zm3.25 8.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" clipRule="evenodd" />
                <path d="m8.5 11.035 3.778-3.778a1 1 0 0 0 0-1.414l-2.122-2.121a1 1 0 0 0-1.414 0l-.242.242v7.07ZM7.656 14H13a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-.344l-5 5Z" />
              </svg>
              <h3>Brand</h3>
            </div>
            {
              brandData.length!==0?<><div className="item-btn" onClick={()=>setAddItemPopUp(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clipRule="evenodd" />
              </svg>
              <h3>Item</h3>
            </div>
            <div className="mul-item-btn" onClick={()=>setAddItemPopUp(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M6 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6ZM15.75 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3H18a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3h-2.25ZM6 12.75a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3v-2.25a3 3 0 0 0-3-3H6ZM17.625 13.5a.75.75 0 0 0-1.5 0v2.625H13.5a.75.75 0 0 0 0 1.5h2.625v2.625a.75.75 0 0 0 1.5 0v-2.625h2.625a.75.75 0 0 0 0-1.5h-2.625V13.5Z" />
              </svg>
            </div></>:null
            }
            
            
          </div>
          <div className="container">
                <div className="table-section">
                    <table>
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Stock name</th>
                                <th>Warranty</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                          {
                            itemsData.length!==0?itemsData.map((data,index)=>{
                              let status = data.status.toLowerCase()
                              return (
                                <tr key={index}>
                                  <td>{data.name}</td>
                                  <td>{data.s_name}</td>
                                  <td>{data.warranty}</td>
                                  <td>{data.lab_location}</td>
                                  <td className={status}>{data.status}</td>
                                  <td>
                                      <svg onClick={()=>{
                                        setViewPopUp(true)
                                        setItemRowData({
                                          id: data.id,
                                          name: data.name,
                                          s_id: data.s_id,
                                          b_id: data.b_id,
                                          model: data.model,
                                          description: data.description,
                                          warranty: data.warranty,
                                          type: data.type,
                                          lab_location: data.lab_location,
                                          status: data.status,
                                          amount: data.amount,
                                          dump: data.dump
                                        })
                                        }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                      <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                      </svg>
                                  </td>
                              </tr>
                              )
                            }):<tr>
                            <td style={{color:'#ff7782'}}>No data Available</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                            </td>
                        </tr>
                          } 
                        </tbody>
                    </table>
                </div>
                <div className="table-section2">
                    <table>
                        <thead>
                            <tr>
                                <th>Brand</th>
                            </tr>
                        </thead>
                        <tbody>
                          {
                            brandData.map((data)=>{
                              return (
                                <tr key={data.b_id}>
                                  <td>{data.b_name}</td>
                                </tr>
                              )
                            })
                          }
                            
                        </tbody>
                    </table>
                </div>
            </div>
      </section>
      {addBrandPopUp && <AddBrand setAddBrandPopUp={setAddBrandPopUp} setGlobalPopUp={setGlobalPopUp} brandData={brandData} getBrandData={getBrandData}/>}
        {addItemPopUp && <AddItemPopUp setAddItemPopUp={setAddItemPopUp} setGlobalPopUp={setGlobalPopUp} allStockData={allStockData} brandData={brandData} getItemData={getItemData} allItemsData={allItemsData} />}
    </div>
  )
}

export default ItemDetails
