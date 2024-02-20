import React,{useState} from 'react'
import UpdatePopUp from './PopUps/UpdatePopUp'
import DeletePopUp from './PopUps/DeletePopUp'

function Action(props) {

    let [updatePopUp,setUpdatePopUp] = useState(false)
    let [deletePopUp,setDeletePopUp] = useState(false)
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
    <td style={status==='Active'?{color: "#41f1b6"}:{color: "#ff7782"}}>{status}</td>
    <td>
        <button onClick={()=>assignUser()}>{userState}</button>
        <button onClick={()=>setUpdatePopUp(true)}>update</button>
        <button onClick={()=>setDeletePopUp(true)}>delete</button>
    </td>
    {updatePopUp && <UpdatePopUp setUpdatePopUp={setUpdatePopUp} />}
    {deletePopUp && <DeletePopUp setDeletePopUp={setDeletePopUp} />}
    </>
  )
}

export default Action
