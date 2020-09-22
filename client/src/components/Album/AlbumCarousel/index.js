import React from 'react';
import {
     CarouselControl,
     CarouselItem,
     Carousel,
     Modal,
     ModalFooter,
     ModalHeader,
} from 'reactstrap';

import CarouselPicture from '../../Picture/CarouselPicture';
import CarouselPrompt from '../../Prompt/CarouselPrompt';

import CloseBtn from '../../Buttons/CloseBtn';

const AlbumCarousel = (props) => {
     const closeBtn = <CloseBtn onClick={props.carouselToggle} />;

     const next = () => {
          const nextIndex =
               props.activeIndex === props.album.length - 1
                    ? 0
                    : props.activeIndex + 1;
          props.setActiveIndex(nextIndex);
     };

     const previous = () => {
          const nextIndex =
               props.activeIndex === 0
                    ? props.length - 1
                    : props.activeIndex - 1;
          props.setActiveIndex(nextIndex);
     };

     return (
          <Modal
               toggle={props.carouselToggle}
               isOpen={props.carouselModal}
               centered={true}
               size='lg'
               close={closeBtn}
          >
               <ModalHeader className='carousel-modal justify-content-md-end'>
                    {closeBtn}
               </ModalHeader>
               <Carousel
                    activeIndex={props.activeIndex}
                    next={next}
                    previous={previous}
                    interval={false}
               >
                    {props.album.map((post) => (
                         <CarouselItem key={post._id}>
                              {'image' in post ? (
                                   <CarouselPicture
                                        image={post.image}
                                        caption={post.caption}
                                        dateRecorded={post.dateRecorded}
                                        uploadedBy={post.uploadedBy}
                                        dateUploaded={post.dateUploaded}
                                   />
                              ) : (
                                   <CarouselPrompt
                                        response={post.response}
                                        prompt={post.prompt}
                                        dateRecorded={post.dateRecorded}
                                        uploadedBy={post.uploadedBy}
                                        dateUploaded={post.dateUploaded}
                                   />
                              )}

                              {props.isAuth ? (
                                   <ModalFooter
                                        className='carousel-modal--footer center'
                                        onClick={props.deleteClick}
                                        data-id={post._id}
                                   >
                                        <div> Delete this post</div>
                                   </ModalFooter>
                              ) : null}
                         </CarouselItem>
                    ))}

                    <CarouselControl
                         direction='prev'
                         directionText='Previous'
                         onClickHandler={previous}
                    />
                    <CarouselControl
                         direction='next'
                         directionText='Next'
                         onClickHandler={next}
                    />
               </Carousel>
          </Modal>
     );
};

export default AlbumCarousel;
