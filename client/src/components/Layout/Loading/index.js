import React from 'react';
import { Spinner } from 'reactstrap';
import './style.css'

function Loading() {
     return (<div className='spinnerOverlay'>
          <Spinner/>
     </div>)
}

export default Loading;
