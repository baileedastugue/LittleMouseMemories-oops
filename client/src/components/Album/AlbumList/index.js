import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import {
     getAllAlbums,
     getAlbumSettings,
     albumNameChange,
} from '../../../actions/albumActions';
import { Card, CardBody, CardFooter } from 'reactstrap';

import Loading from '../../Layout/Loading';
import NoContent from '../../Layout/NoContent';
import AlbumSettings from '../AlbumSettings';

const AlbumList = ({ album, albums, getAllAlbums, getAlbumSettings }) => {
     useEffect(() => {
          getAllAlbums();
     }, [getAllAlbums]);

     let albumLength = albums.albums.length;
     let albumLoading = albums.isLoading;

     const settingsToggle = async (event, data) => {
          event.preventDefault();
          if (data) {
               await getAlbumSettings(data._id);
               setSettingsModal(true);
               console.log(settingsModal);
          }
     };

     const [settingsModal, setSettingsModal] = useState(true);
     const currentAlbum = album[0];

     const closeSettings = async () => {
          setSettingsModal(false);
     };

     return albumLength === 0 ? (
          <NoContent>No albums added yet</NoContent>
     ) : !albumLoading ? (
          <Fragment>
               {albums.albums.map((album) => (
                    <Card className='flipCard' key={album._id}>
                         <Link to={`/album/${album._id}`}>
                              <CardBody
                                   className='flipCard-container'
                                   key={album._id}
                              >
                                   <div className='flipCard-inner'>
                                        <div className='flipCard-inner--front'>
                                             {album.title}
                                        </div>
                                        <div className='flipCard-inner--back center'>
                                             <div>
                                                  Created on: <br />
                                                  <Moment
                                                       format='MM/DD/YYYY'
                                                       date={album.date}
                                                  ></Moment>
                                             </div>
                                        </div>
                                   </div>
                              </CardBody>
                         </Link>
                         <CardFooter
                              className='albumSettings'
                              id={album._id}
                              onClick={(event) => settingsToggle(event, album)}
                         >
                              Album settings
                         </CardFooter>
                    </Card>
               ))}
               {settingsModal && currentAlbum ? (
                    <AlbumSettings
                         isOpen={settingsModal}
                         toggle={closeSettings}
                         currentAlbum={currentAlbum}
                         closeSettings={closeSettings}
                    />
               ) : null}
          </Fragment>
     ) : (
          <Loading />
     );
};

AlbumList.propTypes = {
     getAllAlbums: PropTypes.func.isRequired,
     getAlbumSettings: PropTypes.func.isRequired,
     auth: PropTypes.object.isRequired,
     albums: PropTypes.object.isRequired,
     album: PropTypes.array,
};

const mapStateToProps = (state) => ({
     auth: state.auth,
     albums: state.album,
     album: state.album.album,
});

export default connect(mapStateToProps, {
     albumNameChange,
     getAllAlbums,
     getAlbumSettings,
})(AlbumList);
