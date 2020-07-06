import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form, FormGroup } from 'reactstrap';
import { Redirect } from 'react-router-dom';

import { login } from '../../../actions/authActions';
import AlertDiv from '../../Layout/AlertDiv';

const LoginForm = (props) => {
     const [formData, setFormData] = useState({
          email: '',
          password: '',
     });

     const { email, password } = formData;

     const onChange = (event) => {
          setFormData({ ...formData, [event.target.name]: event.target.value });
     };

     const onSubmit = async (event) => {
          event.preventDefault();
          try {
               props.login({ email, password });
          } catch (err) {
               console.error(err);
          }
     };

     // Redirect if logged in
     if (props.isAuth) {
          return <Redirect to='/dashboard' />;
     }
     return (
          <div>
               <Form
                    id='loginForm'
                    className='form'
                    onSubmit={(event) => onSubmit(event)}
               >
                    <h1>Welcome back</h1>
                    {props.closeBtn}

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
                    <FormGroup>
                         <label htmlFor='passwordInput'>Password</label>
                         <input
                              type='password'
                              name='password'
                              className='form-control'
                              id='passwordInput'
                              onChange={(event) => onChange(event)}
                              value={password}
                              // required
                         />
                    </FormGroup>
                    <Button
                         type='submit'
                         value='login'
                         className='btn login-btn'
                    >
                         Login
                    </Button>
               </Form>
               <AlertDiv />
          </div>
     );
};

// login is a prop
LoginForm.propTypes = {
     login: PropTypes.func.isRequired,
     isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
     isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(LoginForm);
