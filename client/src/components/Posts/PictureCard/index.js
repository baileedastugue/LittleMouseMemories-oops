import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { getPictures, deletePicture } from '../../../actions/pictureActions';
import DeleteBtn from '../../Buttons/DeleteBtn';
import './style.css';

const PictureCard = (props) => {
     const [modal, setModal] = useState(false);

     const toggle = () => {
          setModal(!modal);
          console.log(modal);
     };

     let pathArray = window.location.pathname.split('/');
     let albumId = pathArray[pathArray.length - 1];

     useEffect(() => {
          props.getPictures(albumId);
     }, []);

     const deleteClick = async (event) => {
          event.preventDefault();
          const picture_id = event.target.getAttribute('data-id');
          props.deletePicture(picture_id, albumId);
     };

     let picturesLength = props.picture.pictures.length;
     let picturesLoading = props.picture.isLoading;

     return (
          <div>
               {picturesLength > 0 && !picturesLoading ? (
                    props.picture.pictures.map((picture) => (
                         <div key={picture._id}>
                              <img
                                   src={picture.image}
                                   alt={picture.caption}
                                   className='pictureCardImage'
                              />
                              <p>{picture.caption}</p>
                              {picture.uploadedBy}
                              <br />
                              Posted on:{' '}
                              <Moment
                                   format='MM/DD/YYYY'
                                   date={picture.dateUploaded}
                              ></Moment>
                              <DeleteBtn
                                   id={picture._id}
                                   deleteClick={deleteClick}
                              />
                         </div>
                    ))
               ) : (
                    <h1>No pictures added yet!</h1>
               )}
          </div>
     );
};

PictureCard.propTypes = {
     getPictures: PropTypes.func.isRequired,
     deletePicture: PropTypes.func.isRequired,
     picture: PropTypes.object.isRequired,
     auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
     auth: state.auth,
     picture: state.picture,
});

export default connect(mapStateToProps, { getPictures, deletePicture })(
     PictureCard
);
