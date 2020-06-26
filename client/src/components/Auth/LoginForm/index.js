import React, { useState } from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../../actions/authActions';
import { Redirect } from 'react-router-dom';

const LoginForm = ({ login, isAuth }) => {
     const [formData, setFormData] = useState({
          // these are the default values
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
               login({ email, password });
          } catch (err) {
               console.error(err.response.data);
          }
     };

     // Redirect if logged in
     if (isAuth) {
          return <Redirect to='/dashboard' />;
     }

     return (
          <Form className='form' onSubmit={(event) => onSubmit(event)}>
               <FormGroup>
                    <label htmlFor='emailInput'>Email</label>
                    <input
                         type='text'
                         name='email'
                         className='form-control'
                         id='emailInput'
                         onChange={(event) => onChange(event)}
                         value={email}
                         required
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
                         required
                    />
               </FormGroup>
               <Button type='submit' value='login' className='btn login-btn'>
                    Login
               </Button>
          </Form>
     );
};

// login is a prop
LoginForm.propTypes = {
     login: PropTypes.func.isRequired,
     isAuth: PropTypes.bool,
};

const mapStateToProps = (state) => ({
     isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(LoginForm);
