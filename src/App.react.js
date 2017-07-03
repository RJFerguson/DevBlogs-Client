import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
import PostContainer from './containers/Posts_container.js'

class App extends Component {
  render() {
    return (
      <Container >
        <PostContainer />
      </Container>
    );
  }
}

export default App;
