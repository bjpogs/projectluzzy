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
    const [bdaynum, setbdaynum] = useState(false)
    const [selectdata, setSelectData] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        if (!localStorage.getItem('isAuthenticated')){
            alert('Please login first to continue.')
            window.location.href = "/login"
        }
        else{
            axios.get('buildselect')
            .then(res => {
                setSelectData(res.data)
            })
            .catch(err => {
                console.log(err);
            })
        }
    },[])

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        bdaynum ? data['number'] = document.getElementById('bdaynum').value : data['number'] = 0
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
        e.target.value == "Number" ? setbdaynum(true) : setbdaynum(false)
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }

    const selectsize = () => {
        return (
            selectdata.map(meow => {
                if (meow.id == "size"){
                    return (
                        <option value={meow.name}>{meow.name} - {meow.price}</option>
                    )
                }
            })
        )
    }
    
    const selectflavor = () => {
        return (
            selectdata.map(meow => {
                if (meow.id == "flavor"){
                    return (
                        <option value={meow.name}>{meow.name}</option>
                    )
                }
            })
        )
    }

    const selectdesign = () => {
        return (
            selectdata.map(meow => {
                if (meow.id == "design"){
                    return (
                        <option value={meow.name}>{meow.name}</option>
                    )
                }
            })
        )
    }

    const selecttopping = () => {
        return (
            selectdata.map(meow => {
                if (meow.id == "topping"){
                    return (
                        <option value={meow.name}>{meow.name} - {meow.price}</option>
                    )
                }
            })
        )
    }

    const selecttopper = () => {
        return (
            selectdata.map(meow => {
                if (meow.id == "topper"){
                    return (
                        <option value={meow.name}>{meow.name} - {meow.price}</option>
                    )
                }
            })
        )
    }

    const selecticing = () => {
        return (
            selectdata.map(meow => {
                if (meow.id == "icing"){
                    return (
                        <option value={meow.name}>{meow.name}</option>
                    )
                }
            })
        )
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
                                            {selectsize()}
                                        </Form.Select>
                                    </div>
                                    <div class="col-12 mb-2">
                                        <Form.Label htmlFor="basic-url"><b>Step 2. Select Flavor *</b></Form.Label>
                                        <Form.Select aria-label="Default select example" id="flavor" onChange={handleChange}>
                                            {selectflavor()}
                                        </Form.Select>
                                    </div>
                                    <div class="col-12 mb-2">
                                        <Form.Label htmlFor="basic-url"><b>Step 3. Select Design *</b></Form.Label>
                                        <Form.Select aria-label="Default select example" id="design" onChange={handleChange}>
                                            {selectdesign()}
                                        </Form.Select>
                                    </div>
                                    <div class="col-12 mb-2">
                                        <Form.Label htmlFor="basic-url"><b>Step 4. Select Topping 1 *</b></Form.Label>
                                        <Form.Select aria-label="Default select example" id="top1" onChange={handleChange}>
                                            <option value='None'>None</option>
                                            {selecttopping()}
                                        </Form.Select>
                                    </div>
                                    <div class="col-12 mb-2">
                                        <Form.Label htmlFor="basic-url"><b>Select Topping 2 *</b></Form.Label>
                                        <Form.Select aria-label="Default select example" id="top2" onChange={handleChange}>
                                            <option value='None'>None</option>
                                            {selecttopping()}
                                        </Form.Select>
                                    </div>
                                    <div class="col-12 mb-2">
                                        <Form.Label htmlFor="basic-url"><b>Step 5. Select a Topper</b></Form.Label>
                                        <Form.Select aria-label="Default select example" id="topper" onChange={handleChange}>
                                            <option value='None'>None</option>
                                            {selecttopper()}
                                        </Form.Select>
                                    </div>
                                    {
                                        bdaynum ? 
                                        <div class="col-12 mb-2">
                                            <Form.Label htmlFor="basic-url"><b>Birthday Number : </b></Form.Label>
                                            <input class="form-control item" type="number" id="bdaynum" required/>
                                        </div>
                                        :
                                        <></>
                                    }
                                    <div class="col-12 mb-2">
                                        <Form.Label htmlFor="basic-url"><b>Step 6. Select a Icing</b></Form.Label>
                                        <Form.Select aria-label="Default select example" id="icing" onChange={handleChange}>
                                            {selecticing()}
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
                                            <div class="col-10"><p>Step 1. Select Size : <b></b></p></div>
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
                                            <div class="col-10"><p>Step 6. Select Icing : <b>{data.icing}</b></p></div>
                                            <div class="col-2"><p>₱0</p></div>
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