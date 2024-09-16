import React, { useCallback, useContext, useEffect, useState } from 'react'
import './ViewItemPopUp.css'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DispatchContext, StateContext } from '../../AuthProvider/AuthProvider';

function ViewItemPopUp(props) {

    let [dumpBtn, setDumpBtn] = useState(0)
    let [borrwStatus, setBorrowStatus] = useState('')

    console.log("row data", props.itemRowData)

    let navigate = useNavigate()

    const authData = useContext(StateContext)
    const dispatch = useContext(DispatchContext)

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log("submited data ", data)
        if (data) {
            axios({
                method: 'PATCH',
                url: 'http://localhost:4000/item/update',
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                },
                withCredentials: true,
                data: {
                    ...data,
                    itemId: props.itemRowData.id,
                    current_date: getDate(),
                    current_time: getTime()
                }
            }).then((res) => {
                console.log("status code update stock", res)
                if (res.status === 200) {
                    props.getItemData()
                    props.setViewPopUp(false)
                    props.setGlobalPopUp({ id: 2, header: 'Updated', message: 'Data has been updated' }) // show the success message
                }
                // if (res.data.statuscode === 200) {
                //     props.getItemData()
                //     props.setViewPopUp(false)
                //     props.setGlobalPopUp({ id: 2, header: 'Updated', message: 'Data has been updated' }) // show the success message
                // } else if (res.data.statuscode === 401) { //token expired
                //     localStorage.removeItem('token')
                //     dispatch({ type: 'auth_logout' })
                //     navigate('/login', { replace: true })
                //     //setGlobalPopUp({id:3,header:'Token Expired',message:'You need to login again.'})
                // } else if (res.data.statuscode === 400) {
                //     props.setGlobalPopUp({ id: 3, header: 'Bad request', message: 'please check your request' })
                // } else if (res.data.statuscode === 500) {
                //     props.setGlobalPopUp({ id: 4, header: 'Oops', message: 'Internal server error' })
                // }
            }).catch((err) => {
                console.log(err)
                if (err.response.status === 401) {
                    props.setGlobalPopUp({ id: 3, header: `${err.response.status} ${err.response.data.error}!`, message: `${err.response.data.error} You need to Login again` })
                    dispatch({ type: 'auth_logout' })
                    navigate('/login', { replace: true })
                } else {
                    props.setGlobalPopUp({ id: 4, header: `${err.response.status} ${err.response.data.error}!`, message: `${err.response.data?.details ?? err.response.data?.error}` })
                }
            })
        }
    }


    let checkItemDump = useCallback(() => {
        axios({
            method: 'POST',
            url: 'http://localhost/soft-lab-api/route/services/item-dump-check.php', //checking the item return or not form borrower
            headers: {
                'Content-type': 'application/json; charset=utf-8',
                'Authorization': authData.JWT,
            },
            data: {
                id: props.itemRowData.id,
            }
        }).then((res) => {
            console.log("status code dump item", res)
            if (res.data.statuscode === 200) {
                setDumpBtn(0)
            } else if (res.data.statuscode === 401) { //token expired
                localStorage.removeItem('token')
                dispatch({ type: 'auth_logout' })
                navigate('/login', { replace: true })
                //setGlobalPopUp({id:3,header:'Token Expired',message:'You need to login again.'})
            } else if (res.data.statuscode === 400) {
                props.setGlobalPopUp({ id: 3, header: 'Bad request', message: 'please check your request' })
            } else if (res.data.statuscode === 500) {
                props.setGlobalPopUp({ id: 4, header: 'Oops', message: 'Internal server error' })
            } else if (res.data.statuscode === 409) {
                setDumpBtn(1)
                setBorrowStatus('Borrowed')
            }
        }).catch((err) => {
            console.log(err)
            props.setGlobalPopUp({ id: 4, header: `${err.message}!`, message: `${err.message}! please check your network` })
        })
    }, [authData.JWT, dispatch, navigate, props])


    function setDump(itemId) {
        axios({
            method: 'POST',
            url: 'http://localhost/soft-lab-api/route/services/dump-item.php',
            headers: {
                'Content-type': 'application/json; charset=utf-8',
                'Authorization': authData.JWT,
            },
            data: {
                id: itemId,
                current_date: getDate(),
                current_time: getTime()
            }
        }).then((res) => {
            console.log("status code dump item", res)
            if (res.data.statuscode === 200) {
                props.getItemData()
                props.setViewPopUp(false)
                props.setGlobalPopUp({ id: 2, header: 'Dumped', message: 'item successfully dumped' }) // show the success message
            } else if (res.data.statuscode === 401) { //token expired
                localStorage.removeItem('token')
                dispatch({ type: 'auth_logout' })
                navigate('/login', { replace: true })
                //setGlobalPopUp({id:3,header:'Token Expired',message:'You need to login again.'})
            } else if (res.data.statuscode === 400) {
                props.setGlobalPopUp({ id: 3, header: 'Bad request', message: 'please check your request' })
            } else if (res.data.statuscode === 500) {
                props.setGlobalPopUp({ id: 4, header: 'Oops', message: 'Internal server error' })
            } else if (res.data.statuscode === 409) {
                props.setGlobalPopUp({ id: 4, header: 'Item Borrowed', message: 'You cant dump this item' })
            }
        }).catch((err) => {
            console.log(err)
            props.setGlobalPopUp({ id: 4, header: `${err.message}!`, message: `${err.message}! please check your network` })
        })
    }

    function getDate() {
        const today = new Date();
        let month = today.getMonth() + 1;
        let year = today.getFullYear();
        let date = today.getDate();
        date = date < 10 ? `0${date}` : date
        month = month < 10 ? `0${month}` : month
        return `${year}-${month}-${date}`;
    }
    function getTime() {
        const today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        return `${h}:${m}`;
    }

    useEffect(() => {
        //checkItemDump()
    }, [checkItemDump])

    return (
        <div className='item-view-popup'>
            <div className="content">
                <div className="top-section">
                    <h2>Item Details</h2>
                    {borrwStatus !== '' ? <span>{borrwStatus}</span> : null}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick={() => props.setViewPopUp(false)}>
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="data-section">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='input'>
                            <p> Item Name</p>
                            <input type='text' value={props.itemRowData.name} {...register("itemname", { required: true, minLength: 1, maxLength: 10 })} />
                            <span>
                                {errors.itemname?.type === "minLength" && "item Name must contain 1 character or number"}
                                {errors.itemname?.type === "maxLength" && "item Name must be less than 10 length "}
                                {errors.itemname?.type === "required" && "item Name Required"}
                            </span>
                        </div>
                        <div className='input'>
                            <p>Select Stock</p>
                            <select defaultValue={props.itemRowData.s_id} {...register("stockid", { required: true })} onClick={(e) => {
                                //setError1('')
                            }}>
                                {
                                    props.allStockData.length !== 0 ? props.allStockData.map((data) => {
                                        return (
                                            data.category !== '' ? <option key={data.id} value={data.id}>{data.name}</option> : null
                                        )
                                    }) : <option> No data</option>
                                }

                            </select>
                            <span>

                            </span>
                        </div>
                        <div className='input'>
                            <p> Select Brand</p>
                            <select defaultValue={props.itemRowData.b_id} {...register("brandId", { required: true })} onClick={(e) => {
                                //setError2('')
                            }}>
                                {
                                    props.brandData.length !== 0 ? props.brandData.map((data) => {
                                        return (
                                            <option key={data.id} value={data.id}>{data.name}</option>
                                        )
                                    }) : <option> No data</option>
                                }

                            </select>
                        </div>
                        <div className='input'>
                            <p> Model</p>
                            <input defaultValue={props.itemRowData.model} type='text' {...register("model", { required: true, minLength: 1, maxLength: 20 })} />
                            <span>
                                {errors.model?.type === "required" && "This field Required"}
                                {errors.model?.type === "minLength" && "This field must contain 1 character or number"}
                                {errors.model?.type === "maxLength" && "This field must be less than 20 length"}
                            </span>
                        </div>
                        <div className='input'>
                            <p> Description</p>
                            <input defaultValue={props.itemRowData.description} type='text' {...register("description", { required: true, minLength: 1, maxLength: 50 })} />
                            <span>
                                {errors.description?.type === "required" && "This field Required"}
                                {errors.description?.type === "minLength" && "This field must contain 1 character or number"}
                                {errors.description?.type === "maxLength" && "This field must be less than 50 length"}
                            </span>
                        </div>
                        <div className='input'>
                            <p> Warranty</p>
                            <input defaultValue={props.itemRowData.warranty} type='text' {...register("wdate", { required: true, pattern: /^[0-9]{4}[-]{1}[0-9]{2}[-]{1}[0-9]{2}$/g })} placeholder='yyyy-mm-dd' />
                            <span>
                                {errors.wdate?.type === "required" && "Warranty Date Required"}
                                {errors.wdate?.type === "pattern" && "YYYY-MM-DD"}
                            </span>
                        </div>
                        <div className='input'>
                            <p> Item Type</p>
                            <input defaultValue={props.itemRowData.type} type='text' {...register("Itype", { required: true, minLength: 1, maxLength: 50 })} />
                            <span>
                                {errors.Itype?.type === "required" && "This field Required"}
                                {errors.Itype?.type === "minLength" && "This field must contain 1 character or number"}
                                {errors.Itype?.type === "maxLength" && "This field must be less than 50 length"}
                            </span>
                        </div>
                        <div className='input'>
                            <p> Lab Location</p>
                            <input defaultValue={props.itemRowData.lab_location} type='text' {...register("location", { required: true, minLength: 1, maxLength: 50 })} />
                            <span>
                                {errors.location?.type === "required" && "This field Required"}
                                {errors.location?.type === "minLength" && "This field must contain 1 character or number"}
                                {errors.location?.type === "maxLength" && "This field must be less than 50 length"}
                            </span>
                        </div>
                        <div className='input'>
                            <p> Item Status</p>
                            <input defaultValue={props.itemRowData.status} type='text' {...register("status", { required: true, minLength: 1, maxLength: 50 })} />
                            <span>
                                {errors.status?.type === "required" && "This field Required"}
                                {errors.status?.type === "minLength" && "This field must contain 1 character or number"}
                                {errors.status?.type === "maxLength" && "This field must be less than 50 length"}
                            </span>
                        </div>
                        <div className='input'>
                            <p> Price</p>
                            <input defaultValue={props.itemRowData.amount} type='number' {...register("totalprice", { required: true, minLength: 1, maxLength: 20 })} />
                            <span>
                                {errors.totalprice?.type === "minLength" && "This field must contain 1 character"}
                                {errors.totalprice?.type === "maxLength" && "This field must be less than 20 length"}
                                {errors.totalprice?.type === "required" && "This field Required"}
                            </span>
                        </div>
                        <div className="btn">
                            {
                                dumpBtn === 0 && <input type="button" value="Dump" onClick={() => setDump(props.itemRowData.id)} />
                            }
                            <input type="submit" value="Update" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ViewItemPopUp
