import React from 'react';

const CloseBtn = (props) => {
     return (
          <button className='btn-close' {...props}>
               &times;
          </button>
     );
};

export default CloseBtn;
