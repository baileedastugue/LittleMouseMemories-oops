import React, { Component } from 'react';
import { Container } from 'reactstrap';

class Welcome extends Component {
    render() {
        return (
            // <nav class="navbar navbar-light">
            //     <h1>This is a navigation bar</h1>
            //     <p>Which will soon be turned into a react component, if you are patient</p>
            // </nav>

            <Container>
                <h1>Welcome</h1>
                <div>
                    New user? <a href="/users/register">Register</a> 
                </div><br/>
                <div>
                    Returning user? <a href="/users/login">Login</a>
                </div>
            </Container>
        )
    }
}

export default Welcome;