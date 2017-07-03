const baseUrl = 'http://localhost:3000/api/v1'

export class PostAdapter {
  static allPosts() {
    return fetch(`${baseUrl}/posts`)
    .then(res => res.json() )
    
  }
  
  static GetPostComments(id){
  return fetch(`${baseUrl}${id}/comments`)
    .then(res => res.json() )
  }

  static CreateNewComment(text, id){
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
} 

function headers(){
  return {
    'content-type': 'application/json',
    'accept': 'application/json'
  }
}

