import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { getPrompts, deletePrompt } from '../../../actions/promptActions';
import DeleteBtn from '../../Buttons/DeleteBtn';

const PromptCard = ({ getPrompts, deletePrompt, auth, prompt }) => {
     let pathArray = window.location.pathname.split('/');
     let albumId = pathArray[pathArray.length - 1];

     useEffect(() => {
          getPrompts(albumId);
     }, []);

     const deleteClick = async (event) => {
          event.preventDefault();
          const prompt_id = event.target.getAttribute('data-id');
          deletePrompt(prompt_id, albumId);
     };

     let promptsLength = prompt.prompts.length;
     let promptsLoading = prompt.isLoading;

     return promptsLength > 0 && !promptsLoading ? (
          prompt.prompts.map((prompt) => (
               <div key={prompt._id}>
                    <p>{prompt.prompt}</p>
                    <p>{prompt.response}</p>
                    Posted on:{' '}
                    <Moment
                         format='MM/DD/YYYY'
                         date={prompt.dateUploaded}
                    ></Moment>
                    {auth.isAuthenticated ? (
                         <DeleteBtn id={prompt._id} deleteClick={deleteClick} />
                    ) : null}
                    <hr />
               </div>
          ))
     ) : (
          <h1>No memory posts added yet!</h1>
     );
};

PromptCard.propTypes = {
     getPrompts: PropTypes.func.isRequired,
     deletePrompt: PropTypes.func.isRequired,
     prompt: PropTypes.object.isRequired,
     auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
     auth: state.auth,
     prompt: state.prompt,
});

export default connect(mapStateToProps, { getPrompts, deletePrompt })(
     PromptCard
);
