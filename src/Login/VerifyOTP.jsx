import React,{useState} from 'react'
import './VerifyOTP.css'
import OtpInput from 'otp-input-react'
import ConfirmationPopUp from './PopUp/ConfirmationPopUp'
import ErrorPopUp from './PopUp/ErrorPopUp'

function VerifyOTP() {
  const [otp,setOtp] = useState('')
  const [verfyBtn,setVerifyBtn] = useState(false)
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
                    <p>OTP has been to your registered email address</p>
                  </div>
                  <div className='input'>
                    <OtpInput value={otp} onChange={setOtp} OTPLength={6} otpType='number' disabled={false} autoFocus className='otp-input'></OtpInput>
                  </div>
                  <div className='btn'>
                    <button onClick={()=>{
                      setVerifyBtn(true)
                      setLoader(true)
                      }}>{loader?<div className="loader"></div>:`Verify`}</button>
                  </div>    
            </div>
            <div className='footer'>
              <p>Didn't receive any OTP ? <span>{otp}</span></p>
            </div>
        </div>
      {/*<h2 onClick={()=>props.setPopUpActive(false)}>POPup</h2>*/}
      </div>
      {verfyBtn?otp.length!==6?<ErrorPopUp message="Please enter valid input"/>:<ConfirmationPopUp />:null}
    </>
  )
}

export default VerifyOTP
