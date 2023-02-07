import React, {useState, useEffect} from 'react'
import Navbar from '../templates/Navbar'
import Footer from '../templates/Footer'
import { InputGroup, FormControl, Form, Button, Tab, Tabs } from 'react-bootstrap'
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
	const [hideop, sethideop] = useState(false)
	const [hidenp, sethidenp] = useState(false)
	const [hidecnp, sethidecnp] = useState(false)
    useEffect(() => {
        axios.get('getuserinfo')
        .then((res) => {
            setData(res.data[0])
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
            alert('information updated successfully!')
        })
        .catch((err) =>{
            console.log(err);
        })
        .finally(() => {
            window.location.reload()
        })
    }
	const changecred = (e) => {
		e.preventDefault()
		let op = document.getElementById('op').value
		let np = document.getElementById('np').value
		let cnp = document.getElementById('cnp').value
		if(np != cnp) return alert('new password not match!')
		axios.post('updatepass', {oldpass: op, newpass : np})
		.then((res) => {
            alert('information updated successfully!')
			window.location.reload()
        })
        .catch((err) =>{
            if (err.response.status === 401)  /* unauthorized */ return alert('Incorrect Password!')
        })
	
	}
    return(
        <main class="page">
            <section class="clean-block clean-catalog dark">
            <div class="block-heading"/>
                <div class="container">
                    <div class='reservationcard'>
                        <h2>My Account</h2>
                        <p>Manage and protect your account</p>
                        <hr/>
                        
						<Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">

						{ /* Change username*/ }  
							
							<Tab eventKey="home" title="User details">
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
							</Tab>

							{ /* Change password */ }  

							<Tab eventKey="profile" title="Account details">
							<Form onSubmit={e => changecred(e)}>
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label className="text-black">Old Password</Form.Label>
									{/*<Form.Control required type="password" id="op"placeholder="Old Password"/>*/}
									<div class="input-group mb-3">
									  <input type={hideop ? "text" : "password"} class="form-control" placeholder="Old Password" aria-label="Recipient's username" aria-describedby="button-addon2" id="op" required/>
									  <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick = {() => sethideop(!hideop)}>{hideop ? <i class="fa fa-solid fa-eye"></i> : <i class="fa fa-solid fa-eye-slash"></i>}</button>
									</div>
								</Form.Group>

								<Form.Group className="mb-3" controlId="formBasicPassword">
									<Form.Label className="text-black">New Password</Form.Label>
									{/*<Form.Control required type="password" id="np" placeholder="New Password"/>*/}
									<div class="input-group mb-3">
									  <input type={hidenp ? "text" : "password"} class="form-control" placeholder="New Password" aria-label="Recipient's username" aria-describedby="button-addon2" id="np" required/>
									  <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick = {() => sethidenp(!hidenp)}>{hidenp ? <i class="fa fa-solid fa-eye"></i> : <i class="fa fa-solid fa-eye-slash"></i>}</button>
									</div>
								</Form.Group>

								<Form.Group className="mb-3" controlId="formBasicPassword">
									<Form.Label className="text-black">Confirm Password</Form.Label>
									{/*<Form.Control required type="password" id="cnp" placeholder="Confirm Password"/>*/}
									<div class="input-group mb-3">
									  <input type={hidecnp ? "text" : "password"} class="form-control" placeholder="Confirm Password" aria-label="Recipient's username" aria-describedby="button-addon2" id="cnp" required/>
									  <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick = {() => sethidecnp(!hidecnp)}>{hidecnp ? <i class="fa fa-solid fa-eye"></i> : <i class="fa fa-solid fa-eye-slash"></i>}</button>
									</div>
								</Form.Group>
								<Button variant="success" type="submit">
									Save Changes
								</Button>
							</Form>
							</Tab>
						</Tabs>
                    </div>
                </div>
            </section>
        </main>
    )
}
export default Myaccount