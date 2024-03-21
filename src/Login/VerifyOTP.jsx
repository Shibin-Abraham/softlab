import React,{useState} from 'react'
import './VerifyOTP.css'
import { useLocation } from 'react-router-dom'
import OtpInput from 'otp-input-react'
import ConfirmationPopUp from './PopUp/ConfirmationPopUp'
import ErrorPopUp from './PopUp/ErrorPopUp'
import axios from 'axios'

function VerifyOTP() {
  const location = useLocation()
  const [otp,setOtp] = useState('')
  const [success,setSuccess] = useState(false)
  const [verfyBtn,setVerifyBtn] = useState(false)
  const [invalid,setInvalid] = useState(false)
  const [loader,setLoader] = useState(false)

  let error = (otp.length!==6)?"error":null
  return (
    <>
        <div className='otp'>
        <div className='content'>
            <div className="top-section">
              <h2>Verify OTP</h2>
            </div>
            <div className="data-section">
                  <div className="input">
                    <p>OTP has been to your registered email address</p>
                    <span>Invalid OTP</span>
                  </div>
                  <div className='input'>
                    <OtpInput value={otp} onChange={setOtp} OTPLength={6} otpType='number' disabled={false} autoFocus className='otp-input'></OtpInput>
                  </div>
                  <div className='btn'>
                    <button onClick={()=>{
                      if(otp.length === 6 && location.state.sessionId !== ''){
                        let session = location.state.sessionId
                        setVerifyBtn(true)
                        setLoader(true)
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
                          }
                        })
                      }else{
                        setInvalid(true)
                        setTimeout(()=>setInvalid(false),5000)
                      }
                      
                      }} style={loader||invalid||success?{pointerEvents:'none'}:{pointerEvents:'auto'}}>{loader?<div className="loader"></div>:`Verify`}</button>
                  </div>    
            </div>
            <div className='footer'>
              <p>Didn't receive any OTP ? <span>{otp}</span></p>
            </div>
        </div>
      {/*<h2 onClick={()=>props.setPopUpActive(false)}>POPup</h2>*/}
      </div>
      {invalid && <ErrorPopUp message="Please enter valid input"/>}
      {success && <ConfirmationPopUp />}
    </>
  )
}

export default VerifyOTP
