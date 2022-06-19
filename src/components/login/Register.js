import React from 'react'
import axios from '../../api/api'

const Register = () => {
    const handleregister = (e) => {
        e.preventDefault()
        var data = {
            username : document.getElementById('username').value,
            password : document.getElementById('password').value,
            first_name : document.getElementById('fname').value,
            middle_name : document.getElementById('mname').value,
            last_name : document.getElementById('lname').value,
            birthday : document.getElementById('birthday').value,
            add_house : document.getElementById('house').value,
            add_brgy : document.getElementById('brgy').value,
            add_city : document.getElementById('city').value,
            add_province : document.getElementById('province').value,
            contact_no : document.getElementById('contact_no').value,
            email_address : document.getElementById('email').value,
        }
        axios.post('register', data)
        .then((res) => {
            console.log(res.data);
            alert('Registration Success!');
            window.location.href ="/login"
        })
        .catch((err) => {
            if (err.response.status == 400) {
                alert('Username exist!')
            }
        })
    }
    return (
        <>
        <main class="page registration-page">
            <section class="clean-block clean-form dark">
                <div class="container">
                    <div class="block-heading">
                        <h2 class="text-info">Registration</h2>
                    </div>
                    <form onSubmit={handleregister}>
                        <div class="mb-3"><label class="form-label" for="name">Username</label><input class="form-control item" type="text" id="username" required/></div>
                        <div class="mb-3"><label class="form-label" for="password">Password</label><input class="form-control item" type="password" id="password" required/></div>
                        <div class="mb-3"><label class="form-label" for="email">First Name</label><input class="form-control item" type="text" id="fname" required/></div>
                        <div class="mb-3"><label class="form-label" for="email">Middle Name</label><input class="form-control item" type="text" id="mname"/></div>
                        <div class="mb-3"><label class="form-label" for="email">Last Name</label><input class="form-control item" type="text" id="lname" required/></div>
                        <div class="mb-3"><label class="form-label" for="email">Birthday</label><input class="form-control item" type="date" id="birthday" required/></div>
                        <div class="mb-3"><label class="form-label" for="email">House No.</label><input class="form-control item" type="text" id="house" required/></div>
                        <div class="mb-3"><label class="form-label" for="email">Barangay</label><input class="form-control item" type="text" id="brgy" required/></div>
                        <div class="mb-3"><label class="form-label" for="email">City</label><input class="form-control item" type="text" id="city" required/></div>
                        <div class="mb-3"><label class="form-label" for="email">Province</label><input class="form-control item" type="text" id="province" required/></div>
                        <div class="mb-3"><label class="form-label" for="email">Contact Number</label><input class="form-control item" type="number" id="contact_no" required/></div>
                        <div class="mb-3"><label class="form-label" for="email">Email</label><input class="form-control item" type="email" id="email" required/></div>
                        <button class="btn btn-primary" type="submit">Sign Up</button>
                    </form>
                </div>
            </section>
        </main>
        </>
    )
}

export default Register