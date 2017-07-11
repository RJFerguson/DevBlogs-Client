import React from 'react';
import { Link } from 'react-router-dom';
import { Collection, CollectionItem } from 'react-materialize'
import "../stylesheets/post.css"


const Post = ({postAttributes, handleClick}) =>  {
  if (!handleClick) {
    let post = postAttributes
    return (
      <Collection>
      { <div key={post.id}><div className="col-story"><a href={post.link}><h4>{post.title}</h4></a></div> <div className="col-story"> {post.company} | {post.pubdate} | {<Link to = {`/posts/${post.id}`}>Comments</Link>}</div></div> } 
      </Collection>
    )
  }

  

    return (
      <Collection>
        {postAttributes.map((post) => <CollectionItem key={post.id}><div className="posts"><a href={post.link}>{post.title}</a></div><div> {post.company} | {post.pubdate} | {<Link to = {`/posts/${post.id}`} onClick={ (event) => {handleClick(event, post)} }>Comments({post.comments.length})</Link>}</div></CollectionItem> )} 
      </Collection>
    );
  }

export default Post;
