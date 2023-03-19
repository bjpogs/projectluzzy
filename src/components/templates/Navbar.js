import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import {Nav, Navbar, Container, NavDropdown} from 'react-bootstrap'
import axios from '../../api/api'
import brandimg from '../../assets/img/luzzybrand.jpg'

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
                <Navbar.Brand href='/home' id="navbrand" className='d-none d-sm-block'>
                    <img
                        alt=""
                        src={brandimg}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />
                    <b> Luzzy's Supreme Sweets</b>
                </Navbar.Brand>
                <Navbar.Brand href='/home' id="navbrand" className='d-block d-sm-none'>
                    <img
                        alt=""
                        src={brandimg}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />
                    <b> Luzzy</b>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <div class="ms-auto"/>
                    <Nav variant='pills' defaultActiveKey='/home'>{/*variant='pills' defaultActiveKey='/index'*/}
                        <Nav.Link  as={NavLink} to="/home"><b>Home</b></Nav.Link>
                        <Nav.Link  as={NavLink} to="/Shop"><b>Shop</b></Nav.Link>
			<NavDropdown title="Customize a Cake" id="nav-dropdown">
                        <NavDropdown.Item href='/build-cake'>Build a Cake</NavDropdown.Item>
                        <NavDropdown.Item href='/Reservation'>Upload a Cake</NavDropdown.Item>
			</NavDropdown>
                        {/*<Nav.Link  as={NavLink} to="/build-cake"><b>Build a cake</b></Nav.Link> */}
                        <Nav.Link  as={NavLink} to="/About" ><b>About</b></Nav.Link>
                        { /* <Nav.Link  as={NavLink} to ="/trackreservation" ><b>Track Reservation</b></Nav.Link> */ }
                        { !localStorage.getItem('fname') ? 
                        <Nav.Link as={NavLink} to="/Login"><b>Login</b></Nav.Link> 
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
