import React, {useState, useEffect} from 'react'
import Navbar from '../templates/Navbar'
import Footer from '../templates/Footer'
import { InputGroup, FormControl, Form, Button } from 'react-bootstrap'
import axios from '../../api/api'

const Myaccount = () => {
    const [data, setData] = useState({
        first_name : '',
        last_name : '',
        add_house : '',
        add_brgy : '',
        add_city : '',
        add_province : '',
        contact_no : '',
        email_address : ''
    })

    useEffect(() => {
        axios.get('getuserinfo')
        .then((res) => {
            setData(res.data[0])
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    },[])

    const updateInfo = (e) => {
        e.preventDefault();
        const data = {
            first_name : document.getElementById('first_name').value,
            last_name : document.getElementById('last_name').value,
            add_house : document.getElementById('add_house').value,
            add_brgy : document.getElementById('add_brgy').value,
            add_city : document.getElementById('add_city').value,
            add_province : document.getElementById('add_province').value,
            contact_no : document.getElementById('contact_no').value,
            email_address : document.getElementById('email_address').value
        }
        
        axios.post('updateuserinfo', data)
        .then((res) => {
            console.log(res.data);
            alert('information updated successfully!')
        })
        .catch((err) =>{
            console.log(err);
        })
        .finally(() => {
            console.log('??');
        })
    }
    return(
        <>
        <Navbar />
            <main class="page">
                <section class="clean-block clean-catalog dark">
                <div class="block-heading"/>
                    <div class="container">
                        <div class='reservationcard'>
                            <h2>My Account</h2>
                            <p>Manage and protect your account</p>
                            <hr/>
                            <Form onSubmit={updateInfo}>
                            <div class = "row">
                                <div class="col-12">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon3">
                                    First Name
                                    </InputGroup.Text>
                                    <FormControl id="first_name" defaultValue={data.first_name} aria-describedby="basic-addon3" />
                                </InputGroup>
                                </div>
                                <div class="col-12">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon3">
                                    Last Name
                                    </InputGroup.Text>
                                    <FormControl id="last_name" defaultValue={data.last_name} aria-describedby="basic-addon3" />
                                </InputGroup>
                                </div>
                                <div class="col-12">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon3">
                                    House No.
                                    </InputGroup.Text>
                                    <FormControl id="add_house" defaultValue={data.add_house} aria-describedby="basic-addon3" />
                                </InputGroup>
                                </div>
                                <div class="col-12">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon3">
                                    Barangay
                                    </InputGroup.Text>
                                    <FormControl id="add_brgy" defaultValue={data.add_brgy} aria-describedby="basic-addon3" />
                                </InputGroup>
                                </div>
                                <div class="col-12">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon3">
                                    City
                                    </InputGroup.Text>
                                    <FormControl id="add_city" defaultValue={data.add_city} aria-describedby="basic-addon3" />
                                </InputGroup>
                                </div>
                                <div class="col-12">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon3">
                                    Province
                                    </InputGroup.Text>
                                    <FormControl id="add_province" defaultValue={data.add_province} aria-describedby="basic-addon3" />
                                </InputGroup>
                                <div class="col-12">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon3">
                                    Contact No.
                                    </InputGroup.Text>
                                    <FormControl id="contact_no" defaultValue={data.contact_no} aria-describedby="basic-addon3" />
                                </InputGroup>
                                </div>
                                <div class="col-12">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon3">
                                    Email
                                    </InputGroup.Text>
                                    <FormControl id="email_address" defaultValue={data.email_address} aria-describedby="basic-addon3" />
                                </InputGroup>
                                </div>
                                <div class="col">
                                    <Button type="submit">Update Information</Button>
                                </div>
                                </div>
                            </div>
                            </Form>
                        </div>
                    </div>
                </section>
            </main>
        <Footer />
        </>
    )
}
export default Myaccount