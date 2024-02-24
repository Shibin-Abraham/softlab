import React from 'react';

import './Users.css';
import Action from './Action';

function Users() {
    
  return (
    <div className='users'>
      <section>
        <h1>Users</h1>
        <div className='container'>
            <div className='table-section'>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
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
                            <td> 1913022024</td>
                            <td> Lab Manager</td>
                            <td> 20-02-24</td>
                            {<Action/>}
                        </tr>
                        <tr>
                            <td> soft lab</td>
                            <td> softlab@gmail.com</td>
                            <td> 1913022024</td>
                            <td> Lab Manager</td>
                            <td> 20-02-24</td>
                            {<Action/>}
                        </tr>
                        <tr>
                            <td> soft lab</td>
                            <td> softlab@gmail.com</td>
                            <td> 1913022024</td>
                            <td> Lab Manager</td>
                            <td> 20-02-24</td>
                            {<Action/>}
                        </tr>
                        <tr>
                            <td> soft lab</td>
                            <td> softlab@gmail.com</td>
                            <td> 1913022024</td>
                            <td> Lab Manager</td>
                            <td> 20-02-24</td>
                            {<Action/>}
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        </div>
      </section>
    </div>
  )
}

export default Users
