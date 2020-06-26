import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import DeleteBtn from '../../Buttons/DeleteBtn';
import {
     Card,
     Row,
     CardFooter,
     CardBody,
     CardText,
     CardTitle,
} from 'reactstrap';
import { getAllAlbums, deleteAlbum } from '../../../actions/albumActions';

import './style.css';

const AlbumList = (props) => {
     // this
     useEffect(() => {
          props.getAllAlbums();
     }, []);

     let albumLength = props.albums.albums.length;
     let albumLoading = props.albums.isLoading;

     const deleteClick = async (event) => {
          event.preventDefault();
          const album_id = event.target.getAttribute('data-id');
          props.deleteAlbum(album_id);
     };

     return albumLength > 0 && !albumLoading ? (
          props.albums.albums.map((album) => (
               <Fragment>
                    <div className='albumList'>
                         <CardBody>
                              <CardText>
                                   <Link
                                        to={`/album/${album._id}`}
                                        key={album._id}
                                   >
                                        <h1>{album.title}</h1>
                                   </Link>
                              </CardText>
                         </CardBody>
                         <div className='overlay'>
                              <CardTitle className='text'>
                                   Created on:{' '}
                                   <Moment
                                        format='MM/DD/YYYY'
                                        date={album.date}
                                   ></Moment>
                              </CardTitle>
                         </div>
                         <CardFooter className='albumListBelow'>
                              <DeleteBtn
                                   id={album._id}
                                   deleteClick={deleteClick}
                              />
                         </CardFooter>
                    </div>
               </Fragment>
          ))
     ) : (
          <h1>Loading your albums</h1>
     );
};

AlbumList.propTypes = {
     getAllAlbums: PropTypes.func.isRequired,
     deleteAlbum: PropTypes.func.isRequired,
     auth: PropTypes.object.isRequired,
     albums: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
     auth: state.auth,
     albums: state.album,
});

export default connect(mapStateToProps, { getAllAlbums, deleteAlbum })(
     AlbumList
);
