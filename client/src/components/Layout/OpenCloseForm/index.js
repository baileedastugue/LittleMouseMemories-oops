import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import FormContainer from '../FormContainer';
import CloseArrowBtn from '../../Buttons/CloseArrowBtn';

function OpenCloseForm() {
     const [formDivIndex, setFormDivIndex] = useState(0);
     const [formType, setFormType] = useState('');

     const formDivClose = (event) => {
          setFormDivIndex(0);
     };

     const formDivOpen = (event) => {
          setFormDivIndex(1);
          setFormType(event.target.getAttribute('type'));
     };

     const formDivs = [
          ({ style }) => (
               <animated.div style={{ ...style, display: 'none' }}>
                    <div>You should never see this</div>
               </animated.div>
          ),
          ({ style }) => (
               <animated.div
                    style={{ ...style, display: 'flex' }}
                    className='authForms'
               >
                    <FormContainer
                         formType={formType}
                         closeBtn={closeBtn}
                    ></FormContainer>
               </animated.div>
          ),
     ];

     const transitions = useTransition(formDivIndex, (p) => p, {
          from: {
               opacity: 0,
               // transform: 'translate3d(10vw,0vw,0)',
               overflowx: 'hidden',
          },
          enter: {
               opacity: 1,
               // transform: 'translate3d(0%,0vw,0)',
          },
          leave: {
               opacity: 0,
               // transform: 'translate3d(10vw,0vw,0)',
               overflowx: 'hidden',
          },
     });

     const closeBtn = <CloseArrowBtn onClick={formDivClose} />;

     return (
          <>
               <div className='signIn-background'>
                    <p className='signIn-text'>
                         New user?{' '}
                         <span
                              onClick={formDivOpen}
                              type='register'
                              className='signIn-text--authLink'
                         >
                              Register
                         </span>{' '}
                         <br />
                         Returning user?{' '}
                         <span
                              onClick={formDivOpen}
                              type='login'
                              className='signIn-text--authLink'
                         >
                              Login
                         </span>
                    </p>
               </div>

               {transitions.map(({ item, props, key }) => {
                    const FormDiv = formDivs[item];
                    return <FormDiv key={key} style={props} />;
               })}
          </>
     );
}

export default OpenCloseForm;
