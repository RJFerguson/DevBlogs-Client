import React from 'react';
import ReactDOM,{ render } from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App.react.js';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './stylesheets/index.css'

ReactDOM.render(

  <Router>
    <Route path="/" component={App} />
  </Router>, document.getElementById('root'));

