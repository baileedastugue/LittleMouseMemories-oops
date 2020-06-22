import React from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import AddAlbumForm from '../components/AddAlbumForm';
import AlbumList from '../components/AlbumList';
import PageTitle from '../components/PageTitle';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const Dashboard = (props) => {
     if (!props.isAuth) {
          return <Redirect to='/login' />;
     }
     return (
          <Container>
               <PageTitle />
               <AddAlbumForm />
               <h5 className='lead'>Your Memory Albums</h5>
               <AlbumList />
          </Container>
     );
};

AddAlbumForm.propTypes = {
     isAuth: PropTypes.bool,
};

const mapStateToProps = (state) => ({
     isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Dashboard);
