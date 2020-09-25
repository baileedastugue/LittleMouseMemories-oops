import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { getAlbum, albumAuth } from '../actions/albumActions';
import { deletePrompt } from '../actions/promptActions';
import { deletePicture } from '../actions/pictureActions';
import { setAlert } from '../actions/alertActions';

import PageTitle from '../components/Layout/PageTitle';
import Loading from '../components/Layout/Loading';
import NoContent from '../components/Layout/NoContent';
import AlbumPasswordInput from '../components/Album/AlbumPasswordInput';
import ButtonContainer from '../components/Buttons/ButtonContainer';
import AlbumCarousel from '../components/Album/AlbumCarousel';

import AddPictureForm from '../components/Picture/AddPictureForm';
import AddPictureModal from '../components/Picture/AddPictureModal';
import AlbumPicture from '../components/Picture/AlbumPicture';

import AddPromptForm from '../components/Prompt/AddPromptForm';
import AddPromptModal from '../components/Prompt/AddPromptModal';
import AlbumPrompt from '../components/Prompt/AlbumPrompt';
import CenteredContent from '../components/Layout/CenteredContent';

const Album = ({
     getAlbum,
     album,
     deletePicture,
     deletePrompt,
     albumLoading,
     isAuth,
     albumAuth,
     picture,
}) => {
     let pathArray = window.location.pathname.split('/');
     let albumId = pathArray[pathArray.length - 1];

     useEffect(() => {
          getAlbum(albumId);
     }, [albumId, getAlbum]);

     const [promptModal, setPromptModal] = useState(false);
     const [photoModal, setPhotoModal] = useState(false);
     const [carouselModal, setCarouselModal] = useState(false);

     const photoToggle = () => {
          setPhotoModal(!photoModal);
     };

     const promptToggle = () => {
          setPromptModal(!promptModal);
     };

     const carouselToggle = () => {
          setCarouselModal(!carouselModal);
     };

     const [activeIndex, setActiveIndex] = useState(0);
     const [currentPost, setCurrentPost] = useState({
          id: 0,
          type: '',
     });

     const onClick = (event, data) => {
          setActiveIndex(data);
          setCurrentPost({
               id: event.target.getAttribute('data-id'),
               type: event.target.getAttribute('type'),
          });
          carouselToggle();
     };

     const deleteClick = async (event) => {
          event.preventDefault();
          currentPost.type === 'picture'
               ? deletePicture(currentPost.id, albumId)
               : deletePrompt(currentPost.id, albumId);
          carouselToggle();
     };

     const [password, setPassword] = useState('');
     const onChange = (event) => {
          setPassword(event.target.value);
     };

     const onSubmit = async (event) => {
          event.preventDefault();
          try {
               albumAuth({ albumId, password });
          } catch (err) {
               console.log(err);
          }
     };

     const pageNotFound = () => {
          setAlert('That album cannot be found', 'danger');
          return <Redirect to='/pagenotfound' />;
     };

     // has the album loaded yet
     return albumLoading ? (
          <>
               <PageTitle>Loading your memories</PageTitle>
               <Loading />
          </>
     ) : // if the album has loaded, is it found in the DB
     album.validAlbum ? (
          <Fragment>
               {/* if the album is found, load the title */}
               <Container fluid={true}>
                    <PageTitle>
                         {album.albums[0].title} by{' '}
                         {album.albums[0].user.firstName}{' '}
                         {album.albums[0].user.lastName}
                    </PageTitle>
               </Container>
               {/* if the album is found, are you the album owner or have you entered the password IF required*/}
               {isAuth ||
               !album.albums[0].passwordRequired ||
               album.authorized ? (
                    // load the buttons to add to album if authorized
                    <>
                         <Fragment>
                              <AddPictureModal
                                   toggle={photoToggle}
                                   isOpen={photoModal}
                              >
                                   <AddPictureForm toggle={photoToggle} />
                              </AddPictureModal>
                              <AddPromptModal
                                   toggle={promptToggle}
                                   isOpen={promptModal}
                              >
                                   <AddPromptForm toggle={promptToggle} />
                              </AddPromptModal>
                              <ButtonContainer
                                   photoToggle={photoToggle}
                                   promptToggle={promptToggle}
                              />
                         </Fragment>
                         {album.album.length > 0 ? (
                              <CenteredContent>
                                   <Row className='stretch-squares'>
                                        {album.album.map((post, index) => (
                                             <Fragment key={post._id}>
                                                  {'image' in post ? (
                                                       <Fragment>
                                                            {picture.pictureLoading ? (
                                                                 <Loading />
                                                            ) : null}
                                                            <AlbumPicture
                                                                 type='picture'
                                                                 key={post._id}
                                                                 id={post._id}
                                                                 uploadedBy={
                                                                      post.uploadedBy
                                                                 }
                                                                 image={
                                                                      post.image
                                                                 }
                                                                 caption={
                                                                      post.caption
                                                                 }
                                                                 dateRecorded={
                                                                      post.dateRecorded
                                                                 }
                                                                 dateUploaded={
                                                                      post.dateUploaded
                                                                 }
                                                                 onClick={(
                                                                      event
                                                                 ) => {
                                                                      onClick(
                                                                           event,
                                                                           index
                                                                      );
                                                                 }}
                                                                 index={index}
                                                            />
                                                       </Fragment>
                                                  ) : (
                                                       <AlbumPrompt
                                                            type='prompt'
                                                            key={post._id}
                                                            id={post._id}
                                                            isAuth={isAuth}
                                                            prompt={post.prompt}
                                                            response={
                                                                 post.response
                                                            }
                                                            dateRecorded={
                                                                 post.dateRecorded
                                                            }
                                                            dateUploaded={
                                                                 post.dateUploaded
                                                            }
                                                            uploadedBy={
                                                                 post.uploadedBy
                                                            }
                                                            onClick={(
                                                                 event
                                                            ) => {
                                                                 onClick(
                                                                      event,
                                                                      index
                                                                 );
                                                            }}
                                                            index={index}
                                                       ></AlbumPrompt>
                                                  )}
                                             </Fragment>
                                        ))}
                                   </Row>
                                   <AlbumCarousel
                                        carouselToggle={carouselToggle}
                                        carouselModal={carouselModal}
                                        activeIndex={activeIndex}
                                        album={album.album}
                                        deleteClick={deleteClick}
                                        setActiveIndex={setActiveIndex}
                                        isAuth={isAuth}
                                   />
                              </CenteredContent>
                         ) : (
                              <NoContent>
                                   No posts in this album yet! Use the buttons
                                   below to begin storing your memories
                              </NoContent>
                         )}
                    </>
               ) : (
                    // if you are not authorized, give option to submit a password
                    <AlbumPasswordInput
                         onSubmit={onSubmit}
                         onChange={onChange}
                         value={password}
                    />
               )}
          </Fragment>
     ) : (
          pageNotFound
     );
};

Album.propTypes = {
     isAuth: PropTypes.bool,
     albumLoading: PropTypes.bool.isRequired,
     auth: PropTypes.object.isRequired,
     album: PropTypes.object.isRequired,
     getAlbum: PropTypes.func.isRequired,
     deletePicture: PropTypes.func.isRequired,
     deletePrompt: PropTypes.func.isRequired,
     albumAuth: PropTypes.func.isRequired,
     picture: PropTypes.object.isRequired,
};

Container.propTypes = {
     fluid: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

const mapStateToProps = (state) => ({
     isAuth: state.auth.isAuthenticated,
     albumLoading: state.album.isLoading,
     auth: state.auth,
     album: state.album,
     picture: state.picture,
});

export default connect(mapStateToProps, {
     getAlbum,
     deletePicture,
     deletePrompt,
     albumAuth,
})(Album);
