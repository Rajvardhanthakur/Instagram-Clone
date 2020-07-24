import React from 'react'
import './logs.css'
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input 
                type="text"
                placeholder="email"
                />
                <input
                type="text"
                placeholder="password"
                />
                <button className="btn waves-effect waves-light #1e88e5 blue darken-1
">
                    Login
                </button>
                <h5>
                    <Link to="/signup">Don't have an account ?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Login;