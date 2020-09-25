import React from 'react';
import { Card, CardTitle, CardSubtitle } from 'reactstrap';
import CenteredContent from '../../Layout/CenteredContent';
import Moment from 'react-moment';

const CarouselPrompt = (props) => {
     return (
          <Card
               className='carousel-card carousel-prompt'
               style={Card.CarouselPicture}
          >
               <CardTitle className='carousel-card--title'>
                    <Moment format='MM/DD/YYYY' date={props.dateRecorded} />
               </CardTitle>
               <CardSubtitle className='carousel-card--subtitle'>
                    Uploaded by {props.uploadedBy}
               </CardSubtitle>
               <CenteredContent>
                    <div className='carousel-prompt--background'>
                         <span className='carousel-prompt--promptContainer'>
                              <span className='carousel-prompt--prompt'>
                                   {props.prompt}
                              </span>
                              <br />
                              <span className='carousel-prompt--response'>
                                   {props.response}
                              </span>
                         </span>
                    </div>
               </CenteredContent>
               <p className='carousel-card--recordedDate'>
                    Memory uploaded on{' '}
                    <Moment format='MM/DD/YYYY' date={props.dateUploaded} />
               </p>
          </Card>
     );
};

export default CarouselPrompt;
