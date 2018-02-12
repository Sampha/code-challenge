import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListView from './views/ListView';
import DetailView from './views/DetailView';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
        <Router>
          <div>
          <Route exact path="/" component={ListView} />
          <Route exact path="/pokemon/:id" component={DetailView} />
          </div>
        </Router>
    );
  }
}

export default App;
