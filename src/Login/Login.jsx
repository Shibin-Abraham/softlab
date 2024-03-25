import React,{ useState } from 'react'
import './Login.css'
import { useForm } from 'react-hook-form'
import { NavLink,useNavigate} from "react-router-dom"
import axios from 'axios'
import GlobalPopUp from '../Components/GlobalPopUp/GlobalPopUp'

function Login() {
  let [loader,setLoader] = useState(false)
  const [globalPopUp,setGlobalPopUp] = useState({})
  const [errorMsg,setErrorMsg] = useState('')

  const {register,handleSubmit,formState:{errors}} = useForm();
  const navigate = useNavigate()

  let onSubmit = (data)=>{
    if(data){
      console.log(data)
      setErrorMsg('')
      setLoader(true)
      axios({
        method: 'POST',
        url: 'http://localhost/soft-lab-api/route/login.php',
        data: data
      }).then((res)=>{
        setLoader(false)
        console.log(res)
        checkResponse(res)
      }).catch((err)=>{
        setLoader(false)
        setGlobalPopUp({id:4,header:`${err.message}`,message:`${err}`})
      })
    }
  }
  function checkResponse(res){
    if(res.data.statuscode === 200 && res.data.JWT !== null){
      //setGlobalPopUp({id:1,header:`Success`,message:`Successfully loged in`})
      navigate('/',{replace:true})
    }else if(res.data.statuscode === 401 && res.data.password){
      setErrorMsg('Invalid password')
      setGlobalPopUp({id:4,header:`Invalid input`,message:`Invalid password, Please try again`})
    }else if(res.data.statuscode === 401){
      setErrorMsg('Invalid email address')
      setGlobalPopUp({id:3,header:`Invalid input`,message:`Invalid email address, Please try again`})
    }else if(res.data.statuscode === 400){
      setGlobalPopUp({id:3,header:'Bad request',message:'please check your request'})
    }

  }
  return (
    <>
        <div className='login'>
        {globalPopUp.id === 1? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null}
        {globalPopUp.id === 2? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null} 
        {globalPopUp.id === 3? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null}
        {globalPopUp.id === 4? <GlobalPopUp setGlobalPopUp={setGlobalPopUp} data={globalPopUp} />:null}
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
                <span id='error-msg'>{errorMsg}</span>
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
