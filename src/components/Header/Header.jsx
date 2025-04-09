import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';

const Header = ({ title, logo }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="p-3">
      <Container>
        <Navbar.Brand className="d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            width={50}
            height={50}
            className="rounded-circle me-2"
          />
          <span>{title}</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto">
            <LinkContainer to="/">
              <Nav.Link>
                <button className="btn btn-outline-light me-2">
                  Home
                </button>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/teams">
              <Nav.Link>
                <button className="btn btn-outline-light">
                  Teams
                </button>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;