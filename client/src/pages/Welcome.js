import React, { Component } from 'react';
import { Container } from 'reactstrap';

class Welcome extends Component {
     render() {
          return (
               <Container>
                    <h1>Welcome</h1>
                    <p className='lead mt-4'>
                         New user? <a href='/register'>Register</a> <br />
                         Returning user? <a href='/login'>Login</a>
                    </p>
               </Container>
          );
     }
}

export default Welcome;
