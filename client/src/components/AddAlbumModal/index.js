import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const AddAlbumModal = (props) => {
     const closeBtn = (
          <button className='close' onClick={props.toggle}>
               &times;
          </button>
     );

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
