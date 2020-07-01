import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/authActions';
import { Redirect } from 'react-router-dom';
import logo from '../../../img/logo.png';
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
                    <NavLink href='/accountSettings'>Settings</NavLink>
               </NavItem>
               <NavItem>
                    <NavLink href='#' onClick={logoutUser}>
                         Logout
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
     return (
          <div>
               <Navbar className='mb-5'>
                    {loading || !auth.isAuthenticated
                         ? loggedOutLinks
                         : loggedInLinks}
                    {!auth.isAuthenticated ? (
                         <NavbarBrand href='/'>
                              <img src={logo} alt='two elephants hugging' />
                              <span>Elephant's Memory</span>
                         </NavbarBrand>
                    ) : (
                         <NavbarBrand href='/dashboard'>
                              <img src={logo} alt='two elephants hugging' />
                              <span>Elephant's Memory</span>
                         </NavbarBrand>
                    )}
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
