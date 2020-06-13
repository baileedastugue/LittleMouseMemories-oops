import React, { Component } from 'react';
import { Container } from 'reactstrap';
import RegistrationForm from '../components/RegistrationForm';

class Register extends Component {
    render() {
        return (
            // <nav class="navbar navbar-light">
            //     <h1>This is a navigation bar</h1>
            //     <p>Which will soon be turned into a react component, if you are patient</p>
            // </nav>

            <Container>
                <h5>New User</h5>
                {/* // <%- include('./partials/messages.ejs') %> */}
                <RegistrationForm/>
                <p class="lead mt-4">Have An Account? <a href="/users/login">Login</a></p>
            </Container>
        )
    }
}

export default Register;


