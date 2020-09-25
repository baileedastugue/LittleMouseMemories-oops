import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { login } from '../../../actions/authActions';

import AuthButton from '../../Buttons/AuthBtn';
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

     if (props.isAuth) {
          return <Redirect to='/dashboard' />;
     }
     return (
          <div className='authForms-form'>
               <Form
                    className='form authForms-form--login'
                    onSubmit={(event) => onSubmit(event)}
               >
                    <h3>Welcome back</h3>
                    {props.closeBtn}

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
                    <FormGroup>
                         <Label htmlFor='passwordInput'>Password</Label>
                         <Input
                              type='password'
                              name='password'
                              className='form-control'
                              id='passwordInput'
                              onChange={(event) => onChange(event)}
                              value={password}
                         />
                    </FormGroup>
                    <AuthButton type='submit' value='login' className='btn'>
                         Login
                    </AuthButton>
               </Form>
               <AlertDiv />
          </div>
     );
};

LoginForm.propTypes = {
     login: PropTypes.func.isRequired,
     isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
     isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(LoginForm);
