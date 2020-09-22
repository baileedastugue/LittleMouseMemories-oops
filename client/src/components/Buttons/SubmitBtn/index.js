import React from 'react';
import { Button } from 'reactstrap';

const SubmitButton = (props) => {
     return <Button className='btn-submit'>{props.children}</Button>;
};

export default SubmitButton;
