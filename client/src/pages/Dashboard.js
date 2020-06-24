import React, { useState, Fragment } from 'react';
import MaterialIcon from 'material-icons-react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import PageTitle from '../components/Layout/PageTitle';
import AlbumList from '../components/Album/AlbumList';
import AddAlbumForm from '../components/Album/AddAlbumForm';
import AddAlbumModal from '../components/Album/AddAlbumModal';
import ModalButton from '../components/Buttons/ModalButton';
import '../App.css';

const Dashboard = (props) => {
     const addIcon = <MaterialIcon icon='add' color='#ffffff' size='large' />;

     const [modal, setModal] = useState(false);

     if (!props.isAuth) {
          return <Redirect to='/login' />;
     }

     const toggle = () => {
          setModal(!modal);
     };

     let userLoading = props.auth.isLoading;

     return (
          <Fragment>
               <Container>
                    {!userLoading ? (
                         <PageTitle>
                              Welcome to your memories,{' '}
                              {props.auth.user.firstName}{' '}
                              {props.auth.user.lastName}
                         </PageTitle>
                    ) : (
                         <h1>Loading User Data</h1>
                    )}
               </Container>
               <Container>
                    <h5 className='lead'>Your Memory Albums</h5>
                    <AlbumList />
               </Container>

               <Container className='buttonContainer'>
                    <ModalButton
                         className='albumButton modalButton'
                         action={addIcon}
                         onClick={toggle}
                    />
               </Container>
               <AddAlbumModal toggle={toggle} isOpen={modal}>
                    <AddAlbumForm toggle={toggle} />
               </AddAlbumModal>
          </Fragment>
     );
};

AddAlbumForm.propTypes = {
     isAuth: PropTypes.bool,
     auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
     isAuth: state.auth.isAuthenticated,
     auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
