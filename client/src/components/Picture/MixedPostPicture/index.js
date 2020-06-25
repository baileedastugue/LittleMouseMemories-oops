import React, { Fragment } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import './style.css';
import Moment from 'react-moment';

const MixedPostPicture = (props) => {
     return (
          <Card onClick={props.onClick} index={props.index}>
               <CardImg
                    src={props.image}
                    alt={props.caption}
                    className='image'
               />
               <CardBody className='overlay'>
                    {/* <CardTitle> */}
                    <div className='text'>
                         Uploaded{' '}
                         {props.uploadedBy ? (
                              <Fragment>by {props.uploadedBy} </Fragment>
                         ) : null}
                         on{' '}
                         <Moment
                              format='MM/DD/YYYY'
                              date={props.dateUploaded}
                         />
                    </div>
                    {/* </CardTitle> */}
                    {/* <CardText>{props.caption}</CardText> */}
               </CardBody>
          </Card>
     );
};

export default MixedPostPicture;
