import React, { useState } from 'react'
import '../style/login.css'
import { Link } from 'react-router-dom'

const Login = () => {
    const [user, setUser] = useState();
    return (
        <div className='hero'>
            <div className='container'>
                <div className='loginWrapper'>
                    <div className='tulisanLogin'>
                        <h1>Form Login</h1>
                    </div>
                    <div className='login'>
                        <br></br>
                        <div className='nama'>
                            <h5>Name</h5>
                            <input type="text" id='nameInput'></input>
                        </div>
                        <Link to="/home" className='submit'>
                            <div>
                                <input type="submit" onClick={() => {
                                    localStorage.setItem('user', document.getElementById("nameInput").value)
                                }}></input>
                            </div>
                        </Link>
                        <br></br>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;