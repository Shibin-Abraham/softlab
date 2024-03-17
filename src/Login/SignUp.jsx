import React,{useState} from 'react'
import './SignUp.css'
import { useForm} from 'react-hook-form'
import { NavLink} from "react-router-dom";

function SignUp() {

    const {register,handleSubmit,formState:{errors}} = useForm()
    let [password,setPassword] = useState('')

    let onSubmit = (data)=>{
        if(data){
            console.log(data)
        }
    }

  return (
    <>
        <div className='signup'>
        <div className='content '>
            <div className="top-section">
              <div className="waviy">
              <span style={{"--i": "1"}}>S</span>
              <span style={{"--i": "2"}}>I</span>
              <span style={{"--i": "3"}}>G</span>
              <span style={{"--i": "4"}}>N</span>
              <span style={{"--i": "5"}}>-</span>
              <span style={{"--i": "6"}}>U</span>
              <span style={{"--i": "7"}}>P</span>

              </div>
            </div>
            <div className="data-section">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='input'>
                    <p>Name</p>
                    <input type="text" placeholder=' Enter your Name' {...register('name',{required:true,pattern:/^[a-z A-Z]+$/,minLength:2,maxLength:20})}/>
                    <span>
                      {errors.name?.type === "required" && "Name required"}
                      {errors.name?.type === "pattern" && "Please Enter the valid name"}
                      {errors.name?.type ==="minLength"&& "Name must contain 2 character"}
                      {errors.name?.type ==="maxLength"&& "Name must be less than 20 length"}
                    </span>
                  </div>
                  
                  <div className='input'>
                    <p>Email</p>
                    <input type="email" placeholder=' Email address' {...register('email',{required:true,pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i})}/>
                    <span>
                      {errors.email?.type === "required" && "Email address required"}
                      {errors.email?.type === "pattern" && "Please enter a valid Email"}
                    </span>
                  </div>
                  <div className='input'>
                    <p>Phone</p>
                    <input type="tel" placeholder=' Phone Number' {...register('phone',{required:true,pattern:/^[0-9+-]{10}$/i})}/>
                    <span>
                      {errors.phone?.type === "required" && "Phone number required"}
                      {errors.phone?.type === "pattern" && "Please enter 10 digit mobile number"}
                    </span>
                  </div>
                  <div className='input'>
                    <p>Password</p>
                    <input type="password" placeholder=' Password' {...register('password',{required:true,minLength:4})} onChange={(e)=>setPassword(e.target.value)}/>
                    <span>
                      {errors.password?.type === "required" && "Password required"}
                      {errors.password?.type === "minLength" && "Password must contain 4 character or number"}
                    </span>
                  </div>
                  <div className='input'>
                    <p>confirm Password</p>
                    <input type="password" placeholder='Confirm Password' {...register('passwordrepeat',{required:true,validate:(data)=>{
                      return data===password||"Password do not match"
                    }})}/>
                    <span>
                      {errors.passwordrepeat?.type === "required" && "Password should match"}
                      {errors.passwordrepeat?.message}
                    </span>
                  </div>
                  <div className='input'>
                    <p>Position</p>
                       <select {...register("postion",{required:true})}>
                       <option value='HOD'>HOD</option>
                        <option value='Manager'>Manager</option>
                        <option value='Assistant'>Assistant</option>
                       </select>
                    <span>
                    {errors.position?.type === "required" && "Select one Option"}
                    </span>
                  </div>
                  <div className='btn'>
                    <input type="submit" value="SIGN UP"/>
                  </div>    
              </form>
            </div>
            <div className='footer'>
              <p>Already have an account?<NavLink to='/login'> <span>Login</span></NavLink></p>
              
            </div>
        </div>
      {/*<h2 onClick={()=>props.setPopUpActive(false)}>POPup</h2>*/}
    </div>
    </>
  )
}

export default SignUp
