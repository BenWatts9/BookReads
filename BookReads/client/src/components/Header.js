import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { logout } from "../modules/authManager";
import "../App.css"

export default function Header({ isLoggedIn, user}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="Header">
      <Navbar >
        <NavbarBrand tag={RRNavLink} to="/">
          BookReads
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {isLoggedIn && (
              <NavItem>
                <NavLink tag={RRNavLink} to="/">
                  Home
                </NavLink>
              </NavItem>
            )}
          </Nav>
          <Nav navbar>
            {isLoggedIn && (
              <NavItem>
                <NavLink tag={RRNavLink} to="books">
                  Books
                </NavLink>
              </NavItem>
            )}
            </Nav>
          <Nav navbar>
            {isLoggedIn && user && (
              <NavItem>
                <NavLink tag={RRNavLink} to={`groups/${user.id}`}>
                  My Groups
                </NavLink>
              </NavItem>
            )}
            </Nav>
          <Nav navbar>
            {isLoggedIn && (
              <>
                <NavItem>
                  <a
                    aria-current="page"
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={logout}
                  >
                    Logout
                  </a>
                </NavItem>
              </>
            )}
            {!isLoggedIn && (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">
                    Register
                  </NavLink>
                </NavItem>
              </>
            )}
            <a style={{color: "black"}} href="https://github.com/BenWatts9" target="_blank">&copy; Ben Watts</a>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}