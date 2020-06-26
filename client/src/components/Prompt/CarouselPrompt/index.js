import React from 'react';
import { Card, CardText, CardTitle, CardSubtitle, CardBody } from 'reactstrap';

import './style.css';

const CarouselPrompt = (props) => {
     return (
          <Card className='carouselPrompt' style={Card.CarouselPicture}>
               <CardTitle>{props.dateUploaded}</CardTitle>
               <CardSubtitle>Uploaded by {props.uploadedBy}</CardSubtitle>
               <div className='vertical-center'>
                    {props.prompt}
                    <br />
                    {props.response}
               </div>
               <CardBody>
                    <CardText>{props.dateRecorded}</CardText>
               </CardBody>
          </Card>
     );
};

export default CarouselPrompt;
