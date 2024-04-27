import React, { useState } from 'react'
import './IndentLog.css'
import img from '../../assets/indent-img.jpg'
import img1 from '../../assets/download.png'
import img2 from '../../assets/indent-img2.jpg'
import AddIndentPopUp from './PopUp/AddIndentPopUp'

function IndentLog() {
    let [addIndentPopUp,setAddIndentPopUp] = useState(false)

  return (
    <div className='indent-log'>
        <section>
            <div className="top">
                <h1>Indent Log</h1> 
                <div onClick={()=>setAddIndentPopUp(true)}> 
                <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="m17.5 11c2.484 0 4.5 2.016 4.5 4.5s-2.016 4.5-4.5 4.5-4.5-2.016-4.5-4.5 2.016-4.5 4.5-4.5zm.5 4v-1.5c0-.265-.235-.5-.5-.5s-.5.235-.5.5v1.5h-1.5c-.265 0-.5.235-.5.5s.235.5.5.5h1.5v1.5c0
                     .265.235.5.5.5s.5-.235.5-.5c0-.592 0-1.5 0-1.5h1.5c.265 0 .5-.235.5-.5s-.235-.5-.5-.5c-.592 0-1.5 0-1.5 0zm-6.479 1c.043.522.153 1.025.321 1.5h-9.092c-.414 0-.75-.336-.75-.75s.336-.75.75-.75zm1.106-4c-.328.456-.594.96-.785
                      1.5h-9.092c-.414 0-.75-.336-.75-.75s.336-.75.75-.75zm7.373-3.25c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0
                       .75-.336.75-.75z" fill-rule="nonzero"/>
                </svg>
            </div>
            </div>
            <div className="container">
                <div className="card">
                    <div className="img-section">
                        <img src={img} alt=''/>
                    </div>
                    <div className="control-section">
                        <div className='tag'>
                            <p>stock-03</p>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="img-section">
                        <img src={img1} alt=''/>
                    </div>
                    <div className="control-section">
                        <div className='tag'>
                            <p>stock-03</p>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="img-section">
                        <img src={img2} alt=''/>
                    </div>
                    <div className="control-section">
                        <div className='tag'>
                            <p>stock-03</p>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="img-section">
                        <img src={img} alt=''/>
                    </div>
                    <div className="control-section">
                        <div className='tag'>
                            <p>stock-03</p>
                        </div>
                    </div>
                </div>
            </div>
        </section> 
        {addIndentPopUp && <AddIndentPopUp setAddIndentPopUp={setAddIndentPopUp} />}
    </div>
  )
}

export default IndentLog
