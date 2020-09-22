import React from 'react';
import MaterialIcon from 'material-icons-react';

const CloseArrowBtn = (props) => {
     return (
          <MaterialIcon
               icon='arrow_forward'
               id='btn-authForms--close'
               color='white'
               size='large'
               onClick={props.onClick}
          />
     );
};

export default CloseArrowBtn;
