import React from 'react';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';
import './style.css';

const NoContent = (props) => {
     return (
          <Container fluid={true}>
               <div id='noContent'>{props.children}</div>
          </Container>
     );
};

Container.propTypes = {
     fluid: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default NoContent;
