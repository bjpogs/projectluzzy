import React from 'react'

const Footer = () => {
    return (
        <>
        <footer class="page-footer mt-auto dark">
            <div class="container">
                <div class="row">
                    <div class="col-sm-3">
                        <h5>Services</h5>
                        <ul>
                            <li><a href="/shop">Menu</a></li>
                            <li><a href={localStorage.getItem("fname") == "" | !localStorage.getItem("fname") ? "/Login" : "/myaccount"}>My Account</a></li>
                            <li><a href="/reservation">Reservation</a></li>
                        </ul>
                    </div>
                    <div class="col-sm-3">
                        <h5>About us</h5>
                        <ul>
                            <li><a href="/about">Company Information</a></li>
                            <li><a href="/home#contactlocation">Contact us</a></li>
                        </ul>
                    </div>
                    <div class="col-sm-3">
                        <h5>Support</h5>
                        <ul>
                            <li><a href="about">FAQ</a></li>
                        </ul>
                    </div>
                    <div class="col-sm-3">
                        <h5>Legal</h5>
                        <ul>
                            <li><a href="/Terms-of-Service">Terms of Service</a></li>
                            <li><a href="/Terms-of-Use">Terms of Use</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer-copyright">
                <p>Luzzy's Supreme Sweets© 2022</p>
            </div>
        </footer>
        </>
    )
}

export default Footer
