import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.react.js';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import './stylesheets/index.css'

ReactDOM.render(<Router>
    <Route path="/" component={App} />
  </Router>, document.getElementById('root'));

