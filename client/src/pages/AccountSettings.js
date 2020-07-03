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
import AlbumSettings from '../components/Settings/AlbumSettings';
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

               <Fragment>
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
                                   Album Settings
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
                                   Account Settings
                              </NavLink>
                         </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                         <TabPane tabId='1' id='albumSettings'>
                              <h4 className='mt-3 mb-3'>Album Settings</h4>
                              <AlertDiv />
                              <AlbumSettings />
                         </TabPane>
                         <TabPane tabId='2' id='accountSettings'>
                              <div className='center'>
                                   <h4 className='mt-3 mb-3'>
                                        Account Settings
                                   </h4>
                                   <AlertDiv />
                                   <hr />
                                   <h5 className='mt-3 mb-3'>
                                        Update Account Password
                                   </h5>

                                   <ChangePasswordForm />
                                   <hr />
                                   <h5 className='mt-3 mb-3'>
                                        Delete User Account
                                   </h5>
                                   <DeleteUser />
                              </div>
                         </TabPane>
                    </TabContent>
               </Fragment>
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
