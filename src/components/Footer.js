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
        <li><a href="sass.html">Made By: Ryan Ferguson</a></li>
      </ul>
      <ul className="right">
        <li><a href="sass.html">GitHub</a></li>
        <li><a href="badges.html">LinkedIn</a></li>
      </ul>
    </div>
  </nav>
         
    )
  }
}