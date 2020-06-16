import React, { useState } from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import axios from 'axios';

const LoginForm = () => {
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
               const config = {
                    headers: {
                         'Content-Type': 'application/json',
                    },
               };
               const body = JSON.stringify(formData);
               console.log(body);
               const res = await axios.post(
                    'http://localhost:5000/api/auth/',
                    body,
                    config
               );
               console.log(res.data);
          } catch (err) {
               console.error(err.response.data);
          }
     };

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
               <Button type='submit' className='btn login-btn'>
                    Login
               </Button>
          </Form>
     );
};

export default LoginForm;
