import React,{ useState } from 'react'
import './Login.css'
import { useForm } from 'react-hook-form'
import { NavLink} from "react-router-dom";

function Login() {
  let [loader,setLoader] = useState(false)

  const {register,handleSubmit,formState:{errors}} = useForm();

  let onSubmit = (data)=>{
    if(data){
      setLoader(true)
    }
  }
  return (
    <>
        <div className='login'>
        <div className='content '>
            <div className="top-section">
              <div className="waviy">
              <span style={{"--i": "1"}}>L</span>
              <span style={{"--i": "2"}}>O</span>
              <span style={{"--i": "3"}}>G</span>
              <span style={{"--i": "4"}}>I</span>
              <span style={{"--i": "5"}}>N</span>
              </div>
            </div>
            <div className="data-section">
              <form onSubmit={handleSubmit(onSubmit)}>
                <span>Invalid email</span>
                  <div className='input'>
                    <p>Email</p>
                    <input type="email" placeholder=' Email address' {...register('email',{required:true,pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i})} autoComplete='off'/>
                    <span>
                      {errors.email?.type === "required" && "Email address required"}
                      {errors.email?.type === "pattern" && "Please enter a valid Email"}
                    </span>
                  </div>
                  <div className='input'>
                    <p>Password</p>
                    <input type="password" placeholder=' Password' {...register('password',{required:true,minLength:4})} />
                    <span>
                      {errors.password?.type === "required" && "Password required"}
                      {errors.password?.type === "minLength" && "Password must contain 4 character or number"}
                    </span>
                  </div>
                  <div className='btn'>
                    <button type="submit" style={loader?{pointerEvents:'none'}:{pointerEvents:'auto'}}>{loader?<div className="loader"></div>:`LOGIN`}</button>
                  </div>    
              </form>
            </div>
            <div className='footer'>
              <p>Don't have an account? <NavLink to="/signup" replace><span>SignUp</span></NavLink></p>
              <p>Forgot Password</p>
            </div>
        </div>
      {/*<h2 onClick={()=>props.setPopUpActive(false)}>POPup</h2>*/}
    </div>
    </>
  )
}

export default Login
