import React from 'react';
import { Button } from 'reactstrap';
import './style.css';

const ModalButton = (props) => {
     return (
          <Button
               className='modalButton'
               {...props}
               onClick={props.onClick}
               action={props.action}
          >
               {props.action}
          </Button>
     );
};

export default ModalButton;
