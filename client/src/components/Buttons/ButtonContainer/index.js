import React from 'react';

import ModalButton from '../ModalButton';
import MaterialIcon from 'material-icons-react';

const ButtonContainer = (props) => {
     return (
          <div className='btnContainer'>
               <ModalButton
                    className='btn-photo btn-modal'
                    action={
                         <MaterialIcon
                              icon='add_a_photo'
                              color='#252525'
                              size='medium'
                         />
                    }
                    onClick={props.photoToggle}
               />
               <div className='btnContainer-spacing' />
               <ModalButton
                    className='btn-prompt btn-modal'
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
