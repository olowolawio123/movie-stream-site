// src/components/MobileFooter.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { BsHouseFill, BsPersonFill, BsGearFill, BsBellFill } from "react-icons/bs";

const MobileFooter = () => {
  return (
    <Navbar
      fixed="bottom"
      bg="dark"
      variant="dark"
      className="d-md-none justify-content-around py-2 border-top"
    >
      <Nav>
        <NavLink to="/Home" className="nav-link text-center">
          <BsHouseFill size={20} />
          <div style={{ fontSize: "0.7rem" }}>Home</div>
        </NavLink>
      </Nav>

      <Nav>
        <NavLink to="/NotificationPage" className="nav-link text-center">
          <BsBellFill size={20} />
          <div style={{ fontSize: "0.7rem" }}>Alerts</div>
        </NavLink>
      </Nav>

      <Nav>
        <NavLink to="/Profile" className="nav-link text-center">
          <BsPersonFill size={20} />
          <div style={{ fontSize: "0.7rem" }}>Profile</div>
        </NavLink>
      </Nav>

      <Nav>
        <NavLink to="/settings" className="nav-link text-center">
          <BsGearFill size={20} />
          <div style={{ fontSize: "0.7rem" }}>Settings</div>
        </NavLink>
      </Nav>
    </Navbar>
  );
};

export default MobileFooter;
