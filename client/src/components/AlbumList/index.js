import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v1 as uuid } from 'uuid';

import "./style.css";

 class AlbumList extends Component {
     state = {
         albums: [
            { id: uuid(), name: 'Album1' },
            { id: uuid(), name: 'Album2' },
            { id: uuid(), name: 'Album3' },
            { id: uuid(), name: 'Album4' }
         ]
     }

     render () {
         const { albums } = this.state;
         return (
             <Container>
                 <Button
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={() => {
                        const name = prompt('Enter album name');
                        if(name) {
                            this.setState(state => ({
                                albums: [...state.albums, { id: uuid(), name }]
                            }));
                        }
                    }}
                 >Add Album</Button>
                 <ListGroup>
                     <TransitionGroup className="album-list">
                        {albums.map(({ id, name }) => (
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={() => {
                                            this.setState(state => ({
                                                albums: state.albums.filter(album => album.id !== id)
                                            }));
                                        }}
                                    >&times;</Button>
                                    { name }
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                     </TransitionGroup>
                 </ListGroup>
             </Container>
         )
     }
 }

 export default AlbumList;