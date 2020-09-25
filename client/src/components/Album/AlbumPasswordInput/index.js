import React from 'react';
import { Form, Button, FormGroup, Label, Input } from 'reactstrap';
import AlertDiv from '../../Layout/AlertDiv';

const AlbumPasswordInput = (props) => {
     return (
          <Form className='form' onSubmit={props.onSubmit}>
               <AlertDiv />
               <FormGroup>
                    <Label htmlFor='inputPassword'>Album Password</Label>
                    <Input
                         type='password'
                         name='password'
                         className='form-control'
                         onChange={props.onChange}
                         value={props.value}
                    />
               </FormGroup>
               <Button type='submit' value='albumAuth'>
                    Submit
               </Button>
          </Form>
     );
};

export default AlbumPasswordInput;
