import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import PostContainer from './containers/Posts_container.js'
import { AuthAdapter } from './adapters/Posts_adapter.js'
import NavBar from './components/NavBar.js'
import LoginForm from './components/LoginForm.js'
import PersonalFooter from './components/Footer.js'
import {Row, Col} from 'react-materialize'
import User from './components/User.js'
import './stylesheets/index.css'

class App extends Component {
  constructor(){
  super()
  this.state = {
    auth: {
      isLoggedIn: false,
      user: {}
    },
    defaultPage: 1,
  }
  this.logIn = this.logIn.bind(this)
  }

  componentDidMount(){
    if (localStorage.getItem('jwt')) {
      AuthAdapter.currentUser()
        .then(user => {
          if (!user.error) {
            this.setState({
              auth: {
                isLoggedIn: true,
                user: user
              }
            })
          }
        })
    }
  }

  logIn(loginParams){
    AuthAdapter.login(loginParams)
      .then( user => {
        if (!user.error) {
          this.setState({
            auth: { isLoggedIn: true, user: user}
          })
          localStorage.setItem('jwt', user.jwt )
          this.props.history.push('/posts')
        }
      })
  }

  logOut(event){
    localStorage.clear()
    this.setState({
      auth: {
        isLoggedIn: false,
        user: {}
      }
    })
  }

  render() {
    let title
      if (this.state.auth.isLoggedIn) {
        title = this.state.auth.user.username
      } else {
      }

    return (
        <Row>
          <Col s={12} >
          <NavBar title={title} logout={this.logOut.bind(this)}/>
          
          <Route path="/posts" render={() => <PostContainer user={this.state.auth.user}/>} />
          <Route path="/about" render={() => {
            return <p>My little app to read dev blogs!</p>
          }} />
          <Route path='/login' render={() => <LoginForm onSubmit={this.logIn}/>} />
          <Route path="/users/:id" component={User}/>
          <PersonalFooter />
          </Col>
        </Row>
    );
  }
}

export default App;
