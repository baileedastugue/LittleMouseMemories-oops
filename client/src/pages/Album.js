import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import MaterialIcon from 'material-icons-react';
import PropTypes from 'prop-types';

import PictureCard from '../components/Posts/PictureCard';
import AddPictureForm from '../components/Posts/AddPictureForm';
import AddPictureModal from '../components/Posts/AddPictureModal';
import PromptCard from '../components/Posts/PromptCard';
import AddPromptForm from '../components/Posts/AddPromptForm';
import AddPromptModal from '../components/Posts/AddPromptModal';
import ModalButton from '../components/Buttons/ModalButton';
import { getAlbum } from '../actions/albumActions';

const Album = (props) => {
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
          // console.log(modal);
          setPromptModal(!promptModal);
     };

     // only view posts --> hide PictureCards
     // only view picture --> hide PostsCards
     // view all memories --> view both in chronological order

     return (
          <Fragment>
               <PictureCard />
               <PromptCard />
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
};

const mapStateToProps = (state) => ({
     isAuth: state.auth.isAuthenticated,
     auth: state.auth,
     album: state.album,
});

export default connect(mapStateToProps, { getAlbum })(Album);
