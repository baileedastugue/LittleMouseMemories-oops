import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Welcome from './pages/Welcome';
import './App.css';

function App() {
  return (
    <Container>
      <img src='https://images-na.ssl-images-amazon.com/images/I/41ZztTNk7SL._AC_.jpg'/>
      <Router>
          <Route exact path='/' component={ Welcome }/>
      </Router>
    </Container>
  );
}

export default App;
