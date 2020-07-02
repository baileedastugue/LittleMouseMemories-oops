import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import MaterialIcon from 'material-icons-react';

const PageNotFound = ({ isAuth, isLoading }) => {
     return (
          <Container id='pageNotFound'>
               <h1>Whoops!</h1>
               {/* <div className='center'> */}
               <p>We can't seem to find the page you're looking for</p>
               <p>
                    <a href={isAuth ? '/dashboard' : '/'}>
                         <MaterialIcon
                              icon='arrow_forward'
                              color='#252525'
                              size='medium'
                         />{' '}
                         {isLoading || !isAuth ? (
                              <span>Back to the welcome page</span>
                         ) : (
                              <span>Back to your dashboard</span>
                         )}
                    </a>
               </p>
          </Container>
     );
};

PageNotFound.propTypes = {
     isAuth: PropTypes.bool.isRequired,
     isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
     isAuth: state.auth.isAuthenticated,
     isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps)(PageNotFound);
