import React from 'react';
import { Card, CardText, CardTitle, CardSubtitle, CardBody } from 'reactstrap';
import Moment from 'react-moment';

const CarouselPrompt = (props) => {
     return (
          <Card className='carouselPrompt' style={Card.CarouselPicture}>
               <CardTitle>
                    <Moment format='MM/DD/YYYY' date={props.dateRecorded} />
               </CardTitle>
               <CardSubtitle>Uploaded by {props.uploadedBy}</CardSubtitle>
               <div className='center'>
                    <div className='memoryArea'>
                         <span className='memoryText'>
                              <span className='prompt'>{props.prompt}</span>
                              <br />
                              <span className='response'>{props.response}</span>
                         </span>
                    </div>
                    <CardBody>
                         <CardText>
                              Memory uploaded on{' '}
                              <Moment
                                   format='MM/DD/YYYY'
                                   date={props.dateUploaded}
                              />
                         </CardText>
                    </CardBody>
               </div>
          </Card>
     );
};

export default CarouselPrompt;
