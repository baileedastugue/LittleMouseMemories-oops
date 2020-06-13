import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AppNavbar from './components/AppNavbar/index';

import './App.css';

function App() {
  return (
    <div>
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

export default App;
