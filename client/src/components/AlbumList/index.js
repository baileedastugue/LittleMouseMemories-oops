import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v1 as uuid } from 'uuid';

import './style.css';

class AlbumList extends Component {
     render() {
          //   const { albums } = this.state;
          return (
               <Container>
                    <ListGroup>
                         <TransitionGroup className='album-list'>
                              {/* {albums.map(({ id, name }) => (
                                   <CSSTransition
                                        key={id}
                                        timeout={500}
                                        classNames='fade'
                                   >
                                        <ListGroupItem>
                                             <Button
                                                  className='remove-btn'
                                                  color='danger'
                                                  size='sm'
                                                  //   onClick={() => {
                                                  //        this.setState(
                                                  //             (state) => ({
                                                  //                  albums: state.albums.filter(
                                                  //                       (album) =>
                                                  //                            album.id !==
                                                  //                            id
                                                  //                  ),
                                                  //             })
                                                  //        );
                                                  //   }}
                                             >
                                                  &times;
                                             </Button>
                                             {/* {name} */}
                              {/* </ListGroupItem> */}
                              {/* </CSSTransition> */}
                              {/* ))} */}
                         </TransitionGroup>
                    </ListGroup>
               </Container>
          );
     }
}

export default AlbumList;
