import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../../actions/alertActions';
import { register } from '../../../actions/authActions';
import { Button, Form, FormGroup, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import './style.css';
import AlertDiv from '../../Layout/AlertDiv';

const RegistrationForm = (props) => {
     const [formData, setFormData] = useState({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          password2: '',
     });

     const { firstName, lastName, email, password, password2 } = formData;

     const onChange = (event) => {
          setFormData({ ...formData, [event.target.name]: event.target.value });
     };

     const onSubmit = async (event) => {
          event.preventDefault();
          if (password !== password2) {
               props.setAlert('Passwords do not match', 'danger');
          } else if (
               firstName === '' ||
               lastName === '' ||
               email === '' ||
               password === '' ||
               password2 === ''
          ) {
               props.setAlert('Please fill in all fields', 'danger');
          } else {
               try {
                    props.register({ firstName, lastName, email, password });
               } catch (err) {
                    console.error(err.response.data);
               }
          }
     };

     if (props.isAuth) {
          return <Redirect to='/dashboard' />;
     }

     return (
          <Fragment>
               <Form
                    className='form'
                    id='registrationForm'
                    onSubmit={(event) => onSubmit(event)}
               >
                    <h1>Welcome</h1>
                    {props.closeBtn}
                    <Row>
                         <Col md={6}>
                              <FormGroup>
                                   <label htmlFor='fNameInput'>
                                        First Name
                                   </label>
                                   <input
                                        type='text'
                                        name='firstName'
                                        className='form-control'
                                        id='firstNameInput'
                                        onChange={(event) => onChange(event)}
                                        value={firstName}
                                        // required
                                   />
                              </FormGroup>
                         </Col>
                         <Col md={6}>
                              <FormGroup>
                                   <label htmlFor='lNameInput'>Last Name</label>
                                   <input
                                        type='text'
                                        name='lastName'
                                        className='form-control'
                                        id='lastNameInput'
                                        onChange={(event) => onChange(event)}
                                        value={lastName}
                                        // required
                                   />
                              </FormGroup>
                         </Col>
                    </Row>
                    <Row>
                         <Col md={12}>
                              <FormGroup>
                                   <label htmlFor='emailInput'>Email</label>
                                   <input
                                        type='text'
                                        name='email'
                                        className='form-control'
                                        id='emailInput'
                                        onChange={(event) => onChange(event)}
                                        value={email}
                                        // required
                                   />
                              </FormGroup>
                         </Col>
                    </Row>
                    <Row>
                         <Col md={6}>
                              <FormGroup>
                                   <label htmlFor='newPasswordInput'>
                                        Password
                                   </label>
                                   <input
                                        type='password'
                                        name='password'
                                        className='form-control'
                                        id='newPasswordInput'
                                        onChange={(event) => onChange(event)}
                                        value={password}
                                        // minLength='6'
                                        // required
                                   />
                              </FormGroup>
                         </Col>
                         <Col md={6}>
                              <FormGroup>
                                   <label htmlFor='newPasswordInput'>
                                        Confirm Password
                                   </label>
                                   <input
                                        type='password'
                                        name='password2'
                                        className='form-control'
                                        id='newPasswordInput2'
                                        onChange={(event) => onChange(event)}
                                        value={password2}
                                        // minLength='6'
                                        // required
                                   />
                              </FormGroup>
                         </Col>
                    </Row>
                    <Button
                         type='submit'
                         value='register'
                         className='btn'
                         id='register-btn'
                    >
                         Register
                    </Button>
               </Form>
               <AlertDiv />
          </Fragment>
     );
};

RegistrationForm.propTypes = {
     setAlert: PropTypes.func.isRequired,
     register: PropTypes.func.isRequired,
     isAuth: PropTypes.bool,
};

const mapStateToProps = (state) => ({
     isAuth: state.auth.isAuthenticated,
});

// have to export connect and pass in any actions
// this allows us to access props.setAlert
export default connect(mapStateToProps, { setAlert, register })(
     RegistrationForm
);
