import React from 'react';
import Post from './Post.js'
import Comment from './Comment.js'
import NewComment from './NewComment.js'

class CommentsList extends React.Component {
  constructor(props) {
  	super(props);
  }

    
  
  List(post) {
  	const children = (comments) => {
    	if (comments) {
      	return <ul>{ this.List(comments) }</ul>
      }
    }
    return post.map((node, index) => {
      return <Comment key={ node.id } name={ node.content }>
        { children(node.comments) }
      </Comment>
    })
  }



  NoCommentsCheck(){
    if (this.props.post.comments.length > 0){
      
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
          <p> {"there's nothing here :("} </p>
          <NewComment createComment={this.props.createComment}/> 
        </div>
      )
    }
      
  }
  
  render() {
  	return(
      <div>
      <Post postAttributes={this.props.post} /> 

     <ul>
    	{ this.NoCommentsCheck()}
    </ul>

    </div>
    )
  }
}

  // getPosts = (post, collectedPosts=[], nestCount=0) => {
  //   post.nest = nestCount
  //   collectedPosts.push(post)
  //   post.comments.forEach(child => this.getPosts(child, collectedPosts, ++nestCount))
  //   console.log(collectedPosts)
  //   return collectedPosts
  // }

//   render() {
//     return (
//       <div>
//         { (this.getPosts(this.props.post)).map( (obj) => <Commenter body={obj} /> ) }
//       </div>
//     )
//   }
// }

// {/*<Post postAttributes={[selectedPost]} />*/}

export default CommentsList;
