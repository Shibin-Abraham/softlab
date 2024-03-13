import React,{useState} from 'react';

import './Users.css';
import Action from './Action';
import AddStock from './PopUps/AddStock';
import UpdatePopUp from './PopUps/UpdatePopUp'
import AssignStockRole from './PopUps/AssignStockRole';

function Users() {
    let [newStock,setNewStock] = useState(false)
    let [assignStockRole,setAssignStockRole] = useState(false)
    let [updatePopUp,setUpdatePopUp] = useState(false)
    
  return (
    <div className='users'>
      <section>
        <div className="top-container">
            <h1>Users</h1>
            <button onClick={()=>setNewStock(true)}>Add New Stock</button>
        </div>
        <div className="mid-box">
            <div className='container'>
                <div className='table-section'>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Join Date</th>
                                
                                <th>Status</th>
                                <th>Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> soft lab</td>
                                <td> softlab@gmail.com</td>
                                <td>6235287817</td>
                                <td> 12-03-2024</td>
                                
                                {<Action/>}
                            </tr>
                            <tr>
                                <td> soft lab</td>
                                <td> softlab@gmail.com</td>
                                <td>6235287817</td>
                                <td> 12-03-2024</td>
                                
                                {<Action/>}
                            </tr>
                            <tr>
                                <td> soft lab</td>
                                <td> softlab@gmail.com</td>
                                <td>6235287817</td>
                                <td> 12-03-2024</td>
                                
                                {<Action/>}
                            </tr>
                            <tr>
                                <td> soft lab</td>
                                <td> softlab@gmail.com</td>
                                <td>6235287817</td>
                                <td> 12-03-2024</td>
                                
                                {<Action/>}
                            </tr>
                            <tr>
                                <td> soft lab</td>
                                <td> softlab@gmail.com</td>
                                <td>6235287817</td>
                                <td> 12-03-2024</td>
                                
                                {<Action/>}
                            </tr>
                            
                        </tbody>
                    </table>
                </div>

            </div>
            
            <div className="container-2">
                <table>
                    <thead>
                        <tr>
                            <th>Stock Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>TEQIP</td>
                        </tr>
                        <tr>
                            <td>TEQIP</td>
                        </tr>
                        <tr>
                            <td>TEQIP</td>
                        </tr>
                        
                    </tbody>
                </table>
                {newStock && <AddStock setNewStock={setNewStock} />}
                {assignStockRole && <AssignStockRole setAssignStockRole={setAssignStockRole} />}
            </div>
            <div className='container-3-control'>
                <h2>Stock Handling Users</h2>
                <button onClick={()=>setAssignStockRole(true)}>Assign Stock & Role to User</button>
            </div>
            <div className='container-3'>
                <div className='table-section'>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Stock in hand</th>
                                <th>Role</th>
                                <th>Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> soft lab</td>
                                <td> softlab@gmail.com</td>
                                <td>TEQP</td>
                                <td> Manager</td>
                                <td><button onClick={()=>setUpdatePopUp(true)}>Update</button></td>
                            </tr>
                            <tr>
                                <td> soft lab</td>
                                <td> softlab@gmail.com</td>
                                <td>TEQP</td>
                                <td> Assistent</td>
                                <td><button onClick={()=>setUpdatePopUp(true)}>Update</button></td>
                            </tr>
                            <tr>
                                <td> soft lab</td>
                                <td> softlab@gmail.com</td>
                                <td>TEQP</td>
                                <td> Assistent</td>
                                <td><button onClick={()=>setUpdatePopUp(true)}>Update</button></td>
                            </tr>
                            <tr>
                                <td> soft lab</td>
                                <td> softlab@gmail.com</td>
                                <td>TEQP</td>
                                <td> Assistent</td>
                                <td><button onClick={()=>setUpdatePopUp(true)}>Update</button></td>
                                {updatePopUp && <UpdatePopUp setUpdatePopUp={setUpdatePopUp} />}
                            </tr>
                            
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
      </section>
    </div>
  )
}

export default Users
