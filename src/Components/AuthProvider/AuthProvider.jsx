import React,{useReducer, createContext} from 'react'

const DispatchContext = createContext()
const StateContext = createContext()

function AuthProvider(props) {
    
    const initialState = {
        authentication: false,
        JWT: localStorage.getItem('token')!==null?localStorage.getItem('token'):'',
        u_id: '',
        name: '',
        email: '',
        phone: '',
        join_date: '',
        status: '',
        r_id: '',
        r_name: ''

    }

    const reducer = (state,action)=>{
        switch(action.type){
            case 'auth_login':
                return {...state,
                    authentication: true,
                    JWT: action.JWT, 
                    u_id: action.u_id, 
                    name: action.name, 
                    email: action.email, 
                    phone: action.phone, 
                    join_date: action.join_date, 
                    status: action.status, 
                    r_id: action.r_id, 
                    r_name: action.r_name
                }
            case 'auth_logout':
                return {...state,authentication: false, JWT: ''}
            default:{
                return state;
            }
        }
    }

    const [state,dispatch] = useReducer(reducer,initialState)

    console.log("auth provider",state)
  return (
    <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>
            {props.children}
        </StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export {AuthProvider,DispatchContext,StateContext}
