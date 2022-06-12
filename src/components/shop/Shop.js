import React, {useState, useEffect} from 'react'

// navbar and footer template
import Navbar from '../templates/Navbar'
import Footer from '../templates/Footer'
import cake from '../../assets/img/gradcake.jpg'
import star from '../../assets/img/star.svg'
import axios from '../../api/api'


const Shop = () => {
    const [data, setData] = useState([])
    const [image, setImage] = useState()
    useEffect(() => {
        axios.get('getallproducts')
        .then((res) => {
            setData(res.data);
            console.log(res.data);
        })
        .catch((err) => {
            console.log('error : ', err);
        })
    },[])

    const getimage = (imahe) => {
        axios.get(`productimage/${imahe}`)
        .then((res) => {
            setImage(res.data)
        })
        .catch((err) => {
            console.log('error : ', err);
        })
    }

    const generateItem = () => {
        return (
            data.map(meow => {
                return (
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="clean-product-item">
                            <div class="image"><a onClick={() => {window.location.href = "/Product-info?product_id=" + meow.product_id}}><img class="shopimage d-block mx-auto" src={meow.product_image}/></a></div>
                            <div class="product-name"><a href="/Product-Info">{meow.product_name}</a></div>
                            <div class="about">
                                <div class="rating"></div>
                                <div class="price">
                                    <h3><strong>₱</strong>{meow.product_price}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        )
    }

    return(
        <>
        <Navbar/>
        <main class="page catalog-page">
            <section class="clean-block clean-catalog dark">
                <div class="container">
                    <div class="content">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="d-none d-md-block">
                                    <div class="filters">
                                        <div class="filter-item">
                                            <h3>Categories</h3>
                                            <div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-1"/><label class="form-check-label" for="formCheck-1">Mini Cake</label></div>
                                            <div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-2"/><label class="form-check-label" for="formCheck-2">Regular Cake</label></div>
                                            <div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-3"/><label class="form-check-label" for="formCheck-3">2 Tier Mini Cake</label></div>
                                            <div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-4"/><label class="form-check-label" for="formCheck-4">2 Tier Cake</label></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-md-none"><a class="btn btn-link d-md-none filter-collapse" data-bs-toggle="collapse" aria-expanded="false" aria-controls="filters" href="#filters" role="button">Filters<i class="icon-arrow-down filter-caret"></i></a>
                                    <div class="collapse" id="filters">
                                        <div class="filters">
                                            <div class="filter-item">
                                                <h3>Categories</h3>
                                                <div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-1"/><label class="form-check-label" for="formCheck-1">Phones</label></div>
                                                <div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-2"/><label class="form-check-label" for="formCheck-2">Laptops</label></div>
                                                <div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-3"/><label class="form-check-label" for="formCheck-3">PC</label></div>
                                                <div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-4"/><label class="form-check-label" for="formCheck-4">Tablets</label></div>
                                            </div>
                                            <div class="filter-item">
                                                <h3>Brands</h3>
                                                <div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-5"/><label class="form-check-label" for="formCheck-5">Samsung</label></div>
                                                <div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-6"/><label class="form-check-label" for="formCheck-6">Apple</label></div>
                                                <div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-7"/><label class="form-check-label" for="formCheck-7">HTC</label></div>
                                            </div>
                                            <div class="filter-item">
                                                <h3>OS</h3>
                                                <div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-8"/><label class="form-check-label" for="formCheck-8">Android</label></div>
                                                <div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-9"/><label class="form-check-label" for="formCheck-9">iOS</label></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-9">
                                <div class="products">
                                    <div class="row g-0">
                                        { /* items */ }
                                        
                                        {generateItem()}
                                    </div>
                                    <nav>
                                        <ul class="pagination">
                                            <li class="page-item disabled"><a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">«</span></a></li>
                                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                                            <li class="page-item"><a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">»</span></a></li>
                                        </ul>
                                    </nav>
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

export default Shop