import React from 'react';
import { Container, Row } from 'reactstrap';
import OpenCloseForm from '../OpenCloseForm';

const AboutSection = () => {
     return (
          <>
               <Container fluid={true} className='about'>
                    <div className='about-background'></div>
                    <Container fluid={true} className='about-info'>
                         <Row>
                              <h2 className='about-info--primary'>
                                   Memories worth sharing,
                              </h2>
                         </Row>
                         <Row>
                              <h2 className='about-info--primary'>
                                   privacy worth keeping
                              </h2>
                         </Row>
                         <Row className='about-info--secondary'>
                              <p>
                                   Post photos and write your own memories,
                                   easily collaborate with friends and family,
                                   and protect your albums with a password
                              </p>
                         </Row>
                    </Container>
               </Container>
               <OpenCloseForm />
          </>
     );
};

export default AboutSection;
