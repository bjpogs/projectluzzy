import React from 'react'

// navbar and footer template
import Navbar from '../templates/Navbar'
import Footer from '../templates/Footer'
import axios from '../../api/api'

const Login = () => {

    const checkcredentials = () => {
        
        let data = {
            username : document.getElementById('username').value,
            password : document.getElementById('password').value
        }
        axios.post('login', data)
        .then((res) => {
            console.log(res.data);
            localStorage.setItem('fname', res.data.fname)
            localStorage.setItem('accessToken', res.data.accessToken)
            window.location.href = '/'
        })
        .catch((err) => {
            alert('incorrect username / passowrd!')
        })
    }

    return (
        <>
        <Navbar/>
        <main class="page login-page">
        <section class="dark">
        <div class="container">
            <div class="logincard">
            <div class="block-heading">
            <h2 class="text-info">Log In</h2>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
            </div>
            <div class="mb-3"><label class="form-label" for="email">Username</label><input class="form-control item" type="text" id="username"/></div>
            <div class="mb-3"><label class="form-label" for="password">Password</label><input class="form-control" type="password" id="password"/></div>
            <div class="mb-3"><span>Don't have an account? <a href="/Register">Sign Up</a> here.</span></div>
            <button class="btn btn-primary" type="submit" onClick={() => checkcredentials()}>Log In</button>
            </div>
            <span>&nbsp;</span>
        </div>
        
        </section>
    
        </main>
        <Footer/>
        </>
    )
}

export default Login