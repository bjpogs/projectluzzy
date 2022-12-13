import React, {useState, useEffect} from 'react'
//import basecake from ''
import unaimahe from '../../assets/img/0.png'

import {Form, Button, InputGroup, FormControl} from 'react-bootstrap'

//---------------------------------------------------------------
// to fix : default value!
//---------------------------------------------------------------

const Finalbuild = () => {
    const [data,setData] = useState([])
    const [selectedData, setselectedData] = useState([])
    const [layer, setlayer] = useState(false)
    const [page, setPage] = useState(1)
    const [order,setOrder] = useState([{
        size : '',
        flavor : '',
        layer : '',
        design : '',
        design2 : '',
        topper : '',
        number1 : '',
        number2 : '',
        message : '',
        specialrequest : '',
    }])
    const [checknumber, setChecknumber] = useState(false)
    useEffect(() => {
        let sam = [{
            id: 'size',
            name : '6x2'
        },{
            id : 'size',
            name : '6x4'
        },{
            id : 'flavor',
            name : 'Moist Chocolate'
        },{
            id : 'flavor',
            name : 'Vanilla Caramel'
        },{
            id : 'layer',
            name : '1'
        },{
            id : 'layer',
            name : '2'
        },{
            id : 'topper',
            name :'birthday'
        },{
            id : 'topper',
            name : 'number - single'
        },{
            id : 'topper',
            name : 'number - double'
        },{
            id : 'design',
            name : 'classic'
        },{
            id : 'design',
            name : 'luzzy original 1'
        },{
            name : 'luzzy original 2'
        },{
            id : 'number',
            name : '1'
        },{
            id : 'number',
            name : '2'
        },{
            id : 'number',
            name : '3'
        },{
            id : 'number',
            name : '4'
        }]
        setData(sam)
    },[])

    const handleChange = (e) => {
        e.preventDefault()
        if (e.target.id == 'topper' && e.target.value == "number - double") setChecknumber(true)
        else if (e.target.id == 'topper' && e.target.value != "number - double") setChecknumber(false)
        if (e.target.id == "layer" && e.target.value == "2") setlayer(true)
        else if (e.target.id == "layer" && e.target.value != "2") setlayer(false)
        const newdata = {...order}
        newdata[e.target.id] = e.target.value
        setOrder(newdata)
    }

    const selectSize = () => {
        return(
            data.map(meow => {
                if (meow.id == 'size'){
                    return (
                        <option value={meow.name} selected={order.size==meow.name}>{meow.name}</option>
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
                        <option value={meow.name} selected={order.design==meow.name}>{meow.name}</option>
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
                        <option value={meow.name} selected={order.design2==meow.name}>{meow.name}</option>
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
                        <option value={meow.name} selected={order.topper==meow.name}>{meow.name}</option>
                    )
                }
            })
        )
    }
    const selectNumber = () => {
        return(
            data.map(meow => {
                if(meow.id == 'number'){
                    return(
                        <option value={meow.name} selected={order.number==meow.name}>{meow.name}</option>
                    )
                }
            })
        )
    }
    const selectNumber2 = () => {
        return(
            data.map(meow => {
                if(meow.id == 'number'){
                    return(
                        <option value={meow.name} selected={order.number2==meow.name}>{meow.name}</option>
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
                            { !layer?<div class="cakebase3"/> : <></>}
                            <div class="row">
                            { !checknumber?
                                <div class="topper px-0 py-0">
                                    <img class="imahe" src={unaimahe} alt="" />
                                </div>
                                :
                                <>
                                <div class="topper1 px-0 py-0"/>
                                <div class="topper2 px-0 py-0"/>
                                </>
                            }
                            </div>
                            { layer? <div class="cakebase2"/> : <></>}
                            <div class="cakebase">
                                <img src="" alt="" />
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
                                            <Form.Label htmlFor="basic-url"><b>Design</b></Form.Label>
                                            <Form.Select aria-label="Default select example" id="design" onChange={handleChange}>
                                                {selectDesign()}
                                            </Form.Select>
                                        </div>
                                        {
                                            layer?
                                            <div class="col-12 mb-2">
                                                <Form.Label htmlFor="basic-url"><b>Design 2</b></Form.Label>
                                                <Form.Select aria-label="Default select example" id="design2" onChange={handleChange}>
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
                                                {selectTopper()}
                                            </Form.Select>
                                        </div>

                                        
                                        <div class="col-6 mb-2">
                                            <Form.Label htmlFor="basic-url"><b>Select Number</b></Form.Label>
                                            <Form.Select aria-label="Default select example" id="number1" onChange={handleChange}>
                                                {selectNumber()}
                                            </Form.Select>
                                        </div>
                                        {
                                            checknumber ? 
                                            <div class="col-6 mb-2">
                                            <Form.Label htmlFor="basic-url"><b>Number 2</b></Form.Label>
                                            <Form.Select aria-label="Default select example" id="number2" onChange={handleChange}>
                                                {selectNumber2()}
                                            </Form.Select>
                                            </div>
                                            :
                                            <></>
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
                                                id="request"
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
                                        <div class="col-10 mt-5"><p>Size : <b>{order.size}</b></p></div>
                                        { /* price for size */ console.log(order)}
                                        <div class="col-2 mt-5"><p>₱0</p></div>
                                        <div class="col-10"><p>Flavor : <b>{order.flavor}</b></p></div>
                                        <div class="col-2"><p>₱0</p></div>
                                        <div class="col-10"><p>Number of layer : <b>{order.layer}</b></p></div>
                                        <div class="col-2"><p>₱0</p></div>
                                        <div class="col-10"><p>Design : <b>{order.design}</b></p></div>
                                        <div class="col-2"><p>₱0</p></div>
                                        {
                                            layer ?
                                            <>
                                                <div class="col-10"><p>Design2 : <b>{order.design}</b></p></div>
                                                <div class="col-2"><p>₱0</p></div>
                                            </>
                                            :
                                            <></>   
                                        }
                                        <div class="col-10"><p>Topper : <b>{order.topper}</b></p></div>
                                        { /* price for topper */ }
                                        <div class="col-2"><p>₱0</p></div>
                                        
                                        <div class="col-10"><p><b>Subtotal : </b></p></div>
                                        { /* total price */ }
                                        <div class="col-2"><p><b>₱0</b></p></div>
                                        <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                            <button type="button" class="btn btn-primary" onClick={()=>{setPage(page-1)}}>Previous</button>
                                            <button type="button" class="btn btn-primary" onClick={()=>{setPage(page+1)}}>Checkout</button>
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