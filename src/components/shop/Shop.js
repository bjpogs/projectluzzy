import React, {useState, useEffect} from 'react'

// navbar and footer template
import Navbar from '../templates/Navbar'
import Footer from '../templates/Footer'
import axios from '../../api/api'
import {Nav} from 'react-bootstrap'


const Shop = () => {
    const [data, setData] = useState([])
    const [category, setCategory] = useState()
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

    const generateItem = () => {
        
        return (

            data.filter(user =>{
                if (!category) return user
                else if (category == "") return user
                else if (user.product_category.includes(category)){
                    console.log(user);
                    return user
                }
            }).map(meow => {
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
    
    const categoryChange = (e) => {
        console.log(e.target.title);
        setCategory(e.target.title);
        generateItem()
    }
    return(
        <>
        <Navbar/>
        <main class="page catalog-page">
            <section class="clean-block clean-catalog dark">
                <div class="container">
                    <div class="block-heading">
                    </div>
                    <div class="shopcontainer">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="d-none d-lg-block">
                                    <div class="filters">
                                        <div class="filter-item">
                                            <h3>Categories</h3>
                                            <Nav className="flex-column" variant="pills">
                                            <Nav.Link eventKey="link" onClick={categoryChange} title="">All Item</Nav.Link>
                                            <Nav.Link eventKey="link-1" onClick={categoryChange} title="ANNIVERSARY">Anniversary</Nav.Link>
                                            <Nav.Link eventKey="link-2" onClick={categoryChange} title="BENTO">Bento</Nav.Link>
                                            <Nav.Link eventKey="link-3" onClick={categoryChange} title="BIRTHDAY">Birthday</Nav.Link>
                                            <Nav.Link eventKey="link-4" onClick={categoryChange} title="CHARACTER">Character</Nav.Link>
                                            <Nav.Link eventKey="link-5" onClick={categoryChange} title="CHRISTENING">Christening</Nav.Link>
                                            <Nav.Link eventKey="link-6" onClick={categoryChange} title="CUPCAKE">Cupcake</Nav.Link>
                                            <Nav.Link eventKey="link-7" onClick={categoryChange} title="DEBUT">Debut</Nav.Link>
                                            <Nav.Link eventKey="link-8" onClick={categoryChange} title="GENDER">Gender</Nav.Link>
                                            <Nav.Link eventKey="link-9" onClick={categoryChange} title="NUMBER">Number</Nav.Link>
                                            <Nav.Link eventKey="link-10" onClick={categoryChange} title="WEDDING">Wedding</Nav.Link>
                                            </Nav>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-lg-none"><a class="btn btn-link d-md-none filter-collapse" data-bs-toggle="collapse" aria-expanded="false" aria-controls="filters" href="#filters" role="button">Filters<i class="icon-arrow-down filter-caret"></i></a>
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