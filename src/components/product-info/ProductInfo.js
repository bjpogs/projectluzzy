import React, {useState, useEffect} from 'react'
import {Tabs, Tab} from 'react-bootstrap'

// navbar and footer template
import Navbar from '../templates/Navbar'
import Footer from '../templates/Footer'
import cake from '../../assets/img/gradcake.jpg'
import star from '../../assets/img/star.svg'

import axios from '../../api/api'
import api from '../../api/api'


const ProductInfo = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const [data, setData] = useState({
        product_name : '',
        product_price : '',
        product_description : '',
        product_image : '',
        product_category : '',
        product_qty : '',
    })
    useEffect(() => {
        const id = queryParams.get('product_id')
        console.log(id)
        api.get(`getproductbyid/${id}`)
        .then((res) => {
            setData(res.data[0]);
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err);
            window.location.href = "/"
        })
    },[0])
    return (
        <>
        <Navbar/>
        <main class="page product-page">
            <section class="clean-block clean-product dark">
                <div class="container">
                    {/*<div style="height: 25px;"></div> */}
                    <div class="block-content">
                        <div class="product-info">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="gallery">
                                        <div id="product-preview" class="vanilla-zoom">
                                            <div class="zoomed-image"></div>
                                            <div class="sidebar"><img class="productimage d-block small-preview" src={data.product_image}/></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="info">
                                        <h3>{data.product_name}</h3>
                                        <div class="price">
                                            <h3>₱{data.product_price}</h3>
                                        </div><button class="btn btn-primary" type="button" onClick={() => {window.location.href="/cart"}}><i class="icon-basket"></i>Add to Cart</button>
                                        <div class="summary">
                                            <p>{data.product_description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="product-info">
                            <div>
                                {/* product nav-tab */}
                                <Tabs defaultActiveKey="specs" id="uncontrolled-tab-example">
                                    <Tab eventKey="specs" title="Specifications">
                                        <div class="table-responsive mt-3">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td class="stat">Category</td>
                                                        <td>Mini Cake</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="stat">Size</td>
                                                        <td>4' 2''</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="stat">Stock</td>
                                                        <td>made to order</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="reviews" title="Reviews">
                                        <div class="reviews">
                                            <div class="review-item">
                                                <div class="rating"><img src={star}/><img src={star}/><img src={star}/><img src={star}/><img src={star}/></div>
                                                <h4>Incredible product</h4><span class="text-muted"><a href="#">Kaguya Shinomiya</a>, 12 May 2022</span>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec augue nunc, pretium at augue at, convallis pellentesque ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                            </div>
                                        </div>
                                        <div class="reviews">
                                            <div class="review-item">
                                                <div class="rating"><img src={star}/><img src={star}/><img src={star}/><img src={star}/><img src={star}/></div>
                                                <h4>Incredible product</h4><span class="text-muted"><a href="#">Shouko Komi</a>, 12 May 2022</span>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec augue nunc, pretium at augue at, convallis pellentesque ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                            </div>
                                        </div>
                                        <div class="reviews">
                                            <div class="review-item">
                                                <div class="rating"><img src={star}/><img src={star}/><img src={star}/><img src={star}/><img src={star}/></div>
                                                <h4>Incredible product</h4><span class="text-muted"><a href="#">Marin Kitagawa</a>, 12 May 2022</span>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec augue nunc, pretium at augue at, convallis pellentesque ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                            </div>
                                        </div>
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <Footer/>
        </>
    )
}

export default ProductInfo