import React, { Fragment } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import './style.css';
import Moment from 'react-moment';

const MixedPostPicture = (props) => {
     return (
          <Card>
               <CardImg src={props.image} alt={props.caption} />
               {/* <CardBody>
                    <CardTitle>
                         Uploaded{' '}
                         {props.uploadedBy ? (
                              <Fragment>by {props.uploadedBy} </Fragment>
                         ) : null}
                         on{' '}
                         <Moment
                              format='MM/DD/YYYY'
                              date={props.dateUploaded}
                         />
                    </CardTitle>
                    <CardText>{props.caption}</CardText>
               </CardBody> */}
          </Card>
     );
};

export default MixedPostPicture;
