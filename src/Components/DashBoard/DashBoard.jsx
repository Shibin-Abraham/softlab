import React,{useState,useEffect, useContext, useCallback} from "react";
import "./DashBoard.css"
import { DispatchContext, StateContext } from "../AuthProvider/AuthProvider";
import axios from "axios";
import GlobalPopUp from "../GlobalPopUp/GlobalPopUp";
import { useNavigate } from "react-router-dom";

function DashBoard(){
    const [globalPopUp,setGlobalPopUp] = useState({})
    const authData = useContext(StateContext)
    const userData = useContext(StateContext)
    
    let [allUsersData,setAllUsersData] = useState([])

    let [stockCount,setStockCount] = useState(0)
    let [itemCount,setItemCount] = useState(0)
    let [borrowCount,setBorrowCount] = useState(0)

    const [stockPercentage,setStockPercentage] = useState(0)
    const [itemPercentage,setItemPercentage] = useState(0)
    const [borrowPercentage,setBorrowPercentage] = useState(0)

    const navigate = useNavigate()

    const dispatch = useContext(DispatchContext)

    const [noOfStock,setNoOfStock] = useState(0)
    const [noOfItem,setNoOfItem] = useState(0)
    const [noOfBorrow,setNoOfBorrow] = useState(0)

    let getUsersData = useCallback(()=>{
        axios({
            method: 'POST',
            url: 'http://localhost/soft-lab-api/route/services/users-data.php',
            headers: {
                'Content-type': 'application/json; charset=utf-8',
                'Authorization': authData.JWT, 
              }
          }).then((res)=>{
            console.log("active users",res)
            if(res.data.length !== undefined){
                console.log(res.data) 
                setAllUsersData(res.data.filter((value)=>value.status === '1'))
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

    let getStockCount = useCallback(()=>{
        axios({
            method: 'GET',
            url: 'http://localhost/soft-lab-api/route/services/count-data.php?id=1',
          }).then((res)=>{
            console.log("stock countttttt",res)
            if(res.data.statuscode === 400){
                setGlobalPopUp({id:3,header:'Bad request',message:'please check your request'})
            }else if(res.data.statuscode === 200 && res.data.percentage !== 0 ){
                setStockPercentage(res.data.percentage)
                setNoOfStock(res.data.count)
            }
          }).catch((err)=>{
            setGlobalPopUp({id:4,header:`${err.message}!`,message:`${err.message}! please check your network`})
          })
    },[setStockPercentage,setNoOfStock])

    let getItemCount = useCallback(()=>{
        axios({
            method: 'GET',
            url: 'http://localhost/soft-lab-api/route/services/count-data.php?id=2',
          }).then((res)=>{
            console.log("stock countttttt",res)
            if(res.data.statuscode === 400){
                setGlobalPopUp({id:3,header:'Bad request',message:'please check your request'})
            }else if(res.data.statuscode === 200 && res.data.percentage !== 0 ){
                setItemPercentage(res.data.percentage)
                setNoOfItem(res.data.count)
            }
          }).catch((err)=>{
            setGlobalPopUp({id:4,header:`${err.message}!`,message:`${err.message}! please check your network`})
          })
    },[setItemPercentage,setNoOfItem])

    let getBorrowCount = useCallback(()=>{
        axios({
            method: 'GET',
            url: 'http://localhost/soft-lab-api/route/services/count-data.php?id=3',
          }).then((res)=>{
            console.log("stock countttttt",res)
            if(res.data.statuscode === 400){
                setGlobalPopUp({id:3,header:'Bad request',message:'please check your request'})
            }else if(res.data.statuscode === 200 && res.data.percentage !== 0 ){
                setBorrowPercentage(res.data.percentage)
                setNoOfBorrow(res.data.count)
            }
          }).catch((err)=>{
            setGlobalPopUp({id:4,header:`${err.message}!`,message:`${err.message}! please check your network`})
          })
    },[setBorrowPercentage,setNoOfBorrow])
    /********* API call **********/ 
    useEffect(()=>{
        getUsersData()
        getStockCount()
        getItemCount()
        getBorrowCount()
    },[getUsersData,getStockCount,getItemCount,getBorrowCount])

    useEffect(()=>{
        const interval = setInterval(()=>{
            setStockCount(stockCount===stockPercentage?stockCount:stockCount+1)
        },25)
        return ()=>clearInterval(interval)
        
    },[stockCount,stockPercentage])

    useEffect(()=>{
        const interval = setInterval(()=>{
            setItemCount(itemCount===itemPercentage?itemCount:itemCount+1)
        },25)
        return ()=>clearInterval(interval)
        
    },[itemCount,itemPercentage])

    useEffect(()=>{
        const interval = setInterval(()=>{
            setBorrowCount(borrowCount===borrowPercentage?borrowCount:borrowCount+1)
        },25)
        return ()=>clearInterval(interval)
        
    },[borrowCount,borrowPercentage])
    
    console.log('allusers data',allUsersData)
    
    function getDate() {
        const today = new Date();
        let month = today.getMonth() + 1;
        let year = today.getFullYear();
        let date = today.getDate();
        date = date<10?`0${date}`:date
        month = month<10?`0${month}`:month
        return `${year}-${month}-${date}`;
      }
    return (
        <div className="main">
        {globalPopUp.id === 1? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null}
        {globalPopUp.id === 2? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null} 
        {globalPopUp.id === 3? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null}
        {globalPopUp.id === 4? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null}
            <section>
                {/* container 1 start */}
                <div className="container-1">
                    <h1>Dashboard</h1>
                    <div className="date">
                        <input type="date" defaultValue={getDate()} />
                    </div>
                    <div className="card-section">
                        <div className="card-1">
                            <div className="top">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M11.644 1.59a.75.75 0 0 1 .712 0l9.75 5.25a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.712 0l-9.75-5.25a.75.75 0 0 1 0-1.32l9.75-5.25Z" />
                                <path d="m3.265 10.602 7.668 4.129a2.25 2.25 0 0 0 2.134 0l7.668-4.13 1.37.739a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.71 0l-9.75-5.25a.75.75 0 0 1 0-1.32l1.37-.738Z" />
                                <path d="m10.933 19.231-7.668-4.13-1.37.739a.75.75 0 0 0 0 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 0 0 0-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 0 1-2.134-.001Z" />
                            </svg>
                            </div>
                            <div className="mid">
                                <div>
                                    <p>Live Stocks</p>
                                    <h2>{`${noOfStock}.00`}</h2>
                                </div>
                                <div className="circle">
                                    <div className="circular-progress" style={{background:`conic-gradient(#7380ec ${stockCount*3.6}deg,#36384f ${stockCount*3.6}deg)`}}>
                                        <div>
                                            {stockCount}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-2">
                        <div className="top">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z" clipRule="evenodd" />
                        </svg>

                            </div>
                            <div className="mid">
                                <div>
                                    <p>Live Items</p>
                                    <h2>{`${noOfItem}.00`}</h2>
                                </div>
                                <div className="circle">
                                    <div className="circular-progress" style={{background:`conic-gradient(#41f1b6 ${itemCount*3.6}deg,#36384f ${itemCount*3.6}deg)`}}>
                                        <div>
                                            {itemCount}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                
                        </div>
                        <div className="card-3">
                        <div className="top">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                        </svg>
                            </div>
                            <div className="mid">
                                <div>
                                    <p>Borrowed</p>
                                    <h2>{`${noOfBorrow}.00`}</h2>
                                </div>
                                <div className="circle">
                                    <div className="circular-progress" style={{background:`conic-gradient(#ff7782 ${borrowCount*3.6}deg,#36384f ${borrowCount*3.6}deg)`}}>
                                        <div>
                                            {borrowCount}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                    <div className="table-container">
                        <h2>Recent Activities</h2>
                        <div className="table-section">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Date</th>
                                        <th>Details</th>
                                        <th>Operation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>soft lab</td>
                                        <td>softlab@gmail.com</td>
                                        <td>19/02/2024</td>
                                        <td>Stock-BAT01 Item-Laptop</td>
                                        <td className="primary">Added</td>
                                    </tr>
                                    <tr>
                                        <td>soft lab</td>
                                        <td>softlab@gmail.com</td>
                                        <td>19/02/2024</td>
                                        <td>Stock-BAT01 Item-Laptop</td>
                                        <td className="success">Updated</td>
                                    </tr>
                                    <tr>
                                        <td>soft lab</td>
                                        <td>softlab@gmail.com</td>
                                        <td>19/02/2024</td>
                                        <td>Stock-BAT01 Item-Laptop</td>
                                        <td className="danger">Deleted</td>
                                    </tr>
                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                </div>
                {/* container 1 end */}
                <div className="container-2">
                    <div className="top">
                        <div className="text">
                        <h4>{userData.name}</h4>
                        <p>{userData.r_name}</p>
                        </div>
                        <div className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <div className="mid">
                        <h2>Users</h2>
                        <div className="card-section">
                        {
                            allUsersData.map((data)=>{
                                return(
                                    <div key={data.id} className="row">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <h4>{data.name}</h4>
                                            <p>{data.r_name}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                    <div className="bottom">
                        <h3>Alert and Notification</h3>
                        <div className="card-section">
                            <div className="row">
                                <div className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z" clipRule="evenodd" />
                                </svg>
                                </div>
                                <div className="data">
                                    <p>Brand name</p>
                                    <p>Item name</p>
                                    <p>19-02-2024</p>
                                </div>
                            </div>
                            <div className="row">
                            <div className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z" clipRule="evenodd" />
                                </svg>
                                </div>
                                <div className="data">
                                    <p>Brand name</p>
                                    <p>Item name</p>
                                    <p>19-02-2024</p>
                                </div>
                            </div>
                            <div className="row">
                            <div className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z" clipRule="evenodd" />
                                </svg>
                                </div>
                                <div className="data">
                                    <p>Brand name</p>
                                    <p>Item name</p>
                                    <p>19-02-2024</p>
                                </div>
                            </div>
                            <div className="row">
                            <div className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z" clipRule="evenodd" />
                                </svg>
                                </div>
                                <div className="data">
                                    <p>Brand name</p>
                                    <p>Item name</p>
                                    <p>19-02-2024</p>
                                </div>
                            </div>
                            <div className="row">
                            <div className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z" clipRule="evenodd" />
                                </svg>
                                </div>
                                <div className="data">
                                    <p>Brand name</p>
                                    <p>Item name</p>
                                    <p>19-02-2024</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DashBoard;