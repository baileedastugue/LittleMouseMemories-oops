import React, { Fragment } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import './style.css';
import Moment from 'react-moment';

const MixedPostPicture = (props) => {
     return (
          <Card
               onClick={props.onClick}
               data-id={props.id}
               type='picture'
               className='mixedPostPicture'
          >
               <CardImg
                    type='picture'
                    src={props.image}
                    data-id={props.id}
                    alt={props.caption}
                    className='image'
               />
               <CardBody className='overlay' data-id={props.id} type='picture'>
                    {/* <CardTitle> */}
                    <div className='text' type='picture' data-id={props.id}>
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
