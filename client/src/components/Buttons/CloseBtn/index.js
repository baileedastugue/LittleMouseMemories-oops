import React from 'react';

const CloseBtn = (props) => {
     return (
          <button className='btn-close' onClick={props.toggle}>
               &times;
          </button>
     );
};

export default CloseBtn;
