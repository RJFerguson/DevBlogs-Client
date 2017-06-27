import React, { Component } from 'react';
import PostList from '../components/Posts_list.js'
import { PostAdapter }  from '../adapters/Posts_adapter.js'

class PostContainer extends Component {
  constructor(){
    super()
    this.state = {
      posts: []
    }
  }

  componentDidMount(){
    PostAdapter.allPosts()
    .then( post => this.setState({posts: post}))
  }

  render() {
    return (
      <div>
        <PostList postList={this.state.posts}/> 
      </div>
    );
  }
}

export default PostContainer;
