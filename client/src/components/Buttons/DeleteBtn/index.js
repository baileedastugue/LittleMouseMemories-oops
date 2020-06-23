import React from 'react';
import './style.css';
// import { Button } from 'reactstrap';

const DeleteBtn = (props) => {
     return (
          <div
               className='deleteButton'
               data-id={props.id}
               // id={props.id}
               onClick={props.deleteClick}
          >
               &times;
          </div>
     );
};

export default DeleteBtn;
