import React from 'react';
import {Navbar, NavItem, Row, Col} from 'react-materialize'



export default class PersonalFooter extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <Navbar>
        <NavItem>Made By: Ryan Ferguson</NavItem>
      </Navbar>
    )
  }
}