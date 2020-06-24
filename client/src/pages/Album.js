import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import MaterialIcon from 'material-icons-react';
import PropTypes from 'prop-types';

// import PictureCard from '../components/Posts/PictureCard';
import AddPictureForm from '../components/Posts/AddPictureForm';
import AddPictureModal from '../components/Posts/AddPictureModal';
// import PromptCard from '../components/Posts/PromptCard';
import AddPromptForm from '../components/Posts/AddPromptForm';
import AddPromptModal from '../components/Posts/AddPromptModal';
import ModalButton from '../components/Buttons/ModalButton';
import { getAlbum } from '../actions/albumActions';
import Moment from 'react-moment';
// import SimpleReactLightbox from 'simple-react-lightbox';

const Album = (props) => {
     let pathArray = window.location.pathname.split('/');
     let albumId = pathArray[pathArray.length - 1];

     useEffect(() => {
          props.getAlbum(albumId);
     }, []);

     const albumContents = props.album.album[0];
     let posts = [];
     let albumDoneLoading = !props.album.isLoading;

     albumDoneLoading
          ? albumContents.pictures.map((picture) => posts.push(picture)) &&
            albumContents.prompts.map((prompt) => posts.push(prompt))
          : console.log('waiting');

     posts.sort((a, b) => (a.dateUploaded > b.dateUploaded ? 1 : -1));

     const photoIcon = (
          <MaterialIcon icon='add_a_photo' color='#ffffff' size='medium' />
     );

     const promptIcon = (
          <MaterialIcon icon='create' color='#ffffff' size='medium' />
     );

     const [photoModal, setPhotoModal] = useState(false);

     const photoToggle = () => {
          setPhotoModal(!photoModal);
     };

     const [promptModal, setPromptModal] = useState(false);

     const promptToggle = () => {
          setPromptModal(!promptModal);
     };

     // only view posts --> hide PictureCards
     // only view picture --> hide PostsCards
     // view all memories --> view both in chronological order
     console.log(albumContents);
     return (
          <Fragment>
               {albumDoneLoading ? (
                    <h1>
                         {albumContents.title} by {albumContents.user.firstName}{' '}
                         {albumContents.user.lastName}
                    </h1>
               ) : (
                    <h1>Memory album</h1>
               )}

               {albumDoneLoading ? (
                    posts.map((post) => (
                         <div key={post._id}>
                              {'image' in post ? (
                                   <Fragment>
                                        <img
                                             src={post.image}
                                             alt={post.caption}
                                        />
                                        <p>
                                             {post.caption}
                                             <br />
                                             Uploaded by: {post.uploadedBy}
                                        </p>
                                        {/* <p>
                                             Memory from :{' '}
                                             <Moment
                                                  format='MM/DD/YYYY'
                                                  date={prompt.dateRecorded}
                                             ></Moment>
                                        </p> */}
                                        <p>
                                             Posted on:{' '}
                                             <Moment
                                                  format='MM/DD/YYYY'
                                                  date={post.dateUploaded}
                                             ></Moment>
                                        </p>
                                   </Fragment>
                              ) : (
                                   <Fragment>
                                        <p>
                                             Prompt: {post.prompt}
                                             <br />
                                             Response: {post.response}
                                        </p>
                                        <p>
                                             Posted on:{' '}
                                             <Moment
                                                  format='MM/DD/YYYY'
                                                  date={post.dateUploaded}
                                             ></Moment>
                                        </p>
                                   </Fragment>
                              )}
                         </div>
                    ))
               ) : (
                    <h1>Loading</h1>
               )}

               {/* <SimpleReactLightbox autoplaySpeed='0'> */}
               {/* <PictureCard /> */}
               {/* </SimpleReactLightbox> */}
               {/* <PromptCard /> */}

               {/* Buttons */}
               <Container className='buttonContainer'>
                    <ModalButton
                         className='photoButton modalButton'
                         action={photoIcon}
                         onClick={photoToggle}
                    />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />

                    <ModalButton
                         className='promptButton modalButton'
                         action={promptIcon}
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
     auth: PropTypes.object.isRequired,
     album: PropTypes.object.isRequired,
     getAlbum: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
     isAuth: state.auth.isAuthenticated,
     auth: state.auth,
     album: state.album,
});

export default connect(mapStateToProps, { getAlbum })(Album);
