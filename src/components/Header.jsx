import React from "react";
import { Navbar, Nav, Container, NavDropdown, Image } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/th.jfif"; // replace with your logo path
import defaultAvatar from '../assets/defaultAvatar.png';

const Header = () => {
  const { user, userData } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm py-3">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={logo} alt="Netflix" height="30" width="100" className="d-inline-block align-top"
            style={{ marginLeft: "0" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/tv">TV Shows</Nav.Link>
            <Nav.Link href="/movies">Movies</Nav.Link>
            <Nav.Link href="/recent">Recently Added</Nav.Link>
            <Nav.Link href="/mylist">My List</Nav.Link>
          </Nav>
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="/notifications">
              <i className="bi bi-bell-fill fs-5"></i>
            </Nav.Link>
            <NavDropdown
              title={
                <Image
                src={defaultAvatar}
                  roundedCircle
                  width="30"
                  height="30"
                  alt="User"
                />
              }
              id="user-dropdown"
              align="end"
            >
              <NavDropdown.Item disabled>
                {userData?.name || user?.email}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/Profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
