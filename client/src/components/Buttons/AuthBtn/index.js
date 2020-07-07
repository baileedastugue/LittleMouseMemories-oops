import React from 'react';
import { Button } from 'reactstrap';

const AuthBtn = (props) => {
     return <Button className='auth-btn'>{props.children}</Button>;
};

export default AuthBtn;
