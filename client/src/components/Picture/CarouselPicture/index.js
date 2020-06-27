import React from 'react';
import {
     Card,
     CardImg,
     CardText,
     CardTitle,
     CardSubtitle,
     CardBody,
} from 'reactstrap';
import './style.css';
import Moment from 'react-moment';

const CarouselPicture = (props) => {
     // console.log(props);
     return (
          <Card className='carouselPicture' style={Card.CarouselPicture}>
               <CardTitle>
                    <Moment format='MM/DD/YYYY' date={props.dateUploaded} />
               </CardTitle>
               <CardSubtitle>Uploaded by {props.uploadedBy}</CardSubtitle>
               <div className='memoryArea vertical-center'>
                    <CardImg src={props.image} alt={props.caption} />
               </div>
               <span id='caption'>Caption:</span>
               <CardBody>
                    <CardText>{props.caption}</CardText>
               </CardBody>
          </Card>
     );
};

export default CarouselPicture;
