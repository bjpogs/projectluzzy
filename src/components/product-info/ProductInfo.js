import React from 'react'
import {Tabs, Tab} from 'react-bootstrap'

// navbar and footer template
import Navbar from '../templates/Navbar'
import Footer from '../templates/Footer'
import cake from '../../assets/img/gradcake.jpg'
import star from '../../assets/img/star.svg'


const ProductInfo = () => {
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
                                            <div class="sidebar"><img class="img-fluid d-block small-preview" src={cake}/></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="info">
                                        <h3>Graduation Cake</h3>
                                        <div class="rating"><img src={star}/><img src={star}/><img src={star}/><img src={star}/><img src={star}/></div>
                                        <div class="price">
                                            <h3>₱300.00</h3>
                                        </div><button class="btn btn-primary" type="button" onClick={() => {window.location.href="/cart"}}><i class="icon-basket"></i>Add to Cart</button>
                                        <div class="summary">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec augue nunc, pretium at augue at, convallis pellentesque ipsum. Vestibulum diam risus, sagittis at fringilla at, pulvinar vel risus. Vestibulum dignissim eu nulla eu imperdiet. Morbi mollis tellus a nunc vestibulum consequat. Quisque tristique elit et nibh dapibus sodales. Nam sollicitudin a urna sed iaculis.</p>
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

                                {/*
                                <ul class="nav nav-tabs" role="tablist" id="myTab">
                                    <li class="nav-item" role="presentation"><a class="nav-link active" role="tab" data-bs-toggle="tab" id="specifications-tabs" href="#specifications">Specifications</a></li>
                                    <li class="nav-item" role="presentation"><a class="nav-link" role="tab" data-bs-toggle="tab" id="reviews-tab" href="#reviews">Reviews</a></li>
                                </ul>
                                    */}
                                <div class="tab-content" id="myTabContent">
                                    <div class="tab-pane fade specifications active" role="tabpanel" id="specifications">
                                        <div class="table-responsive">
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
                                    </div>
                                    <div class="tab-pane fade show" role="tabpanel" id="reviews">
                                        
                                    </div>
                                </div>
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