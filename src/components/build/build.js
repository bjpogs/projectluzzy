import React, {useState, useEffect} from 'react'
import Slider from 'react-slick'
import axios from '../../api/api'

import {Form, InputGroup, FormControl, Button, Accordion} from 'react-bootstrap'

// image for tutorials
import img0 from '../../assets/img/tuts/img1.jpg'
import img1 from '../../assets/img/tuts/step1.jpg'
import img2 from '../../assets/img/tuts/step2.jpg'

const Build = () => {
    const [reserve, setReserve] = useState(false)
    const [data, setData] = useState({
        size : '6x2',
        sizeprice : 600,
        flavor : 'Ube',
        design : 'Design 1',
        top1 : '',
        top2 : '',
        top1price : 0,
        top2price : 0,
        topper : '',
        topperprice : 0,
        message : '',
        date : '',
    })

    useEffect(() => {
        if (!localStorage.getItem('isAuthenticated')){
            alert('Please login first to continue.')
            window.location.href = "/login"
        }
    })

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!reserve) data.date = ""
        axios.post('savecustom', data)
        .then((res) => {
            alert('Success!')
            window.location.reload()
        })
        .catch((err) => {
            console.log(err);
        })
    }

    
    const handleChange = (e) => {
        const newdata = {...data}
        if (e.target.id == "size"){
            if (e.target.value == "6x2") newdata['sizeprice'] = 600
            else if (e.target.value == "7x3") newdata['sizeprice'] = 1200
            else if (e.target.value == "8x3") newdata['sizeprice'] = 1300
            else if (e.target.value == "8x5") newdata['sizeprice'] = 3000
        }
        else if (e.target.id == "top1"){
            if (e.target.value == "None") newdata['top2price'] = 0
            else if (e.target.value == "topping1") newdata['top1price'] = 50
            else if (e.target.value == "topping2") newdata['top1price'] = 100
            else if (e.target.value == "topping3") newdata['top1price'] = 150
            else if (e.target.value == "topping4") newdata['top1price'] = 200
            else if (e.target.value == "topping5") newdata['top1price'] = 250
        }
        else if (e.target.id == "top2"){
            if (e.target.value == "None") newdata['top2price'] = 0
            else if (e.target.value == "topping1") newdata['top2price'] = 50
            else if (e.target.value == "topping2") newdata['top2price'] = 100
            else if (e.target.value == "topping3") newdata['top2price'] = 150
            else if (e.target.value == "topping4") newdata['top2price'] = 200
            else if (e.target.value == "topping5") newdata['top2price'] = 250
        }
        else if (e.target.id =="topper"){
            if (e.target.value == 'None') newdata['topperprice'] = 0
            else if (e.target.value == '1') newdata['topperprice'] = 100
            else if (e.target.value == '18') newdata['topperprice'] = 200
            else if (e.target.value == '21') newdata['topperprice'] = 200
            else if (e.target.value == 'Happy Anniversary') newdata['topperprice'] = 300
            else if (e.target.value == 'Happy Birthday') newdata['topperprice'] = 300
            else if (e.target.value == 'Congratulations') newdata['topperprice'] = 300
            else if (e.target.value == 'Gender Reveal') newdata['topperprice'] = 400
        }
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }

    return(
        <main class="page">
            <section class="clean-block clean-catalog dark">
                <div class="container">
                    <div class="block-heading">
                        <h2 class="text-info">Build your own cake</h2>
                        <p>Build your dream cake here.</p>
                    </div>
                </div>
                <div class="tutcard">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="tutbox">
                                <Slider {...settings}>
                                    <div>
                                        <img class="tutimg" src={img0} />
                                    </div>
                                    <div>
                                        <img class="tutimg" src={img1} />
                                    </div>
                                    <div>
                                        <img class="tutimg" src={img2} />
                                    </div>
                                    <div>
                                        <h3>4</h3>
                                    </div>
                                    <div>
                                        <h3>5</h3>
                                    </div>
                                    <div>
                                        <h3>6</h3>
                                    </div>
                                </Slider>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="tutbuild">
                            <Form onSubmit={handleSubmit}>
                                <div class="row">
                                    <div class="col-12 mb-2">
                                    <h3><b>Build a Cake</b></h3>
                                    </div>
                                    <div class="col-12 mb-2">
                                        <Form.Label htmlFor="basic-url"><b>Step 1. Select Size *</b></Form.Label>
                                        <Form.Select aria-label="Default select example" id="size" onChange={handleChange}>
                                            <option value='6x2'>6 by 2 inch (1 layer) - ₱600</option>
                                            <option value='7x3'>7 by 3 inch (1 layer) - ₱1200</option>
                                            <option value='8x3'>8 by 3 inch (1 layer) - ₱1300</option>
                                            <option value='8x5'>8 by 5 inch (2 layer) - ₱3000</option>
                                        </Form.Select>
                                    </div>
                                    <div class="col-12 mb-2">
                                        <Form.Label htmlFor="basic-url"><b>Step 2. Select Flavor *</b></Form.Label>
                                        <Form.Select aria-label="Default select example" id="flavor" onChange={handleChange}>
                                            <option value='Ube'>Ube</option>
                                            <option value='Moist-Chocolate'>Moist Chocolate</option>
                                            <option value='Vanilla-Caramel'>Vanilla Caramel</option>
                                        </Form.Select>
                                    </div>
                                    <div class="col-12 mb-2">
                                        <Form.Label htmlFor="basic-url"><b>Step 3. Select Design *</b></Form.Label>
                                        <Form.Select aria-label="Default select example" id="design" onChange={handleChange}>
                                            <option value='Design1'>Design 1</option>
                                            <option value='Design2'>Design 2</option>
                                            <option value='Design3'>Design 3</option>
                                            <option value='Design4'>Design 4</option>
                                            <option value='Design5'>Design 5</option>
                                        </Form.Select>
                                    </div>
                                    <div class="col-12 mb-2">
                                        <Form.Label htmlFor="basic-url"><b>Step 4. Select Topping 1 *</b></Form.Label>
                                        <Form.Select aria-label="Default select example" id="top1" onChange={handleChange}>
                                            <option value='None'>None</option>
                                            <option value='topping1'>Topping 1 - ₱50</option>
                                            <option value='topping2'>Topping 2 - ₱100</option>
                                            <option value='topping3'>Topping 3 - ₱150</option>
                                            <option value='topping4'>Topping 4 - ₱200</option>
                                            <option value='topping5'>Topping 5 - ₱250</option>
                                        </Form.Select>
                                    </div>
                                    <div class="col-12 mb-2">
                                        <Form.Label htmlFor="basic-url"><b>Select Topping 2 *</b></Form.Label>
                                        <Form.Select aria-label="Default select example" id="top2" onChange={handleChange}>
                                            <option value='None'>None</option>
                                            <option value='topping1'>Topping 1 - ₱50</option>
                                            <option value='topping2'>Topping 2 - ₱100</option>
                                            <option value='topping3'>Topping 3 - ₱150</option>
                                            <option value='topping4'>Topping 4 - ₱200</option>
                                            <option value='topping5'>Topping 5 - ₱250</option>
                                        </Form.Select>
                                    </div>
                                    <div class="col-12 mb-2">
                                        <Form.Label htmlFor="basic-url"><b>Step 5. Select a Topper</b></Form.Label>
                                        <Form.Select aria-label="Default select example" id="topper" onChange={handleChange}>
                                            <option value='None'>None</option>
                                            <option value='1'>1 - ₱100</option>
                                            <option value='18'>18 - ₱200</option>
                                            <option value='21'>21 - ₱200</option>
                                            <option value='Happy Anniversary'>Happy Anniversary - ₱300</option>
                                            <option value='Happy Birthday'>Happy Birthday - ₱300</option>
                                            <option value='Congratulations'>Congratulations - ₱300</option>
                                            <option value='Gender Reveal'>Gender Reveal - ₱400</option>
                                        </Form.Select>
                                    </div>

                                    <div class="col-12 mb-2 mt-2">
                                        <Form.Label htmlFor="basic-url"><b>Written Message (Card)</b><br/>(Free)</Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl
                                            placeholder="Write message here..."
                                            aria-label="Username"
                                            aria-describedby="basic-addon1"
                                            id="message"
                                            as="textarea"
                                            style={{ height: '100px' }}
                                            onChange={handleChange}
                                            />
                                        </InputGroup>
                                    </div>

                                    <div class="col-12 mb-2 mt-3">
                                        <p>Disclaimer: Please keep in mind that each cake is handcrafted individually by a professional baker so there may be subtle differences in design and flowers (due to seasonal changes)</p>
                                    </div>
                                    <hr/>
                                    <div class="col-12 mt-2 mb-2">
                                        <h4>Summary :</h4>
                                        <div class="row">
                                            <div class="col-10"><p>Step 1. Select Size : <b>{data.size}</b></p></div>
                                            <div class="col-2"><p>₱{data.sizeprice}</p></div>
                                            <div class="col-10"><p>Step 2. Select Flavor : <b>{data.flavor}</b></p></div>
                                            <div class="col-2"><p>₱0</p></div>
                                            <div class="col-10"><p>Step 3. Select Design : <b>{data.design}</b></p></div>
                                            <div class="col-2"><p>₱0</p></div>
                                            <div class="col-10"><p>Step 4. Select Topping 1 : <b>{data.top1}</b></p></div>
                                            <div class="col-2"><p>₱{data.top1price}</p></div>
                                            <div class="col-10"><p>Select Topping 2 : <b>{data.top2}</b></p></div>
                                            <div class="col-2"><p>₱{data.top2price}</p></div>
                                            <div class="col-10"><p>Step 5. Select Topper : <b>{data.topper}</b></p></div>
                                            <div class="col-2"><p>₱{data.topperprice}</p></div>
                                            <div class="col-10"><p><b>Subtotal : </b></p></div>
                                            <div class="col-2"><p><b>₱{data.sizeprice + data.top1price + data.top2price + data.topperprice}</b></p></div>
                                        </div>
                                    </div>
                                    <div class="col-12 mt-2 mb-3">
                                        { /* reservation button */ }
                                        <Button type="button" class="btn btn-success w-100" onClick={() => setReserve(!reserve)}>{!reserve? 'For Reservation' : 'For Pick Up'}</Button>
                                    </div>
                                    {
                                        reserve ? 
                                        <>
                                        <div class="col-12">
                                            <Form.Label htmlFor="basic-url">Select Pickup Date</Form.Label>
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                aria-label="Username"
                                                aria-describedby="basic-addon1"
                                                type="date"
                                                id="date"
                                                onChange={handleChange}
                                                />
                                            </InputGroup>
                                        </div>
                                        </>
                                        : 
                                        <></>
                                    }
                                    <div class="col mt-1">
                                        <Button type="submit" class="btn btn-primary w-50">Place Order</Button>
                                    </div>
                                    
                                </div>
                            </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Build