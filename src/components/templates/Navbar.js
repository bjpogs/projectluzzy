import React from 'react'
import {Nav, Navbar, Container, NavDropdown} from 'react-bootstrap'
import axios from '../../api/api'

const Navbars = () => {

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
                <Navbar.Brand href='/'>
                    Luzzy's Supreme Sweets
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <div class="ms-auto"/>
                    <Nav>
                        <Nav.Link href="/shop">Shop</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/reservation">Reservation</Nav.Link>
                        { !localStorage.getItem('fname') ? 
                        <Nav.Link href="/login">Login</Nav.Link> 
                        : 
                        <NavDropdown title={localStorage.getItem('fname')} id="nav-dropdown">
                        <NavDropdown.Item href='/myaccount'>My Account</NavDropdown.Item>
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