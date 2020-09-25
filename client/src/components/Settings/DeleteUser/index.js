import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { deleteAccount } from '../../../actions/authActions';

const DeleteUser = ({ deleteAccount }) => {
     const onClick = async () => {
          try {
               deleteAccount();
               return <Redirect to='/' />;
          } catch (err) {
               console.error(err);
          }
     };
     return (
          <Button className='btn btn-delete' onClick={onClick}>
               Delete Account
          </Button>
     );
};

DeleteUser.propTypes = {
     deleteAccount: PropTypes.func.isRequired,
};

export default connect(null, { deleteAccount })(DeleteUser);
