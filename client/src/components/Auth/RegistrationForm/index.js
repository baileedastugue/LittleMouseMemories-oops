import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../../actions/alertActions';
import { register } from '../../../actions/authActions';
import { Form, FormGroup, Row, Col, Label, Input } from 'reactstrap';
import AuthButton from '../../Buttons/AuthBtn';
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
                                        // required
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
                                        // required
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
                                        // required
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
                                        // minLength='6'
                                        // required
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
                                        // minLength='6'
                                        // required
                                   />
                              </FormGroup>
                         </Col>
                    </Row>
                    <AuthButton type='submit' value='register' className='btn'>
                         Register
                    </AuthButton>
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

export default connect(mapStateToProps, { setAlert, register })(
     RegistrationForm
);
