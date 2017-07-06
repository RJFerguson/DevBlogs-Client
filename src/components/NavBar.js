import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import {Navbar, NavItem } from 'react-materialize'

export default function NavBar(props){
  return (


  <Navbar href='/posts' brand='DevBlogs' right>
	  <NavItem to="/posts"  onClick={ (event) => {props.handleClick(event)}}>Home</NavItem>
	  <NavItem href='/login'>Log In</NavItem>
  </Navbar>
  //  <nav>
  //   <div className="nav-wrapper">
  //   <p class="brand-logo center">Logo</p>
  //     <ul className="left hide-on-med-and-down">
  //       <li className="active"><NavLink to="/posts"  onClick={ (event) => {props.handleClick(event)}}>Home</NavLink></li>
  //       <li><Link to="/posts" >User</Link></li>
  //       <li><Link to="/posts">User</Link></li>
  //     </ul>
  //   </div>
  // </nav>
  )
}



        
