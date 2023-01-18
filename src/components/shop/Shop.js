import React, {useState, useEffect} from 'react'

// navbar and footer template
import axios from '../../api/api'
import {Nav, NavDropdown, Form} from 'react-bootstrap'
import imahe from '../../assets/img/buildlogo.jpg'


const Shop = () => {
    const [data, setData] = useState([])
    const [category, setCategory] = useState()
    
    useEffect(() => {
        axios.get('getallproducts')
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => {
            console.log('error : ', err);
        })
    },[])

    const generateItem = () => {
        return (
            data.filter(user =>{
                if (!category) return user
                else if (category == "all") return user
                else if (user.product_category.includes(category))return user
                else if (user.product_subcategory.includes(category)) return user
                else if (user.product_subcategory == category) return user
                
            }).map(meow => {
                return (
                    <div class="col-12 col-sm-6 col-lg-6 col-xl-4">
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
        setCategory(e);
        generateItem()
    }
    return(
        <>
        <div class="page catalog-page">
            <section class="clean-block clean-catalog dark">
                <div class="container">
                    <div class="block-heading">
                    </div>
                    <div class="shopcontainer">
                        <div class="row">
                            <div class="col-lg-3">
                                <div class="d-none d-lg-block">
                                    <div class="filters">
                                        <div class="filter-item">
                                            <h3>Categories</h3>
                                            <Nav className="flex-column" defaultActiveKey="all" variant="pills" onSelect={categoryChange}>
                                            <Nav.Link eventKey="all" title="">All Items</Nav.Link>
                                            <NavDropdown title="Events" id="nav-dropdown" onSelect={categoryChange}>
                                                <NavDropdown.Item eventKey="Anniversary" >Anniversary</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Birthday">Birthday</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Character">Character</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Christening">Christening</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Debut">Debut</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Gender">Gender</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Wedding">Wedding</NavDropdown.Item>
                                            </NavDropdown>
                                            <Nav.Link eventKey="Simple" title="Simple">Bento and Number</Nav.Link>
                                            <Nav.Link eventKey="Cupcake" title="Cupcake">Cupcake</Nav.Link>
                                            </Nav>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-lg-none">
                                <div class="col-12 mb-2">
                                    <h3>Categories</h3>
                                                <Nav className="flex-column" defaultActiveKey="/all" variant="pills" onSelect={categoryChange}>
                                                <Nav.Link eventKey="all" title="">All Items</Nav.Link>
                                                <NavDropdown title="Events" id="nav-dropdown" onSelect={categoryChange}>
                                                    <NavDropdown.Item eventKey="Anniversary" >Anniversary</NavDropdown.Item>
                                                    <NavDropdown.Item eventKey="Birthday">Birthday</NavDropdown.Item>
                                                    <NavDropdown.Item eventKey="Character">Character</NavDropdown.Item>
                                                    <NavDropdown.Item eventKey="Christening">Christening</NavDropdown.Item>
                                                    <NavDropdown.Item eventKey="Debut">Debut</NavDropdown.Item>
                                                    <NavDropdown.Item eventKey="Gender">Gender</NavDropdown.Item>
                                                    <NavDropdown.Item eventKey="Wedding">Wedding</NavDropdown.Item>
                                                </NavDropdown>
                                                <Nav.Link eventKey="Simple" title="Simple">Bento and Number</Nav.Link>
                                                <Nav.Link eventKey="Cupcake" title="Cupcake">Cupcake</Nav.Link>
                                                </Nav>
                                        </div>
                                        <hr/>
                                    </div>
                            </div>
                            <div class="col-lg-9">
                                <div class="products">
                                    <div class="row g-0">
                                        { /* items */ }
                                        <div class="col-12 col-sm-6 col-lg-6 col-xl-4">
                                            <div class="clean-product-item">
                                                <div class="image"><a onClick={() => {window.location.href = "/build-cake"}}><img class="shopimage d-block mx-auto" src={imahe}/></a></div>                    
                                                <div class="product-name"><a href="/build-cake">Build cake</a></div>
                                                <div class="about">
                                                    <div class="rating"></div>
                                                    <div class="price">
                                                        <h3></h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {generateItem()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        </>
    )
}

export default Shop