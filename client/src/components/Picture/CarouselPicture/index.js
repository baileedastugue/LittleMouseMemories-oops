import React from 'react';
import {
     Card,
     CardImg,
     CardText,
     CardTitle,
     CardSubtitle,
     CardBody,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './style.css';

const CarouselPicture = (props) => {
     return (
          <Card className='carouselPicture' style={Card.CarouselPicture}>
               <CardTitle>{props.dateUploaded}</CardTitle>
               <CardSubtitle>Uploaded by {props.uploadedBy}</CardSubtitle>
               <div className='memoryArea'>
                    <CardImg src={props.image} alt={props.caption} />
               </div>
               <CardBody>
                    <CardText>
                         {props.caption}
                         <br />
                    </CardText>
               </CardBody>
          </Card>
     );
};

CarouselPicture.propTypes = {
     isAuth: PropTypes.bool,
};

const mapStateToProps = (state) => ({
     isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(CarouselPicture);
