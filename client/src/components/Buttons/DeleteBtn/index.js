import React from 'react';
import './style.css';
// import { Button } from 'reactstrap';
import MaterialIcon from 'material-icons-react';

const DeleteBtn = (props) => {
     return (
          <div
               className='deleteButton'
               data-id={props.id}
               onClick={props.deleteClick}
          >
               <MaterialIcon
                    icon='delete_forever'
                    color='#f0977f'
                    size='small'
                    data-id={props.id}
               />
          </div>
     );
};

export default DeleteBtn;
