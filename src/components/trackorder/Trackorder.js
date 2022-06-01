import React from 'react'
import { InputGroup, Button, FormControl } from 'react-bootstrap'

import Navbar from '../templates/Navbar'
import Footer from '../templates/Footer'

import gradcake from '../../assets/img/gradcake.jpg'
const Trackorder = () => {
    return (
        <>
        <Navbar/>
        <main class="page">
            <section class="clean-block dark">
                <div class="container">
                    <div class="block-heading">
                        <h2 class="text-info">Track My Order</h2>
                        <p>Customers can track their order here using reference number</p>
                    </div>
                </div>
            </section>
            <section class="track-container">
                
            </section>
        </main>
        <Footer/>
        </>
    )
}

export default Trackorder