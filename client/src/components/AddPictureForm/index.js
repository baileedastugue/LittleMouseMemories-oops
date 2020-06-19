import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import { addNewPicture } from '../../actions/pictureActions';
import { Form, FormGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import SubmitButton from '../SubmitBtn';

const AddPictureForm = (props) => {
     // using the UseState hook from react
     const [formData, setFormData] = useState({
          image: '',
     });

     const { image, caption } = formData;

     // handler to update the data
     const onChange = (event) => {
          setFormData({ ...formData, [event.target.name]: event.target.value });
     };

     const onSubmit = async (event) => {
          event.preventDefault();
          let pathArray = window.location.pathname.split('/');
          let albumId = pathArray[pathArray.length - 1];
          console.log(albumId);
          console.log({ image });
          if (image === '') {
               console.log('line 30');
               props.setAlert('Pictures must include an image URL', 'danger');
          } else {
               try {
                    props.addNewPicture(albumId, { image, caption });
               } catch (err) {}
          }
     };

     if (!props.isAuth) {
          return <Redirect to='/login' />;
     }

     return (
          <Form className='form' onSubmit={(event) => onSubmit(event)}>
               <FormGroup>
                    <label htmlFor='image'>Image URL</label>
                    <input
                         type='text'
                         name='image'
                         className='form-control'
                         onChange={(event) => onChange(event)}
                         value={image}
                    />
               </FormGroup>
               <SubmitButton />
          </Form>
     );
};

AddPictureForm.propTypes = {
     isAuth: PropTypes.bool,
     setAlert: PropTypes.func.isRequired,
     addNewPicture: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
     isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, addNewPicture })(
     AddPictureForm
);
