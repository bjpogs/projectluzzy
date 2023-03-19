import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
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
            <Navbar.Brand href='/admin/regular-order' id="navbrand"> 
                <b>Luzzy's Supreme Sweets</b>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <div class="ms-auto"/>
                <Nav>
                    <Nav.Link  as={NavLink} to ="/admin/regular-order"><b>Order List</b></Nav.Link>
                    {/*
		    <Nav.Link  as={NavLink} to ="/admin/custom-order"><b>Custom Orders</b></Nav.Link>
                    <Nav.Link  as={NavLink} to ="/admin/reservation-order"><b>Reservation Orders</b></Nav.Link>
                    */}
		    <Nav.Link  as={NavLink} to ="/admin/products"><b>Products</b></Nav.Link>
                    <Nav.Link  as={NavLink} to ="/admin/build"><b>Build</b></Nav.Link>
                    <NavDropdown  title={localStorage.getItem('fname')} id="nav-dropdown">
                    <NavDropdown.Item href='/admin/myaccount'>My Account</NavDropdown.Item>
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
					
                </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    )
}

export default AdminNavbar
