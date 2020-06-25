import React from 'react';
import { Button } from 'reactstrap';

const SubmitButton = (props) => {
     return (
          <Button {...props} color='dark' style={{ marginBottom: '2rem' }}>
               Submit
          </Button>
     );
};

export default SubmitButton;
