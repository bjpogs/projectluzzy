import React from 'react'
import {Nav, Navbar, Container} from 'react-bootstrap'

const Navbars = () => {
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
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                
            </Container>
        </Navbar>
        
    )
}

export default Navbars