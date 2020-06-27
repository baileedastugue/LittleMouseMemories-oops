import React from 'react';
import './style.css';

const PageTitle = (props) => {
     return <h1 className='pageTitle'>{props.children}</h1>;
};

export default PageTitle;
