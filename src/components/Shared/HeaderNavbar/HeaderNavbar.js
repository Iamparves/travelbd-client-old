import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContext';
import './HeaderNavbar.css';

const HeaderNavbar = () => {
    const { user } = useContext(UserContext);

    return (
        <Navbar expand="lg" className="navbar__nav">
            <Container>
                <Link to="/" className="navbar-brand">Travel BD</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/packages" className="nav-link">Packages</Link>
                        {
                            !user.isLoggedIn && <Link to="/login" className="nav-link">Login</Link>
                        }
                        {
                            user.isLoggedIn && <Link to="/dashboard" className="nav-link">Dashboard</Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default HeaderNavbar;