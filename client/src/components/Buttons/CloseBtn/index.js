import React from 'react';

const CloseBtn = (props) => {
     return (
          <button className='btn-close btn' onClick={props.toggle}>
               &times;
          </button>
     );
};

export default CloseBtn;
