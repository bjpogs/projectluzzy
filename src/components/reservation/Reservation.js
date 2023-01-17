import React from 'react'

// navbar and footer template
import Navbar from '../templates/Navbar'
import Footer from '../templates/Footer'
import { InputGroup, FormControl, Form, Button, Modal } from 'react-bootstrap'
import axios from '../../api/api'
import { useState } from 'react'

const Reservation = () => {
    const [modalShow, setModalShow] = useState(false)
    const [data, setData] = useState ({
        
        first_name : '',
        last_name :'',
        address : '',
        contact_number : '',
        email : '',
        pickupdate : '',
        pickuptime : '',
        size : '',
        flavor : '',
        icing : '',
        specialrequest :''
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData()
        form.append('first_name', document.getElementById('FirstName').value)
        form.append('last_name', document.getElementById('LastName').value)
        form.append('address', document.getElementById('Address').value)
        form.append('contact_number', document.getElementById('ContactNumber').value)
        form.append('email', document.getElementById('email').value)
        form.append('pickupdate', document.getElementById('PickupDate').value)
        form.append('time', document.getElementById('time').value)
        form.append('image', document.getElementById('image').files[0])
        form.append('size', document.getElementById('size').value)
        form.append('flavor', document.getElementById('flavor').value)
        form.append('icing', document.getElementById('icing').value)
        form.append('specialrequest', document.getElementById('SpecialRequest').value)
        

        for (const value of form.values()){
            console.log(value);
        }
        axios.post('reservecake', form)
        .then((res) => {
            console.log(res.data);
            setData(res.data)
            alert('Success!')
            setModalShow(true)
        })
        .catch((err) =>{
            console.log(err);
        })


    }

    function SuccessModal(props) {
        return (
          <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
          >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Reservation Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Order number : <b>{data.reservation_id}</b></h4>
                <span>Note: save your order number for reference.</span>
                <hr/>
                <span>Name : <b>{data.last_name}, {data.first_name}</b></span>
                <br/>
                <span>Address :<b>{data.address}</b></span>
                <br/>
                <span>Contact Number : <b>{data.contact_number}</b></span><br/>
                <span>Email : <b>{data.email}</b></span><br/>
                <span>Pick-up date : <b>{data.pickupdate}</b></span><br/>
                <span>Time : <b>{data.pickuptime}</b></span><br/>
                <span>Cake size : <b>{data.size}</b></span><br/>
                <span>Flavor : <b>{data.flavor}</b></span><br/>
                <span>Icing : <b>{data.icing}</b></span><br/>
                <span>Special Request : <b>{data.specialrequest}</b></span>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=>window.location.reload()}>Close</Button> .
                {/* onClick={()=>window.location.reload()} */}
            </Modal.Footer>
          </Modal>
        );
    }

    return (
        <>
        <main class="page">
            <section class="clean-block clean-catalog dark">
                <div class="container">
                    <div class="block-heading">
                        <h2 class="text-info">Reservation</h2>
                        <p>You want your own themed cake design? book a reservation now.</p>
                    </div>
                    <div class="reservationcard">
                        <Form onSubmit={handleSubmit}>
                            <div class="row">
                                <div class="col-md-6">
                                <Form.Label htmlFor="basic-url">First Name</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                    placeholder="First Name"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    id="FirstName"
                                    required
                                    />
                                </InputGroup>
                                </div>

                                <div class="col-md-6">
                                <Form.Label htmlFor="basic-url">Last Name</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                    required
                                    placeholder="Last Name"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    id="LastName"
                                    />
                                </InputGroup>
                                </div>

                                <div class="col-12">
                                <Form.Label htmlFor="basic-url">Address</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                    required
                                    placeholder="Address"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    id="Address"
                                    />
                                </InputGroup>
                                </div>

                                <div class="col-md-6">
                                <Form.Label htmlFor="basic-url">Contact Number</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                    required
                                    placeholder="09123456789"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    id="ContactNumber"
                                    type="number"
                                    />
                                </InputGroup>
                                </div>

                                <div class="col-md-6">
                                <Form.Label htmlFor="basic-url">Email</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                    placeholder="user@example.com"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    id="email"
                                    type="email"
                                    />
                                </InputGroup>
                                </div>

                                <div class="col-md-6">
                                <Form.Label htmlFor="basic-url">Select Pickup Date</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                    required
                                    placeholder="Username"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    type="date"
                                    id="PickupDate"
                                    />
                                </InputGroup>
                                </div>

                                <div class="col-md-6">
                                    <Form.Label htmlFor="basic-url">Preferred Time</Form.Label>
                                    <Form.Select aria-label="Default select example" id="time">
                                        <option value="10:00 AM">10:00 AM</option>
                                        <option value="11:00 AM">11:00 AM</option>
                                        <option value="12:00 PM">12:00 PM</option>
                                        <option value="01:00 PM">01:00 PM</option>
                                        <option value="02:00 PM">02:00 PM</option>
                                        <option value="03:00 PM">03:00 PM</option>
                                        <option value="04:00 PM">04:00 PM</option>
                                        <option value="05:00 PM">05:00 PM</option>
                                        <option value="06:00 PM">06:00 PM</option>
                                    </Form.Select>
                                </div>

                                <div class="col-md-6">
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Upload your desired design</Form.Label>
                                    <Form.Control type="file" id="image" accept="image/*"
                                    required/>
                                </Form.Group>
                                </div>

                                <div class="col-md-6">
                                    <Form.Label htmlFor="basic-url">Cake Size</Form.Label>
                                    <Form.Select aria-label="Default select example" id="size">
                                        <option value='6x2 inch'>6 x 2 inch (1 tier)</option>
                                        <option value='6x4 inch'>6 x 4 inch (1 tier)</option>
                                        <option value='7x3 inch'>7 x 3 inch (1 tier)</option>
                                        <option value='8x3 inch'>8 x 3 inch (1 layer)</option>
                                        <option value='7x3 inch, 2 tier'>7 x 3 inch (2 tier)</option>
                                        <option value='8x5 inch, 2tier'>8 x 5 inch (2 tier)</option>
                                    </Form.Select>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <Form.Label htmlFor="basic-url">Flavor</Form.Label>
                                    <Form.Select aria-label="Default select example" id="flavor">
                                        <option value='Ube'>Ube</option>
                                        <option value='Moist-Chocolate'>Moist Chocolate</option>
                                        <option value='Vanilla-Caramel'>Vanilla Caramel</option>
                                    </Form.Select>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <Form.Label htmlFor="basic-url">Icing</Form.Label>
                                    <Form.Select aria-label="Default select example" id="icing">
                                        <option value='Butter Cream'>Butter Cream</option>
                                        <option value='Fondant'>Fondant</option>
                                        <option value='Whipped Cream'>Whipped Cream</option>
                                    </Form.Select>
                                </div>

                                <div class="col-12">
                                <Form.Label htmlFor="basic-url">Special Request</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                    as="textarea"
                                    rows={3}
                                    placeholder="e.g. remove specific ingredients due to allergy"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    id="SpecialRequest"
                                    />
                                </InputGroup>
                                </div>

                                <div class="col">
                                    <Button type="submit">Reserve</Button>
                                </div>
                                
                            </div>
                        </Form>
                    </div>
                </div>
                <SuccessModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </section>
        </main>
        </>
        
    )
}

export default Reservation