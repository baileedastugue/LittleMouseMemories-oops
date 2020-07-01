import React from 'react';
import './style.css';

const DeleteBtn = (props) => {
     return (
          <span
               className='deleteButton'
               data-id={props.id}
               onClick={props.deleteClick}
          >
               Delete this memory
          </span>
     );
};

export default DeleteBtn;
