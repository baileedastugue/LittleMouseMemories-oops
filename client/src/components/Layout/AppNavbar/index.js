import React, { Fragment } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/authActions';
import { Redirect } from 'react-router-dom';

const AppNavbar = (props) => {
     const logout = () => {
          props.logout();
          return <Redirect to='/login' />;
     };

     const loggedInLinks = (
          <Nav>
               <NavItem>
                    <NavLink href='/dashboard'>Dashboard</NavLink>
               </NavItem>
               <NavItem>
                    <NavLink href='#' onClick={logout}>
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
     const loading = props.auth.isLoading;
     console.log('loading', loading);
     const isAuth = props.auth.isAuthenticated;
     console.log('authenticated', isAuth);
     return (
          <div>
               <Navbar color='dark' dark className='mb-5'>
                    <NavbarBrand href='/'>Little Mouse Memories</NavbarBrand>
                    {loading || !isAuth ? loggedOutLinks : loggedInLinks}
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
