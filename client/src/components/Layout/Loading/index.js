import React from 'react';
import { Spinner } from 'reactstrap';

function Loading() {
     return (
          <div className='spinnerOverlay'>
               <Spinner />
          </div>
     );
}

export default Loading;
