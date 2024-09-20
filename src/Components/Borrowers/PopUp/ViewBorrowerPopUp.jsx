import React, { useContext } from 'react'
import './ViewBorrowerPopUp.css'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { DispatchContext, StateContext } from '../../AuthProvider/AuthProvider';
import axios from 'axios';

function ViewBorrowerPopUp(props) {
    console.log(props)
    const { register, handleSubmit, formState: { errors } } = useForm();

    let navigate = useNavigate()

    const authData = useContext(StateContext)
    const dispatch = useContext(DispatchContext)

    const onSubmit = (data) => {
        if (data) {
            console.log(data)
            axios({
                method: 'PATCH',
                url: 'http://localhost:4000/borrowers/update/return-status',
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                },
                withCredentials: true,
                data: { ...data, bId: props.borrowerRowData.bId, returnStatus: true, date: getDate(), time: getTime() }
            }).then((res) => {
                console.log("status of return 333333333333", res)
                if (res.status === 200) {
                    props.getBorrowersData()
                    props.setViewBorrowerPopUp(false)
                    props.setGlobalPopUp({ id: 2, header: 'Updated', message: 'Data has been updated' })
                }

                // if (res.data.statuscode === 200) {
                //     props.getBorrowersData()
                //     props.setViewBorrowerPopUp(false)
                //     props.setGlobalPopUp({ id: 1, header: 'Updated', message: 'Data has been updated' })
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
                if (err.response.status === 401) {
                    props.setGlobalPopUp({ id: 3, header: `${err.response.status} ${err.response.data.error}!`, message: `${err.response.data.error} You need to Login again` })
                    dispatch({ type: 'auth_logout' })
                    navigate('/login', { replace: true })
                } else {
                    props.setGlobalPopUp({ id: 4, header: `${err.response.status} ${err.response.data.error}!`, message: `${err.response.data.error}` })
                }
            })

        }
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

    return (
        <div className='borrower-view-popup'>
            <div className="content">
                <div className="top-section">
                    <h2>Borrower Details <p>{props.borrowerRowData.sName}</p></h2>
                    <svg onClick={() => props.setViewBorrowerPopUp(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="data-section">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='input'>
                            <p> Name</p>
                            <input type='text' {...register("bname", { required: false })} value={props.borrowerRowData.bName} />

                        </div>
                        <div className='input'>
                            <p> Admission No</p>
                            <input type='text' {...register("admissionno", { required: false })} value={props.borrowerRowData.admno} />

                        </div>
                        <div className='input'>
                            <p> Branch</p>
                            <input type='text' {...register("branch", { required: false })} value={props.borrowerRowData.branch} />

                        </div>
                        <div className='input'>
                            <p> Semester</p>
                            <input type='text' {...register("semester", { required: false })} value={props.borrowerRowData.sem} />
                        </div>
                        <div className='input'>
                            <p> Item</p>
                            <input type='text' {...register("itemno", { required: false })} value={props.borrowerRowData.name} />
                        </div>
                        <div className='input'>
                            <p> Phone number</p>
                            <input type='text' {...register("phone", { required: false })} value={props.borrowerRowData.phone} />
                        </div>
                        <div className='input'>
                            <p> Lent On</p>
                            <input type='text' {...register("bdate", { required: false })} placeholder='yyyy-mm-dd' value={props.borrowerRowData.date} />
                        </div>
                        <div className="btn">

                            <input type="submit" value="Returned" />

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ViewBorrowerPopUp
