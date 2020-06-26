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

const CarouselPicture = (props) => {
     console.log(props);

     return (
          <Card className='carouselPicture' style={Card.CarouselPicture}>
               <CardTitle>{props.dateUploaded}</CardTitle>
               <CardSubtitle>Uploaded by {props.uploadedBy}</CardSubtitle>
               <div className='memoryArea'>
                    <CardImg src={props.image} alt={props.caption} />
               </div>
               <CardBody>
                    <CardText>{props.caption}</CardText>
               </CardBody>
          </Card>
     );
};

export default CarouselPicture;
