import React from 'react';
import { Container } from 'reactstrap';

const CenteredContent = (props) => {
     return (
          <Container fluid={true} className='center'>
               {props.children}
          </Container>
     );
};

export default CenteredContent;
