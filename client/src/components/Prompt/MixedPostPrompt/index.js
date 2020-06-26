import React, { Fragment } from 'react';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import './style.css';
import Moment from 'react-moment';

const MixedPostPrompt = (props) => {
     return (
          <Card
               onClick={props.onClick}
               index={props.index}
               className='mixedPostPrompt'
          >
               <CardBody>
                    <CardText>
                         {props.prompt}
                         <br />
                         {props.response}
                    </CardText>
                    <div className='overlay'>
                         <CardTitle className='text'>
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
                    </div>
               </CardBody>
          </Card>
     );
};

export default MixedPostPrompt;
