import React from 'react';
import { Button } from 'reactstrap';

const SubmitButton = (props) => {
     return <Button className='submit-btn'>{props.children}</Button>;
};

export default SubmitButton;
