import React,{useState} from 'react'
import './StockDetails.css';
import ViewPopUp from './PopUp/ViewPopUp';
import AddStockPopUp from './PopUp/AddStockPopUp';

function StockDetails() {
    let [viewPopUp,setViewPopUp] = useState(false)
    let [stockPopUp,setStockPopUp] = useState(false)
    
  return (
    <div className='stock-details'>
        {stockPopUp && <AddStockPopUp setStockPopUp={setStockPopUp}/>}
        {viewPopUp && <ViewPopUp setViewPopUp={setViewPopUp}/>}
        <section>
            <h1>Stock Details</h1> 
            <div className='top'>
                    <input type='search' placeholder='  Search...' />
                    <div onClick={()=>setStockPopUp(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>
                        <h3>Add Stock</h3>
                    </div>
                </div>
            <div className="container">
                <div className="table-section">
                    <table>
                        <thead>
                            <tr>
                                <th>Indent No</th>
                                <th>Sub Indent No</th>
                                <th>Stock Type</th>
                                <th>Invoice ID</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Lab-stock-5</td>
                                <td>3</td>
                                <td>TEQIP</td>
                                <td>INV-004</td>
                                <td>Batteries</td>
                                <td>
                                    <svg onClick={()=>setViewPopUp(true)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                    </svg>
                                </td>
                            </tr>
                            <tr>
                                <td>Lab-stock-5</td>
                                <td>3</td>
                                <td>TEQIP</td>
                                <td>INV-004</td>
                                <td>Batteries</td>
                                <td>
                                    <svg onClick={()=>setViewPopUp(true)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                    </svg>
                                </td>
                            </tr>
                            
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </section>   
    </div>
  )
}

export default StockDetails
