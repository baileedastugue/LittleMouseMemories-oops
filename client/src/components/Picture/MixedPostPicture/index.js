import React from 'react';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';
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
                    <CardTitle>
                         <div
                              className='text'
                              type='picture'
                              data-id={props.id}
                         >
                              Uploaded by {props.uploadedBy} on{' '}
                              <Moment
                                   format='MM/DD/YYYY'
                                   date={props.dateUploaded}
                              />
                         </div>
                    </CardTitle>
               </CardBody>
          </Card>
     );
};

export default MixedPostPicture;
