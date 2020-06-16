import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import axios from 'axios';
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
               // const newUser = {
               //      firstName,
               //      lastName,
               //      email,
               //      password,
               // };
               try {
                    console.log('success');
                    //      const config = {
                    //           headers: {
                    //                'Content-Type': 'application/json',
                    //           },
                    //      };
                    //      const body = JSON.stringify(newUser);
                    //      console.log(body);
                    //      const res = await axios.post(
                    //           'http://localhost:5000/api/users/',
                    //           body,
                    //           config
                    //      );
                    //      console.log(res.data);
               } catch (err) {
                    console.error(err.response.data);
               }
          }
     };

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
                         required
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
                    required
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
                         required
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
                    minLength='6'
                    required
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
                         required
                         minLength='6'
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
};

// have to export connect and pass in any actions
// this allows us to access props.setAlert
export default connect(null, { setAlert })(RegistrationForm);
