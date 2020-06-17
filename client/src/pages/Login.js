import React, { Component } from 'react';
import LoginForm from '../components/LoginForm/index';
import { Container } from 'reactstrap';
import AlertDiv from '../components/Alert/index';

class Login extends Component {
     render() {
          return (
               <Container>
                    <AlertDiv />
                    <h5>Returning User</h5>
                    <LoginForm />
                    {/* <%- include('./partials/messages.ejs') %> */}
                    <p className='lead mt-4'>
                         Don't have An Account? <a href='/register'>Register</a>
                    </p>
               </Container>
          );
     }
}

export default Login;
