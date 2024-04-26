import React, { useState } from 'react'
import './Settings.css'

function Settings() {
    let [toggle,setToggle] = useState(0)
    let [expandNav,setExpandNav] = useState(1)
  return (
    <div className='settings'>
        <section>
            <div className="top">
                <h1>Settings</h1>
                <div className="mode">
                    <div className="toggle" style={toggle?{background: "#393d4c"}:{background: "#161927"}} onClick={()=>toggle?setToggle(0):setToggle(1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick={()=>toggle?setToggle(0):setToggle(1)}>
                        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick={()=>toggle?setToggle(0):setToggle(1)}>
                        <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
                        </svg>
                        <div className='background' style={toggle?{right:".2rem"}:{left:".2rem"}}>
                        
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="left">
                    <div className="card">
                        <div className="data-section">
                            <span>Theme</span>
                            <p>Customize your application Theme.</p>
                        </div>
                        <div className="btn-section">
                            <section>
                                <p>Accent color</p>
                                <div className="top-control">
                                    <div className="color-btn">
                                        <div style={{border: "2px solid #e9254f"}}></div>
                                    </div>
                                    <div className="color-btn">
                                        <div style={{border: "2px solid #6325e9"}}></div>
                                    </div>
                                    <div className="color-btn">
                                        <div style={{border: "2px solid #25e987"}}></div>
                                    </div>
                                    <div className="color-btn">
                                        <div style={{border: "2px solid #e9cf25"}}></div>
                                    </div>
                                </div>
                                <div className="toggle-control">
                                    <div className="toggle-box">
                                        <div className="toggle-btn" onClick={()=>{expandNav?setExpandNav(0):setExpandNav(1)}} style={expandNav?{border: "1px solid var(--color-primary)"}:null}>
                                            <div className="t-btn" style={expandNav?{background: "var(--color-primary-variant)",right: ".2rem"}:{background: "var(--pure-black)",left: ".2rem"}} onClick={()=>{expandNav?setExpandNav(0):setExpandNav(1)}}></div>
                                        </div>
                                        Expand navigation
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className="card">
                        <div className="data-section">
                            <span>Version</span>
                            <p>Last Update on 2024</p>
                        </div>
                        <div className="btn-section">
                            <section>
                                <p style={{marginTop: ".5rem",color: "var(--color-dark-variant)"}}>Version 1.0.0</p>
                            </section>
                        </div>
                    </div>
                    <div className="card">
                        <div className="data-section">
                            <span>Contact Us</span>
                            <p>Click on social icon</p>
                        </div>
                        <div className="btn-section">
                            <section>
                                <div className="top-control">
                                    <a href="https://web.telegram.org/">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill='#dce1eb' width="24px" height="24px" version="1.1" style={{fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:"1.41421",marginRight:"1rem"}}><path id="telegram-4" d="M12,0c-6.626,0 -12,5.372 -12,12c0,6.627
                                     5.374,12 12,12c6.627,0 12,-5.373 12,-12c0,-6.628 -5.373,-12 -12,-12Zm3.224,17.871c0.188,0.133 0.43,0.166 0.646,0.085c0.215,-0.082 0.374,-0.267 0.422,-0.491c0.507,-2.382 1.737,-8.412 2.198,-10.578c0.035,-0.164 -0.023,-0.334 -0.151,-0.443c-0.129,-0.109 -0.307,-0.14
                                      -0.465,-0.082c-2.446,0.906 -9.979,3.732 -13.058,4.871c-0.195,0.073 -0.322,0.26 -0.316,0.467c0.007,0.206 0.146,0.385 0.346,0.445c1.381,0.413 3.193,0.988 3.193,0.988c0,0 0.847,2.558 1.288,3.858c0.056,0.164 0.184,0.292 0.352,0.336c0.169,0.044 0.348,-0.002
                                       0.474,-0.121c0.709,-0.669 1.805,-1.704 1.805,-1.704c0,0 2.084,1.527 3.266,2.369Zm-6.423,-5.062l0.98,3.231l0.218,-2.046c0,0 3.783,-3.413 5.941,-5.358c0.063,-0.057 0.071,-0.153 0.019,-0.22c-0.052,-0.067 -0.148,-0.083 -0.219,-0.037c-2.5,1.596 -6.939,4.43 -6.939,4.43Z"/>
                                       </svg>
                                    </a>
                                    <a href="https://www.linkedin.com/">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill='#dce1eb' width="26" height="26" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497
                                     1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                                     </svg>
                                    </a>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className="card">
                        <div className="data-section">
                            <span>Contributorse</span>
                            <p>The SoftLab Team</p>
                        </div>
                        <div className="btn-section">
                            <section>
                                <div className="top-control">
                                    <a href="https://github.com/Shibin-Abraham/softlab/graphs/contributors">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill='#dce1eb' width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834
                                        2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552
                                        3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                    </a>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className="card">
                        <div className="data-section">
                            <span></span>
                            <a href="https://github.com/Shibin-Abraham/softlab/blob/main/README.md">
                            <p>Documentation</p>
                            </a>
                            
                        </div>
                    </div>
                    
                    
                    {/*<div className="card">
                        <span>Contributors</span>
                    </div>
                    <div className="card">
                        <span>Rate Application</span>
                    </div>
                    <div className="card">
                        <span>Documentation</span>
  </div>*/}
                </div>
                <div className="right">
                

                    <span>Upcoming Releases</span>
                    <hr/>
                    <h5> PWA Progressive Web App.</h5>
                </div>
            </div>
        </section> 
    </div>
  )
}

export default Settings
