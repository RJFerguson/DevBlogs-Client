const baseUrl = 'http://localhost:3000/api/v1'

export class PostAdapter {
  static allPosts(num=1) {
    return fetch(`${baseUrl}/posts?page=${num}`, {
      headers: headers() 
    })
    .then(res => res.json())
  }

  static SearchPosts(searchTerm,num=1) {
    return fetch(`${baseUrl}/posts/search?term=${searchTerm}`, {
      headers: headers()
    })
    .then(res => res.json())
  }
  
  static GetPostComments(id){
  return fetch(`${baseUrl}${id}/comments`, {
      headers: headers()
    })
    .then(res => res.json() )
  }

  static CreateNewPostComment(text, id, user_id){
    console.log(text, id, user_id)
    return fetch(`${baseUrl}/posts/${id}/comments`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        content: text,
        commentable_id: id,
        commentable_type: "Post",
        user: user_id
      })
    })
  }

  static CreateNewCommentComment(text, postID, ParentCommentID, user_id){
    return fetch(`${baseUrl}/posts/${postID}/comments`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        content: text,
        commentable_id: ParentCommentID,
        commentable_type: "Comment",
        user: user_id
      })
    })
  }
} 
export class UserAdapter {
   static CommentUser(id){
    return fetch(`${baseUrl}/users/${id}`, {
      headers: headers()
    })
    .then(res => res.json())
  }
}


export class AuthAdapter {
  static login(loginParams){
    return fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(loginParams)
    }).then(res => res.json() )

  }
  
  static currentUser(){
    return fetch(`${baseUrl}/current_user`, {
      headers: headers()
    })
    .then(res => res.json())
  }


}



function headers(){
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
    'Authorization': localStorage.getItem('jwt')
  }
}

