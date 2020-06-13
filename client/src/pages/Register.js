import React, { Component } from 'react';
import { Container } from 'reactstrap';
import RegistrationForm from '../components/RegistrationForm';

class Register extends Component {
    render() {
        return (
            <Container>
                <h5>New User</h5>
                {/* // <%- include('./partials/messages.ejs') %> */}
                <RegistrationForm/>
                <p className="lead mt-4">Have An Account? <a href="/users/login">Login</a></p>
            </Container>
        )
    }
}

export default Register;


