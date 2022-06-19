import React from 'react'
import {Nav, Navbar, Container, NavDropdown} from 'react-bootstrap'
import axios from '../../api/api'

const AdminNavbar = () => {

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
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <div class="ms-auto"/>
                    <Nav>
                        <NavDropdown title={localStorage.getItem('fname')} id="nav-dropdown">
                        <NavDropdown.Item href='/myaccount'>My Account</NavDropdown.Item>
                        <NavDropdown.Item href='/cart'>My Cart</NavDropdown.Item>
                        <NavDropdown.Item href='/order'>My Order</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AdminNavbar