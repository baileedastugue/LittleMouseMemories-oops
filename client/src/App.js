import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AppNavbar from './components/AppNavbar/index';

import { loadUser } from './actions/authActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar/>
        <Container>
          <Router>
              <Route exact path='/' component={ Welcome }/>
              <Route exact path='/users/register' component={ Register }/>
              <Route exact path='/users/login' component={ Login }/>
              <Route exact path='/dashboard' component={ Dashboard }/>
          </Router>
      </Container>
      </div>
    );
  }
}

export default App;
