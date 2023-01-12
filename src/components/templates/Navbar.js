import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import {Nav, Navbar, Container, NavDropdown} from 'react-bootstrap'
import axios from '../../api/api'

const Navbars = () => {
    const [activeMenu, setActiveMenu] = useState()

    const logout = () => {
        axios.post('logout')
        .then((res) => {
        })
        .catch((err) => {
        })
        .finally(() => {
            localStorage.clear()
            window.location.href = '/'
        })
    }

    return (
        
        <Navbar bg="white" expand="lg" sticky="top" class="navbar-light bg-white clean-navbar">
            <Container>
                <Navbar.Brand href='/index' id="navbrand">
                    <b>Luzzy's Supreme Sweets</b>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <div class="ms-auto"/>
                    <Nav>{/*variant='pills' defaultActiveKey='/index'*/}
                        <Nav.Link  as={NavLink} to ="/index"><b>Home</b></Nav.Link>
                        <Nav.Link  as={NavLink} to ="/Shop"><b>Shop</b></Nav.Link>
                        <Nav.Link  as={NavLink} to ="/Reservation"><b>Reservation</b></Nav.Link>
                        <Nav.Link  as={NavLink} to ="/About" ><b>About</b></Nav.Link>
                        { /* <Nav.Link  as={NavLink} to ="/trackreservation" ><b>Track Reservation</b></Nav.Link> */ }
                        { !localStorage.getItem('fname') ? 
                        <Nav.Link href="/login"><b>Login</b></Nav.Link> 
                        : 
                        <NavDropdown  title={localStorage.getItem('fname')} id="nav-dropdown">
                        <NavDropdown.Item href='/myaccount'>My Account</NavDropdown.Item>
                        <NavDropdown.Item href='/cart'>My Cart</NavDropdown.Item>
                        <NavDropdown.Item href='/order'>My Order</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        
    )
}

export default Navbars