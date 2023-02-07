import React, {useState} from 'react'
 
import axios from '../../api/api'

const Login = () => {
	const [passview, setPassview] = useState(false)
    const checkcredentials = () => {
        
        let data = {
            username : document.getElementById('username').value,
            password : document.getElementById('password').value
        }
        axios.post('login', data)
        .then((res) => {
            // check usercategory
            localStorage.setItem('fname', res.data.fname)
            localStorage.setItem('accessToken', res.data.accessToken)
            res.data.usercategory == '123' ? localStorage.setItem('adminAuthenticated', true) : localStorage.setItem('isAuthenticated', true)
            window.location.href = res.data.usercategory == '123' ? '/admin/regular-order' : '/'
        })
        .catch((err) => {
            alert('incorrect username / passowrd!')
        })
    }

    return (
        <>
        <main class="page login-page">
        <section class="dark">
        <div class="container">
            <div class="logincard">
            <div class="block-heading">
            <h2 class="text-info">Log In</h2>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
            </div>
            <div class="mb-3"><label class="form-label" for="email">Username</label><input class="form-control item" type="text" id="username" placeholder="Username"/></div>
            <div class="mb-3">
                <label class="form-label" for="password">Password</label>
				<div class="input-group mb-3">
				  <input type={passview ? "text" : "password"} class="form-control" placeholder="Password" aria-label="Recipient's username" aria-describedby="button-addon2" id="password"/>
				  <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick = {() => setPassview(!passview)}>{passview ? <i class="fa fa-solid fa-eye"></i> : <i class="fa fa-solid fa-eye-slash"></i>}</button>
				</div>
			</div>
            <div class="mb-3"><span>Don't have an account? <a href="/Register">Sign Up</a> here.</span></div>
            <button class="btn btn-primary" type="submit" onClick={() => checkcredentials()}>Log In</button>
            </div>
            <span>&nbsp;</span>
        </div>
        
        </section>
    
        </main>
        </>
    )
}

export default Login