import React, { Fragment } from 'react';
import LoginForm from '../../Auth/LoginForm';
import RegistrationForm from '../../Auth/RegistrationForm';

const FormContainer = (props) => {
     return (
          <div>
               {props.formType === 'login' ? (
                    <Fragment>
                         {/* <div id='logInForm'>
                              <h1>Welcome back</h1>
                              <LoginForm />
                         </div> */}
                         <div id='logInTriangle'>
                              <h1>Welcome back {props.closeBtn}</h1>
                              <LoginForm />
                         </div>
                    </Fragment>
               ) : (
                    <Fragment>
                         <div id='registerTriangle'>
                              <h1>Welcome! {props.closeBtn}</h1>
                              <RegistrationForm />
                         </div>
                    </Fragment>
               )}
          </div>
     );
};

export default FormContainer;
