import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
     Container,
     CarouselControl,
     CarouselItem,
     Carousel,
     // Card,
     // CardBody,
     Modal,
     ModalHeader,
     Row,
     // ModalFooter,
} from 'reactstrap';
import MaterialIcon from 'material-icons-react';
import PropTypes from 'prop-types';

import Wrapper from '../components/Layout/Wrapper';
import AddPictureForm from '../components/Picture/AddPictureForm';
import AddPictureModal from '../components/Picture/AddPictureModal';
import AddPromptForm from '../components/Prompt/AddPromptForm';
import AddPromptModal from '../components/Prompt/AddPromptModal';
import ModalButton from '../components/Buttons/ModalButton';
import { getAlbum } from '../actions/albumActions';
import MixedPostPicture from '../components/Picture/MixedPostPicture';
import MixedPostPrompt from '../components/Prompt/MixedPostPrompt';
import PageTitle from '../components/Layout/PageTitle';
import CarouselPicture from '../components/Picture/CarouselPicture';
import CarouselPrompt from '../components/Prompt/CarouselPrompt';
import DeleteBtn from '../components/Buttons/DeleteBtn';
import { deletePicture } from '../actions/pictureActions';
import { deletePrompt } from '../actions/promptActions';
import 'bootstrap/dist/css/bootstrap.min.css';

const Album = ({ getAlbum, album, deletePicture, albumLoading, isAuth }) => {
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
          console.log(currentPost);
          carouselToggle();
     };
     const externalCloseBtn = (
          <button
               className='close'
               style={{ position: 'absolute', top: '3.5vw', right: '28vw' }}
               onClick={carouselToggle}
          >
               &times;
          </button>
     );
     const deleteClick = async (event) => {
          event.preventDefault();
          console.log(currentPost.type);
          currentPost.type === 'picture'
               ? deletePicture(currentPost.id, albumId)
               : deletePrompt(currentPost.id, albumId);
          carouselToggle();
     };

     // only view posts --> hide PictureCards
     // only view picture --> hide PostsCards
     // view all memories --> view both in chronological order
     return albumLoading ? (
          <h1>Welcome</h1>
     ) : (
          <Fragment>
               <Container>
                    <PageTitle>
                         {album.albums[0].title} by{' '}
                         {album.albums[0].user.firstName}{' '}
                         {album.albums[0].user.lastName}
                    </PageTitle>
               </Container>
               {/* <hr /> */}
               <Wrapper>
                    <Row>
                         {album.album.map((post, index) => (
                              <Fragment key={post._id}>
                                   {'image' in post ? (
                                        <Fragment>
                                             <MixedPostPicture
                                                  type='picture'
                                                  key={post._id}
                                                  id={post._id}
                                                  uploadedBy={post.uploadedBy}
                                                  image={post.image}
                                                  caption={post.caption}
                                                  dateRecorded={
                                                       post.dateRecorded
                                                  }
                                                  dateUploaded={
                                                       post.dateUploaded
                                                  }
                                                  onClick={(event) => {
                                                       onClick(event, index);
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
                                             response={post.response}
                                             dateRecorded={post.dateRecorded}
                                             dateUploaded={post.dateUploaded}
                                             uploadedBy={post.uploadedBy}
                                             onClick={(event) => {
                                                  onClick(event, index);
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
                         external={externalCloseBtn}
                    >
                         {isAuth ? (
                              <ModalHeader>
                                   {' '}
                                   <DeleteBtn
                                        // data-id={}
                                        deleteClick={deleteClick}
                                   />
                              </ModalHeader>
                         ) : null}
                         <Carousel
                              activeIndex={activeIndex}
                              next={next}
                              previous={previous}
                         >
                              {album.album.map((post) => (
                                   <CarouselItem key={post._id}>
                                        {'image' in post ? (
                                             <CarouselPicture
                                                  image={post.image}
                                                  caption={post.caption}
                                                  dateRecorded={
                                                       post.dateRecorded
                                                  }
                                                  uploadedBy={post.uploadedBy}
                                                  dateUploaded={
                                                       post.dateUploaded
                                                  }
                                             />
                                        ) : (
                                             <CarouselPrompt
                                                  response={post.response}
                                                  prompt={post.prompt}
                                                  dateRecorded={
                                                       post.dateRecorded
                                                  }
                                                  dateUploaded={
                                                       post.dateUploaded
                                                  }
                                             />
                                        )}
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
               </Wrapper>
               {/* Buttons */}
               <Container className='buttonContainer'>
                    <ModalButton
                         className='photoButton modalButton'
                         action={
                              <MaterialIcon
                                   icon='add_a_photo'
                                   color='#ffffff'
                                   size='medium'
                              />
                         }
                         onClick={photoToggle}
                    />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />

                    <ModalButton
                         className='promptButton modalButton'
                         action={
                              <MaterialIcon
                                   icon='create'
                                   color='#ffffff'
                                   size='medium'
                              />
                         }
                         onClick={promptToggle}
                    />
               </Container>
               {/* Modals */}
               <AddPictureModal toggle={photoToggle} isOpen={photoModal}>
                    <AddPictureForm toggle={photoToggle} />
               </AddPictureModal>
               <AddPromptModal toggle={promptToggle} isOpen={promptModal}>
                    <AddPromptForm toggle={promptToggle} />
               </AddPromptModal>
          </Fragment>
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
};

const mapStateToProps = (state) => ({
     isAuth: state.auth.isAuthenticated,
     albumLoading: state.album.isLoading,
     auth: state.auth,
     album: state.album,
});

export default connect(mapStateToProps, {
     getAlbum,
     deletePicture,
     deletePrompt,
})(Album);
