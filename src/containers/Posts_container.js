import React, { Component } from 'react';
import { PostAdapter }  from '../adapters/Posts_adapter.js'
import {Route, withRouter} from 'react-router-dom'
import Post from '../components/Post.js'
import CommentsList from '../components/CommentsList.js'
import NavBar from '../components/NavBar.js'
class PostContainer extends Component {
  constructor(){
    super()
    this.state = {
      posts: [], 
      comments: [],
      selectedPost: {} 
    }
    this.handleClick = this.handleClick.bind(this)
    this.createComment = this.createComment.bind(this)
  }

  componentDidMount(){
    PostAdapter.allPosts()
    .then( post => this.setState({posts: post}))
  }

  createComment(stuff){
    PostAdapter.CreateNewComment(stuff, this.state.selectedPost.id)
    .then(post => console.log(post))


  }
  
  handleClick = (event, post) => {
    event.preventDefault()
    this.setState({
      selectedPost: post
    })
     let post_url = event.target.closest("a").getAttribute('href')
     this.props.history.push(post_url)
  }


  render() {
    return (
       <div>
         <NavBar /> 
         <Route exact path="/posts" render={()=>  <Post postAttributes={this.state.posts} handleClick={this.handleClick}/> } />
         <Route exact path="/posts/:id" render={()=>  {return <CommentsList post={this.state.selectedPost} createComment={this.createComment}/> }}/>
      </div>
    );
  }
}

export default withRouter(PostContainer);
