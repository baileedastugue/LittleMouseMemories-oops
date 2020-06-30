import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AccountSettings from './pages/AccountSettings';
import Album from './pages/Album';
import AppNavbar from './components/Layout/AppNavbar/index';
import PrivateRoute from './components/Auth/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
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
                    <Router>
                         <Route exact path='/' component={Welcome} />
                         <Switch>
                              <Route
                                   exact
                                   path='/register'
                                   component={Register}
                              />
                              <Route exact path='/login' component={Login} />
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
                         </Switch>
                    </Router>
               </Wrapper>
          </Provider>
     );
};

export default App;
