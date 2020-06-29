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
import Wrapper from '../components/Layout/Wrapper';
import AlertDiv from '../components/Layout/AlertDiv';
import '../App.css';

const Dashboard = ({ isAuth, auth }) => {
     console.log(isAuth);
     console.log(auth);
     // const materialIconRef = useRef(null);
     const addIcon = <MaterialIcon icon='add' color='#ffffff' size='large' />;

     const [modal, setModal] = useState(false);

     if (!isAuth) {
          return <Redirect to='/login' />;
     }

     const toggle = () => {
          setModal(!modal);
     };

     let userLoaded = !auth.isLoading;
     console.log(userLoaded);

     return (
          <Fragment>
               <Wrapper>
                    {userLoaded ? (
                         <PageTitle>
                              Welcome to your memories, {auth.user.firstName}{' '}
                              {auth.user.lastName}
                         </PageTitle>
                    ) : (
                         <h1>Loading User Data</h1>
                    )}
               </Wrapper>
               <Wrapper>
                    <AlertDiv />
               </Wrapper>
               <Wrapper>
                    <Fragment>
                         <AlbumList />
                    </Fragment>
               </Wrapper>

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
