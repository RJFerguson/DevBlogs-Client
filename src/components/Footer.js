import React from 'react';
// import {Navbar, NavItem, Row, Col} from 'react-materialize'



export default class PersonalFooter extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <nav>
    <div className="nav-wrapper">
     <ul className="left">
        <li><a href="/posts">Made By: Ryan Ferguson</a></li>
      </ul>
      <ul className="right">
        <li><a href="/posts">GitHub</a></li>
        <li><a href="/posts">LinkedIn</a></li>
      </ul>
    </div>
  </nav>
         
    )
  }
}