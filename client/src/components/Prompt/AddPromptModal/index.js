import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import closeBtn from '../../Buttons/CloseBtn';

const AddPromptModal = (props) => {
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
