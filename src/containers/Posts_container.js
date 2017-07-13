import React, { Component } from 'react';
import { PostAdapter }  from '../adapters/Posts_adapter.js'
import {Route, withRouter, Redirect} from 'react-router-dom'
import Post from '../components/Post.js'
import CommentsList from '../components/CommentsList.js'
import NewPage from '../components/NewPage.js'
import {Row, Col} from 'react-materialize'
import withAuth from '../hocs/withAuth.js'
import SearchBar from '../components/SearchBar.js'
class PostContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      posts: [], 
      comments: [],
      selectedPost: {},
      defaultPage: 1,
      searchPosts: [],
      searchTerm: ""
    }
    this.handleClick = this.handleClick.bind(this)
    this.createComment = this.createComment.bind(this)
    this.handleNewPage = this.handleNewPage.bind(this)
    this.search = this.search.bind(this)
  }

  componentDidMount(){
    PostAdapter.allPosts()
    .then( post => this.setState({posts: post, defaultPage: 1}))
  }

  createComment(content,parentCommentID){
    if(Object.keys(this.props.user).length === 0){
      this.props.history.push('/login')
    }else {

    if(!parentCommentID){
      PostAdapter.CreateNewPostComment(content, this.state.selectedPost.id, this.props.user.id)
    .then(post => this.setState((previousState) => {
      return {selectedPost: previousState.posts[0]}
    })).then(this.props.history.push('/posts'))
    .then(window.location.reload())
    } else {
      PostAdapter.CreateNewCommentComment(content, this.state.selectedPost.id, parentCommentID, this.props.user.id)
    .then(post => this.setState((previousState) => {
      console.log(previousState.posts)
      return {selectedPost: previousState.posts[0]}
    })).then(this.props.history.push('/posts'))
    .then(window.location.reload())
  }
    }
  }


  handleNewPage(event){
    event.preventDefault()
    this.state.defaultPage++
    PostAdapter.allPosts(this.state.defaultPage)
    .then( posts => this.setState({posts: posts}))
  }
  
  handleClick = (event, post) => {
    event.preventDefault()
    this.setState({
      selectedPost: post
    })
     let post_url = event.target.closest("a").getAttribute('href')
     this.props.history.push(post_url)
  }

  search(searchTerm){
    PostAdapter.SearchPosts(searchTerm)
    .then(posts => this.setState({searchPosts: posts, searchTerm: searchTerm}))
  }

  searchCheckFn(){
  if (this.state.searchTerm.length > 0){
    return <div>
      <SearchBar search={this.search}/> 
            <Post postAttributes={this.state.searchPosts} handleClick={this.handleClick}/> 
            <NewPage handleClick={this.handleNewPage}/>
          </div>
  } else {
    return <div>
      <SearchBar search={this.search}/> 
              <Post postAttributes={this.state.posts} handleClick={this.handleClick} /> 
              <NewPage handleClick={this.handleNewPage}/>
            </div>
    }
  }

  render() {
    return (
       <Row>
         <Col s={12}>
          <Route exact path="/posts" render={this.searchCheckFn.bind(this)}/>
          <Route exact path="/posts/:id" render={()=>  {return <CommentsList post={this.state.selectedPost} createComment={this.createComment}/> }}/>
        </Col>
      </Row>
    );
  }
}

export default withAuth(PostContainer);
