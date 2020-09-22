import React from 'react';

const DeleteMemoryBtn = (props) => {
     return (
          <span
               className='btn-delete--memory btn'
               data-id={props.id}
               onClick={props.deleteClick}
          >
               Delete this memory
          </span>
     );
};

export default DeleteMemoryBtn;
