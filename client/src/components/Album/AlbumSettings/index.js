import React, { useState } from 'react';
import { connect } from 'react-redux';
import AlertDiv from '../../Layout/AlertDiv';
import PropTypes from 'prop-types';
import {
     Modal,
     ModalBody,
     ModalHeader,
     Button,
     Form,
     FormGroup,
     Label,
     Input,
} from 'reactstrap';
import {
     deleteAlbum,
     albumNameChange,
     getAlbumSettings,
} from '../../../actions/albumActions';

import AlbumPassword from '../../Settings/AlbumPassword';
import SubmitButton from '../../Buttons/SubmitBtn';
import CloseBtn from '../../Buttons/CloseBtn';

const AlbumSettings = (props) => {
     const closeBtn = <CloseBtn onClick={props.closeSettings} />;

     const deleteClick = async (event) => {
          event.preventDefault();
          const album_id = event.target.getAttribute('id');
          await props.deleteAlbum(album_id);
          props.closeSettings();
     };

     const [newTitle, setNewTitle] = useState('');

     const onAlbumTitleChange = (event) => {
          setNewTitle(event.target.value);
     };

     const submitAlbumTitle = async (event) => {
          event.preventDefault();
          let album_id = props.currentAlbum._id;
          try {
               await props.albumNameChange(album_id, { newTitle });
               setNewTitle('');
               props.closeSettings();
          } catch (err) {
               console.error(err);
          }
     };

     return (
          <div>
               <Modal isOpen={props.isOpen} toggle={props.closeSettings}>
                    <ModalHeader close={closeBtn}>
                         {props.currentAlbum.title}
                         <AlertDiv />
                    </ModalHeader>
                    <ModalBody>
                         <Form
                              className='form'
                              onSubmit={(event) => submitAlbumTitle(event)}
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
                              <SubmitButton>Change title</SubmitButton>
                         </Form>
                         <hr />
                         <h5>Change password settings</h5>
                         <AlbumPassword
                              id={props.currentAlbum._id}
                              passwordRequired={
                                   props.currentAlbum.passwordRequired
                              }
                              closeSettings={props.closeSettings}
                         />
                         <hr />
                         <h5>Delete album</h5>
                         <p>
                              Deleting this album will permanently delete the
                              album and all posts within this album. This action
                              cannot be undone - click carefully!
                         </p>
                         <Button
                              id={props.currentAlbum._id}
                              onClick={deleteClick}
                              className='mx-auto btn-delete'
                         >
                              Delete Album
                         </Button>
                    </ModalBody>
               </Modal>
          </div>
     );
};

AlbumSettings.propTypes = {
     deleteAlbum: PropTypes.func.isRequired,
     albumNameChange: PropTypes.func.isRequired,
     getAlbumSettings: PropTypes.func.isRequired,
     album: PropTypes.array,
};

const mapStateToProps = (state) => ({
     album: state.album.album,
});

export default connect(mapStateToProps, {
     deleteAlbum,
     albumNameChange,
     getAlbumSettings,
})(AlbumSettings);
