import React, { Component } from 'react';
import PictureCard from '../components/PictureCard';
import AddPictureForm from '../components/AddPictureForm';
import PromptCard from '../components/PromptCard';

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
                    <AddPictureForm />
                    <PictureCard />
                    <PromptCard />
               </div>
          );
     }
}

export default Album;
