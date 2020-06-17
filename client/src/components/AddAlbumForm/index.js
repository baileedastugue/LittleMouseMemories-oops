import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
// import { addAlbum } from '../../actions/albumActions';
import { Button, Form, FormGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const AddAlbumForm = (props) => {
     // using the UseState hook from react
     const [formData, setFormData] = useState({
          title: '',
     });

     const { title } = formData;

     // handler to update the data
     const onChange = (event) => {
          setFormData({ ...formData, [event.target.name]: event.target.value });
     };

     const onSubmit = (event) => {
          event.preventDefault();
          console.log(event.target.value);
     };

     if (!props.isAuth) {
          return <Redirect to='/login' />;
     }

     return (
          <Form className='form' onSubmit={(event) => onSubmit(event)}>
               <FormGroup>
                    <label htmlFor='title'>Album title</label>
                    <input
                         type='text'
                         name='title'
                         className='form-control'
                         onChange={(event) => onChange(event)}
                         value={title}
                    />
               </FormGroup>
          </Form>
     );
};

AddAlbumForm.propTypes = {
     isAuth: PropTypes.bool,
     setAlert: PropTypes.func.isRequired,
     // addAlbum: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
     isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert })(AddAlbumForm);
