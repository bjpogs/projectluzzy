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
	const [useredit, setUseredit] = useState(false)
	const [passedit, setpassEdit] = useState(false)
    useEffect(() => {
        axios.get('getuserinfo')
        .then((res) => {
            setData(res.data[0])
        })
        .catch((err) => {
            console.log(err);
        })
    },[])

    const updateInfo = () => {
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

        })
        .catch((err) =>{
            if (err.response.status === 401)  /* unauthorized */ return alert('Incorrect Password!')
        })
	.finally(() => {
		setUseredit(false)
		window.location.reload()
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
								<div class="row mt-3">
                      							<div className="col-auto mt-2">
                          							<span><b>First Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></span>
                      							</div>
                      							<div className="col-auto">
                          							<input id="first_name" disabled={!useredit} type="text" defaultValue={data.first_name} className="form-control-plaintext  border-0 shadow-sm px-3" />
                      							</div>
                  						</div>								
								<div class="row mt-3">
                      							<div className="col-auto mt-2">
                          							<span><b>Last Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></span>
                      							</div>
                      							<div className="col-auto">
                          							<input id="last_name" disabled={!useredit} type="text" defaultValue={data.last_name} className="form-control-plaintext  border-0 shadow-sm px-3" />
                      							</div>
                  						</div>	
								<div class="row mt-3">
                      							<div className="col-auto mt-2">
                          							<span><b>House No. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></span>
                      							</div>
                      							<div className="col-auto">
                          							<input id="add_house" disabled={!useredit} type="text" defaultValue={data.add_house} className="form-control-plaintext  border-0 shadow-sm px-3" />
                      							</div>
                  						</div>								
								<div class="row mt-3">
                      							<div className="col-auto mt-2">
                          							<span><b>Barangay &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></span>
                      							</div>
                      							<div className="col-auto">
                          							<input id="add_brgy" disabled={!useredit} type="text" defaultValue={data.add_brgy} className="form-control-plaintext  border-0 shadow-sm px-3" />
                      							</div>
                  						</div>
								<div class="row mt-3">
                      							<div className="col-auto mt-2">
                          							<span><b>City &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></span>
                      							</div>
                      							<div className="col-auto">
                          							<input id="add_city" disabled={!useredit} type="text" defaultValue={data.add_city} className="form-control-plaintext  border-0 shadow-sm px-3" />
                      							</div>
                  						</div>								
								<div class="row mt-3">
                      							<div className="col-auto mt-2">
                          							<span><b>Province &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></span>
                      							</div>
                      							<div className="col-auto">
                          							<input id="add_province" disabled={!useredit} type="text" defaultValue={data.add_province} className="form-control-plaintext  border-0 shadow-sm px-3" />
                      							</div>
                  						</div>
								<div class="row mt-3">
                      							<div className="col-auto mt-2">
                          							<span><b>Contact Number</b></span>
                      							</div>
                      							<div className="col-auto">
                          							<input id="contact_no" disabled={!useredit} type="text" defaultValue={data.contact_no} className="form-control-plaintext  border-0 shadow-sm px-3" />
                      							</div>
                  						</div>								
								<div class="row mt-3">
                      							<div className="col-auto mt-2">
                          							<span><b>Email Address &nbsp;&nbsp;&nbsp;</b></span>
                      							</div>
                      							<div className="col-auto">
                          							<input id="email_address" disabled={!useredit} type="text" defaultValue={data.email_address} className="form-control-plaintext  border-0 shadow-sm px-3" />
                      							</div>
                  						</div>
								{!useredit ?
                                                                <div class="row mt-3">
									<div className="col-auto">
                                						<Button type="button" onClick = {() => setUseredit(true)}>Edit</Button>
									</div>
                            					</div>
								:
                                                                <div class="row mt-3">
									<div className="col-auto">
                                						<Button type="button" className="btn-success" onClick = {() => updateInfo()}>Save</Button>
									</div>
									<div className="col-auto">
                                						<Button type="button" className="btn-danger" onClick = {() => setUseredit(false)}>Cancel</Button>
									</div>
                            					</div>
								}
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
