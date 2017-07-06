import React from 'react';
import { Link } from 'react-router-dom';
import { Collection, CollectionItem } from 'react-materialize'



const Post = ({postAttributes, handleClick}) =>  {
  if (!handleClick) {
    let post = postAttributes
    return (
      <Collection>
      { <div key={post.id}><div><h3>{post.title}</h3></div> <div> {post.company} | {post.pubdate} | {<Link to = {`/posts/${post.id}`}>Comments</Link>}</div></div> } 
      </Collection>
    )
  }

    return (
      <Collection>
        {postAttributes.map((post) => <CollectionItem key={post.id}><div><h3><a href={post.link}>{post.title}</a></h3></div><div> {post.company} | {post.pubdate} | {<Link to = {`/posts/${post.id}`} onClick={ (event) => {handleClick(event, post)} }>Comments</Link>}</div></CollectionItem> )} 
      </Collection>
    );
  }

export default Post;
