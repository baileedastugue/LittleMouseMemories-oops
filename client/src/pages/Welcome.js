import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import { useTransition, animated } from 'react-spring';
import MaterialIcon from 'material-icons-react';

import FormContainer from '../components/Layout/FormContainer';
import WelcomeShowcase from '../components/Layout/WelcomeShowcase';

const Welcome = ({ isAuth, isLoading }) => {
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
                    id='formContainer'
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
               transform: 'translate3d(10vw,0vw,0)',
               overflowx: 'hidden',
          },
          enter: {
               opacity: 1,
               transform: 'translate3d(0%,0vw,0)',
          },
          leave: {
               opacity: 0,
               transform: 'translate3d(10vw,0vw,0)',
               overflowx: 'hidden',
          },
     });

     const closeBtn = (
          <MaterialIcon
               icon='arrow_forward'
               color='white'
               size='large'
               id='authArrowCloseBtn'
               onClick={formDivClose}
          />
     );

     return isLoading || !isAuth ? (
          <Container id='welcomePage'>
               <div className='left'></div>
               <div className='leftTriangle'></div>
               <div id='mainText'>
                    <h1>Memories worth sharing</h1>
                    <h1>Privacy worth keeping</h1>
               </div>
               <div id='aboutText'>
                    Post photos and write your own memories,
                    <br />
                    easily collaborate with friends and family,
                    <br />
                    and protect your albums with a password
                    <br />
               </div>
               <div id='signInSquare'>
                    <p id='signInText'>
                         New user?{' '}
                         <span
                              onClick={formDivOpen}
                              type='register'
                              className='authLink'
                         >
                              Register
                         </span>{' '}
                         <br />
                         Returning user?{' '}
                         <span
                              onClick={formDivOpen}
                              type='login'
                              className='authLink'
                         >
                              Login
                         </span>
                    </p>
               </div>
               <div id='signInTriangle'></div>
               {transitions.map(({ item, props, key }) => {
                    const FormDiv = formDivs[item];
                    return <FormDiv key={key} style={props} />;
               })}
               <WelcomeShowcase />
          </Container>
     ) : (
          <Redirect to='/dashboard' />
     );
};

Welcome.propTypes = {
     isAuth: PropTypes.bool,
     isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
     isAuth: state.auth.isAuthenticated,
     isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps)(Welcome);
