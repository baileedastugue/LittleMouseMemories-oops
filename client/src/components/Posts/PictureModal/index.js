import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const PictureModal = (props) => {
     return (
          <div>
               <Modal isOpen={props.modal} toggle={props.toggle}>
                    <ModalHeader toggle={props.toggle} charCode='X'>
                         Modal Header
                    </ModalHeader>
                    <ModalBody>{props.image}</ModalBody>
                    <ModalFooter>
                         <Button color='primary' onClick={props.toggle}>
                              Close
                         </Button>
                    </ModalFooter>
               </Modal>
          </div>
     );
};

export default PictureModal;
