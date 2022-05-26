import React from 'react'

const Navbar = () => {
    return (
        <nav class="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
            <div class="container"><a class="navbar-brand logo" href="#">Luzzy's Supreme Sweets</a><button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-1"><span class="visually-hidden">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navcol-1">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item"><a class="nav-link" href="/shop">Shop</a></li>
                        <li class="nav-item"><a class="nav-link" href="/about">about</a></li>
                        <li class="nav-item"><a class="nav-link" href="/contact-us">Contact Us</a></li>
                        <li class="nav-item"><a class="nav-link" href="/login">login</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar