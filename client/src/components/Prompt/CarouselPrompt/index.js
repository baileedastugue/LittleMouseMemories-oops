import React from 'react';
import { Card, CardTitle, CardSubtitle } from 'reactstrap';
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
               <div className='center'>
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
               </div>
               <p className='carousel-card--recordedDate'>
                    Memory uploaded on{' '}
                    <Moment format='MM/DD/YYYY' date={props.dateUploaded} />
               </p>
          </Card>
     );
};

export default CarouselPrompt;
