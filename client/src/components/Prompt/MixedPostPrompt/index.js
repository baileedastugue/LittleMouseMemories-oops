import React, { Fragment } from 'react';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import './style.css';
import Moment from 'react-moment';

const MixedPostPrompt = (props) => {
     return (
          <Card style={{ width: '18rem' }}>
               <CardBody>
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
                    <CardText>
                         {props.prompt}
                         <br />
                         {props.response}
                    </CardText>
               </CardBody>
          </Card>
     );
};

export default MixedPostPrompt;
