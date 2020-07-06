import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './CSS/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import AccountSettings from './pages/AccountSettings';
import Album from './pages/Album';
import AppNavbar from './components/Layout/AppNavbar/index';
import PrivateRoute from './components/Auth/PrivateRoute';
import PageNotFound from './pages/PageNotFound';
import Wrapper from './components/Layout/Wrapper';

import './App.css';

// import global header
import setAuthToken from './utils/setAuthToken';

// Connects React to Redux
import { Provider } from 'react-redux';
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
               <AppNavbar />
               <Wrapper>
                    <Helmet>
                         <style>{'body {background-color: #252525;}'}</style>
                    </Helmet>

                    <Router>
                         <Switch>
                              <Route exact path='/' component={Welcome} />
                              <PrivateRoute
                                   exact
                                   path='/dashboard'
                                   component={Dashboard}
                              />
                              <PrivateRoute
                                   exact
                                   path='/accountSettings'
                                   component={AccountSettings}
                              />
                              <Route
                                   exact
                                   path='/album/:id'
                                   component={Album}
                              />
                              <Route component={PageNotFound} />
                         </Switch>
                    </Router>
               </Wrapper>
          </Provider>
     );
};

export default App;
