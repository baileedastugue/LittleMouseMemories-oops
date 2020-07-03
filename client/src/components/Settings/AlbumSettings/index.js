import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SubmitButton from '../../Buttons/SubmitBtn';

import {
     Card,
     Col,
     Row,
     Form,
     FormGroup,
     Label,
     Input,
     TabContent,
     TabPane,
     CardTitle,
     Button,
     Nav,
     NavItem,
     NavLink,
} from 'reactstrap';
import classnames from 'classnames';
import {
     deleteAlbum,
     getAllAlbums,
     albumNameChange,
} from '../../../actions/albumActions';

import './style.css';
import AlbumPassword from '../AlbumPassword';

const AlbumSettings = ({
     albums,
     getAllAlbums,
     deleteAlbum,
     albumNameChange,
}) => {
     useEffect(() => {
          getAllAlbums();
     }, [getAllAlbums]);

     let albumLength = albums.albums.length;
     let albumLoading = albums.isLoading;

     const deleteClick = async (event) => {
          event.preventDefault();
          const album_id = event.target.getAttribute('id');
          console.log(album_id);
          await deleteAlbum(album_id);
     };
     const [activeTab, setActiveTab] = useState('delete');

     const toggle = (tab) => {
          if (activeTab !== tab) setActiveTab(tab);
     };

     const deleteId = (album_id) => {
          return `delete${album_id}`;
     };

     const nameId = (album_id) => {
          return `name${album_id}`;
     };

     const passwordId = (album_id) => {
          return `password${album_id}`;
     };

     const [newTitle, setNewTitle] = useState('');

     const onAlbumTitleChange = (event) => {
          setNewTitle(event.target.value);
     };

     const submitAlbumTitle = async (event, album_id) => {
          event.preventDefault();
          try {
               await albumNameChange(album_id, { newTitle });
               setNewTitle('');
          } catch (err) {
               console.error(err);
          }
     };

     return albumLength === 0 ? (
          <Fragment>No albums added</Fragment>
     ) : !albumLoading ? (
          albums.albums.map((album) => (
               <Fragment>
                    <Fragment key={album._id}>
                         <Card className='albumSettingsCard'>
                              <CardTitle>{album.title}</CardTitle>
                              <Row>
                                   <Col xs='4'>
                                        <Nav vertical>
                                             <NavItem>
                                                  <NavLink
                                                       className={classnames({
                                                            active:
                                                                 activeTab ===
                                                                 `name${album._id}`,
                                                       })}
                                                       onClick={() => {
                                                            toggle(
                                                                 `name${album._id}`
                                                            );
                                                       }}
                                                  >
                                                       Album Name
                                                  </NavLink>
                                             </NavItem>
                                             <NavItem>
                                                  <NavLink
                                                       className={classnames({
                                                            active:
                                                                 activeTab ===
                                                                 `password${album._id}`,
                                                       })}
                                                       onClick={() => {
                                                            toggle(
                                                                 `password${album._id}`
                                                            );
                                                       }}
                                                  >
                                                       Album Password
                                                  </NavLink>
                                             </NavItem>
                                             <NavItem>
                                                  <NavLink
                                                       className={classnames({
                                                            active:
                                                                 activeTab ===
                                                                 `delete${album._id}`,
                                                       })}
                                                       onClick={() => {
                                                            toggle(
                                                                 `delete${album._id}`
                                                            );
                                                       }}
                                                  >
                                                       Delete Album?
                                                  </NavLink>
                                             </NavItem>
                                        </Nav>
                                   </Col>
                                   <Col xs='8'>
                                        <TabContent activeTab={activeTab}>
                                             <TabPane tabId={nameId(album._id)}>
                                                  <Form
                                                       className='form'
                                                       onSubmit={(event) =>
                                                            submitAlbumTitle(
                                                                 event,
                                                                 album._id
                                                            )
                                                       }
                                                  >
                                                       <FormGroup>
                                                            <Label htmlFor='newTitle'>
                                                                 New album title
                                                            </Label>
                                                            <Input
                                                                 type='text'
                                                                 name='newTitle'
                                                                 value={
                                                                      newTitle
                                                                 }
                                                                 onChange={
                                                                      onAlbumTitleChange
                                                                 }
                                                            />
                                                       </FormGroup>
                                                       <SubmitButton />
                                                  </Form>
                                             </TabPane>
                                             <TabPane
                                                  tabId={passwordId(album._id)}
                                             >
                                                  <AlbumPassword
                                                       id={album._id}
                                                       passwordRequired={
                                                            album.passwordRequired
                                                       }
                                                  />
                                             </TabPane>
                                             <TabPane
                                                  tabId={deleteId(album._id)}
                                             >
                                                  <p>
                                                       Deleting this album will
                                                       permanently delete the
                                                       album and all posts
                                                       within this album. This
                                                       action cannot be undone -
                                                       click carefully!
                                                  </p>
                                                  <Button
                                                       id={album._id}
                                                       onClick={deleteClick}
                                                       className='mx-auto'
                                                  >
                                                       Delete
                                                  </Button>
                                             </TabPane>
                                        </TabContent>
                                   </Col>
                              </Row>
                         </Card>
                    </Fragment>
               </Fragment>
          ))
     ) : (
          <h1>Loading your albums</h1>
     );
};

AlbumSettings.propTypes = {
     getAllAlbums: PropTypes.func.isRequired,
     deleteAlbum: PropTypes.func.isRequired,
     albumNameChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
     auth: state.auth,
     albums: state.album,
});

export default connect(mapStateToProps, {
     getAllAlbums,
     deleteAlbum,
     albumNameChange,
})(AlbumSettings);
