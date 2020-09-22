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
          <Card
               className='carousel-card carousel-picture'
               style={Card.CarouselPicture}
          >
               <CardTitle className='carousel-card--title'>
                    <Moment format='MM/DD/YYYY' date={props.dateRecorded} />
               </CardTitle>
               <CardSubtitle className='carousel-card--subtitle'>
                    Uploaded by {props.uploadedBy}
               </CardSubtitle>
               <div className='carousel-picture--imgContainer center'>
                    <CardImg
                         src={props.image}
                         alt={props.caption}
                         className='carousel-picture--image'
                    />
               </div>
               <span className='carousel-picture--label'>Caption:</span>
               <CardBody className='carousel-picture--captionContainer'>
                    <CardText className='carousel-picture--caption'>
                         {props.caption}
                    </CardText>
               </CardBody>
               <p className='carousel-card--recordedDate'>
                    Memory uploaded on{' '}
                    <Moment format='MM/DD/YYYY' date={props.dateUploaded} />
               </p>
          </Card>
     );
};

export default CarouselPicture;
