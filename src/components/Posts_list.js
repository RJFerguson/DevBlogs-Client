import React, { Component } from 'react';
import Post from './Post.js'


class PostList extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div>
        {this.props.postList.map( (post) => <Post postAttributes={post}/> )} 
      </div>
    );
  }
}

export default PostList;
