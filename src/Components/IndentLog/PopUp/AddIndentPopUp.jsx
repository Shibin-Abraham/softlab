import React, { useContext, useEffect, useState } from 'react'
import './AddIndentPopUp.css'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { DispatchContext } from '../../AuthProvider/AuthProvider';
import axios from 'axios';

function AddIndentPopUp(props) {

    let [popUpActive, setPopUpActive] = useState('')
    const navigate = useNavigate()
    let [img, setImg] = useState('')

    const dispatch = useContext(DispatchContext)

    const { register, handleSubmit, formState: { errors } } = useForm();

    let onSubmit = (d) => {
        if (d) {
            //console.log("d  ", d)
            const formData = new FormData()
            formData.append('indent-img', img)
            formData.append('stockId', d.stockid)
            axios.post('http://localhost:4000/indent/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            }).then((res) => {
                //console.log("indent response ------------", res)
                if (res.status === 200) {
                    props.getIndentData()
                    setPopUpActive('')//close AddStockPopUp 
                    props.setGlobalPopUp({ id: 1, header: 'Success', message: 'Indent data successfully added' }) // show the success message
                    setTimeout(() => { props.setAddIndentPopUp(false) }, 300)
                }
                //else if (res.data.statuscode === 401) { //token expired
                //     localStorage.removeItem('token')
                //     dispatch({ type: 'auth_logout' })
                //     navigate('/login', { replace: true })
                //     //setGlobalPopUp({id:3,header:'Token Expired',message:'You need to login again.'})
                // } else if (res.data.statuscode === 400) {
                //     props.setGlobalPopUp({ id: 3, header: 'Bad request', message: 'please check your request' })
                // } else if (res.data.statuscode === 500) {
                //     props.setGlobalPopUp({ id: 4, header: 'Oops', message: 'Internal server error' })
                // } else if (res.data.statuscode === 406) {
                //     props.setGlobalPopUp({ id: 4, header: 'File Upload Failed', message: 'Please upload png or jpg file ' })
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

    useEffect(() => {
        setTimeout(() => setPopUpActive('popup-active'), 1)
    }, [])
    return (
        <div className='add-indent-popup'>
            <div className={`content ${popUpActive}`}>
                <div className="top-section">
                    <h3>Add Indent</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick={() => {
                        setPopUpActive('')
                        setTimeout(() => {
                            props.setAddIndentPopUp(false)
                        }, 300)
                    }}>
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12
                 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06
                  12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                    </svg>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="data-section">
                        <div>
                            <select {...register("stockid", { required: true })}>
                                <option value="">
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    select stock
                                </option>
                                {
                                    props.allStockData.map((data, index) => {
                                        return (
                                            <option key={index} value={data.id}>{data.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <p>
                                {errors.stockid?.type === "required" && "Please select one option"}
                            </p>
                        </div>

                        <input type="file" accept="image/png,image/jpeg" {...register("img", { required: true })} name='indent-img' onChange={(e) => setImg(e.currentTarget.files[0])} />
                        <p>
                            {errors.img?.type === "required" && "Please upload one img"}
                        </p>
                        <input type="submit" value="Submit" />
                    </div>
                </form>

            </div>
            {/*<h2 onClick={()=>props.setPopUpActive(false)}>POPup</h2>*/}
        </div>
    )
}

export default AddIndentPopUp
