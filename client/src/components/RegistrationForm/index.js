import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup } from 'reactstrap';

const RegistrationForm = () => {
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
               console.log('Passwords do not match');
          } else {
               const newUser = {
                    firstName,
                    lastName,
                    email,
                    password,
               };
               try {
                    const config = {
                         headers: {
                              'Content-Type': 'application/json',
                         },
                    };
                    const body = JSON.stringify(newUser);
                    console.log(body);
                    const res = await axios.post(
                         'http://localhost:5000/api/users/',
                         body,
                         config
                    );
                    console.log(res.data);
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
               <Button type='submit' className='btn' id='register-btn'>
                    Register
               </Button>
          </Form>
     );
};

export default RegistrationForm;
