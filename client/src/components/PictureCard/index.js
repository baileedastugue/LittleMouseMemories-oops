import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { getPictures } from '../../actions/pictureActions';

const PictureCard = (props) => {
     let pathArray = window.location.pathname.split('/');
     let albumId = pathArray[pathArray.length - 1];

     useEffect(() => {
          props.getPictures(albumId);
     }, [props.getPictures]);

     let picturesLength = props.picture.pictures.length;
     let picturesLoading = props.picture.isLoading;

     return picturesLength > 0 && !picturesLoading ? (
          props.picture.pictures.map((picture) => (
               <div key={picture._id}>
                    <Link>
                         <img src={picture.image} />
                    </Link>
                    <p>{picture.caption}</p>
                    <br />
                    Posted on:{' '}
                    <Moment format='MM/DD/YYYY'>{picture.date}</Moment>
                    <hr />
               </div>
          ))
     ) : (
          <h1>No pictures added yet!</h1>
     );
};

PictureCard.propTypes = {
     getPictures: PropTypes.func.isRequired,
     picture: PropTypes.object.isRequired,
     auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
     auth: state.auth,
     picture: state.picture,
});

export default connect(mapStateToProps, { getPictures })(PictureCard);
