import React from 'react';
import { Form, FormGroup, FormText, Label, Input } from 'reactstrap';
import SubmitButton from '../../Buttons/SubmitBtn';

const AlbumTitle = (props) => {
     return (
          <Form className='form' onSubmit={props.onSubmit}>
               <FormGroup>
                    <h5>Change album title</h5>
                    <Label htmlFor='newTitle'>New album title</Label>
                    <Input
                         type='text'
                         name='newTitle'
                         value={props.newTitle}
                         onChange={props.onAlbumTitleChange}
                    />
               </FormGroup>
               <SubmitButton>Change title</SubmitButton>
               <FormText color='muted'>Submit to save all changes</FormText>
          </Form>
     );
};

export default AlbumTitle;
