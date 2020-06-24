import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../../actions/alertActions';
import { addNewPicture } from '../../../actions/pictureActions';
import { Form, FormGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import AlertDiv from '../../Layout/AlertDiv';

import SubmitButton from '../../Buttons/SubmitBtn';

const AddPictureForm = (props) => {
     // using the UseState hook from react
     const [caption, setCaption] = useState('');
     const [uploadedBy, setUploadedBy] = useState('');
     const [dateRecorded, setDateRecorded] = useState('');

     const [image, setImage] = useState({});
     // const [fileName, setFileName] = useState('Upload image');

     // handler to update the data
     // const onChange = (event) => {
     //      setImageData({
     //           ...ImageData,
     //           [event.target.name]: event.target.value,
     //      });
     // };
     const onCaptionChange = (event) => {
          setCaption(event.target.value);
     };

     const onUploadedByChange = (event) => {
          setUploadedBy(event.target.value);
     };

     const onDateRecordedChange = (event) => {
          setDateRecorded(event.target.value);
     };

     const onDrop = (event) => {
          setImage(event.target.files[0]);
          console.log(caption);
          console.log(uploadedBy);
          // setFileName(event.target.files[0].name);
     };

     const onSubmit = async (event) => {
          event.preventDefault();

          let pathArray = window.location.pathname.split('/');
          let albumId = pathArray[pathArray.length - 1];
          const formData = new FormData();

          formData.append('caption', caption);
          formData.append('uploadedBy', uploadedBy);
          formData.append('dateRecorded', dateRecorded);
          formData.append('image', image);
          console.log(formData.get('image'));

          console.log(formData);
          if (formData.get('image') === '[object Object]') {
               props.setAlert(
                    'Picture memories must include an image',
                    'danger'
               );
          } else {
               try {
                    await props.addNewPicture(albumId, formData);
                    setCaption('');
                    setUploadedBy('');
                    setDateRecorded('');
                    setImage({});
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
          <Fragment>
               <AlertDiv />
               <Form
                    className='form'
                    encType='multipart/form-data'
                    onSubmit={onSubmit}
               >
                    <FormGroup>
                         <label htmlFor='caption'>Caption</label>
                         <input
                              type='text'
                              name='caption'
                              className='form-control'
                              onChange={onCaptionChange}
                              value={caption}
                         />
                    </FormGroup>
                    <FormGroup>
                         <label htmlFor='uploadedBy'>Memory uploaded by:</label>
                         <input
                              type='text'
                              name='uploadedBy'
                              className='form-control'
                              onChange={onUploadedByChange}
                              value={uploadedBy}
                         />
                    </FormGroup>
                    <FormGroup>
                         <label htmlFor='dateRecorded'>
                              Date the photo was taken:
                         </label>
                         <input
                              type='text'
                              name='dateRecorded'
                              className='form-control'
                              onChange={onDateRecordedChange}
                              value={dateRecorded}
                         />
                    </FormGroup>
                    <FormGroup>
                         <input type='file' name='image' onChange={onDrop} />
                    </FormGroup>
                    <SubmitButton />
               </Form>
          </Fragment>
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
