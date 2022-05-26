import React from 'react'

import Navbar from '../templates/Navbar'
import Footer from '../templates/Footer'

const ContactUs = () => {
    return (
        <>
        <Navbar/>
        <main class="page contact-us-page">
        <section class="clean-block clean-form dark">
            <div class="container">
                <div class="block-heading">
                    <h2 class="text-info">Contact Us</h2>
                    <p><br/>Need help? Our Luzz Support Team is ready to assist you. You may also want to refer to our Frequently Asked Questions before you complete the form below to get a quicker answer!<br/><br/></p>
                </div>
                <form>
                    <div class="mb-3"><label class="form-label" for="name">Name</label><input class="form-control" type="text" id="name" name="name"/></div>
                    <div class="mb-3"><label class="form-label" for="subject">Subject</label><input class="form-control" type="text" id="subject" name="subject"/></div>
                    <div class="mb-3"><label class="form-label" for="email">Email</label><input class="form-control" type="email" id="email" name="email"/></div>
                    <div class="mb-3"><label class="form-label" for="message">Message</label><textarea class="form-control" id="message" name="message"></textarea></div>
                    <div class="mb-3"><button class="btn btn-primary" type="submit">Send</button></div>
                </form>
            </div>
        </section>
    </main>
    <Footer/>
    </>
    )
}

export default ContactUs