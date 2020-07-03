import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const AddPromptModal = (props) => {
     const closeBtn = (
          <button className='close' onClick={props.toggle}>
               &times;
          </button>
     );

     return (
          <div>
               <Modal isOpen={props.isOpen} className='addModal'>
                    <ModalHeader close={closeBtn}>
                         Add a New Memory Post
                    </ModalHeader>
                    <ModalBody>{props.children}</ModalBody>
               </Modal>
          </div>
     );
};

export default AddPromptModal;
