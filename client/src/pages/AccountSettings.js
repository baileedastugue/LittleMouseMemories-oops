import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
     Container,
     TabContent,
     TabPane,
     Nav,
     NavItem,
     NavLink,
} from 'reactstrap';
import { connect } from 'react-redux';

import PageTitle from '../components/Layout/PageTitle';
import ChangePasswordForm from '../components/Settings/ChangePasswordForm';
import DeleteUser from '../components/Settings/DeleteUser';
import AlertDiv from '../components/Layout/AlertDiv';
import '../App.css';
import classnames from 'classnames';

const AccountSettings = ({ auth }) => {
     const [activeTab, setActiveTab] = useState('1');
     const toggle = (tab) => {
          if (activeTab !== tab) setActiveTab(tab);
     };
     return auth.isLoading ? (
          <h1>Loading</h1>
     ) : (
          <Fragment>
               <Container fluid={true}>
                    <PageTitle>Your Settings</PageTitle>
               </Container>

               <div id='accountSettings'>
                    <div className='center'>
                         <AlertDiv />
                         <hr />
                         <h5 className='mt-3 mb-3'>Update Account Password</h5>

                         <ChangePasswordForm />
                         <hr />
                         <h5 className='mt-3 mb-3'>Delete User Account</h5>
                         <DeleteUser />
                    </div>
               </div>
          </Fragment>
     );
};

AccountSettings.propTypes = {
     isAuth: PropTypes.bool.isRequired,
     auth: PropTypes.object.isRequired,
};

Container.propTypes = {
     fluid: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

const mapStateToProps = (state) => ({
     isAuth: state.auth.isAuthenticated,
     auth: state.auth,
});

export default connect(mapStateToProps)(AccountSettings);
