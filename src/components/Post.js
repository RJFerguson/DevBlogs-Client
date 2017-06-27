import React, { Component } from 'react';


function Post (props) {
  console.log(props.postAttributes)
    return (
      <div>
        <p>{props.postAttributes.title}</p>
      </div>
    );
  }


export default Post;
