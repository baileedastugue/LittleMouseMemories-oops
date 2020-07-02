import React, { Component } from 'react';
import { Container } from 'reactstrap';
import RegistrationForm from '../components/Auth/RegistrationForm';
import AlertDiv from '../components/Layout/AlertDiv';

class Register extends Component {
     render() {
          return (
               <Container id='registrationPage'>
                    <AlertDiv />
                    <h1>New User Registration</h1>
                    <RegistrationForm />
                    <p className='mt-4'>
                         Have An Account? <a href='/login'>Login</a>
                    </p>
               </Container>
          );
     }
}

export default Register;
