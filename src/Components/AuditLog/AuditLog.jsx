import React from 'react'
import './AuditLog.css'

function AuditLog() {
  return (
    <div className='audit-log'>
        <section>
            <div className="top">
                <h1>Borrowers</h1>
            </div>
            <div className="container">
                <div className='box'>
                    <div className="card">
                        <h4> 02-18-2024 15:40:14</h4>
                        <p>Logged in </p>
                        <h5>By: Soft lab</h5>
                    </div>
                    <div className="card">
                        <h4> 02-18-2024 15:40:14</h4>
                        <p>Deleted item with Item No:LAP-001 </p>
                        <h5>By: Soft lab</h5>
                    </div>
                    <div className="card">
                        <h4> 02-18-2024 15:40:14</h4>
                        <p>Item Details updated for item No:LAP-001, indent:lab-stock-2</p>
                        <h5>By: Soft lab</h5>
                    </div>
                    <div className="card">
                        <h4> 02-18-2024 15:40:14</h4>
                        <p>Stock Details updated for Stock No:lab-stock-2, indent:lab-stock-2</p>
                        <h5>By: Soft lab</h5>
                    </div>
                
                </div>
                
            </div>
        </section> 
    </div>
  )
}

export default AuditLog
