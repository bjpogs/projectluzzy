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
        api.get(`getproductbyid/${id}`)
        .then((res) => {
            setData(res.data[0]);
        })
        .catch((err) => {
            console.log(err);
            window.location.href = "/"
        })
    },[0])

    // add to cart

    const addtocart = (e) => {
        if (!localStorage.getItem('isAuthenticated')) {
            alert("You need to login to continue.")
            window.location.href = "/login"
        }
        else{
            const id = queryParams.get('product_id')
            const request = document.getElementById('specialrequest').value
	    api.post('addtocart',{ product_id : id, request : request})
            .then((res) => {
                alert('Add to cart succressfully!')
                window.location.href = '/shop'
            }) 
            .catch((err) => {
                console.log('error!');
            })
        }
    }

    return (
        <>
        <main class="page product-page">
            <section class="clean-block clean-product dark">
                <div class="container">
                    {/*<div style="height: 25px;"></div> */}
                    <div class="block-content">
                        <div class="product-info">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="gallery">
                                        <div id="product-preview">
                                            <div class="zoomed-image"></div>
                                            <div class="sidebar"><img class="img-fluid d-block small-preview" src={data.product_image}/></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="info">
                                        <h3>{data.product_name}</h3>
                                        <div class="price">
                                            <h3>₱{data.product_price}</h3>
                                        </div>
					<div class="mb-3">
 					    <label for="exampleFormControlTextarea1" class="form-label">Special Request</label>
 					    <textarea class="form-control" id="specialrequest" rows="4"></textarea>
					</div>
                                        {
                                            data.product_status != 0 ? 
                                            <button class="btn btn-primary" type="button" disabled><i class="icon-basket"></i>Out of Stock</button>
                                            :
                                            <button class="btn btn-primary" type="button" onClick={() => addtocart()}><i class="icon-basket"></i>Add to Cart</button>
                                        }
                                        <div class="summary">
					    <span class="text-info">Description</span>
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
                                                        <td>{data.product_category}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="stat">Size</td>
                                                        <td>{data.product_size}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="stat">Flavor</td>
                                                        <td>{data.product_flavor}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="stat">Icing</td>
                                                        <td>{data.product_icing}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="stat">Shape</td>
                                                        <td>{data.product_shape}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="stat">Layer</td>
                                                        <td>{data.product_layer}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="stat">Tier</td>
                                                        <td>{data.product_tier}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        </>
    )
}

export default ProductInfo
