import React from 'react';
import OpenCloseForm from '../OpenCloseForm';

const AboutSection = () => {
     return (
          <div className='about'>
               <div className='about-background'></div>
               <div className='about-info'>
                    <div>
                         <h2 className='about-info--primary'>
                              Memories worth sharing,
                         </h2>

                         <h2 className='about-info--primary'>
                              privacy worth keeping
                         </h2>
                    </div>
                    <div className='about-info--secondary'>
                         Post photos and write your own memories,
                         <br />
                         easily collaborate with friends and family,
                         <br />
                         and protect your albums with a password
                         <br />
                    </div>
                    <OpenCloseForm />
               </div>
          </div>
     );
};

export default AboutSection;
