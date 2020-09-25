import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/authActions';
import { Redirect } from 'react-router-dom';
import logo from '../../../img/logo.png';

const AppNavbar = ({ logout, auth }) => {
     const logoutUser = () => {
          logout();
          return <Redirect to='/' />;
     };

     const loggedInLinks = (
          <Nav>
               <NavItem>
                    <NavLink href='/dashboard'>Dashboard</NavLink>
               </NavItem>
               <NavItem>
                    <NavLink href='/accountSettings'>Account Settings</NavLink>
               </NavItem>
               <NavItem>
                    <NavLink href='/' onClick={logoutUser}>
                         Logout
                    </NavLink>
               </NavItem>
          </Nav>
     );

     const loggedOutLinks = null;
     const loading = auth.isLoading;
     return (
          <div>
               <Navbar className='mb-1 justify-content-md-end'>
                    {loading || !auth.isAuthenticated
                         ? loggedOutLinks
                         : loggedInLinks}
                    {!auth.isAuthenticated ? (
                         <NavbarBrand href='/'>
                              <img src={logo} alt='two elephants hugging' />
                              <h1>Elephant's Memory</h1>
                         </NavbarBrand>
                    ) : (
                         <NavbarBrand href='/dashboard'>
                              <img src={logo} alt='two elephants hugging' />
                              <h1>Elephant's Memory</h1>
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
