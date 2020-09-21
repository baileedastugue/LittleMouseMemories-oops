import React from 'react';
import {
     Card,
     CardImg,
     CardText,
     CardTitle,
     CardSubtitle,
     CardBody,
} from 'reactstrap';
import Moment from 'react-moment';

const CarouselPicture = (props) => {
     return (
          <Card className='carouselPicture' style={Card.CarouselPicture}>
               <CardTitle>
                    <Moment format='MM/DD/YYYY' date={props.dateRecorded} />
               </CardTitle>
               <CardSubtitle>Uploaded by {props.uploadedBy}</CardSubtitle>
               <div className='memoryArea vertical-center'>
                    <CardImg src={props.image} alt={props.caption} />
               </div>
               <span id='caption'>Caption:</span>
               <CardBody>
                    <CardText>{props.caption}</CardText>
               </CardBody>
               <p className='recordedDate'>
                    Memory uploaded on{' '}
                    <Moment format='MM/DD/YYYY' date={props.dateUploaded} />
               </p>
          </Card>
     );
};

export default CarouselPicture;
