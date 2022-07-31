import React,{useState, useEffect} from 'react'
import axios from '../../api/api'
import {Button, Form, InputGroup, FormControl} from 'react-bootstrap'
import imahe from '../../assets/img/hbd.jpeg'
const Order = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('orderbyuser')
        .then(res => {
            setData(res.data)
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    },[])

    const renderTable = () => {
        if (data.length > 0) {
            return (
                data.map(meow => {
                    return(
                        <div class="prodcontainer">
                            <div class="row justify-content-center align-items-center">
                                
                                <div class="col-md-3">
                                    <div class="product-image"><img class="product-img-fluid d-block mx-auto image" src={meow.product_image}/></div>
                                </div>
                                
                                <div class="col-md-7 product-info"><h4><b>{meow.product_name}</b></h4>
                                    <div class="product-specs">
                                        <div><span>Category:&nbsp;</span><span class="value">{meow.product_category}</span></div>
                                        <div><span>Size:&nbsp;</span><span class="value">{meow.product_size}</span></div>
                                        <div><span>₱{meow.product_price}</span></div>
                                    </div>
                                </div>
                                <div class="col-6 col-md-2 price"><span><b>{meow.status}</b></span></div>
                            </div>
                        </div>
                    )
                })
            )
        }
        else{
            return(
                <div class="prodcontainer">
                    <center><h2>No order available</h2></center>
                </div>
            )
        }
    }

    return (
        <main class="page shopping-cart-page">
            <section class="clean-block clean-cart dark">
                <div class="container">
                    <div class="block-heading">
                        <h2 class="text-info">My Order</h2>
                    </div>
                    {renderTable()}
                    
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