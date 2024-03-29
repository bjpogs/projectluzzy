import React, {useState, useEffect} from 'react'
//import basecake from ''
import unaimahe from '../../assets/img/0.png'
import axios from '../../api/api'
import {Form, Button, InputGroup, FormControl, ButtonGroup, ToggleButton} from 'react-bootstrap'

//---------------------------------------------------------------
// to fix : default value!
//---------------------------------------------------------------

const Finalbuild = () => {
    const [data,setData] = useState([])
    const [selectedData, setselectedData] = useState([])
    const [layer, setlayer] = useState(false)
    const [page, setPage] = useState(1)
    const [design, setDesign] = useState('')
    const [design1, setDesign1] = useState('')
    const [topper, setTopper] = useState('')
    const [num1, setnum1] = useState('')
    const [num2, setnum2] = useState('')
    const [reserve, setReserve] = useState(false)
    const [order,setOrder] = useState([{
        size : '',
        flavor : '',
        layer : '1',
        design : 'Plain',
        design1 : 'Plain',
        topper : 'None',
        number1 : '',
        number2 : '',
        message : '',
        specialrequest : '',
    }])
    const [sizeprice, setSizeprice] = useState(0)
    const [layerprice, setLayerprice] = useState(0)
    const [designprice, setDesignprice] = useState(0)
    const [design1price, setDesign1price] = useState(0)
    const [topperprice, setTopperprice] = useState(0)
    const [checknumber, setChecknumber] = useState(false)
    const [cnum, setcnum] = useState(false)
    useEffect(() => {
        axios.get('buildselect')
        .then(res => {
            setData(res.data)
            let tempdata = res.data.find(meow => meow.id === "topper-number")
            let sizeprice = res.data.find(meow => meow.id === "size")
            setSizeprice(sizeprice.price)
            let flavory = res.data.find(meow => meow.id === 'flavor')
            let temper = {...order}
            temper['size'] = sizeprice.name
            temper['flavor'] = flavory.name
            temper['layer'] = 1
            temper['design'] = 'Plain'
            temper['topper'] = 'None'
            setOrder(temper)
            setnum1(tempdata.image)
            setnum2(tempdata.image)
        })
        .catch(err => {console.log(err);})
    },[])

    const handleChange = (e) => {
        e.preventDefault()
        var splitted = false
        var val = ''
        if (e.target.id == "layer" && e.target.value == "2") setlayer(true)
        else if (e.target.id == "layer" && e.target.value != "2") setlayer(false)
        if(e.target.id == 'design'){
            splitted = true
            var test = e.target.value.split('|')
            setDesign(test[0] == "Plain" ? "" : test[1])
            val = test[0]
        }
        if(e.target.id == 'design1'){
            splitted = true
            var test = e.target.value.split('|')
            setDesign1(test[0] == "Plain" ? "" : test[1])
            val = test[0]
        }
        if(e.target.id == 'topper'){
            splitted = true
            var test = e.target.value.split('|')
            setTopper(test[0] == "None" ? "" : test[1])
            val = test[0]
        }
        if(e.target.id == 'number'){
            splitted = true
            var test = e.target.value.split('|')
            setnum1(test[1])
            val = test[0]
        }
        if(e.target.id == 'number1'){
            splitted = true
            var test = e.target.value.split('|')
            setnum1(test[1])
            val = test[0]
        }
        if(e.target.id == 'number2'){
            splitted = true
            var test = e.target.value.split('|')
            setnum2(test[1])
            val = test[0]
        }
        if (e.target.id == 'topper' && val == "number") setcnum(true)
        else if (e.target.id == 'topper' && val != "number") setcnum(false)
        if (e.target.id == 'topper' && val == "number - double") setChecknumber(true)
        else if (e.target.id == 'topper' && val != "number - double") setChecknumber(false)
        const newdata = {...order}
        newdata[e.target.id] = !splitted ? e.target.value : val
        // ---------------------------------------------------------
        
        let findid = e.target.id == 'design1' ? 'design' : !splitted ? e.target.value : val
        let oldprice = data.find(meow => meow.name === findid)
        if(e.target.id == 'size') setSizeprice(oldprice.price)
        else if(e.target.id == 'layer') setLayerprice(oldprice.price)
        else if(e.target.id == 'design') setDesignprice(oldprice.price)
        else if(e.target.id == 'design1') setDesign1price(oldprice.price)
        else if(e.target.id == 'topper') setTopperprice(oldprice.price)
        setOrder(newdata)
    }

    // checkouy
    const checkout = () => {
        let numero = cnum ? order.number : ''
        var datos = {
            size : order.size,
            flavor : order.flavor,
            layer : order.layer,
            design : order.design,
            design1 : order.design1 ? order.design1 : '',
            topper: order.topper,
            number : order.number1 && order.number2 ? order.number1 + " - " + order.number2 : order.number1 ? order.number1 : '', 
            date : order.date ? order.date : '',
            price : sizeprice + layerprice + designprice + design1price + topperprice,
            message : order.message ? order.message : '',
            specialrequest : order.specialrequest ? order.specialrequest : '',
            
        }
        axios.post('savecustom', datos)
        .then((res) => {
            alert('Success!')
            window.location.reload()
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const selectSize = () => {
        return(
            data.map(meow => {
                if (meow.id == 'size'){
                    return (
                        <option value={meow.name + "|" + meow.price} selected={order.size==meow.name}>{meow.name}</option>
                    )
                }
            })
        )
    }
    const selectFlavor = () => {
        return(
            data.map(meow => {
                if(meow.id == 'flavor'){
                    return(
                        <option value={meow.name} selected={order.flavor==meow.name}>{meow.name}</option>
                    )
                }
            })
        )
    }
    const selectLayer = () => {
        return(
            data.map(meow => {
                if(meow.id == 'layer'){
                    return(
                        <option value={meow.name} selected={order.layer==meow.name}>{meow.name}</option>
                    )
                }
            })
        )
    }
    const selectDesign = () => {
        return(
            data.map(meow => {
                if(meow.id == 'design'){
                    return(
                        <option value={meow.name + "|" + meow.image + "|" + meow.price} selected={order.design==meow.name}>{meow.name}</option>
                    )
                }
            })
        )
    }
    const selectDesign2 = () => {
        return(
            data.map(meow => {
                if(meow.id == 'design'){
                    return(
                        <option value={meow.name + "|" + meow.image + "|" + meow.price} selected={order.design1==meow.name}>{meow.name}</option>
                    )
                }
            })
        )
    }
    const selectTopper = () => {
        return(
            data.map(meow => {
                if(meow.id == 'topper'){
                    return(
                        <option value={meow.name + "|" + meow.image + "|" + meow.price} selected={order.topper==meow.name}>{meow.name}</option>
                    )
                }
            })
        )
    }
    const selectNumber = () => {
        return(
            data.map(meow => {
                if(meow.id == 'topper-number'){
                    return(
                        <option value={meow.name + "|" + meow.image} selected={order.number1==meow.name}>{meow.name}</option>
                    )
                }
            })
        )
    }
    const selectNumber2 = () => {
        return(
            data.map(meow => {
                if(meow.id == 'topper-number'){
                    return(
                        <option value={meow.name + "|" + meow.image} selected={order.number2==meow.name}>{meow.name}</option>
                    )
                }
            })
        )
    }
    const setsummary = (e) => {
        e.preventDefault()
        if(page == 1){
            let tempdata = {...order}

        }
        setPage(page+1)
    }

    return(
        <div class="page landing-page">
            <section class="">
                <div class="row mx-0 my-0 px-0 py-0 align-items-center">
                    <div class="d-none d-md-block col col-md-6 mx-0 my-0 px-0 py-0">
                        <section class="leftbuildcard">
                            { !layer?<div class="cakebase3">
                                
                                </div>
                            : <></>}
                            <div> { /* topper area */ }
                            {
                                !cnum  && !checknumber ? 
                                <div class="maintopper px-0 py-0">
                                    {topper != "" ? <img class="imahe" src={topper} alt="" /> : <></>}
                                </div>
                                :
                                cnum ? 
                                <div class="topper px-0 py-0">
                                    {num1 != "" ? <img class="imahe" src={num1} alt="" /> : <></>}
                                </div>
                                :
                                <div class="row">
                                    <div class="topper1 px-0 py-0">
                                        {num1 != "" ? <img class="imahe" src={num1} alt="" /> : <></>}
                                    </div>
                                    <div class="topper2 px-0 py-0">
                                        {num1 != "" ? <img class="imahe" src={num2} alt="" /> : <></>}
                                    </div>
                                </div>
                            }
                            </div>
                            { /* end topper area */ }
                            { layer? <div class="cakebase2"> 
                                    {design1 != "" ? <img class="imahe" src={design1} alt="" /> : <></>}
                                </div> 
                             : <></>}
                            <div class="cakebase px-0 py-0">
                                {design != "" ? <img class="imahe" src={design} alt="" /> : <></>}
                            </div>
                            
                        </section>
                    </div>
                    <div class="col col-md-6 col-sm-12 mx-0 my-0 px-0 py-0">
                        <div class="rightbuildcard">
                            { 
                                page == 1 ? 
                                    <div class="container">
                                        <div class="spacer"></div>
                                        <div class="block-heading center">
                                            <center>
                                                <h2 class="text-info">Step 1</h2>
                                                <p>Size, Shape and Flavor.</p>
                                            </center>
                                        </div>
                                        <div class="row">
                                            <div class="col-12 mb-2">
                                                <Form.Label htmlFor="basic-url"><b>Size</b></Form.Label>
                                                <Form.Select aria-label="Default select example" id="size" onChange={e => handleChange(e)}>
                                                    {selectSize()}
                                                </Form.Select>
                                            </div>
                                            {/*new choice added */}
                                            <div class="col-12 mb-2">
                                                <Form.Label htmlFor="basic-url"><b>Flavor</b></Form.Label>
                                                <Form.Select aria-label="Default select example" id="flavor" onChange={e => handleChange(e)}>
                                                    {selectFlavor()}
                                                </Form.Select>
                                            </div>

                                    
                                            <div class="col-12 mb-2">
                                                <Form.Label htmlFor="basic-url"><b>Number of layer</b></Form.Label>
                                                <Form.Select aria-label="Default select example" id="layer" onChange={handleChange}>
                                                    {selectLayer()}
                                                </Form.Select>
                                            </div>
                                            <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                                <button type="button" class="btn btn-primary" onClick={()=>{setPage(page+1)}} disabled={page==3}>Next</button>
                                            </div>
                                        </div>
                                    </div>
                                :
                                page == 2 ?
                                <div class="container">
                                    <div class="spacer"></div>
                                    <div class="block-heading center">
                                        <center>
                                            <h2 class="text-info">Step 2</h2>
                                            <p>Design and Topper</p>
                                        </center>
                                    </div>
                                    <div class="row">
                                        <div class="col-12 mb-2">
                                            <Form.Label htmlFor="basic-url"><b>Icing Design Layer 1</b></Form.Label>
                                            <Form.Select aria-label="Default select example" id="design" onChange={handleChange}>
                                                <option value="Plain">Plain</option>
                                                {selectDesign()}
                                            </Form.Select>
                                        </div>
                                        {
                                            layer?
                                            <div class="col-12 mb-2">
                                                <Form.Label htmlFor="basic-url"><b>Icing Design Layer 2</b></Form.Label>
                                                <Form.Select aria-label="Default select example" id="design1" onChange={handleChange}>
                                                    <option value="Plain">Plain</option>
                                                    {selectDesign2()}
                                                </Form.Select>
                                            </div>
                                            :
                                            <></>
                                        }
                                        {/*new choice added */}
                                        <div class="col-12 mb-2">
                                            <Form.Label htmlFor="basic-url"><b>Topper</b></Form.Label>
                                            <Form.Select aria-label="Default select example" id="topper" onChange={handleChange}>
                                                <option value="None">None</option>
                                                {selectTopper()}
                                            </Form.Select>
                                        </div>

                                        {
                                            cnum ? 
                                            <div class="col-6 mb-2">
                                                <Form.Label htmlFor="basic-url"><b>Select Number</b></Form.Label>
                                                <Form.Select aria-label="Default select example" id="number1" onChange={handleChange}>
                                                    {selectNumber()}
                                                </Form.Select>
                                            </div>
                                        : 
                                        checknumber ? 
                                        <>
                                            <div class="col-6 mb-2">
                                                <Form.Label htmlFor="basic-url"><b>Select Number</b></Form.Label>
                                                <Form.Select aria-label="Default select example" id="number1" onChange={handleChange}>
                                                    {selectNumber()}
                                                </Form.Select>
                                            </div>
                                            <div class="col-6 mb-2">
                                                <Form.Label htmlFor="basic-url"><b>Number 2</b></Form.Label>
                                                <Form.Select aria-label="Default select example" id="number2" onChange={handleChange}>
                                                    {selectNumber2()}
                                                </Form.Select>
                                            </div>
                                            </>
                                        :
                                        <></>
                                        }
                                        
                                        {
                                           
                                        }
                                        <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                            <button type="button" class="btn btn-primary" onClick={()=>{setPage(page-1)}}>Previous</button>
                                            <button type="button" class="btn btn-primary" onClick={()=>{setPage(page+1)}}>Next</button>
                                        </div>
                                    </div>
                                </div>
                                :
                                page == 3 ?  //step 3
                                <div class="container">
                                    <div class="spacer"></div>
                                    <div class="block-heading center">
                                        <center>
                                            <h2 class="text-info">Step 3</h2>
                                            <p>Special Request and Letter</p>
                                        </center>
                                    </div>
                                    <div class="row">
                                        <div class="col-12 mb-2 mt-2">
                                            <Form.Label htmlFor="basic-url"><b>Message *if applicable in topper</b></Form.Label>
                                            <InputGroup className="">
                                                <FormControl
                                                placeholder="Write message here..."
                                                aria-label="message"
                                                aria-describedby="basic-addon1"
                                                id="message"
                                                as="textarea"
                                                style={{ height: '130px' }}
                                                onChange={handleChange}
                                                />
                                            </InputGroup>
                                        </div>
                                        {/*new choice added */}
                                        <div class="col-12 mb-2">
                                            <Form.Label htmlFor="basic-url"><b>Special Request</b></Form.Label>
                                            <InputGroup className="">
                                                <FormControl
                                                placeholder="Allergic to sample ingredient..."
                                                aria-label="request"
                                                aria-describedby="basic-addon1"
                                                id="specialrequest"
                                                as="textarea"
                                                style={{ height: '130px' }}
                                                onChange={handleChange}
                                                />
                                            </InputGroup>
                                        </div>
                                        <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                            <button type="button" class="btn btn-primary" onClick={()=>{setPage(page-1)}}>Previous</button>
                                            <button type="button" class="btn btn-primary" onClick={(e)=>{setsummary(e)}}>Next</button>
                                        </div>
                                    </div>
                                </div>
                                : //summary
                                <div class="container">
                                    <div class="spacer"></div>
                                    <div class="block-heading center">
                                        <center>
                                            <h2 class="text-info">Summary</h2>
                                        </center>
                                    </div>
                                    <div class="row">
                                        <div class="col-10"><p>Size : <b>{order.size}</b></p></div>
                                        <div class="col-2"><p>₱{sizeprice}</p></div>
                                        <div class="col-10"><p>Flavor : <b>{order.flavor}</b></p></div>
                                        <div class="col-2"><p>₱0</p></div>
                                        <div class="col-10"><p>Number of layer : <b>{order.layer}</b></p></div>
                                        <div class="col-2"><p>₱{layerprice}</p></div>
                                        <div class="col-10"><p>Design : <b>{order.design}</b></p></div>
                                        <div class="col-2"><p>₱{designprice}</p></div>
                                        {
                                            layer ?
                                            <>
                                                <div class="col-10"><p>Design 2 : <b>{order.design1}</b></p></div>
                                                <div class="col-2"><p>₱{design1price}</p></div>
                                            </>
                                            :
                                            <></>   
                                        }
                                        <div class="col-10"><p>Topper : <b>{order.topper}</b></p></div>
                                        { /* price for topper */ }
                                        <div class="col-2"><p>₱{topperprice}</p></div>
                                        
                                        <div class="col-10"><p><b>Subtotal : </b></p></div>
                                        { /* total price */ }
                                        <div class="col-2"><p><b>₱{sizeprice + layerprice + designprice + design1price + topperprice}</b></p></div>
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
                                        <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                            <button type="button" class="btn btn-primary" onClick={()=>{setPage(page-1)}}>Previous</button>
                                            <button type="button" class="btn btn-primary" onClick={()=>{checkout()}}>Checkout</button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Finalbuild