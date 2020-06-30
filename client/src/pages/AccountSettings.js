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
// import { Redirect } from 'react-router-dom';

import PageTitle from '../components/Layout/PageTitle';
import ChangePasswordForm from '../components/Settings/ChangePasswordForm';
import DeleteUser from '../components/Settings/DeleteUser';
// import AlbumList from '../components/Album/AlbumList';
import AlertDiv from '../components/Layout/AlertDiv';
import '../App.css';
import classnames from 'classnames';

const AccountSettings = ({ isAuth, auth }) => {
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
               <AlertDiv />
               <Container>
                    <Nav tabs>
                         <NavItem>
                              <NavLink
                                   className={classnames({
                                        active: activeTab === '1',
                                   })}
                                   onClick={() => {
                                        toggle('1');
                                   }}
                              >
                                   Account Settings
                              </NavLink>
                         </NavItem>
                         <NavItem>
                              <NavLink
                                   className={classnames({
                                        active: activeTab === '2',
                                   })}
                                   onClick={() => {
                                        toggle('2');
                                   }}
                              >
                                   Album Settings
                              </NavLink>
                         </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                         <TabPane tabId='1'>
                              <h4 className='mt-3 mb-3'>Account Settings</h4>
                              <ChangePasswordForm />
                              <DeleteUser />
                         </TabPane>
                         <TabPane tabId='2'>
                              <h4 className='mt-3 mb-3'>Album Settings</h4>
                         </TabPane>
                    </TabContent>
               </Container>
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
