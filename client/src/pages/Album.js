import React, { Fragment, useState } from 'react';
import PictureCard from '../components/Posts/PictureCard';
import AddPictureForm from '../components/Posts/AddPictureForm';
import PromptCard from '../components/Posts/PromptCard';
import AddPromptForm from '../components/Posts/AddPromptForm';
import { Container } from 'reactstrap';
import AddPictureModal from '../components/Posts/AddPictureModal';
import AddPromptModal from '../components/Posts/AddPromptModal';
import ModalButton from '../components/Buttons/ModalButton';

import MaterialIcon, { colorPalette } from 'material-icons-react';

const Album = (props) => {
     const photoIcon = (
          <MaterialIcon icon='add_a_photo' color='#ffffff' size='medium' />
     );

     const promptIcon = (
          <MaterialIcon icon='create' color='#ffffff' size='medium' />
     );

     const [photoModal, setPhotoModal] = useState(false);

     const photoToggle = () => {
          // console.log(modal);
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

               <Container fluid='md' className='buttonContainer'>
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

export default Album;
