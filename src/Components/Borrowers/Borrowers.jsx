import React,{useState} from 'react'
import './Borrowers.css'
import AddBorrowerPopUp from './PopUp/AddBorrowerPopUp'
import GlobalPopUp from '../GlobalPopUp/GlobalPopUp'
import ViewBorrowerPopUp from './PopUp/ViewBorrowerPopUp'

function Borrowers() {
    let [addBorrowerPopUp,setAddBorrowerPopUp] = useState(false)
    let [viewBorrowerPopUp,setViewBorrowerPopUp] = useState(false)
    let [globalPopUp,setGlobalPopUp] = useState({})

  return (
    <div className="borrower-details">
        {addBorrowerPopUp && <AddBorrowerPopUp setAddBorrowerPopUp={setAddBorrowerPopUp} setGlobalPopUp={setGlobalPopUp}/>}
        {viewBorrowerPopUp && <ViewBorrowerPopUp setViewBorrowerPopUp={setViewBorrowerPopUp} setGlobalPopUp={setGlobalPopUp}/>}
        {globalPopUp.id === 1? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null}
        {globalPopUp.id === 2? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null} 
        {globalPopUp.id === 3? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null}
        {globalPopUp.id === 4? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null}
        <section>
          <div className='top'>
          <h1>Borrowers</h1> 
            <div onClick={()=>setAddBorrowerPopUp(true)}> 
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
              </svg>
              <h3>Add Borrower</h3>
            </div>
          </div>
          <div className="container">
                <div className="table-section">
                    <table>
                        <thead>
                            <tr>
                                <th>Borrower Name</th>
                                <th>Item No</th>
                                <th>Category</th>
                                <th>Lab Location</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Shibin</td>
                                <td>LAP-002</td>
                                <td>Laptop</td>
                                <td>Software lab 1</td>
                                <td>
                                    <svg onClick={()=>setViewBorrowerPopUp(true)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                    </svg>
                                </td>
                            </tr>
                            <tr>
                                <td>Shibin</td>
                                <td>LAP-002</td>
                                <td>Laptop</td>
                                <td>Software lab 1</td>
                                <td>
                                    <svg onClick={()=>setViewBorrowerPopUp(true)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                    </svg>
                                </td>
                            </tr>
                            <tr>
                                <td>Shibin</td>
                                <td>LAP-002</td>
                                <td>Laptop</td>
                                <td>Software lab 1</td>
                                <td>
                                    <svg onClick={()=>setViewBorrowerPopUp(true)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
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

export default Borrowers
