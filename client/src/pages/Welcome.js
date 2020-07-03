import React, { useState, Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import LoginForm from '../components/Auth/LoginForm';
import RegistrationForm from '../components/Auth/RegistrationForm';
import { Animated } from 'react-animated-css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const Welcome = ({ isAuth, isLoading }) => {
     const [showFormDiv, setShowFormDiv] = useState(false);
     const [formType, setFormType] = useState('');

     const formDivToggle = (event) => {
          setShowFormDiv(true);
          setFormType(event.target.getAttribute('type'));
     };

     {
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
                                   onClick={formDivToggle}
                                   type='register'
                                   className='authLink'
                              >
                                   Register
                              </span>{' '}
                              <br />
                              Returning user?{' '}
                              <span
                                   onClick={formDivToggle}
                                   type='login'
                                   className='authLink'
                              >
                                   Login
                              </span>
                         </p>
                    </div>
                    <div id='signInTriangle'></div>
                    {showFormDiv ? (
                         <Fragment>
                              {formType === 'login' ? (
                                   <Fragment>
                                        <div id='logInForm'>
                                             <h1>Welcome back</h1>
                                             <LoginForm />
                                        </div>
                                        <div id='logInTriangle'></div>
                                   </Fragment>
                              ) : (
                                   <Fragment>
                                        <div id='registerForm'>
                                             <h1>Welcome!</h1>
                                             <RegistrationForm />
                                        </div>
                                        <div id='registerTriangle'></div>
                                   </Fragment>
                              )}
                         </Fragment>
                    ) : null}

                    <div id='showcase'>
                         <div className='movingArea'>
                              {/* First set */}
                              <Row>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1593046584198-ed785e8bf3a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>
                                        Saying goodbye to Emilio
                                   </div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1513492702219-923ec8c62a2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>
                                        Your first steps
                                   </div>
                              </Row>
                              <Row>
                                   <div className='box prompt'>My day</div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1592106680408-e7e63efbc7ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>
                                        Disney 2016
                                        {/* <div className='aboutText'>
                                             Post photos and write your own
                                             memories
                                        </div> */}
                                   </div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/flagged/photo-1576066196482-347ca427d0f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                              </Row>
                              <Row>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1593630459615-6ab2aa81a6ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>
                                        Road trip songs
                                   </div>
                                   <div className='box prompt'>
                                        Your first solid food
                                   </div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1507946116609-bfed19728fdf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                              </Row>
                              <Row>
                                   <div className='box prompt'>
                                        What we almost named you
                                   </div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1536825919521-ab78da56193b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>
                                        What we can't stop listening to
                                   </div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1551197600-d3782114566e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                              </Row>
                              <Row>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1513862448120-a41616062133?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>
                                        Postpartum moments that made me cry
                                   </div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1588410670460-cdab54625253?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>
                                        Indy's first walk
                                   </div>
                              </Row>
                              <Row>
                                   <div className='box prompt'>
                                        Your favorite food
                                   </div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1547226846-000337daf073?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>
                                        What I'm learning
                                   </div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1575404078738-d2f15b89d320?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                              </Row>
                              <Row>
                                   <div className='box prompt'>
                                        Bringing Heddy home
                                   </div>
                                   <div className='box prompt'>
                                        Your first words
                                   </div>

                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1458546450666-ebb1e605853f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>
                                        The proposal
                                   </div>
                              </Row>
                              <Row>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1529424601215-d2a3daf193ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>
                                        Our first dance
                                   </div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1587327650077-76b67918ddeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>
                                        Your birth - grandma's perspective
                                   </div>
                              </Row>
                              <Row>
                                   <div className='box prompt'>
                                        Foods of today
                                   </div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1453745541039-d804ab0ff1ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>
                                        Your favorite toy
                                   </div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1512746804203-e53e69406f93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                              </Row>
                              <Row>
                                   <div className='box prompt'>
                                        Our first date
                                   </div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1562832823-f277927d6f2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1557469778-0b3269a1cc7a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>
                                        Your first day of school
                                   </div>
                              </Row>

                              {/* STOOOOOP */}

                              <Row>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1593046584198-ed785e8bf3a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>
                                        Saying goodbye to Emilio
                                   </div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1513492702219-923ec8c62a2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>
                                        Your first steps
                                   </div>
                              </Row>
                              <Row>
                                   <div className='box prompt'>My day</div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1592106680408-e7e63efbc7ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>Disney 2016</div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/flagged/photo-1576066196482-347ca427d0f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                              </Row>
                              <Row>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1593630459615-6ab2aa81a6ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>
                                        Road trip songs
                                   </div>
                                   <div className='box prompt'>
                                        Your first solid food
                                   </div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1507946116609-bfed19728fdf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                              </Row>
                              <Row>
                                   <div className='box prompt'>
                                        What we almost named you
                                   </div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1536825919521-ab78da56193b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>
                                        What we can't stop listening to
                                   </div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1551197600-d3782114566e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                              </Row>
                              <Row>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1513862448120-a41616062133?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>
                                        Postpartum moments that made me cry
                                   </div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1588410670460-cdab54625253?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>
                                        Indy's first walk
                                   </div>
                              </Row>
                              <Row>
                                   <div className='box prompt'>
                                        Your favorite food
                                   </div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1547226846-000337daf073?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>
                                        What I'm learning
                                   </div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1575404078738-d2f15b89d320?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                              </Row>
                              <Row>
                                   <div className='box prompt'>
                                        Bringing Heddy home
                                   </div>
                                   <div className='box prompt'>
                                        Your first words
                                   </div>

                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1458546450666-ebb1e605853f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>
                                        The proposal
                                   </div>
                              </Row>
                              <Row>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1529424601215-d2a3daf193ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>
                                        Our first dance
                                   </div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1587327650077-76b67918ddeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>
                                        Your birth - grandma's perspective
                                   </div>
                              </Row>
                              <Row>
                                   <div className='box prompt'>
                                        Foods of today
                                   </div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1453745541039-d804ab0ff1ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>
                                        Your favorite toy
                                   </div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1512746804203-e53e69406f93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                              </Row>
                              <Row>
                                   <div className='box prompt'>
                                        Our first date
                                   </div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1562832823-f277927d6f2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1557469778-0b3269a1cc7a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>
                                        Your first day of school
                                   </div>
                              </Row>
                         </div>
                    </div>
               </Container>
          ) : (
               <Redirect to='/dashboard' />
          );
     }
};

Welcome.propTypes = {
     isAuth: PropTypes.bool.isRequired,
     isLoading: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
     isAuth: state.auth.isAuthenticated,
     isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps)(Welcome);
