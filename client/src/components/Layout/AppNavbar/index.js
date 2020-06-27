import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/authActions';
import { Redirect } from 'react-router-dom';
import logo from '../../../img/logo_owb.png';
import './style.css';

const AppNavbar = ({ logout, auth }) => {
     const logoutUser = () => {
          logout();
          return <Redirect to='/login' />;
     };

     const loggedInLinks = (
          <Nav>
               <NavItem>
                    <NavLink href='/dashboard'>Dashboard</NavLink>
               </NavItem>
               <NavItem>
                    <NavLink href='#' onClick={logoutUser}>
                         Logout
                         {/* <span className="hide-sm"></span> */}
                    </NavLink>
               </NavItem>
          </Nav>
     );

     const loggedOutLinks = (
          <Nav>
               <NavItem>
                    <NavLink href='/'>Homepage</NavLink>
               </NavItem>
               <NavItem>
                    <NavLink href='/register'>Register</NavLink>
               </NavItem>
               <NavItem>
                    <NavLink href='/login'>Login</NavLink>
               </NavItem>
          </Nav>
     );
     const loading = auth.isLoading;
     console.log(auth.isAuthenticated);
     return (
          <div>
               <Navbar className='mb-5'>
                    {!auth.isAuthenticated ? (
                         <NavbarBrand href='/'>
                              <img src={logo} alt='two elephants hugging' />
                              <span>Elephant Memory</span>
                         </NavbarBrand>
                    ) : (
                         <NavbarBrand href='/dashboard'>
                              <img src={logo} alt='two elephants hugging' />
                              <span>Elephant Memory</span>
                         </NavbarBrand>
                    )}

                    {loading || !auth.isAuthenticated
                         ? loggedOutLinks
                         : loggedInLinks}
               </Navbar>
          </div>
     );
};

AppNavbar.propTypes = {
     logout: PropTypes.func.isRequired,
     auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
     auth: state.auth,
});

export default connect(mapStateToProps, { logout })(AppNavbar);
