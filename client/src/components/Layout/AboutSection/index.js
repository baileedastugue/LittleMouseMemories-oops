import React from 'react';
import { Container } from 'reactstrap';
import OpenCloseForm from '../OpenCloseForm';

const AboutSection = () => {
     return (
          <Container className='about'>
               <div className='about-background--square'></div>
               <div className='about-background--triangle'></div>
               <div className='about-info'>
                    <div className='about-info--primary'>
                         <h1>Memories worth sharing</h1>
                         <h1>Privacy worth keeping</h1>
                    </div>
                    <div className='about-info--secondary'>
                         Post photos and write your own memories,
                         <br />
                         easily collaborate with friends and family,
                         <br />
                         and protect your albums with a password
                         <br />
                    </div>
               </div>

               <OpenCloseForm />
          </Container>
     );
};

export default AboutSection;
