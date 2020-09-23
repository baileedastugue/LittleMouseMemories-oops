import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { setAlert } from '../../../actions/alertActions';
import { addNewAlbum } from '../../../actions/albumActions';

import SubmitButton from '../../Buttons/SubmitBtn';
import AlertDiv from '../../Layout/AlertDiv';

const AddAlbumForm = ({ setAlert, addNewAlbum, toggle, isAuth }) => {
     const [formData, setFormData] = useState({
          title: '',
          password: '',
     });

     const [passwordRequired, setPasswordRequired] = useState(false);

     const { title, password } = formData;

     const onChange = (event) => {
          setFormData({ ...formData, [event.target.name]: event.target.value });
     };

     const handleCheckboxChange = () => {
          setPasswordRequired(!passwordRequired);
     };

     const onSubmit = async (event) => {
          event.preventDefault();
          if (title === '') {
               setAlert('All albums need a title', 'danger');
          } else if (passwordRequired && password === '') {
               setAlert(
                    'Please include a password or uncheck the box',
                    'danger'
               );
          } else {
               try {
                    addNewAlbum({ title, passwordRequired, password });
                    setFormData({ ...formData, title: '' });
                    await setPasswordRequired(false);
                    toggle();
               } catch (err) {}
          }
     };

     if (!isAuth) {
          return <Redirect to='/' />;
     }

     return (
          <Fragment>
               <AlertDiv />
               <Form className='form' onSubmit={onSubmit}>
                    <Row form>
                         <Col md={12}>
                              <FormGroup>
                                   <label htmlFor='title'>Album title</label>
                                   <input
                                        type='text'
                                        name='title'
                                        className='form-control'
                                        onChange={onChange}
                                        value={title}
                                   />
                              </FormGroup>
                         </Col>
                    </Row>
                    <Row form>
                         <Col md={6}>
                              <FormGroup check className='mb-5 mt-3'>
                                   <Input
                                        type='checkbox'
                                        name='addPassword'
                                        onChange={handleCheckboxChange}
                                        isChecked={passwordRequired}
                                   />

                                   <Label check>
                                        Add password to this album
                                   </Label>
                              </FormGroup>
                         </Col>
                         {passwordRequired ? (
                              <Col md={6}>
                                   <FormGroup>
                                        <label htmlFor='password'>
                                             Album password
                                        </label>
                                        <input
                                             type='text'
                                             name='password'
                                             className='form-control'
                                             onChange={onChange}
                                             value={password}
                                        />
                                   </FormGroup>
                              </Col>
                         ) : null}
                    </Row>
                    <SubmitButton>Add Album</SubmitButton>
               </Form>
          </Fragment>
     );
};

AddAlbumForm.propTypes = {
     isAuth: PropTypes.bool,
     setAlert: PropTypes.func.isRequired,
     addNewAlbum: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
     isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, addNewAlbum })(
     AddAlbumForm
);
