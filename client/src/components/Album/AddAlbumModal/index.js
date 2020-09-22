import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import CloseBtn from '../../Buttons/CloseBtn';

const AddAlbumModal = (props) => {
     return (
          <div>
               <Modal isOpen={props.isOpen} className='addModal'>
                    <ModalHeader close={CloseBtn}>Add a New Album</ModalHeader>
                    <ModalBody>{props.children}</ModalBody>
               </Modal>
          </div>
     );
};

export default AddAlbumModal;
