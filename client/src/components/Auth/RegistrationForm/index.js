import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../../actions/alertActions';
import { register } from '../../../actions/authActions';
import { Button, Form, FormGroup } from 'reactstrap';
import PropTypes from 'prop-types';

const RegistrationForm = (props) => {
     const [formData, setFormData] = useState({
          // these are the default values
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
               // alert type is daaaanger
               // have to export { setAlert } down below in order to use it here (available within props)
               props.setAlert('Passwords do not match', 'danger');
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
          <Form className='form' onSubmit={(event) => onSubmit(event)}>
               <FormGroup>
                    <label htmlFor='fNameInput'>First Name</label>
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
               <label htmlFor='newPasswordInput'>Password</label>
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
               <FormGroup>
                    <label htmlFor='newPasswordInput'>Confirm Password</label>
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
               <Button
                    type='submit'
                    value='register'
                    className='btn'
                    id='register-btn'
               >
                    Register
               </Button>
          </Form>
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
