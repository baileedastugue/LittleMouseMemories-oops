import React, { Component } from 'react';
import PictureCard from '../components/PictureCard';
import AddPictureForm from '../components/AddPictureForm';
import PromptCard from '../components/PromptCard';
import AddPromptForm from '../components/AddPromptForm';

export class Album extends Component {
     constructor() {
          super();
          this.state = {
               showHideAddPictureForm: false,
               showHidePictureCard: false,
          };
     }

     // only view posts --> hide PictureCards
     // only view picture --> hide PostsCards
     // view all memories --> view both in chronological order

     render() {
          return (
               <div>
                    <h1>Add new pictures</h1>
                    <AddPictureForm />
                    <PictureCard />
                    <h1>Add new memory posts</h1>
                    <AddPromptForm />
                    <PromptCard />
               </div>
          );
     }
}

export default Album;
