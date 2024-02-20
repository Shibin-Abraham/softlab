import React,{useState} from 'react'
import UpdatePopUp from './PopUps/UpdatePopUp'

function Action(props) {
    let [popUpActive,setPopUpActive] = useState(false)
    let [userState,setUserState] = useState('Reject')//props needed here !!!!!!!!!!!!
    let [status,setStatus] = useState(userState==='Assign'?'Pending':'Active')
    function assignUser(){
        setUserState((previous)=>{
            previous==='Assign'?setStatus('Active'):setStatus('Pending')
            return previous==='Assign'?'Reject':'Assign'
        })
    }

  return (
    <>
    <td>{status}</td>
    <td>
        <button onClick={()=>assignUser()}>{userState}</button>
        <button onClick={()=>setPopUpActive(true)}>update</button>
        <button>delete</button>
    </td>
    {popUpActive && <UpdatePopUp setPopUpActive={setPopUpActive} />}
    </>
  )
}

export default Action
