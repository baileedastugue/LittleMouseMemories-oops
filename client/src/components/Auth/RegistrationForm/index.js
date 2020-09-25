import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../../actions/alertActions';
import { register } from '../../../actions/authActions';
import { Form, FormGroup, Row, Col, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';

import AuthButton from '../../Buttons/AuthBtn';
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
          <div className='authForms-form'>
               <Form
                    className='form authForms-form--register'
                    onSubmit={(event) => onSubmit(event)}
               >
                    <h3>Welcome</h3>
                    {props.closeBtn}
                    <Row>
                         <Col md={6}>
                              <FormGroup>
                                   <Label htmlFor='fNameInput'>
                                        First Name
                                   </Label>
                                   <Input
                                        type='text'
                                        name='firstName'
                                        className='form-control'
                                        id='firstNameInput'
                                        onChange={(event) => onChange(event)}
                                        value={firstName}
                                   />
                              </FormGroup>
                         </Col>
                         <Col md={6}>
                              <FormGroup>
                                   <Label htmlFor='lNameInput'>Last Name</Label>
                                   <Input
                                        type='text'
                                        name='lastName'
                                        className='form-control'
                                        id='lastNameInput'
                                        onChange={(event) => onChange(event)}
                                        value={lastName}
                                   />
                              </FormGroup>
                         </Col>
                    </Row>
                    <Row>
                         <Col md={12}>
                              <FormGroup>
                                   <Label htmlFor='emailInput'>Email</Label>
                                   <Input
                                        type='text'
                                        name='email'
                                        className='form-control'
                                        id='emailInput'
                                        onChange={(event) => onChange(event)}
                                        value={email}
                                   />
                              </FormGroup>
                         </Col>
                    </Row>
                    <Row>
                         <Col md={6}>
                              <FormGroup>
                                   <Label htmlFor='newPasswordInput'>
                                        Password
                                   </Label>
                                   <Input
                                        type='password'
                                        name='password'
                                        className='form-control'
                                        id='newPasswordInput'
                                        onChange={(event) => onChange(event)}
                                        value={password}
                                   />
                              </FormGroup>
                         </Col>
                         <Col md={6}>
                              <FormGroup>
                                   <Label htmlFor='newPasswordInput'>
                                        Confirm Password
                                   </Label>
                                   <Input
                                        type='password'
                                        name='password2'
                                        className='form-control'
                                        id='newPasswordInput2'
                                        onChange={(event) => onChange(event)}
                                        value={password2}
                                   />
                              </FormGroup>
                         </Col>
                    </Row>
                    <AuthButton type='submit' value='register' className='btn'>
                         Register
                    </AuthButton>
               </Form>
               <AlertDiv />
          </div>
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

export default connect(mapStateToProps, { setAlert, register })(
     RegistrationForm
);
