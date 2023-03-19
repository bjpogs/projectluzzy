import React, {useState, useEffect} from 'react'
import axios from '../../api/api'

// navbar and footer template
import {Button, Form, InputGroup, FormControl, ButtonGroup, ToggleButton} from 'react-bootstrap'


const Cart = () => {
    const [reserve, setReserve] = useState(false)
    const [data, setData] = useState([])
    const [edit, setEdit] = useState(false)
    const [tempdata, setTempdata] = useState([])
    const [minDate, setMinDate] = useState(() => {
	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	return tomorrow.toISOString().substr(0, 10);
    });
    var jatot = 0
    useEffect(() => {
        axios.get('shoppingcart')
        .then((res) => {
            setData(res.data)
            setTempdata(res.data)
        })
        .catch((err) => {
            console.log(err);
        })
    },[])



    const generateProduct = () => {
        return(
            tempdata.map(meow => {
                jatot += meow.product_price
                return(
                    <div class="product">
                        <div class="row justify-content-center align-items-center">
                            { edit ? 
                            <>
                            <div class="col-md-1">
                                <button class="btn btn-danger d-block w-100" type="button" onClick={() => tempremoveItem(meow.cart_num)}>-</button>
                            </div> 
                            <div class="col-md-4">
                                <div class="product-image"><img class="product-img-fluid d-block mx-auto image" src={meow.product_image}/></div>
                            </div>
                            </>
                            : 
                            <div class="col-md-5">
                                <div class="product-image"><img class="product-img-fluid d-block mx-auto image" src={meow.product_image}/></div>
                            </div>
                            }
                            <div class="col-md-5 product-info"><a class="product-name" href="#">{meow.product_name}</a>
                                <div class="product-specs">
                                    <div><span>Category:&nbsp;</span><span class="value">{meow.product_category}</span></div>
                                    <div><span>Size:&nbsp;</span><span class="value">{meow.product_size}</span></div>
				    <div><span>Request:&nbsp;</span><span class="value">{meow.request}</span></div>
                                </div>
                            </div>
                            <div class="col-6 col-md-2 price"><span>₱{meow.product_price}</span></div>
                        </div>
                    </div>
                )
            })
        )
    }

    const removeItem = () => { 
        axios.post('deletefromcart', tempdata)
        .then((res) => {
            setData(tempdata)
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setEdit(!edit)
        })
    }

    const tempremoveItem = (id) => {
        var remainingArr = tempdata.filter(data => data.cart_num != id);
        setTempdata(remainingArr)
    }

    const cancelremove = () => {
        setTempdata(data)
        setEdit(!edit)
    }

    const checkout = () => {
        if (!reserve) data.order_date = document.getElementById('order_date').value
        axios.post('placeorder', data) 
        .then((res) => {
            alert("Order placed successfully! We will contact you once your order is finish.")
            window.location.href = "/"
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handleChange = (e) => {
        const newdata = {...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }


    return(
        <>
        <main class="page shopping-cart-page">
            <section class="clean-block clean-cart dark">
                <div class="container">
                    <div class="block-heading">
                        <h2 class="text-info">Shopping Cart</h2>
                    </div>
                    <div class="shopcontainer">
                        <div class="row g-0">
                            
                            <div class="col-md-12 col-lg-8">
                                
                                <div class="items">
                                <div class="product">
                                    <div class="row justify-content-center align-items-center">
                                        { !data.length ? 
                                            <>
                                                <div class="col-md-10">
                                                    <h3>Your cart is empty.</h3>
                                                </div>
                                            </>
                                        : 

                                        edit ? 
                                            <>
                                                <div class="col-md-5">
                                                </div>
                                                <div class="col-md-3 product-info">
                                                </div>
                                                <div class="col-6 col-md-2 price">
                                                    <button class="btn btn-success d-block w-100" type="button" onClick={() => removeItem()}>Save</button>
                                                </div>
                                                <div class="col-6 col-md-2 price">
                                                    <button class="btn btn-danger d-block w-100" type="button" onClick={() => cancelremove()}>Cancel</button>
                                                </div>
                                            </> : 
    
    
                                            <>
                                                <div class="col-md-5">
                                                </div>
                                                <div class="col-md-5 product-info">
                                                </div>
                                                <div class="col-6 col-md-2 price">
                                                    <button class="btn btn-primary d-block w-100" type="button" onClick={() => setEdit(!edit)}>Edit</button>
                                            </div>
                                            </> 
                                            
                                            
                                        }
                                        
                                        
                                    </div>
                                </div>
                                    {generateProduct()}
                                    
                                </div>
                            </div>
                            <div class="col-md-12 col-lg-4">
                                <div class="summary">
                                    <h3>Summary</h3>
                                    <h4><span class="text">Subtotal</span><span class="price">₱{jatot}</span></h4>
                                    
                                    <h4><span class="text">Total</span><span class="price">₱{jatot}</span></h4>
                                   {/* <div class="col-12 mt-3">
                                        <ButtonGroup className="mb-2 d-block">
                                            <ToggleButton
                                            id="toggle-check"
                                            type="checkbox"
                                            variant="outline-primary"
                                            checked={reserve}
                                            value="1"
                                            onChange={(e) => setReserve(!reserve)}
                                            >
                                            For Reservation
                                            </ToggleButton>
                                        </ButtonGroup>
                                    </div>*/}
                                        <div class="col-12 mt-3">
                                            <Form.Label htmlFor="basic-url">Select Reservation Date</Form.Label>
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                aria-label="Username"
                                                aria-describedby="basic-addon1"
                                                type="date"
                                                id="order_date"
						 min={minDate}
						
                                                onChange={() => handleChange}
                                                />
                                            </InputGroup>
                                        </div>

                                    {!data.length ? <button class="btn btn-primary btn-lg d-block w-100" type="button" disabled >Place Order</button> : <button class="btn btn-primary btn-lg d-block w-100" type="button" onClick={() => checkout()} >Place Order</button>}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        </>
    )
}

export default Cart
