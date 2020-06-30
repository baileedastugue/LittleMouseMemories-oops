import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';

import PageTitle from '../components/Layout/PageTitle';
// import AlbumList from '../components/Album/AlbumList';
import AlertDiv from '../components/Layout/AlertDiv';
import '../App.css';

const AccountSettings = ({ isAuth, auth }) => {
     return auth.isLoading ? (
          <h1>Loading</h1>
     ) : (
          <Fragment>
               <Container fluid={true}>
                    <PageTitle>Account Settings</PageTitle>
               </Container>
               <AlertDiv />
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
