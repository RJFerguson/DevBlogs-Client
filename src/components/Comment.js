import React from 'react';
import "./Comment.css"


const  Comment = (props) =>  {
  return (
    <li>
      {props.name}
      {props.children}
    </li>
  );
}

export default Comment