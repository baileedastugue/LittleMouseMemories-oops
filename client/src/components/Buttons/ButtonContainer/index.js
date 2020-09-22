import React from 'react';

import ModalButton from '../ModalButton';
import MaterialIcon from 'material-icons-react';

const ButtonContainer = (props) => {
     return (
          <div className='buttonContainer'>
               <ModalButton
                    className='photoButton modalButton'
                    action={
                         <MaterialIcon
                              icon='add_a_photo'
                              color='#252525'
                              size='medium'
                         />
                    }
                    onClick={props.photoToggle}
               />
               <br />
               <br />
               <br />
               <ModalButton
                    className='promptButton modalButton'
                    action={
                         <MaterialIcon
                              icon='create'
                              color='#252525'
                              size='medium'
                         />
                    }
                    onClick={props.promptToggle}
               />
          </div>
     );
};

export default ButtonContainer;
