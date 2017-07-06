import React, { Component } from 'react';
import { PostAdapter }  from '../adapters/Posts_adapter.js'
import {Route, withRouter} from 'react-router-dom'
import Post from '../components/Post.js'
import CommentsList from '../components/CommentsList.js'
import NavBar from '../components/NavBar.js'
import NewPage from '../components/NewPage.js'
import PersonalFooter from '../components/Footer.js'
import {Row, Col} from 'react-materialize'
class PostContainer extends Component {
  constructor(){
    super()
    this.state = {
      posts: [], 
      comments: [],
      selectedPost: {},
      defaultPage: 1,
    }
    this.handleClick = this.handleClick.bind(this)
    this.createComment = this.createComment.bind(this)
    this.handleNewPage = this.handleNewPage.bind(this)
    this.handleHome = this.handleHome.bind(this)
  }

  componentDidMount(){
    PostAdapter.allPosts()
    .then( post => this.setState({posts: post, defaultPage: 1}))
  }

  createComment(content,parentCommentID){
    debugger 
    if(!parentCommentID){
        PostAdapter.CreateNewPostComment(content, this.state.selectedPost.id)
    .then(post => console.log(post))
    } else {
      PostAdapter.CreateNewCommentComment(content, this.state.selectedPost.id, parentCommentID)
    .then(post => console.log(post))

    }
  }

  handleHome(event){
    event.preventDefault()
    PostAdapter.allPosts()
    .then( post => this.setState({posts: post, defaultPage: 1}))
    this.props.history.push("/posts")
  }

  handleNewPage(event){
    event.preventDefault()
    this.state.defaultPage++
    PostAdapter.allPosts(this.state.defaultPage)
    .then( post => this.setState({posts: post}))
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
       <Row>
         <Col s={10} offset="s1">
          <NavBar handleClick={this.handleHome}/> 
          <Route exact path="/posts" render={()=>  
            <div>
              <Post postAttributes={this.state.posts} handleClick={this.handleClick}/> 
              <NewPage handleClick={this.handleNewPage}/>
              <PersonalFooter />
            </div> } />

          <Route exact path="/posts/:id" render={()=>  {return <CommentsList post={this.state.selectedPost} createComment={this.createComment}/> }}/>
          <Route path="/login" render={() => <PersonalFooter />}/>
        </Col>
      </Row>
    );
  }
}

export default withRouter(PostContainer);
