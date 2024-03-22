import React,{useState} from 'react'
import './VerifyOTP.css'
import { NavLink,useLocation } from 'react-router-dom'
import OtpInput from 'otp-input-react'
import ConfirmationPopUp from './PopUp/ConfirmationPopUp'
import ErrorPopUp from './PopUp/ErrorPopUp'
import axios from 'axios'

function VerifyOTP() {
  const location = useLocation()
  console.log(location)
  const [otp,setOtp] = useState('')
  const [errorMsg,setErrorMsg] = useState('')
  const [success,setSuccess] = useState(false)
  const [invalid,setInvalid] = useState(false)
  const [loader,setLoader] = useState(false)

  return (
    <>
        <div className='otp'>
        <div className='content'>
            <div className="top-section">
              <h2>Verify OTP</h2>
            </div>
            <div className="data-section">
                  <div className="input">
                    <p>OTP has been send to your registered email address</p>
                    <span>{errorMsg}</span>
                  </div>
                  <div className='input'>
                    <OtpInput value={otp} onChange={setOtp} OTPLength={6} otpType='number' disabled={false} autoFocus className='otp-input'></OtpInput>
                  </div>
                  <div className='btn'>
                    <button onClick={()=>{
                      if(otp.length === 6){
                        setErrorMsg('')
                        setLoader(true)
                        if(location.state !== null){
                          let session = location.state.sessionId
                          let obj = {
                            OTP:`${otp}`,
                            sessionId:`${session}`
                          }
                          axios({
                            method: 'POST',
                            url: 'http://localhost/soft-lab-api/route/verify-otp.php',
                            data: obj //pass the data object to server for verification
                          }).then((res)=>{
                            console.log(res.data)
                            if(res.data.statuscode === 200 && res.data.email !== ''){
                              setLoader(false)
                              setSuccess(true)
                            }else if(res.data.statuscode === 100){
                              setLoader(false)
                              setErrorMsg('Server error please try again later')
                            }else if(res.data.statuscode === 401){
                              setLoader(false)
                              setErrorMsg('Invalid OTP')
                            }else if(res.data.statuscode === 440){
                              setLoader(false)
                              setErrorMsg('Session expired please try again')
                            }
                          })
                        }else{
                          setLoader(false)
                          setErrorMsg('Failed to find session')
                          setTimeout(()=>setErrorMsg(''),5000)
                        }
                      }else{
                        setInvalid(true)
                        setTimeout(()=>setInvalid(false),5000)
                      }
                      
                      }} style={loader||invalid||success?{pointerEvents:'none'}:{pointerEvents:'auto'}}>{loader?<div className="loader"></div>:`Verify`}</button>
                  </div>    
            </div>
            <div className='footer'>
              <p>Didn't receive any OTP ? <NavLink to='/signup' replace><span>SignUp again</span></NavLink></p>
            </div>
        </div>
      {/*<h2 onClick={()=>props.setPopUpActive(false)}>POPup</h2>*/}
      </div>
      {invalid && <ErrorPopUp message="Please enter valid input"/>}
      {errorMsg!=='' && <ErrorPopUp message={errorMsg}/>}
      {success && <ConfirmationPopUp />}
    </>
  )
}

export default VerifyOTP
