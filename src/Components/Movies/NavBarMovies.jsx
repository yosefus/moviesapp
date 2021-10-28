import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { userContext } from '../../App';

function NavBarMovies() {
  const userState = useContext(userContext);
  const [user] = userState;

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <NavLink className="nav-link titles text-dark" exact activeClassName="active" to="/">
              MoviesApp
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink className="nav-link titles" exact activeClassName="active" to="/">
                Home
              </NavLink>
              <NavLink className="nav-link titles" activeClassName="active" to="/movies">
                Movies
              </NavLink>
              {!user ? (
                <NavLink className="nav-link titles" activeClassName="active" to="/login">
                  Login
                </NavLink>
              ) : (
                <>
                  <NavLink className="nav-link titles" activeClassName="active" to="/profile">
                    {user?.isAdmin && <i className="fas text-warning fa-crown"></i>}
                    <span className="p-2">{user.userName}</span>
                  </NavLink>
                  <NavLink className="nav-link titles" activeClassName="active" to="/logout">
                    logout
                  </NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBarMovies;

/* <NavLink className="nav-link titles" exact activeClassName="active" to="/products">
    Products
  </NavLink>
  <NavLink className="nav-link titles" exact activeClassName="active" to="/customers">
    Customers
  </NavLink>
  <NavLink className="nav-link titles" exact activeClassName="active" to="/rentals">
    Rentals
  </NavLink>
  <NavLink className="nav-link titles" exact activeClassName="active" to="/404">
    404 Page
  </NavLink> */
