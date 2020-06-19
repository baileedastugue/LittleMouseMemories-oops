import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import DeleteBtn from '../DeleteBtn';
import { getAllAlbums, deleteAlbum } from '../../actions/albumActions';

import axios from 'axios';
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
               <div key={album._id}>
                    <Link to={`/album/${album._id}`}>{album.title}</Link>
                    <DeleteBtn id={album._id} deleteClick={deleteClick} />
                    <br />
                    Posted on: <Moment format='MM/DD/YYYY'>{album.date}</Moment>
               </div>
          ))
     ) : (
          <h1>Loading</h1>
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
