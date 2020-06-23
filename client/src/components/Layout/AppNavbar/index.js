import React, { Component } from 'react';
import {
     Collapse,
     Navbar,
     NavbarToggler,
     NavbarBrand,
     Nav,
     NavItem,
     NavLink,
     Container,
} from 'reactstrap';

class AppNavbar extends Component {
     state = {
          isOpen: false,
     };

     // hamburger toggler
     toggle = () => {
          this.setState({
               isOpen: !this.state.isOpen,
          });
     };

     render() {
          return (
               <div>
                    <Navbar color='dark' dark expand='sm' className='mb-5'>
                         <Container>
                              <NavbarBrand href='/'>
                                   Little Mouse Memories
                              </NavbarBrand>
                              <NavbarToggler onClick={this.toggle} />
                              <Collapse isOpen={this.state.isOpen} navbar>
                                   <Nav className='ml-auto' navbar>
                                        <NavItem>
                                             <NavLink href='/dashboard'>
                                                  Dashboard
                                             </NavLink>
                                        </NavItem>
                                        <NavItem>
                                             <NavLink href='/register'>
                                                  Register
                                             </NavLink>
                                        </NavItem>
                                        <NavItem>
                                             <NavLink href='/login'>
                                                  Login
                                             </NavLink>
                                        </NavItem>
                                   </Nav>
                              </Collapse>
                         </Container>
                    </Navbar>
               </div>
          );
     }
}

export default AppNavbar;
