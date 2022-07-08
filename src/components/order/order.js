import React from 'react'
import axios from '../../api/api'
import {Button, Form, InputGroup, FormControl} from 'react-bootstrap'
import imahe from '../../assets/img/hbd.jpeg'
const Order = () => {
    return (
        <main class="page shopping-cart-page">
            <section class="clean-block clean-cart dark">
                <div class="container">
                    <div class="block-heading">
                        <h2 class="text-info">My Order</h2>
                    </div>
                    <div class="prodcontainer">
                        <div class="product-specs">
                        <div class="product-image"><img class="d-block" src={imahe}/></div>
                        <div><span>Category:&nbsp;</span><span class="value">meow.product_category</span></div>
                        <div><span>Size:&nbsp;</span><span class="value">meow.product_size</span></div>
                        <div><span>Special Request:&nbsp;</span><span class="value">meow.request</span></div>
                    </div>
                    </div>
                    <div class="prodcontainer">
                        
                    </div>
                </div>
            </section>
        </main> 
   )
}

/*
<div class="col-md-5 product-info"><a class="product-name" href="#">meow.product_name</a>
                <div class="product-specs">
                    <div><span>Category:&nbsp;</span><span class="value">meow.product_category</span></div>
                    <div><span>Size:&nbsp;</span><span class="value">meow.product_size</span></div>
                    <div><span>Special Request:&nbsp;</span><span class="value">meow.request</span></div>
                </div>
            </div>  */

export default Order