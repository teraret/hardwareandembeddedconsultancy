import React from "react";
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavLink,
  UncontrolledDropdown,
} from "reactstrap";

import grailsLogo from "./images/hadwareandembeddedconsultancy.svg";

const NavDropdownItem = (props) => {
  return (
    <DropdownItem tag="li">
      <NavLink>{props.children}</NavLink>
    </DropdownItem>
  );
};

const AppNav = ({ collapse, toggle }) => {
  return (
    <Navbar
      style={{ backgroundColor: "#4d85bd", borderRadius: 0 }}
      dark
      expand="lg"
      className="navbar-static-top"
    >
      <NavbarBrand href="/">
        <img
          src={grailsLogo}
          alt="Hardware and Embedded Consultancy"
          width="240"
        />
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />

      <Collapse isOpen={collapse} navbar>
        <Nav className="ml-auto nav" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle caret nav>
              Add +
            </DropdownToggle>
            <DropdownMenu right tag="ul">
              <NavDropdownItem>Customer</NavDropdownItem>
              <NavDropdownItem>Category</NavDropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle caret nav>
              List
            </DropdownToggle>
            <DropdownMenu right tag="ul">
              <DropdownItem tag="li">
                <NavLink href="/customer">Customer</NavLink>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default AppNav;
