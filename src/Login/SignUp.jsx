import React, { useState, useEffect } from 'react'
import './SignUp.css'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from "react-router-dom"
import GlobalPopUp from '../Components/GlobalPopUp/GlobalPopUp'
import axios from 'axios'

function SignUp() {
  const [role, setRole] = useState([])
  let [responseError, setReponseError] = useState('')
  const [globalPopUp, setGlobalPopUp] = useState({})
  const { register, handleSubmit, formState: { errors } } = useForm()
  let [password, setPassword] = useState('')
  let [loader, setLoader] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:4000/roles'
    }).then((res) => {
      console.log("type orm ", res.data)
      res.status === 200 && setRole(res.data)
      // check respose status code initially
    }).catch((error) => {
      if (error.message === 'Network Error' && !error.response) {
        setGlobalPopUp({ id: 4, header: `${error.message}`, message: 'Please try agin later' })
      } else {
        setGlobalPopUp({ id: 4, header: 'Error', message: `${error.message}` })
      }
    })
  }, [])
  // set the role option to select tag
  let options = role.map((data, index) => {
    return (<option key={index} value={data}>{data}</option>)
  })
  //onsubmit 
  let onSubmit = (data) => {
    console.log(data)
    if (data) {
      setReponseError('')
      setLoader(true)
      axios({
        method: 'POST',
        url: 'http://localhost/soft-lab-api/route/signup.php',
        data: data
      }).then((res) => {
        checkResponse(res)
      }).catch((error) => {
        if (error.message === 'Network Error' && !error.response) {
          setLoader(false)
          setGlobalPopUp({ id: 4, header: `${error.message}`, message: `${error}` })
        } else {
          setLoader(false)
          setGlobalPopUp({ id: 4, header: 'Error', message: `${error.message}` })
        }
      })
    }
  }
  // check the response status code and send corresponding popup message
  function checkResponse(res) {
    if (res.data.statuscode === 200 && res.data.sessionID !== '') {
      let sessionId = res.data.sessionID
      console.log(res, sessionId)
      setLoader(false)
      navigate('/verifyotp', { replace: true, state: { sessionId } })
    } else if (res.data.statuscode === 424) {
      setLoader(false)
      setGlobalPopUp({ id: 4, header: 'Email send error', message: 'Invalid email address or check your network' })
    } else if (res.data.statuscode === 403) {
      setLoader(false)
      setReponseError('email already exists')
    } else if (res.data.statuscode === 503) {
      setLoader(false)
      setGlobalPopUp({ id: 4, header: 'Server error', message: 'server under maintainess' })
    } else if (res.data.statuscode === 401) {
      setLoader(false)
      setReponseError('Password should match')
    } else if (res.data.statuscode === 400) {
      setLoader(false)
      setGlobalPopUp({ id: 4, header: 'Bad request', message: 'please check your request' })
    }
  }

  return (
    <>
      <div className='signup'>

        {globalPopUp.id === 1 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
        {globalPopUp.id === 2 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
        {globalPopUp.id === 3 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
        {globalPopUp.id === 4 ? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} /> : null}
        <div className='content '>
          <div className="top-section">
            <div className="waviy">
              <span style={{ "--i": "1" }}>S</span>
              <span style={{ "--i": "2" }}>I</span>
              <span style={{ "--i": "3" }}>G</span>
              <span style={{ "--i": "4" }}>N</span>
              <span style={{ "--i": "5" }}>-</span>
              <span style={{ "--i": "6" }}>U</span>
              <span style={{ "--i": "7" }}>P</span>

            </div>

          </div>
          <div className="data-section">
            <span>{responseError}</span>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='input'>
                <p>Name</p>
                <input type="text" placeholder=' Enter your Name' {...register('name', { required: true, pattern: /^[a-z A-Z]+$/, minLength: 2, maxLength: 20 })} autoComplete='off' />
                <span>
                  {errors.name?.type === "required" && "Name required"}
                  {errors.name?.type === "pattern" && "Please Enter the valid name"}
                  {errors.name?.type === "minLength" && "Name must contain 2 character"}
                  {errors.name?.type === "maxLength" && "Name must be less than 20 length"}
                </span>
              </div>

              <div className='input'>
                <p>Email</p>
                <input type="email" placeholder=' Email address' {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} autoComplete='off' />
                <span>
                  {errors.email?.type === "required" && "Email address required"}
                  {errors.email?.type === "pattern" && "Please enter a valid Email"}
                </span>
              </div>
              <div className='input'>
                <p>Phone</p>
                <input type="tel" placeholder=' Phone Number' {...register('phone', { required: true, pattern: /^[0-9+-]{10}$/i })} autoComplete='off' />
                <span>
                  {errors.phone?.type === "required" && "Phone number required"}
                  {errors.phone?.type === "pattern" && "Please enter 10 digit mobile number"}
                </span>
              </div>
              <div className='input'>
                <p>Password</p>
                <input type="password" placeholder=' Password' {...register('password', { required: true, minLength: 4 })} onChange={(e) => setPassword(e.target.value)} />
                <span>
                  {errors.password?.type === "required" && "Password required"}
                  {errors.password?.type === "minLength" && "Password must contain 4 character or number"}
                </span>
              </div>
              <div className='input'>
                <p>confirm Password</p>
                <input type="password" placeholder='Confirm Password' {...register('passwordrepeat', {
                  required: true, validate: (data) => {
                    return data === password || "Password do not match"
                  }
                })} />
                <span>
                  {errors.passwordrepeat?.type === "required" && "Password should match"}
                  {errors.passwordrepeat?.message}
                </span>
              </div>
              <div className='input'>
                <p>Position</p>
                <select {...register("position", { required: true })}>
                  {options}
                </select>
                <span>
                  {errors.position?.type === "required" && "Select one Option"}
                </span>
              </div>
              <div className='btn'>
                <button type='submit' style={loader ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }}>{loader ? <div className="loader"></div> : `SIGN UP`}</button>
              </div>
            </form>
          </div>
          <div className='footer'>
            <p>Already have an account?<NavLink to='/login' replace> <span>Login</span></NavLink></p>

          </div>
        </div>
        {/*<h2 onClick={()=>props.setPopUpActive(false)}>POPup</h2>*/}
      </div>
    </>
  )
}

export default SignUp
