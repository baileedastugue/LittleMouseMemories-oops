import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAlbum } from '../../actions/albumActions';

const PictureCard = (props) => {
     useEffect(() => {
          props.getAlbum();
     }, [props.getAlbum]);
     return <h1>Pictures and prompts</h1>;
};

PictureCard.propTypes = {
     getAlbum: PropTypes.object.isRequired,
     album: PropTypes.object.isRequired,
     auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
     auth: state.auth,
     album: state.album,
});

export default connect(mapStateToProps, { getAlbum })(PictureCard);
