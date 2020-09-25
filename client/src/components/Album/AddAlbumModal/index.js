import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import CloseBtn from '../../Buttons/CloseBtn';

const AddAlbumModal = (props) => {
     const closeBtn = <CloseBtn onClick={props.toggle} />;

     return (
          <div>
               <Modal isOpen={props.isOpen}>
                    <ModalHeader close={closeBtn}>Add a New Album</ModalHeader>
                    <ModalBody>{props.children}</ModalBody>
               </Modal>
          </div>
     );
};

export default AddAlbumModal;
