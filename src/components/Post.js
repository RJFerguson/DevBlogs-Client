import React from 'react';
import { Link } from 'react-router-dom';


const Post = ({postAttributes, handleClick}) =>  {
  if (!handleClick) {
    let post = postAttributes
    return (
      <div>
      { <div key={post.id}><div><h3>{post.title}</h3></div><div>{post.pubdate} | {<Link to = {`/posts/${post.id}`}>Comments</Link>}</div></div> } 
      </div>
    )
  }

    return (
        #think about making this a list
        <div>
          {postAttributes.map((post) => <div key={post.id}><div><h3><a href={post.link}>{post.title}</a></h3></div><div>{post.pubdate} | {<Link to = {`/posts/${post.id}`} onClick={ (event) => {handleClick(event, post)} }>Comments</Link>}</div></div> )} 
        </div>

    );
  }

export default Post;
