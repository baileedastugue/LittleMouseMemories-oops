import React from 'react';
import { Button } from 'reactstrap';

const AuthBtn = (props) => {
     // Button for auth forms submission
     return <Button className='btn btn-auth'>{props.children}</Button>;
};

export default AuthBtn;
