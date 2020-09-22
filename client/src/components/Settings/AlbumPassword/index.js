import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../../actions/alertActions';
import { albumPasswordChange } from '../../../actions/albumActions';
import SubmitButton from '../../Buttons/SubmitBtn';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const AlbumPassword = (props) => {
     const [newPassword, setNewPassword] = useState('');

     const onPasswordChange = (event) => {
          setNewPassword(event.target.value);
     };

     const [passwordRequired, setPasswordRequired] = useState(
          props.passwordRequired
     );

     const handleCheckboxChange = () => {
          setPasswordRequired(!passwordRequired);
     };

     const onPasswordSubmit = async (event) => {
          event.preventDefault();
          if (
               (passwordRequired && newPassword === '') ||
               (!passwordRequired && !newPassword === '')
          ) {
               props.setAlert(
                    'Please include a password or uncheck the box',
                    'danger'
               );
          } else {
               try {
                    const album_id = event.target.getAttribute('id');
                    await props.albumPasswordChange(album_id, {
                         newPassword,
                         passwordRequired,
                    });
                    setNewPassword('');
                    props.closeSettings();
               } catch (err) {
                    console.error(err);
               }
          }
     };

     return (
          <Form
               className='form clearfix'
               onSubmit={onPasswordSubmit}
               id={props.id}
          >
               {!props.passwordRequired ? (
                    <p>No password currently required to view this album</p>
               ) : (
                    <p>Password is required to view this album</p>
               )}
               <FormGroup className='ml-4'>
                    <Label>
                         <Input
                              type='checkbox'
                              name='newPassword'
                              value={newPassword}
                              onChange={handleCheckboxChange}
                              defaultChecked={props.passwordRequired}
                              isChecked={passwordRequired}
                         />
                         Require password
                    </Label>
               </FormGroup>

               {passwordRequired ? (
                    <FormGroup>
                         <label htmlFor='newPassword'>
                              {props.passwordRequired ? (
                                   <span>Update password</span>
                              ) : (
                                   <span>Add a password</span>
                              )}
                         </label>
                         <input
                              type='text'
                              name='newPassword'
                              className='form-control'
                              onChange={onPasswordChange}
                              value={newPassword}
                         />
                    </FormGroup>
               ) : null}

               <SubmitButton>Save Changes</SubmitButton>
               <FormText color='muted'>Submit to save all changes</FormText>
          </Form>
     );
};

AlbumPassword.propTypes = {
     setAlert: PropTypes.func.isRequired,
     albumPasswordChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
     isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, albumPasswordChange })(
     AlbumPassword
);
