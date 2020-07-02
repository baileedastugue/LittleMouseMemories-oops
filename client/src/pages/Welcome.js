import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';

class Welcome extends Component {
     render() {
          return (
               <Container id='welcomePage'>
                    <div className='left'></div>
                    <div className='leftTriangle'>
                         {/* <h1>Welcome</h1>
                         <p className='lead mt-4'>
                              New user? <a href='/register'>Register</a> <br />
                              Returning user? <a href='/login'>Login</a>
                         </p> */}
                    </div>
                    <div id='showcase'>
                         <div className='movingArea'>
                              {/* First set */}
                              <Row>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1593046584198-ed785e8bf3a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>2 1</div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1513492702219-923ec8c62a2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>
                                        Your first steps
                                   </div>
                              </Row>
                              <Row>
                                   <div className='box prompt'>2 2</div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1592106680408-e7e63efbc7ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>2 2</div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/flagged/photo-1576066196482-347ca427d0f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                              </Row>
                              <Row>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1593630459615-6ab2aa81a6ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>2 3</div>
                                   <div className='box prompt'>2 3</div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1507946116609-bfed19728fdf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                              </Row>
                              <Row>
                                   <div className='box prompt'>2 4</div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1536825919521-ab78da56193b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>2 4</div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1551197600-d3782114566e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                              </Row>
                              <Row>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1513862448120-a41616062133?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>2 5</div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1588410670460-cdab54625253?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'> 254</div>
                              </Row>
                              <Row>
                                   <div className='box prompt'>2 6</div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1547226846-000337daf073?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>2 6</div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1575404078738-d2f15b89d320?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                              </Row>
                              <Row>
                                   <div className='box prompt'>2 7</div>
                                   <div className='box prompt'>2 7</div>

                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1458546450666-ebb1e605853f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>2 7</div>
                              </Row>
                              <Row>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1529424601215-d2a3daf193ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>2 8</div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1587327650077-76b67918ddeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>2 8</div>
                              </Row>
                              <Row>
                                   <div className='box prompt'>2 9</div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1453745541039-d804ab0ff1ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>2 9</div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1512746804203-e53e69406f93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                              </Row>
                              <Row>
                                   <div className='box prompt'>2 10</div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1562832823-f277927d6f2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1557469778-0b3269a1cc7a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>2 10</div>
                              </Row>

                              <Row>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1593046584198-ed785e8bf3a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>2 1</div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1513492702219-923ec8c62a2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>
                                        Your first steps
                                   </div>
                              </Row>
                              <Row>
                                   <div className='box prompt'>2 2</div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1592106680408-e7e63efbc7ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>2 2</div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/flagged/photo-1576066196482-347ca427d0f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                              </Row>
                              <Row>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1593630459615-6ab2aa81a6ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>2 3</div>
                                   <div className='box prompt'>2 3</div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1507946116609-bfed19728fdf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                              </Row>
                              <Row>
                                   <div className='box prompt'>2 4</div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1536825919521-ab78da56193b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>2 4</div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1551197600-d3782114566e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                              </Row>
                              <Row>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1513862448120-a41616062133?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>2 5</div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1588410670460-cdab54625253?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'> 254</div>
                              </Row>
                              <Row>
                                   <div className='box prompt'>2 6</div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1547226846-000337daf073?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>2 6</div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1575404078738-d2f15b89d320?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                              </Row>
                              <Row>
                                   <div className='box prompt'>2 7</div>
                                   <div className='box prompt'>2 7</div>

                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1458546450666-ebb1e605853f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>2 7</div>
                              </Row>
                              <Row>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1529424601215-d2a3daf193ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>2 8</div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1587327650077-76b67918ddeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>2 8</div>
                              </Row>
                              <Row>
                                   <div className='box prompt'>2 9</div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1453745541039-d804ab0ff1ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>2 9</div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1512746804203-e53e69406f93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                              </Row>
                              <Row>
                                   <div className='box prompt'>2 10</div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1562832823-f277927d6f2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box image'>
                                        <img src='https://images.unsplash.com/photo-1557469778-0b3269a1cc7a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' />
                                   </div>
                                   <div className='box prompt'>2 10</div>
                              </Row>
                         </div>
                    </div>
               </Container>
          );
     }
}

export default Welcome;
