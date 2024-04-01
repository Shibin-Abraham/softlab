import React,{useContext} from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { StateContext } from '../AuthProvider/AuthProvider'


function PrivateRoutes() {
  const authData = useContext(StateContext)
    
  return (
    authData.authentication?<Outlet />:<Navigate to='/login' />
  )
}

export default PrivateRoutes
