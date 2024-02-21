import React from 'react'
import './StockDetails.css';

function StockDetails() {
  return (
    <div className='stock-details'>
        <section>
            <h1>Stock Details</h1> 
            <div className="container">
                <div className='top'>
                    <input type='search' placeholder='Search...' />
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>
                        <h2>Add Stock</h2>
                    </div>
                </div>
            </div>
        </section>   
    </div>
  )
}

export default StockDetails
