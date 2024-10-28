import React, { useCallback, useContext, useEffect, useState } from 'react'
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
  let [addItemPopUp, setAddItemPopUp] = useState(false)
  let [addBrandPopUp, setAddBrandPopUp] = useState(false)
  let [rotate, setRotate] = useState('')
  let [viewPopUp, setViewPopUp] = useState(false)
  let [searchPopUp, setSearchPopUp] = useState(0)

  let [globalPopUp, setGlobalPopUp] = useState({})
  let [allStockData, setAllStockData] = useState([])

  let [itemRowData, setItemRowData] = useState({})

  let navigate = useNavigate()

  const authData = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  let [brandData, setBrandData] = useState([])
  let [itemsData, setItemsData] = useState([])
  let [itemsDataCopy, setItemsDataCopy] = useState([])


  let getBrandData = useCallback(() => {
    axios({
      method: 'GET',
      url: 'http://localhost:4000/brand/getall',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
      },
      withCredentials: true
    }).then((res) => {
      console.log("brand data", res)
      if (res.status === 200) {
        setBrandData(res.data)
      }
      // if (res.data.length !== undefined) {
      //   console.log(res.data)
      //   setBrandData(res.data)
      //   //setAllUsersData(res.data.filter((data)=>data.r_id!=="1"))
      // } else if (res.data.statuscode === 401) { //token expired
      //   localStorage.removeItem('token')
      //   dispatch({ type: 'auth_logout' })
      //   navigate('/login', { replace: true })
      //   //setGlobalPopUp({id:3,header:'Token Expired',message:'You need to login again.'})
      // } else if (res.data.statuscode === 400) {
      //   setGlobalPopUp({ id: 3, header: 'Bad request', message: 'please check your request' })
      // }
    }).catch((err) => {
      if (err.response.status === 401) {
        setGlobalPopUp({ id: 3, header: `${err.response.status} ${err.response.data.error}!`, message: `${err.response.data.error} You need to Login again` })
        dispatch({ type: 'auth_logout' })
        navigate('/login', { replace: true })
      } else {
        setGlobalPopUp({ id: 4, header: `${err.response.status} ${err.response.data.error}!`, message: `${err.response.data.error}` })
      }
      //setGlobalPopUp({ id: 4, header: `${err.message}!`, message: `${err.message}! please check your network` })
    })
  }, [dispatch, navigate])


  let getItemData = useCallback(() => {
    axios({
      method: 'GET',
      url: 'http://localhost:4000/item/get/active',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
      },
      withCredentials: true
    }).then((res) => {
      //console.log("active users 11111111", res)
      if (res.status === 200) {
        setItemsData(res.data)
      }

      // if (res.data.length !== undefined) {
      //   console.log("item data;;;;;;;;;;;;;", res.data)
      //   setItemsData(res.data)
      //   //setAllUsersData(res.data.filter((data)=>data.r_id!=="1"))
      // } else if (res.data.statuscode === 401) { //token expired
      //   localStorage.removeItem('token')
      //   dispatch({ type: 'auth_logout' })
      //   navigate('/login', { replace: true })
      //   //setGlobalPopUp({id:3,header:'Token Expired',message:'You need to login again.'})
      // } else if (res.data.statuscode === 400) {
      //   setGlobalPopUp({ id: 3, header: 'Bad request', message: 'please check your request' })
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
  }, [dispatch, navigate])

  let getStockData = useCallback(() => {
    axios({
      method: 'GET',
      url: 'http://localhost:4000/stock/getall',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
      },
      withCredentials: true
    }).then((res) => {
      //console.log("stock dataa ---------------", res)
      if (res.status === 200) {
        setAllStockData(res.data.filter((data) => !data.dump))
      }

      // if (res.data.length !== undefined) {
      //   //console.log(res.data) 
      //   //setAllStockData(res.data.filter((data) => data.dump !== "1"))
      //   setAllStockData(res.data.filter((data) => !data.dump))
      //   //setStockDataEmpty(res.data.filter((data)=>data.category===''&&data.dump!=="1"))
      //   //stockDataEmpty.length !== 0 && setGlobalPopUp({id:4,header:'Alert',message:'please fill the stock details'})
      // } else if (res.data.statuscode === 401) { //token expired
      //   localStorage.removeItem('token')
      //   dispatch({ type: 'auth_logout' })
      //   navigate('/login', { replace: true })
      //   //setGlobalPopUp({id:3,header:'Token Expired',message:'You need to login again.'})
      // } else if (res.data.statuscode === 400) {
      //   setGlobalPopUp({ id: 3, header: 'Bad request', message: 'please check your request' })
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
  }, [dispatch, navigate])

  let searchItem = (e) => {
    if (e.target.value.length !== 0) {
      setSearchPopUp(1)
      let searchData = e.target.value.toLowerCase()
      setItemsDataCopy(itemsData.filter((data) => {
        let name = data.name.toLowerCase()
        let warranty = data.warranty
        let stcokName = data.stock.name.toLowerCase()
        let brandName = data.brand.name.toLowerCase()
        let labLocation = data.lab_location.toLowerCase()
        return (name.includes(searchData) || warranty.includes(searchData) || stcokName.includes(searchData) || brandName.includes(searchData) || labLocation.includes(searchData))
      }))
    } else {
      setItemsDataCopy([])
    }

  }

  useEffect(() => {
    getBrandData()
    getItemData()
    getStockData()//for checking unique item name
  }, [getBrandData, getItemData, getStockData])
  return (
    <div className='item-details'>
      {viewPopUp && <ViewItemPopUp setViewPopUp={setViewPopUp} setGlobalPopUp={setGlobalPopUp} itemRowData={itemRowData} allStockData={allStockData} brandData={brandData} getItemData={getItemData} />}
      {globalPopUp.id === 1 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
      {globalPopUp.id === 2 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
      {globalPopUp.id === 3 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
      {globalPopUp.id === 4 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
      {globalPopUp.id === 5 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
      <section>
        <div className="head-1">
          <h1>Item Details</h1>
          <svg onClick={() => {
            setRotate('active')
            getBrandData()
            getItemData()
            getStockData()
            setTimeout(() => {
              setRotate('')
            }, 1000)

          }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={rotate}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </div>

        <div className='top'>
          <input type='search' placeholder='  Search...' onChange={(e) => searchItem(e)} />
          <div onClick={() => setAddBrandPopUp(true)} className='brand-icon'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M2 3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v8.5a2.5 2.5 0 0 1-5 0V3Zm3.25 8.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" clipRule="evenodd" />
              <path d="m8.5 11.035 3.778-3.778a1 1 0 0 0 0-1.414l-2.122-2.121a1 1 0 0 0-1.414 0l-.242.242v7.07ZM7.656 14H13a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-.344l-5 5Z" />
            </svg>
            <h3>Brand</h3>
          </div>
          {
            brandData.length !== 0 ? <><div className="item-btn" onClick={() => setAddItemPopUp(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clipRule="evenodd" />
              </svg>
              <h3>Item</h3>
            </div>
              <div className="mul-item-btn" onClick={() => setGlobalPopUp({ id: 5, header: 'Feature Update', message: 'Currently in development. Anticipated release soon.' })}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M6 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6ZM15.75 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3H18a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3h-2.25ZM6 12.75a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3v-2.25a3 3 0 0 0-3-3H6ZM17.625 13.5a.75.75 0 0 0-1.5 0v2.625H13.5a.75.75 0 0 0 0 1.5h2.625v2.625a.75.75 0 0 0 1.5 0v-2.625h2.625a.75.75 0 0 0 0-1.5h-2.625V13.5Z" />
                </svg>
              </div></> : null
          }
        </div>
        {
          searchPopUp === 1 ? <div className="search-data">
            <ul>
              {
                itemsDataCopy.length !== 0 ? itemsDataCopy.map((data, index) => {
                  return (
                    <li key={index} onClick={(e) => {
                      //console.log(e)
                      setItemsDataCopy(itemsData.filter((data) => String(data.id) === String(e.currentTarget.value)))
                      //console.log(allStockDataCopy)
                      setSearchPopUp(0)
                    }} value={data.id}>
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#3e4cce" className="w-4 h-4">
                          <path fillRule="evenodd" d="M11.986 3H12a2 2 0 0 1 2 2v6a2 2 0 0 1-1.5 1.937V7A2.5 2.5 0 0 0 10 4.5H4.063A2 2 0 0 1 6 3h.014A2.25 2.25 0 0 1 8.25 1h1.5a2.25 2.25 0 0 1 2.236 2ZM10.5 4v-.75a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75V4h3Z" clipRule="evenodd" />
                          <path fillRule="evenodd" d="M3 6a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H3Zm1.75 2.5a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5ZM4 11.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                        </svg>
                        {data.name}
                      </span>
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#3e4cce" className="w-4 h-4">
                          <path d="M8 7c3.314 0 6-1.343 6-3s-2.686-3-6-3-6 1.343-6 3 2.686 3 6 3Z" />
                          <path d="M8 8.5c1.84 0 3.579-.37 4.914-1.037A6.33 6.33 0 0 0 14 6.78V8c0 1.657-2.686 3-6 3S2 9.657 2 8V6.78c.346.273.72.5 1.087.683C4.42 8.131 6.16 8.5 8 8.5Z" />
                          <path d="M8 12.5c1.84 0 3.579-.37 4.914-1.037.366-.183.74-.41 1.086-.684V12c0 1.657-2.686 3-6 3s-6-1.343-6-3v-1.22c.346.273.72.5 1.087.683C4.42 12.131 6.16 12.5 8 12.5Z" />
                        </svg>
                        {data.stock.name}
                      </span>
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#ffbb55" className="w-4 h-4">
                          <path fillRule="evenodd" d="M2 3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v8.5a2.5 2.5 0 0 1-5 0V3Zm3.25 8.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" clipRule="evenodd" />
                          <path d="m8.5 11.035 3.778-3.778a1 1 0 0 0 0-1.414l-2.122-2.121a1 1 0 0 0-1.414 0l-.242.242v7.07ZM7.656 14H13a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-.344l-5 5Z" />
                        </svg>
                        {data.brand.name}
                      </span>
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#00af75d8" className="w-4 h-4">
                          <path fillRule="evenodd" d="m7.539 14.841.003.003.002.002a.755.755 0 0 0 .912 0l.002-.002.003-.003.012-.009a5.57 5.57 0 0 0 .19-.153 15.588 15.588 0 0 0 2.046-2.082c1.101-1.362 2.291-3.342 2.291-5.597A5 5 0 0 0 3 7c0 2.255 1.19 4.235 2.292 5.597a15.591 15.591 0 0 0 2.046 2.082 8.916 8.916 0 0 0 .189.153l.012.01ZM8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" clipRule="evenodd" />
                        </svg>
                        {data.lab_location}
                      </span>
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#ff7782" className="w-4 h-4">
                          <path fillRule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM4.75 4a.75.75 0 0 0 0 1.5H6.5c.698 0 1.3.409 1.582 1H4.75a.75.75 0 0 0 0 1.5h3.332C7.8 8.591 7.198 9 6.5 9H4.75a.75.75 0 0 0-.53 1.28l2.5 2.5a.75.75 0 0 0 1.06-1.06L6.56 10.5A3.251 3.251 0 0 0 9.663 8h1.587a.75.75 0 0 0 0-1.5H9.663a3.232 3.232 0 0 0-.424-1h2.011a.75.75 0 0 0 0-1.5h-6.5Z" clipRule="evenodd" />
                        </svg>
                        {data.amount}
                      </span>
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#2db3ed" className="w-4 h-4">
                          <path fillRule="evenodd" d="M8.5 1.709a.75.75 0 0 0-1 0 8.963 8.963 0 0 1-4.84 2.217.75.75 0 0 0-.654.72 10.499 10.499 0 0 0 5.647 9.672.75.75 0 0 0 .694-.001 10.499 10.499 0 0 0 5.647-9.672.75.75 0 0 0-.654-.719A8.963 8.963 0 0 1 8.5 1.71Zm2.34 5.504a.75.75 0 0 0-1.18-.926L7.394 9.17l-1.156-.99a.75.75 0 1 0-.976 1.138l1.75 1.5a.75.75 0 0 0 1.078-.106l2.75-3.5Z" clipRule="evenodd" />
                        </svg>
                        {data.warranty}
                      </span>
                    </li>
                  )
                }) : null
              }
            </ul>
          </div> : null
        }
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
                  itemsDataCopy.length === 0 ? itemsData.length !== 0 ? itemsData.map((data, index) => {
                    let status = data.status.toLowerCase()
                    return (
                      <tr key={index}>
                        <td>{data.name}</td>
                        <td>{data.stock.name}</td>
                        <td>{data.warranty}</td>
                        <td>{data.lab_location}</td>
                        <td className={status}>{data.status}</td>
                        <td>
                          <svg onClick={() => {
                            setViewPopUp(true)
                            setItemRowData({
                              id: data.id,
                              name: data.name,
                              s_id: data.stock.id,
                              b_id: data.brand.id,
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
                  }) : <tr>
                    <td style={{ color: '#ff7782' }}>No data Available</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                    </td>
                  </tr> : itemsDataCopy.map((data, index) => {
                    let status = data.status.toLowerCase()
                    return (
                      <tr key={index}>
                        <td>{data.name}</td>
                        <td>{data.stock.name}</td>
                        <td>{data.warranty}</td>
                        <td>{data.lab_location}</td>
                        <td className={status}>{data.status}</td>
                        <td>
                          <svg onClick={() => {
                            setViewPopUp(true)
                            setItemRowData({
                              id: data.id,
                              name: data.name,
                              s_id: data.stock.id,
                              b_id: data.brand.id,
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
                  })
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
                  brandData.map((data) => {
                    return (
                      <tr key={data.id}>
                        <td>{data.name}</td>
                      </tr>
                    )
                  })
                }

              </tbody>
            </table>
          </div>
        </div>
      </section>
      {addBrandPopUp && <AddBrand setAddBrandPopUp={setAddBrandPopUp} setGlobalPopUp={setGlobalPopUp} brandData={brandData} getBrandData={getBrandData} />}
      {addItemPopUp && <AddItemPopUp setAddItemPopUp={setAddItemPopUp} setGlobalPopUp={setGlobalPopUp} allStockData={allStockData} brandData={brandData} getItemData={getItemData} />}
    </div>
  )
}

export default ItemDetails
