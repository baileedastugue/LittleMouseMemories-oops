import React, { useState, Fragment } from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import AddAlbumForm from '../components/Album/AddAlbumForm';
import AlbumList from '../components/Album/AlbumList';
import PageTitle from '../components/Layout/PageTitle';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import AddAlbumModal from '../components/Album/AddAlbumModal';
import ModalButton from '../components/Buttons/ModalButton';
import MaterialIcon, { colorPalette } from 'material-icons-react';
import '../App.css';

const Dashboard = (props) => {
     const addIcon = <MaterialIcon icon='add' color='#ffffff' size='large' />;

     const [modal, setModal] = useState(false);

     if (!props.isAuth) {
          return <Redirect to='/login' />;
     }

     const toggle = () => {
          console.log(modal);
          setModal(!modal);
     };

     return (
          <Fragment>
               <Container>
                    <PageTitle />
                    <h5 className='lead'>Your Memory Albums</h5>
                    <AlbumList />
               </Container>

               <ModalButton
                    className='albumButton modalButton'
                    action={addIcon}
                    onClick={toggle}
               />
               <AddAlbumModal toggle={toggle} isOpen={modal}>
                    <AddAlbumForm toggle={toggle} />
               </AddAlbumModal>
          </Fragment>
     );
};

AddAlbumForm.propTypes = {
     isAuth: PropTypes.bool,
};

const mapStateToProps = (state) => ({
     isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Dashboard);
