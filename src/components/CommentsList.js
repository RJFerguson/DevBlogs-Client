import React from 'react';
import Post from './Post.js'
import Comment from './Comment.js'
import NewComment from './NewComment.js'
import './Comment.css'

class CommentsList extends React.Component {
  constructor(props) {
  	super(props);
  }
  List(postComments) {
  	const children = (comments) => {
    	if (comments) {
      	return <ul>{ this.List(comments) }</ul>
      }
    }
    return postComments.map((node, index) => {
      return <Comment key={node.id} commentParentID={ node.id } content={ node.content } createComment={this.props.createComment}>
        { children(node.comments) }
      </Comment>
    })
  }

  NoCommentsCheck(){
    if (this.props.post.comments.length){
      return (
        <div>
          <NewComment createComment={this.props.createComment}/> 
        <ul>
          { this.List(this.props.post.comments) }
        </ul>
        </div>
      )
    } else {
    return (
      <div>
        {"there's nothing here :("} 
        <NewComment createComment={this.props.createComment}/> 
      </div>
    )
  }
  }
  render() { 
  	return(
      <div>
        <Post postAttributes={this.props.post} /> 
    	    { this.NoCommentsCheck()}
      </div>
    )
  }
}
export default CommentsList;
