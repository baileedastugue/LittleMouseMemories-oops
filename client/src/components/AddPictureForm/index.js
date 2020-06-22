import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import { addNewPicture } from '../../actions/pictureActions';
import { Form, FormGroup } from 'reactstrap';
import PropTypes from 'prop-types';

import SubmitButton from '../SubmitBtn';

const AddPictureForm = (props) => {
     // using the UseState hook from react
     const [imageData, setImageData] = useState({
          caption: '',
          dateRecorded: '',
          uploadedBy: '',
     });

     const [file, setFile] = useState({});
     const [fileName, setFileName] = useState('Upload image');

     const { caption, uploadedBy } = imageData;
     const { image } = file;

     // handler to update the data
     const onChange = (event) => {
          setImageData({
               ...ImageData,
               [event.target.name]: event.target.value,
          });
     };

     const onDrop = (event) => {
          console.log(event.target.files[0]);
          setFile(event.target.files[0]);
          setFileName(event.target.files[0].name);
     };

     const onSubmit = async (event) => {
          event.preventDefault();
          let pathArray = window.location.pathname.split('/');
          let albumId = pathArray[pathArray.length - 1];
          const formData = new FormData();

          await formData.append('file', file);
          await formData.append('uploadedBy', uploadedBy);
          await formData.append('caption', caption);

          if (image === '') {
               props.setAlert('Pictures must include an image URL', 'danger');
          } else {
               try {
                    await props.addNewPicture(albumId, formData);
                    setImageData({
                         ...imageData,
                         caption: '',
                         uploadedBy: '',
                    });
               } catch (err) {
                    if (err.response.status === 500) {
                         console.log('Server problem');
                    } else {
                         console.log(err.response.data.msg);
                    }
               }
          }
     };

     // if (!props.isAuth) {
     //      return <Redirect to='/login' />;
     // }

     return (
          <Form
               className='form'
               encType='multipart/form-data'
               onSubmit={onSubmit}
          >
               <FormGroup>
                    <input type='file' name='image' onChange={onDrop} />
               </FormGroup>
               <FormGroup>
                    <label htmlFor='caption'>Caption</label>
                    <input
                         type='text'
                         name='caption'
                         className='form-control'
                         onChange={(event) => onChange(event)}
                         value={caption}
                    />
               </FormGroup>
               <FormGroup>
                    <label htmlFor='uploadedBy'>Memory uploaded by:</label>
                    <input
                         type='text'
                         name='uploadedBy'
                         className='form-control'
                         onChange={(event) => onChange(event)}
                         value={uploadedBy}
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
     // uploadPicture: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
     isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
     setAlert,
     addNewPicture,
})(AddPictureForm);
