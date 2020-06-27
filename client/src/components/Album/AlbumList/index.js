import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import DeleteBtn from '../../Buttons/DeleteBtn';
import {
     // Card,
     // Row,
     CardFooter,
     CardBody,
     CardText,
     CardTitle,
} from 'reactstrap';
import { getAllAlbums, deleteAlbum } from '../../../actions/albumActions';

import './style.css';

const AlbumList = ({ albums, deleteAlbum, getAllAlbums }) => {
     // this
     useEffect(() => {
          getAllAlbums();
     }, [getAllAlbums]);

     let albumLength = albums.albums.length;
     let albumLoading = albums.isLoading;

     const deleteClick = async (event) => {
          event.preventDefault();
          const album_id = event.target.getAttribute('data-id');
          deleteAlbum(album_id);
     };

     return albumLength === 0 ? (
          <Fragment>No albums added</Fragment>
     ) : !albumLoading ? (
          albums.albums.map((album) => (
               <Fragment key={album._id}>
                    <div className='albumList'>
                         <CardBody>
                              <CardText>
                                   <Link to={`/album/${album._id}`}>
                                        {album.title}
                                   </Link>
                              </CardText>
                              <Link
                                   to={`/album/${album._id}`}
                                   key={album._id}
                                   className='overlay'
                              >
                                   <CardTitle className='text'>
                                        Created on:{' '}
                                        <Moment
                                             format='MM/DD/YYYY'
                                             date={album.date}
                                        ></Moment>
                                   </CardTitle>
                              </Link>
                         </CardBody>
                         <CardFooter
                              className='albumListBelow'
                              onClick={deleteClick}
                         >
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
