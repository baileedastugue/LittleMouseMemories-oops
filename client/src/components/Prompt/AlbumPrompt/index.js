import React, { Fragment } from 'react';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import Moment from 'react-moment';

const AlbumPrompt = (props) => {
     return (
          <Card
               onClick={props.onClick}
               data-id={props.id}
               type='prompt'
               className='album-prompt album-card'
          >
               <CardBody data-id={props.id} type='prompt'>
                    <CardText data-id={props.id} type='prompt'>
                         {props.prompt}. . .
                         <br />
                    </CardText>
                    <div
                         className='album-prompt--overlay'
                         data-id={props.id}
                         type='prompt'
                    >
                         <CardTitle
                              className='album-card--text'
                              data-id={props.id}
                              type='prompt'
                         >
                              Uploaded{' '}
                              {props.uploadedBy ? (
                                   <Fragment>by {props.uploadedBy} </Fragment>
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

export default AlbumPrompt;
