import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllAlbums } from '../../actions/albumActions';

import './style.css';

const AlbumList = (props) => {
     // this
     useEffect(() => {
          props.getAllAlbums();
     }, []);
     let albumLength = props.albums.albums.length;
     let albumLoading = props.albums.isLoading;
     console.log(albumLength);

     return albumLength > 0 && !albumLoading ? (
          props.albums.albums.map((album) => (
               <div key={album.key}>
                    <a href='/album'>{album.title}</a>
               </div>
          ))
     ) : (
          <h1>Loading</h1>
     );
};

AlbumList.propTypes = {
     getAllAlbums: PropTypes.func.isRequired,
     isAuth: PropTypes.bool,
     albums: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
     isAuth: state.auth.isAuthenticated,
     albums: state.album,
});

export default connect(mapStateToProps, { getAllAlbums })(AlbumList);
