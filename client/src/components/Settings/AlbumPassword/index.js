import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../../actions/alertActions';
import { albumPasswordChange } from '../../../actions/albumActions';
import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';

const AlbumPassword = (props) => {
     //  console.log('line 28');
     //  console.log(props);
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
          }
          try {
               const album_id = event.target.getAttribute('id');
               await props.albumPasswordChange(album_id, {
                    newPassword,
                    passwordRequired,
               });
               setNewPassword('');
          } catch (err) {
               console.error(err);
          }
     };

     return (
          <Form className='form' onSubmit={onPasswordSubmit} id={props.id}>
               {/* <Row form> */}
               {!props.passwordRequired ? (
                    <p>No password currently required to view this album</p>
               ) : (
                    <p>Password is required to view this album</p>
               )}
               <FormGroup>
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

               {/* </Row> */}
               <Button>Save Changes</Button>
               <FormText color='muted'>
                    Submit form to save all changes
               </FormText>
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
