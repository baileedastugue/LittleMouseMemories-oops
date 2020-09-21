import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import AboutSection from '../components/Layout/AboutSection';
import WelcomeShowcase from '../components/Layout/WelcomeShowcase';

const Welcome = ({ isAuth, isLoading }) => {
     return isLoading || !isAuth ? (
          <>
               <AboutSection />
               <WelcomeShowcase />
          </>
     ) : (
          <Redirect to='/dashboard' />
     );
};

Welcome.propTypes = {
     isAuth: PropTypes.bool,
     isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
     isAuth: state.auth.isAuthenticated,
     isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps)(Welcome);
