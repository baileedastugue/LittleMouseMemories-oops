import React, { Component } from 'react';
import { Container } from 'reactstrap';
import AddAlbumForm from '../components/AddAlbumForm';
import AlbumList from '../components/AlbumList';

class Dashboard extends Component {
     render() {
          return (
               <Container>
                    <AddAlbumForm />

                    <h5 className='lead'>Your Memory Albums</h5>
                    <AlbumList />
               </Container>
          );
     }
}

export default Dashboard;
