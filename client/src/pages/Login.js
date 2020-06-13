import React, { Component } from 'react';
import { Container } from 'reactstrap';

class Login extends Component {
    render() {
        return (
            // <nav class="navbar navbar-light">
            //     <h1>This is a navigation bar</h1>
            //     <p>Which will soon be turned into a react component, if you are patient</p>
            // </nav>
            <Container>
                <h5>Returning User</h5>
                
                {/* <form action="/users/login" method="POST">
                    <div class="form-group">
                        <label for="emailInput">Email</label>
                        <input type="text" name="email" class="form-control" id="emailInput">
                    </div>
                    <div class="form-group">
                        <label for="passwordInput">Password</label>
                        <input type="password" name="password" class="form-control" id="passwordInput">
                    </div>
                    <button type="submit" class="btn login-btn">Login</button>
                </form> */}
                <p class="lead mt-4">Don't have An Account? <a href="/users/register">Register</a></p>
            </Container>
           
        )
    }
}

export default Login;