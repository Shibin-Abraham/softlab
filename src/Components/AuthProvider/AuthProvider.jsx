import React,{useReducer, createContext} from 'react'

const DispatchContext = createContext()
const StateContext = createContext()

function AuthProvider(props) {

    const initialState = {
        authentication: false,
    }

    const reducer = (state,action)=>{
        switch(action.type){
            case 'auth_login':
                return {...state,authentication: true}
            case 'auth_logout':
                return {...state,authentication: false}
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
