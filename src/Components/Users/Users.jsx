import React from 'react';

import './Users.css';
import Action from './Action';

function Users() {
    
  return (
    <div className='users'>
      <section>
        <div className="top-container">
            <h1>Users</h1>
            <button>New Role</button>
        </div>
        <div className="mid-box">
            <div className='container'>
                <div className='table-section'>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Join Date</th>
                                <th>Status</th>
                                <th>Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> soft lab</td>
                                <td> softlab@gmail.com</td>
                                <td> Lab Manager</td>
                                <td> 20-02-24</td>
                                {<Action/>}
                            </tr>
                            <tr>
                                <td> soft lab</td>
                                <td> softlab@gmail.com</td>
                                <td> Lab Assistant</td>
                                <td> 20-02-24</td>
                                {<Action/>}
                            </tr>
                            <tr>
                                <td> soft lab</td>
                                <td> softlab@gmail.com</td>
                                <td> Lab Assistant</td>
                                <td> 20-02-24</td>
                                {<Action/>}
                            </tr>
                            <tr>
                                <td> soft lab</td>
                                <td> softlab@gmail.com</td>
                                <td>  Lab Assistant</td>
                                <td> 20-02-24</td>
                                {<Action/>}
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="container-2">

            </div>
        </div>
      </section>
    </div>
  )
}

export default Users
