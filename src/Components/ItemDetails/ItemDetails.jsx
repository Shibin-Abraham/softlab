import React,{useState} from 'react'
import './ItemDetails.css'
import AddItemPopUp from './PopUp/AddItemPopUp'
import GlobalPopUp from '../GlobalPopUp/GlobalPopUp'
import ViewItemPopUp from './PopUp/ViewItemPopUp'

function ItemDetails() {
  //let [viewPopUp,setViewPopUp] = useState(false)
  let [addItemPopUp,setAddItemPopUp] = useState(false)
  let [viewPopUp,setViewPopUp] = useState(false)
  let [globalPopUp,setGlobalPopUp] = useState({})  


  return (
    <div className='item-details'>
        {addItemPopUp && <AddItemPopUp setAddItemPopUp={setAddItemPopUp} setGlobalPopUp={setGlobalPopUp}/>}
        {viewPopUp && <ViewItemPopUp setViewPopUp={setViewPopUp} setGlobalPopUp={setGlobalPopUp}/>}
        {globalPopUp.id === 1? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null}
        {globalPopUp.id === 2? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null} 
        {globalPopUp.id === 3? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null}
        {globalPopUp.id === 4? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null}
      <section>
        <h1>Item Details</h1> 
          <div className='top'>
            <input type='search' placeholder='  Search...' />
            <div onClick={()=>setAddItemPopUp(true)} className='brand-icon'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M2 3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v8.5a2.5 2.5 0 0 1-5 0V3Zm3.25 8.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" clipRule="evenodd" />
                <path d="m8.5 11.035 3.778-3.778a1 1 0 0 0 0-1.414l-2.122-2.121a1 1 0 0 0-1.414 0l-.242.242v7.07ZM7.656 14H13a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-.344l-5 5Z" />
              </svg>
              <h3>Brand</h3>
            </div>
            <div onClick={()=>setAddItemPopUp(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clipRule="evenodd" />
              </svg>
              <h3>Item</h3>
            </div>
            <div onClick={()=>setAddItemPopUp(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M6 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6ZM15.75 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3H18a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3h-2.25ZM6 12.75a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3v-2.25a3 3 0 0 0-3-3H6ZM17.625 13.5a.75.75 0 0 0-1.5 0v2.625H13.5a.75.75 0 0 0 0 1.5h2.625v2.625a.75.75 0 0 0 1.5 0v-2.625h2.625a.75.75 0 0 0 0-1.5h-2.625V13.5Z" />
              </svg>
            </div>
          </div>
          <div className="container">
                <div className="table-section">
                    <table>
                        <thead>
                            <tr>
                                <th>Item No</th>
                                <th>Category</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>LAP-001</td>
                                <td>Laptop</td>
                                <td>sw-lab-1</td>
                                <td>Old</td>
                                <td>
                                    <svg onClick={()=>setViewPopUp(true)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                    </svg>
                                </td>
                            </tr>
                            <tr>
                                <td>LAP-002</td>
                                <td>Laptop</td>
                                <td>sw-lab-1</td>
                                <td>New</td>
                                <td>
                                    <svg onClick={()=>setViewPopUp(true)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                    </svg>
                                </td>
                            </tr>
                            <tr>
                                <td>LAP-002</td>
                                <td>Laptop</td>
                                <td>sw-lab-1</td>
                                <td>New</td>
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
                <div className="table-section2">
                    <table>
                        <thead>
                            <tr>
                                <th>Brand</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Dell</td>
                            </tr>
                            <tr>
                                <td>Dell</td>
                            </tr>
                            <tr>                               
                                <td>Dell</td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
      </section>

    </div>
  )
}

export default ItemDetails
