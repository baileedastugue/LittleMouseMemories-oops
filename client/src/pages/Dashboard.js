import React from 'react';
import { Container } from 'reactstrap';
import AddAlbumForm from '../components/AddAlbumForm';
import AlbumList from '../components/AlbumList';
import PageTitle from '../components/PageTitle';
// import PropTypes from 'prop-types';

const Dashboard = (props) => {
     return (
          <Container>
               <PageTitle />
               <AddAlbumForm />
               <h5 className='lead'>Your Memory Albums</h5>
               <AlbumList />
          </Container>
     );
};

export default Dashboard;
