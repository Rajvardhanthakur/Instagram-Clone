import React, {useState} from 'react'
import './logs.css'
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

const Login = () => {

    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const postData = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email", classes: "c62828 red darken-1"})
            return
        }

        fetch("/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        }).then(res => res.json())
        .then(data => {
            if(data.error){
                M.toast({html: data.error, classes: "#c62828 red darken-3"})
            }
            else{
                M.toast({html: "Signed in succesfully", classes: "#43a047 green darken-1"})
                history.push('/')
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input 
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <input
                type="text"
                placeholder="password"
                value={password}
                onchange={(e) => setEmail(e.target.value)}
                />
                <button className="btn waves-effect waves-light #1e88e5 blue darken-1
" onClick={() => postData()}>
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