import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
     Container,
     CarouselControl,
     CarouselItem,
     Carousel,
     Form,
     Button,
     FormGroup,
     Modal,
     ModalFooter,
     Row,
     ModalHeader,
} from 'reactstrap';
import MaterialIcon from 'material-icons-react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import AddPictureForm from '../components/Picture/AddPictureForm';
import AddPictureModal from '../components/Picture/AddPictureModal';
import AddPromptForm from '../components/Prompt/AddPromptForm';
import AddPromptModal from '../components/Prompt/AddPromptModal';
import ModalButton from '../components/Buttons/ModalButton';
import { getAlbum, albumAuth } from '../actions/albumActions';
import MixedPostPicture from '../components/Picture/MixedPostPicture';
import MixedPostPrompt from '../components/Prompt/MixedPostPrompt';
import PageTitle from '../components/Layout/PageTitle';
import CarouselPicture from '../components/Picture/CarouselPicture';
import CarouselPrompt from '../components/Prompt/CarouselPrompt';
import { deletePicture } from '../actions/pictureActions';
import { deletePrompt } from '../actions/promptActions';
import Loading from '../components/Layout/Loading';
import NoContent from '../components/Layout/NoContent';
import 'bootstrap/dist/css/bootstrap.min.css';

import AlertDiv from '../components/Layout/AlertDiv';
import { setAlert } from '../actions/alertActions';

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

     const next = () => {
          const nextIndex =
               activeIndex === album.album.length - 1 ? 0 : activeIndex + 1;
          setActiveIndex(nextIndex);
     };

     const previous = () => {
          const nextIndex =
               activeIndex === 0 ? album.album.length - 1 : activeIndex - 1;
          setActiveIndex(nextIndex);
     };

     const onClick = (event, data) => {
          setActiveIndex(data);
          setCurrentPost({
               id: event.target.getAttribute('data-id'),
               type: event.target.getAttribute('type'),
          });
          carouselToggle();
     };

     const closeBtn = (
          <button className='close' onClick={carouselToggle}>
               &times;
          </button>
     );

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
               {/* <Loading/> */}
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
                              <div className='buttonContainer'>
                                   <ModalButton
                                        className='photoButton modalButton'
                                        action={
                                             <MaterialIcon
                                                  icon='add_a_photo'
                                                  color='#252525'
                                                  size='medium'
                                             />
                                        }
                                        onClick={photoToggle}
                                   />
                                   <br />
                                   <br />
                                   <br />
                                   <ModalButton
                                        className='promptButton modalButton'
                                        action={
                                             <MaterialIcon
                                                  icon='create'
                                                  color='#252525'
                                                  size='medium'
                                             />
                                        }
                                        onClick={promptToggle}
                                   />
                              </div>
                         </Fragment>
                         {album.album.length > 0 ? (
                              <>
                                   <Row>
                                        {album.album.map((post, index) => (
                                             <Fragment key={post._id}>
                                                  {'image' in post ? (
                                                       <Fragment>
                                                            {picture.pictureLoading ? (
                                                                 <Loading />
                                                            ) : null}
                                                            <MixedPostPicture
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
                                                       <MixedPostPrompt
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
                                                       ></MixedPostPrompt>
                                                  )}
                                             </Fragment>
                                        ))}
                                   </Row>
                                   <Modal
                                        toggle={carouselToggle}
                                        isOpen={carouselModal}
                                        centered={true}
                                        size='lg'
                                        close={closeBtn}
                                   >
                                        <ModalHeader className='caroModal justify-content-md-end'>
                                             {closeBtn}
                                        </ModalHeader>
                                        <Carousel
                                             activeIndex={activeIndex}
                                             next={next}
                                             previous={previous}
                                             interval={false}
                                        >
                                             {album.album.map((post) => (
                                                  <CarouselItem key={post._id}>
                                                       {'image' in post ? (
                                                            <CarouselPicture
                                                                 image={
                                                                      post.image
                                                                 }
                                                                 caption={
                                                                      post.caption
                                                                 }
                                                                 dateRecorded={
                                                                      post.dateRecorded
                                                                 }
                                                                 uploadedBy={
                                                                      post.uploadedBy
                                                                 }
                                                                 dateUploaded={
                                                                      post.dateUploaded
                                                                 }
                                                            />
                                                       ) : (
                                                            <CarouselPrompt
                                                                 response={
                                                                      post.response
                                                                 }
                                                                 prompt={
                                                                      post.prompt
                                                                 }
                                                                 dateRecorded={
                                                                      post.dateRecorded
                                                                 }
                                                                 uploadedBy={
                                                                      post.uploadedBy
                                                                 }
                                                                 dateUploaded={
                                                                      post.dateUploaded
                                                                 }
                                                            />
                                                       )}

                                                       {isAuth ? (
                                                            <ModalFooter
                                                                 className='mixedPost-footer center'
                                                                 onClick={
                                                                      deleteClick
                                                                 }
                                                                 data-id={
                                                                      post._id
                                                                 }
                                                            >
                                                                 <div>
                                                                      {' '}
                                                                      Delete
                                                                      this post
                                                                 </div>
                                                            </ModalFooter>
                                                       ) : null}
                                                  </CarouselItem>
                                             ))}

                                             <CarouselControl
                                                  direction='prev'
                                                  directionText='Previous'
                                                  onClickHandler={previous}
                                             />
                                             <CarouselControl
                                                  direction='next'
                                                  directionText='Next'
                                                  onClickHandler={next}
                                             />
                                        </Carousel>
                                   </Modal>
                              </>
                         ) : (
                              <NoContent>
                                   No posts in this album yet! Use the buttons
                                   below to begin storing your memories
                              </NoContent>
                         )}
                    </>
               ) : (
                    // if you are not authorized, give option to submit a password
                    <Form className='form' onSubmit={onSubmit}>
                         <AlertDiv />
                         <FormGroup>
                              <label htmlFor='inputPassword'>
                                   Album Password
                              </label>
                              <input
                                   type='password'
                                   name='password'
                                   className='form-control'
                                   onChange={onChange}
                                   value={password}
                              />
                         </FormGroup>
                         <Button type='submit' value='albumAuth'>
                              Submit
                         </Button>
                    </Form>
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
     picture: PropTypes.func.isRequired,
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
