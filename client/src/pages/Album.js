import React, { Component } from 'react';
import PictureCard from '../components/PictureCard';
import AddPictureForm from '../components/AddPictureForm';

export class Album extends Component {
     render() {
          return (
               <div>
                    <AddPictureForm />
                    <PictureCard />
               </div>
          );
     }
}

export default Album;
