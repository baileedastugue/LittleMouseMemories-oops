import React, { Fragment } from 'react';
import LoginForm from '../../Auth/LoginForm';
import RegistrationForm from '../../Auth/RegistrationForm';
import './style.css';

const FormContainer = (props) => {
     return (
          <div>
               {props.formType === 'login' ? (
                    <Fragment>
                         <div id='logInTriangle'>
                              <LoginForm closeBtn={props.closeBtn} />
                         </div>
                    </Fragment>
               ) : (
                    <Fragment>
                         <div id='registerTriangle'>
                              <RegistrationForm closeBtn={props.closeBtn} />
                         </div>
                    </Fragment>
               )}
          </div>
     );
};

export default FormContainer;
