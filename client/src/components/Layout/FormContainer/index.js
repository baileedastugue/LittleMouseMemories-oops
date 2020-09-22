import React from 'react';
import LoginForm from '../../Auth/LoginForm';
import RegistrationForm from '../../Auth/RegistrationForm';

const FormContainer = (props) => {
     return (
          <div>
               {props.formType === 'login' ? (
                    <div className='authForms-background'>
                         <div className='authForms-background--login'>
                              <LoginForm closeBtn={props.closeBtn} />
                         </div>
                    </div>
               ) : (
                    <div className='authForms-background'>
                         <div className='authForms-background--register'>
                              <RegistrationForm closeBtn={props.closeBtn} />
                         </div>
                    </div>
               )}
          </div>
     );
};

export default FormContainer;
