import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { Container } from 'reactstrap';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AppNavbar from './components/AppNavbar/index';

// import { loadUser } from './actions/authActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// import global header
import setAuthToken from './utils/setAuthToken';

// Redux things
// Connects React to Redux
import { Provider } from 'react-redux';
// Bring in store
import store from './store';
import { loadUser } from './actions/authActions';

if (localStorage.token) {
     setAuthToken(localStorage.token);
}

const App = () => {
     // this will be a constant loop without []
     // basically like a componentDidMount with the []
     // tells react that your effect doesn't depend on any values from props/state therefore it never needs to re-run
     useEffect(() => {
          store.dispatch(loadUser());
     }, []);

     return (
          <Provider store={store}>
               <Router>
                    <Fragment>
                         <AppNavbar />
                         <Route exact path='/' component={Welcome} />
                         <section className='container'>
                              <Switch>
                                   <Route
                                        exact
                                        path='/register'
                                        component={Register}
                                   />
                                   <Route
                                        exact
                                        path='/login'
                                        component={Login}
                                   />
                                   <Route
                                        exact
                                        path='/dashboard'
                                        component={Dashboard}
                                   />
                              </Switch>
                         </section>
                    </Fragment>
               </Router>
          </Provider>
     );
};

export default App;
