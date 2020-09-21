import React, { Fragment } from 'react';
import LoginForm from '../../Auth/LoginForm';
import RegistrationForm from '../../Auth/RegistrationForm';

const FormContainer = (props) => {
     return (
          <div>
               {props.formType === 'login' ? (
                    <Fragment className='authForms-background'>
                         <div className='authForms-background--login'>
                              <LoginForm closeBtn={props.closeBtn} />
                         </div>
                    </Fragment>
               ) : (
                    <Fragment className='authForms-background'>
                         <div className='authForms-background--register'>
                              <RegistrationForm closeBtn={props.closeBtn} />
                         </div>
                    </Fragment>
               )}
          </div>
     );
};

export default FormContainer;
