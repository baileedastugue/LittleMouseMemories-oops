import React from 'react';
import { Button } from 'reactstrap';

const ModalButton = (props) => {
     return (
          <Button
               className='btn-modal'
               {...props}
               onClick={props.onClick}
               action={props.action}
          >
               {props.action}
          </Button>
     );
};

export default ModalButton;
