const baseUrl = 'http://localhost:3000/api/v1'

export class PostAdapter {
  static allPosts() {

    return fetch(`${baseUrl}/posts`)
    .then(res => res.json() )
    
    }
} 