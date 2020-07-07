import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import AlertDiv from '../../Layout/AlertDiv';
import {
     getAllAlbums,
     deleteAlbum,
     albumNameChange,
     getAlbumSettings,
} from '../../../actions/albumActions';
import {
     Card,
     CardBody,
     CardText,
     CardFooter,
     Modal,
     ModalBody,
     ModalHeader,
     Button,
     Form,
     FormGroup,
     Label,
     Input,
} from 'reactstrap';
import AlbumPassword from '../../Settings/AlbumPassword';
import SubmitButton from '../../Buttons/SubmitBtn';
import Loading from '../../Layout/Loading';
import NoContent from '../../Layout/NoContent';
import './style.css';

const AlbumList = ({
     albums,
     getAllAlbums,
     deleteAlbum,
     albumNameChange,
     getAlbumSettings,
     album,
}) => {
     useEffect(() => {
          getAllAlbums();
     }, [getAllAlbums]);

     let albumLength = albums.albums.length;
     let albumLoading = albums.isLoading;

     const deleteClick = async (event) => {
          event.preventDefault();
          const album_id = event.target.getAttribute('id');
          await deleteAlbum(album_id);
          closeSettings();
     };

     const [newTitle, setNewTitle] = useState('');

     const onAlbumTitleChange = (event) => {
          setNewTitle(event.target.value);
     };

     const submitAlbumTitle = async (event) => {
          event.preventDefault();
          let album_id = currentAlbum._id;
          try {
               await albumNameChange(album_id, { newTitle });
               setNewTitle('');
               closeSettings();
          } catch (err) {
               console.error(err);
          }
     };

     const [settingsModal, setSettingsModal] = useState(false);

     const settingsToggle = async (event, data) => {
          event.preventDefault();
          if (data) {
               await getAlbumSettings(data._id);
               setSettingsModal(true);
          }
     };

     const closeSettings = async () => {
          setSettingsModal(false);
     };

     const currentAlbum = album[0];

     return albumLength === 0 ? (
          <NoContent>No albums added yet</NoContent>
     ) : !albumLoading ? (
          <Fragment>
               {albums.albums.map((album) => (
                    <Card key={album._id}>
                         <Link to={`/album/${album._id}`}>
                              <CardBody className='flip-card' key={album._id}>
                                   <div className='flip-card-inner'>
                                        <div className='flip-card-front'>
                                             {album.title}
                                        </div>
                                        <div className='flip-card-back center'>
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
                              className='albumListBelow'
                              id={album._id}
                              onClick={(event) => settingsToggle(event, album)}
                         >
                              Album settings
                         </CardFooter>
                    </Card>
               ))}
               {settingsModal && currentAlbum ? (
                    <div>
                         <Modal isOpen={settingsModal} toggle={closeSettings}>
                              <ModalHeader toggle={closeSettings}>
                                   {currentAlbum.title}
                                   <AlertDiv />
                              </ModalHeader>
                              <ModalBody>
                                   <Form
                                        className='form clearfix'
                                        onSubmit={(event) =>
                                             submitAlbumTitle(event)
                                        }
                                   >
                                        <FormGroup>
                                             <h5>Change album title</h5>
                                             <Label htmlFor='newTitle'>
                                                  New album title
                                             </Label>
                                             <Input
                                                  type='text'
                                                  name='newTitle'
                                                  value={newTitle}
                                                  onChange={onAlbumTitleChange}
                                             />
                                        </FormGroup>
                                        <SubmitButton>
                                             Change title
                                        </SubmitButton>
                                   </Form>
                                   <hr />
                                   <h5>Change password settings</h5>
                                   <AlbumPassword
                                        id={currentAlbum._id}
                                        passwordRequired={
                                             currentAlbum.passwordRequired
                                        }
                                        closeSettings={closeSettings}
                                   />
                                   <hr />
                                   <h5>Delete album</h5>
                                   <p>
                                        Deleting this album will permanently
                                        delete the album and all posts within
                                        this album. This action cannot be undone
                                        - click carefully!
                                   </p>
                                   <Button
                                        id={currentAlbum._id}
                                        onClick={deleteClick}
                                        className='mx-auto btn-danger'
                                   >
                                        Delete
                                   </Button>
                              </ModalBody>
                         </Modal>
                    </div>
               ) : null}
          </Fragment>
     ) : (
          <Loading />
     );
};

AlbumList.propTypes = {
     getAllAlbums: PropTypes.func.isRequired,
     deleteAlbum: PropTypes.func.isRequired,
     albumNameChange: PropTypes.func.isRequired,
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
     getAllAlbums,
     deleteAlbum,
     albumNameChange,
     getAlbumSettings,
})(AlbumList);
