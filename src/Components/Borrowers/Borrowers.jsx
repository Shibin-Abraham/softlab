import React, { useCallback, useContext, useEffect, useState } from 'react'
import './Borrowers.css'
import AddBorrowerPopUp from './PopUp/AddBorrowerPopUp'
import GlobalPopUp from '../GlobalPopUp/GlobalPopUp'
import ViewBorrowerPopUp from './PopUp/ViewBorrowerPopUp'
import { useNavigate } from 'react-router-dom'
import { DispatchContext, StateContext } from '../AuthProvider/AuthProvider'
import axios from 'axios'

function Borrowers() {
  let [addBorrowerPopUp, setAddBorrowerPopUp] = useState(false)
  let [viewBorrowerPopUp, setViewBorrowerPopUp] = useState(false)
  let [globalPopUp, setGlobalPopUp] = useState({})
  let [borrowersData, setBorrowersData] = useState([])
  let [borrowerRowData, setBorrowerRowData] = useState({})
  let [itemsData, setItemsData] = useState([])

  let navigate = useNavigate()

  const authData = useContext(StateContext)
  const dispatch = useContext(DispatchContext)


  let getBorrowersData = useCallback(() => {
    axios({
      method: 'GET',
      url: 'http://localhost:4000/borrowers',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
      },
      withCredentials: true
    }).then((res) => {
      console.log("borrowers data", res)
      if (res.status === 200) {
        setBorrowersData(res.data)
      }
      // if(res.data.length !== undefined){
      //     console.log(res.data) 
      //     setBorrowersData(res.data)
      //     //setAllUsersData(res.data.filter((data)=>data.r_id!=="1"))
      // }else if(res.data.statuscode === 401){ //token expired
      //     localStorage.removeItem('token')
      //     dispatch({type:'auth_logout'})
      //     navigate('/login',{replace:true})
      //     //setGlobalPopUp({id:3,header:'Token Expired',message:'You need to login again.'})
      // }else if(res.data.statuscode === 400){
      //     setGlobalPopUp({id:3,header:'Bad request',message:'please check your request'})
      // }
    }).catch((err) => {
      if (err.response.status === 401) {
        setGlobalPopUp({ id: 3, header: `${err.response.status} ${err.response.data.error}!`, message: `${err.response.data.error} You need to Login again` })
        dispatch({ type: 'auth_logout' })
        navigate('/login', { replace: true })
      } else {
        setGlobalPopUp({ id: 4, header: `${err.response.status} ${err.response.data.error}!`, message: `${err.response.data.error}` })
      }
    })
  }, [authData.JWT, dispatch, navigate])

  let getItemData = useCallback(() => {
    axios({
      method: 'POST',
      url: 'http://localhost/soft-lab-api/route/services/item-data.php',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
        'Authorization': authData.JWT,
      }
    }).then((res) => {
      console.log("items data", res)
      if (res.data.length !== undefined) {
        console.log("item data;;;;;;;;;;;;;", res.data)
        setItemsData(res.data)
        //setAllUsersData(res.data.filter((data)=>data.r_id!=="1"))
      } else if (res.data.statuscode === 401) { //token expired
        localStorage.removeItem('token')
        dispatch({ type: 'auth_logout' })
        navigate('/login', { replace: true })
        //setGlobalPopUp({id:3,header:'Token Expired',message:'You need to login again.'})
      } else if (res.data.statuscode === 400) {
        setGlobalPopUp({ id: 3, header: 'Bad request', message: 'please check your request' })
      }
    }).catch((err) => {
      setGlobalPopUp({ id: 4, header: `${err.message}!`, message: `${err.message}! please check your network` })
    })
  }, [authData.JWT, dispatch, navigate])

  useEffect(() => {
    getBorrowersData()
    getItemData()
  }, [getBorrowersData, getItemData])

  return (
    <div className="borrower-details">
      {addBorrowerPopUp && <AddBorrowerPopUp setAddBorrowerPopUp={setAddBorrowerPopUp} setGlobalPopUp={setGlobalPopUp} borrowersData={borrowersData} itemsData={itemsData} getBorrowersData={getBorrowersData} />}
      {viewBorrowerPopUp && <ViewBorrowerPopUp setViewBorrowerPopUp={setViewBorrowerPopUp} setGlobalPopUp={setGlobalPopUp} borrowerRowData={borrowerRowData} getBorrowersData={getBorrowersData} />}
      {globalPopUp.id === 1 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
      {globalPopUp.id === 2 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
      {globalPopUp.id === 3 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
      {globalPopUp.id === 4 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
      <section>
        <div className='top'>
          <h1>Borrowers</h1>
          <div onClick={() => setAddBorrowerPopUp(true)}>
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
                  <th>Adm.no</th>
                  <th>Item</th>
                  <th>Warranty</th>
                  <th>Lab Location</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  borrowersData.length !== 0 ? borrowersData.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{data.b_name}</td>
                        <td>{data.adm_no}</td>
                        <td>{data.item.name}{data.return_status ? <p>returned</p> : null}</td>
                        <td>{data.item.warranty}</td>
                        <td>{data.item.lab_location}</td>
                        <td>
                          {
                            data.return_status ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#41f1b6" className="w-5 h-5">
                              <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                            </svg> : <svg onClick={() => {
                              setBorrowerRowData({ bId: data.id, name: data.item.name, bName: data.b_name, admno: data.adm_no, sem: data.sem, branch: data.branch, date: data.date, phone: data.phone, sName: data.s_name })
                              setViewBorrowerPopUp(true)
                            }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                              <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                            </svg>

                          }
                        </td>
                      </tr>
                    )
                  }) : <tr>
                    <td>No data available</td>
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
        </div>
      </section>
    </div>
  )
}

export default Borrowers
