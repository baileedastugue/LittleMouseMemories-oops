import React, { useState } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { changePw } from '../../../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import SubmitButton from '../../Buttons/SubmitBtn';
import './style.css';

const ChangePasswordForm = (props) => {
     const [formData, setFormData] = useState({
          oldPassword: '',
          newPassword: '',
          newPassword2: '',
     });
     const { oldPassword, newPassword, newPassword2 } = formData;

     const onChange = (event) => {
          setFormData({ ...formData, [event.target.name]: event.target.value });
     };

     const onSubmit = async (event) => {
          event.preventDefault();
          try {
               props.changePw({ oldPassword, newPassword, newPassword2 });
               setFormData({
                    ...formData,
                    oldPassword: '',
                    newPassword: '',
                    newPassword2: '',
               });
          } catch (err) {
               console.error(err);
          }
     };

     if (!props.isAuth) {
          return <Redirect to='/' />;
     }

     return (
          <Form
               className='form clearfix'
               id='changePasswordForm'
               onSubmit={onSubmit}
          >
               <FormGroup>
                    <Label htmlFor='oldPassword'>Current password</Label>
                    <Input
                         type='password'
                         id='oldPassword'
                         name='oldPassword'
                         className='form-control'
                         value={oldPassword}
                         onChange={onChange}
                    />
               </FormGroup>

               <FormGroup>
                    <Label htmlFor='newPassword'>New password</Label>
                    <Input
                         type='password'
                         id='newPassword'
                         name='newPassword'
                         className='form-control'
                         value={newPassword}
                         onChange={onChange}
                    />
               </FormGroup>
               <FormGroup>
                    <Label htmlFor='newPassword2'>Confirm new password</Label>
                    <Input
                         type='password'
                         id='newPassword2'
                         name='newPassword2'
                         className='form-control'
                         value={newPassword2}
                         onChange={onChange}
                    />
               </FormGroup>
               <SubmitButton>Change Password</SubmitButton>
          </Form>
     );
};

ChangePasswordForm.propTypes = {
     isAuth: PropTypes.bool.isRequired,
     changePw: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
     isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { changePw })(ChangePasswordForm);
