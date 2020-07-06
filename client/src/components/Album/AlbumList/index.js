import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { getAllAlbums } from '../../../actions/albumActions';

import './style.css';

const AlbumList = ({ albums, getAllAlbums }) => {
     useEffect(() => {
          getAllAlbums();
     }, [getAllAlbums]);

     let albumLength = albums.albums.length;
     let albumLoading = albums.isLoading;

     return albumLength === 0 ? (
          <Fragment>No albums added</Fragment>
     ) : !albumLoading ? (
          albums.albums.map((album) => (
               <div class='flip-card' key={album._id}>
                    <div class='flip-card-inner'>
                         <Link to={`/album/${album._id}`}>
                              <div class='flip-card-front'>{album.title}</div>
                              <div class='flip-card-back'>
                                   Created on:{' '}
                                   <Moment
                                        format='MM/DD/YYYY'
                                        date={album.date}
                                   ></Moment>
                              </div>
                         </Link>
                    </div>
               </div>
          ))
     ) : (
          <h1>Loading your albums</h1>
     );
};

AlbumList.propTypes = {
     getAllAlbums: PropTypes.func.isRequired,
     auth: PropTypes.object.isRequired,
     albums: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
     auth: state.auth,
     albums: state.album,
});

export default connect(mapStateToProps, { getAllAlbums })(AlbumList);
