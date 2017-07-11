import React from 'react';
import ReactDOM,{ render } from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App.react.js';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import reducer from './reducers'
import './stylesheets/index.css'

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>, document.getElementById('root'));
