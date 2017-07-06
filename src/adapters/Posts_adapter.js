const baseUrl = 'http://localhost:3000/api/v1'

export class PostAdapter {
  static allPosts(num=1) {
    return fetch(`${baseUrl}/posts?page=${num}`)
    .then(res => res.json() )
    
  }
  
  static GetPostComments(id){
  return fetch(`${baseUrl}${id}/comments`)
    .then(res => res.json() )
  }

  static CreateNewPostComment(text, id){
    return fetch(`${baseUrl}/posts/${id}/comments`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        content: text,
        commentable_id: id,
        commentable_type: "Post"
      })
    })
  }

  static CreateNewCommentComment(text, postID, ParentCommentID){
    return fetch(`${baseUrl}/posts/${postID}/comments`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        content: text,
        commentable_id: ParentCommentID,
        commentable_type: "Comment"
      })
    })
  }
} 

function headers(){
  return {
    'content-type': 'application/json',
    'accept': 'application/json'
  }
}

