import React, { Component } from 'react';
import { Container } from 'reactstrap';

class Welcome extends Component {
     render() {
          return (
               <Container id='welcomePage'>
                    <div className='left'></div>
                    <div className='leftTriangle'>
                         {/* <h1>Welcome</h1>
                         <p className='lead mt-4'>
                              New user? <a href='/register'>Register</a> <br />
                              Returning user? <a href='/login'>Login</a>
                         </p> */}
                    </div>
                    <div id='showcase'>
                         <div className='movingArea'>
                              <div className='prompt'></div>
                              <div className='prompt'></div>
                              <div className='prompt'></div>
                              <div className='prompt'></div>
                         </div>
                    </div>
               </Container>
          );
     }
}

export default Welcome;
