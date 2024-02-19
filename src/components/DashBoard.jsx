import React,{useState,useEffect} from "react";

export default function DashBoard(){
    let [stockCount,setStockCount] = useState(0)
    let [itemCount,setItemCount] = useState(0)
    let [borrowCount,setBorrowCount] = useState(0)
    const limi =70
    const limi2 =82
    const limi3 =50
    useEffect(()=>{
        const interval = setInterval(()=>{
            setStockCount(stockCount===limi?stockCount:stockCount+1)
        },25)
        return ()=>clearInterval(interval)
        
    },[stockCount])

    useEffect(()=>{
        const interval = setInterval(()=>{
            setItemCount(itemCount===limi2?itemCount:itemCount+1)
        },25)
        return ()=>clearInterval(interval)
        
    },[itemCount])

    useEffect(()=>{
        const interval = setInterval(()=>{
            setBorrowCount(borrowCount===limi3?borrowCount:borrowCount+1)
        },25)
        return ()=>clearInterval(interval)
        
    },[borrowCount])

    return (
        <div className="main">
            <section>
                {/* container 1 start */}
                <div className="container-1">
                    <h1>Dashboard</h1>
                    <div className="date">
                        <input type="date"/>
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
                                    <p>Total Stocks</p>
                                    <h2>2 . 00</h2>
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
                                    <p>Total Items</p>
                                    <h2>2 . 00</h2>
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
                                    <h2>2 . 00</h2>
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
                        <h4>Soft Lab</h4>
                        <p>HOD</p>
                        </div>
                        <div className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <div className="mid">
                        
                    </div>
                    <div className="bottom">
                        
                    </div>
                </div>
            </section>
        </div>
    )
}