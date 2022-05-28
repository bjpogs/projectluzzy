import React from 'react'

// navbar and footer template
import Navbar from '../templates/Navbar'
import Footer from '../templates/Footer'

const Login = () => {
    return (
        <>
        <Navbar/>
        <main class="page login-page">
            <section class="clean-block clean-form dark">
                <div class="container">
                    <div class="block-heading">
                        <h2 class="text-info">Log In</h2>
                    </div>
                    <form>
                        <div class="mb-3"><label class="form-label" for="email">Email</label><input class="form-control item" type="email" id="email"/></div>
                        <div class="mb-3"><label class="form-label" for="password">Password</label><input class="form-control" type="password" id="password"/></div>
                        <div class="mb-3"><span>Don't have an account? <a href="/Register">Sign Up</a> here.</span></div><button class="btn btn-primary" type="submit">Log In</button>
                    </form>
                </div>
            </section>
        </main>
        <Footer/>
        </>
    )
}

export default Login