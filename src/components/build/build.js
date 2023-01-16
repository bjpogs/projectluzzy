import React, {useState, useEffect} from 'react'
import Slider from 'react-slick'
import axios from '../../api/api'

import {Form, InputGroup, FormControl, Button, Accordion, ButtonGroup, ToggleButton} from 'react-bootstrap'

// image for tutorials asdasd
import img0 from '../../assets/img/tuts/img1.jpg'
import img1 from '../../assets/img/tuts/step1.jpg'
import img2 from '../../assets/img/tuts/step2.jpg'
import img3 from '../../assets/img/tuts/step3.jpg'
import img41 from '../../assets/img/tuts/step4.1.jpg'
import img42 from '../../assets/img/tuts/step4.2.jpg'
import img5 from '../../assets/img/tuts/step5.jpg'
import img6 from '../../assets/img/tuts/step6.jpg'

const Build = () => {
    const [reserve, setReserve] = useState(false)
    const [bdaynum, setbdaynum] = useState(false)
    const [selectdata, setSelectData] = useState([])
    const [data, setData] = useState([])
    const [sizeprice, setSizeprice] = useState(0)
    const [toppingprice, setToppingprice] = useState(0)
    const [topperprice, setTopperprice] = useState(0)

    useEffect(() => {
        if (!localStorage.getItem('isAuthenticated')){
            alert('Please login first to continue.')
            window.location.href = "/login"
        }
        else{
            axios.get('buildselect')
            .then(res => {
                setSelectData(res.data)
                setSizeprice(res.data[0].price)
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
        // price coming soon.
        bdaynum ? data['number'] = document.getElementById('bdaynum').value : data['number'] = 0
        if (!reserve) data.date = ""
        var tempdata = {
            size : document.getElementById('size').value,
            shape : document.getElementById('shape').value,
            flavor : document.getElementById('flavor').value,
            design: document.getElementById('design').value,
            topping : document.getElementById('top1').value,
            topper : document.getElementById('topper').value,
            number : bdaynum ? document.getElementById('bdaynum').value : '',
            icing : document.getElementById('icing').value,
            message : document.getElementById('message').value,
            price : sizeprice + toppingprice + topperprice,
            date : reserve ? document.getElementById('date').value : 'not applicable'
        }
        axios.post('savecustom', tempdata)
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
        let tempprice = 0
        let tempval = e.target.value
        selectdata.map(meow => {
            if (meow.name == tempval && meow.id == "size") setSizeprice(meow.price)
            else if (meow.name == tempval && meow.id == "topping") setToppingprice(meow.price) 
            else if (meow.name == tempval && meow.id == "topper") setTopperprice(meow.price)
        })

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

    const selectshape= () => {
        return (
            selectdata.map(meow => {
                if (meow.id == "shape"){
                    return (
                        <option value={meow.name}>{meow.name}</option>
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
                                        <img class="tutimg" src={img3} />
                                    </div>
                                    <div>
                                        <img class="tutimg" src={img41} />
                                    </div>
                                    <div>
                                        <img class="tutimg" src={img42} />
                                    </div>
                                    <div>
                                        <img class="tutimg" src={img5} />
                                    </div>
                                    <div>
                                        <img class="tutimg" src={img6} />
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
                                        <Form.Label htmlFor="basic-url"><b>Step 1. Select Size</b></Form.Label>
                                        <Form.Select aria-label="Default select example" id="size" onChange={handleChange}>
                                            {selectsize()}
                                        </Form.Select>
                                    </div>
                                    {/*new choice added */}
                                    <div class="col-12 mb-2">
                                        <Form.Label htmlFor="basic-url"><b>Step 2. Select Shape</b></Form.Label>
                                        <Form.Select aria-label="Default select example" id="shape" onChange={handleChange}>
                                            {selectshape()}
                                        </Form.Select>
                                    </div>

                                
                                    <div class="col-12 mb-2">
                                        <Form.Label htmlFor="basic-url"><b>Step 3. Select Flavor</b></Form.Label>
                                        <Form.Select aria-label="Default select example" id="flavor" onChange={handleChange}>
                                            {selectflavor()}
                                        </Form.Select>
                                    </div>
                                    <div class="col-12 mb-2">
                                        <Form.Label htmlFor="basic-url"><b>Step 4. Select Design</b></Form.Label>
                                        <Form.Select aria-label="Default select example" id="design" onChange={handleChange}>
                                            {selectdesign()}
                                        </Form.Select>
                                    </div>
                                    <div class="col-12 mb-2">
                                        <Form.Label htmlFor="basic-url"><b>Step 5. Select Topping</b></Form.Label>
                                        <Form.Select aria-label="Default select example" id="top1" onChange={handleChange}>
                                            <option value='None'>None</option>
                                            {selecttopping()}
                                        </Form.Select>
                                    </div>
                                    <div class="col-12 mb-2">
                                        <Form.Label htmlFor="basic-url"><b>Step 6. Select a Topper</b></Form.Label>
                                        <Form.Select aria-label="Default select example" id="topper" onChange={handleChange}>
                                            <option value='None'>None</option>
                                            {selecttopper()}
                                        </Form.Select>
                                    </div>
                                    <div class="col-12 mb-2">
                                        <Form.Label htmlFor="basic-url"><b>Topper Message : </b></Form.Label>
                                        <input class="form-control item" type="text" id="bdaynum" placeholder="Example : Number / Gender"/>
                                    </div>
                                    <div class="col-12 mb-2">
                                        <Form.Label htmlFor="basic-url"><b>Step 7. Select a Icing</b></Form.Label>
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
                                            { /* price for size */ }
                                            <div class="col-2"><p>₱{sizeprice}</p></div>
                                            <div class="col-10"><p>Step 2. Select Shape : <b>{data.flavor}</b></p></div>
                                            <div class="col-2"><p>₱0</p></div>
                                            <div class="col-10"><p>Step 3. Select Flavor : <b>{data.design}</b></p></div>
                                            <div class="col-2"><p>₱0</p></div>
                                            <div class="col-10"><p>Step 4. Select Design : <b>{data.top1}</b></p></div>
                                            <div class="col-2"><p>₱0</p></div>
                                            <div class="col-10"><p>Step 5. Select Topping : <b>{data.top2}</b></p></div>
                                            { /* price for topping */ }
                                            <div class="col-2"><p>₱{toppingprice}</p></div>
                                            <div class="col-10"><p>Step 6. Select Topper : <b>{data.topper}</b></p></div>
                                            { /* price for topper */ }
                                            <div class="col-2"><p>₱{topperprice}</p></div>
                                            <div class="col-10"><p>Step 7. Select Icing : <b>{data.icing}</b></p></div>
                                            <div class="col-2"><p>₱0</p></div>
                                            <div class="col-10"><p><b>Subtotal : </b></p></div>
                                            { /* total price */ }
                                            <div class="col-2"><p><b>₱{sizeprice + toppingprice + topperprice}</b></p></div>
                                        </div>
                                    </div>
                                    <div class="col-12 mt-3">
                                        <ButtonGroup className="mb-2 d-block">
                                            <ToggleButton
                                            id="toggle-check"
                                            type="checkbox"
                                            variant="outline-success"
                                            checked={reserve}
                                            value="1"
                                            onChange={(e) => setReserve(!reserve)}
                                            >
                                            For Reservation
                                            </ToggleButton>
                                        </ButtonGroup>
                                    </div>
                                    {
                                        reserve ? 
                                        <>
                                        <div class="col-12">
                                            <Form.Label htmlFor="basic-url">Select Reservation Date</Form.Label>
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