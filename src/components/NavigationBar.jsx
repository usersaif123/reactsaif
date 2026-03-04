import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavigationBar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm">
            <Container>
                <Navbar.Brand as={NavLink} to="/" className="fw-bold fs-3 text-uppercase tracking-wider">
                    <span style={{ color: '#12c2e9' }}>Esprit</span> Events
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto text-center">
                        <Nav.Link
                            as={NavLink}
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "active bg-primary rounded px-3" : "px-3"
                            }
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            as={NavLink}
                            to="/events"
                            className={({ isActive }) =>
                                isActive ? "active bg-primary rounded px-3" : "px-3"
                            }
                        >
                            Events
                        </Nav.Link>
                        <Nav.Link
                            as={NavLink}
                            to="/add-event"
                            className={({ isActive }) =>
                                isActive ? "active bg-primary rounded px-3 ms-2" : "px-3 ms-2"
                            }
                        >
                            Add new Event
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
