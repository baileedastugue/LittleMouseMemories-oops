import React, { Fragment } from 'react';

const PostCarousel = (props) => {
     return (
          <Fragment>
               <div
                    id='postCarousel'
                    className='carousel slide'
                    data-ride='carousel'
               >
                    <div className='carousel-inner'>{props.children}</div>
                    <a
                         class='carousel-control-prev'
                         role='button'
                         data-slide='prev'
                    >
                         <span
                              class='carousel-control-prev-icon'
                              aria-hidden='true'
                         ></span>
                         <span class='sr-only'>Previous</span>
                    </a>
               </div>
          </Fragment>
     );
};

export default PostCarousel;
