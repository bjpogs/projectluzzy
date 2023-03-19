import React, {useState, useEffect} from 'react'

// navbar and footer template
import axios from '../../api/api'
import {Nav, NavDropdown, Form} from 'react-bootstrap'
import imahe from '../../assets/img/buildlogo.jpg'


const Shop = () => {
    const [data, setData] = useState([])
    const [category, setCategory] = useState()
    const [subcategory,setSubcategory] = useState()
    
    useEffect(() => {
        axios.get('getshopproducts')
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => {
            console.log('error : ', err);
            alert('something went wrong, please try again later.')
            window.location.href = "/"
        })
	if (localStorage.getItem('shopcat')){
            setCategory(localStorage.getItem('shopcat'))
	    setSubcategory(localStorage.getItem('shopsubcat'))
            localStorage.removeItem('shopcat')
	    localStorage.removeItem('shopsubcat')
       }
    },[])

    const generateItem = () => {
        return (
            data.filter(user =>{
                if (!category) return user
                else if (category == "all") return user
                else if (user.product_category==category && user.product_subcategory == subcategory )return user
            }).map(meow => {
                return (
                    <div class="col-12 col-sm-6 col-lg-6 col-xl-4">
                        <div class="clean-product-item">
                            <div class="image"><a onClick={() => {window.location.href = "/Product-info?product_id=" + meow.product_id}}><img class="shopimage d-block mx-auto" src={meow.product_image}/></a></div>
                            <div class="product-name"><a onClick={() => {window.location.href = "/Product-info?product_id=" + meow.product_id}}>{meow.product_name}</a></div>
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
	if (e == "all") setCategory(e);
	else{
		let hati = e.split("-");
        	setCategory(hati[0]);
		setSubcategory(hati[1]);
	}
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
                                            <h3>Occasions</h3>
                                            <Nav className="flex-column" defaultActiveKey="all" variant="pills" onSelect={categoryChange}>
                                            <Nav.Link eventKey="all" title="">All Items</Nav.Link>
                                            <NavDropdown title="Anniversary" id="nav-dropdown" onSelect={categoryChange}>
                                                <NavDropdown.Item eventKey="Anniversary-Bento" >Bento</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Anniversary-Cakes">Cakes</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Anniversary-Cupcakes">Cupcakes</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Anniversary-Number">Number</NavDropdown.Item>
                                            </NavDropdown>
					    
					    <NavDropdown title="Birthday" id="nav-dropdown" onSelect={categoryChange}>
                                                <NavDropdown.Item eventKey="Birthday-Bento" >Bento</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Birthday-Cakes">Cakes</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Birthday-Cupcakes">Cupcakes</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Birthday-Number">Number</NavDropdown.Item>
                                            </NavDropdown>
					    <NavDropdown title="Character" id="nav-dropdown" onSelect={categoryChange}>
                                                <NavDropdown.Item eventKey="Character-Bento" >Bento</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Character-Cakes">Cakes</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Character-Cupakes">Cupcakes</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Character-Number">Number</NavDropdown.Item>
                                            </NavDropdown>
					    <NavDropdown title="Christening" id="nav-dropdown" onSelect={categoryChange}>
                                                <NavDropdown.Item eventKey="Christening-Bento" >Bento</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Christening-Cakes">Cakes</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Christening-Cupcakes">Cupcakes</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Christening-Number">Number</NavDropdown.Item>
                                            </NavDropdown>
					    <NavDropdown title="Debut" id="nav-dropdown" onSelect={categoryChange}>
                                                <NavDropdown.Item eventKey="Debut-Bento" >Bento</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Debut-Cakes">Cakes</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Debut-Cupcakes">Cupcakes</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Debut-Number">Number</NavDropdown.Item>
                                            </NavDropdown>
					    <NavDropdown title="Gender" id="nav-dropdown" onSelect={categoryChange}>
                                                <NavDropdown.Item eventKey="Gender-Bento" >Bento</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Gender-Cakes">Cakes</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Gender-Cupcakes">Cupcakes</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Gender-Number">Number</NavDropdown.Item>
                                            </NavDropdown>
					    <NavDropdown title="Wedding" id="nav-dropdown" onSelect={categoryChange}>
                                                <NavDropdown.Item eventKey="Wedding-Bento" >Bento</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Wedding-Cakes">Cakes</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Wedding-Cupcakes">Cupcakes</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Wedding-Number">Number</NavDropdown.Item>
                                            </NavDropdown>

                                            </Nav>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-lg-none">
                                <div class="col-12 mb-2">
                                    <h3>Occasions</h3>
                                        <Nav className="flex-column" defaultActiveKey="/all" variant="pills" onSelect={categoryChange}>
                                            <Nav.Link eventKey="all" title="">All Items</Nav.Link>
                                            <NavDropdown eventKey="Anniversary" title="Anniversary" id="nav-dropdown" onSelect={categoryChange}>
                                                <NavDropdown.Item eventKey="Anniversary-Bento" >Bento</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Anniversary-Cakes">Cakes</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Anniversary-Cupcakes">Cupcakes</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Anniversary-Number">Number</NavDropdown.Item>
                                            </NavDropdown>
					    <NavDropdown title="Birthday" id="nav-dropdown" onSelect={categoryChange}>
                                                <NavDropdown.Item eventKey="Birthday-Bento" >Bento</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Birthday-Cakes">Cakes</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Birthday-Cupcakes">Cupcakes</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Birthday-Number">Number</NavDropdown.Item>
                                            </NavDropdown>
					    <NavDropdown title="Character" id="nav-dropdown" onSelect={categoryChange}>
                                                <NavDropdown.Item eventKey="Character-Bento" >Bento</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Character-Cakes">Cakes</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Character-Cupakes">Cupcakes</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Character-Number">Number</NavDropdown.Item>
                                            </NavDropdown>
					    <NavDropdown title="Christening" id="nav-dropdown" onSelect={categoryChange}>
                                                <NavDropdown.Item eventKey="Christening-Bento" >Bento</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Christening-Cakes">Cakes</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Christening-Cupcakes">Cupcakes</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Christening-Number">Number</NavDropdown.Item>
                                            </NavDropdown>
					    <NavDropdown title="Debut" id="nav-dropdown" onSelect={categoryChange}>
                                                <NavDropdown.Item eventKey="Debut-Bento" >Bento</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Debut-Cakes">Cakes</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Debut-Cupcakes">Cupcakes</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Debut-Number">Number</NavDropdown.Item>
                                            </NavDropdown>
					    <NavDropdown title="Gender" id="nav-dropdown" onSelect={categoryChange}>
                                                <NavDropdown.Item eventKey="Gender-Bento" >Bento</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Gender-Cakes">Cakes</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Gender-Cupcakes">Cupcakes</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Gender-Number">Number</NavDropdown.Item>
                                            </NavDropdown>
					    <NavDropdown title="Wedding" id="nav-dropdown" onSelect={categoryChange}>
                                                <NavDropdown.Item eventKey="Wedding-Bento" >Bento</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Wedding-Cakes">Cakes</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Wedding-Cupakes">Cupcakes</NavDropdown.Item>
                                                <NavDropdown.Item eventKey="Wedding-Number">Number</NavDropdown.Item>
                                            </NavDropdown>
                			</Nav>
                                        </div>
                                        <hr/>
                                    </div>
                            </div>
                            <div class="col-lg-9">
                                <div class="products">
                                    <div class="row g-0">
                                        { /* items */ }
                                        { /*
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
                                        */ }
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
