import React from 'react'

// navbar and footer template
import Navbar from '../templates/Navbar'
import Footer from '../templates/Footer'

const Register = () => {
    return (
        <>
        <Navbar/>
        <main class="page registration-page">
            <section class="clean-block clean-form dark">
                <div class="container">
                    <div class="block-heading">
                        <h2 class="text-info">Registration</h2>
                    </div>
                    <form>
                        <div class="mb-3"><label class="form-label" for="name">Email</label><input class="form-control item" type="text" id="name"/></div>
                        <div class="mb-3"><label class="form-label" for="password">Password</label><input class="form-control item" type="password" id="password"/></div>
                        <div class="mb-3"><label class="form-label" for="email">First Name</label><input class="form-control item" type="email" id="email"/></div>
                        <div class="mb-3"><label class="form-label" for="email">Middle Name</label><input class="form-control item" type="email" id="email-2"/></div>
                        <div class="mb-3"><label class="form-label" for="email">Last Name</label><input class="form-control item" type="email" id="email-1"/></div>
                        <div class="mb-3"><label class="form-label" for="email">Address</label><input class="form-control item" type="email" id="email-3"/></div>
                        <div class="mb-3"><label class="form-label" for="email">Contact Number</label><input class="form-control item" type="email" id="email-4"/></div>
                        <button class="btn btn-primary" type="submit">Sign Up</button>
                    </form>
                </div>
            </section>
        </main>
    <Footer/>
        </>
    )
}

export default Register