import React, { Fragment } from 'react';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import './style.css';
import Moment from 'react-moment';

const MixedPostPrompt = (props) => {
     return (
          <Card
               onClick={props.onClick}
               data-id={props.id}
               type='prompt'
               className='mixedPostPrompt'
          >
               <CardBody data-id={props.id} type='prompt'>
                    <CardText data-id={props.id} type='prompt'>
                         {props.prompt}
                         <br />
                         {props.response}
                    </CardText>
                    <div className='overlay' data-id={props.id} type='prompt'>
                         <CardTitle
                              className='text'
                              data-id={props.id}
                              type='prompt'
                         >
                              Uploaded{' '}
                              {props.uploadedBy ? (
                                   <Fragment data-id={props.id}>
                                        by {props.uploadedBy}{' '}
                                   </Fragment>
                              ) : null}
                              on{' '}
                              <Moment
                                   data-id={props.id}
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
