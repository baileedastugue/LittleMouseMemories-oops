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
     const [imageData, setImageData] = useState({
          caption: '',
          dateRecorded: '',
          uploadedBy: '',
     });

     const [file, setFile] = useState({});
     // const [fileName, setFileName] = useState('Upload image');

     const { caption, uploadedBy, dateRecorded } = imageData;
     const { image } = file;

     // handler to update the data
     const onChange = (event) => {
          setImageData({
               ...ImageData,
               [event.target.name]: event.target.value,
          });
     };

     const onDrop = (event) => {
          setFile(event.target.files[0]);
          // setFileName(event.target.files[0].name);
     };

     const onSubmit = async (event) => {
          event.preventDefault();
          let pathArray = window.location.pathname.split('/');
          let albumId = pathArray[pathArray.length - 1];
          const formData = new FormData();

          await formData.append('file', file);
          await formData.append('uploadedBy', uploadedBy);
          await formData.append('caption', caption);
          await formData.append('dateRecorded', dateRecorded);

          if (formData.get('file') === '[object Object]') {
               console.log(123);
               console.log(props);
               props.setAlert(
                    'Picture memories must include an image',
                    'danger'
               );
          } else {
               try {
                    await props.addNewPicture(albumId, formData);
                    setImageData({
                         ...imageData,
                         caption: '',
                         uploadedBy: '',
                         dateRecorded: '',
                    });
                    setFile({});
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
                    <FormGroup>
                         <label htmlFor='dateRecorded'>
                              Date the photo was taken:
                         </label>
                         <input
                              type='text'
                              name='dateRecorded'
                              className='form-control'
                              onChange={(event) => onChange(event)}
                              value={dateRecorded}
                         />
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
