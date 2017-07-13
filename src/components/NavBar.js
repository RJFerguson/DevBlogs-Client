import React from 'react'
import { Link} from 'react-router-dom'

export default function NavBar(props){
    
  return (
    <nav>
    <div className="nav-wrapper">
      <Link to="/posts" className="brand-logo navBrand" onClick={ (event) => {props.handleHome(event)}}>DevBlogs</Link>
      <a data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
      <ul className="right hide-on-med-and-down">
        <li><Link to="/posts"  onClick={ (event) => {props.handleHome(event)}}>Home</Link></li>
        <li><a href="/posts">About</a></li>
        <li>{((props.title) ? <Link to='/posts' onClick={props.logout}>LOG-OUT</Link> : <Link to="/login">Login</Link> )}</li>
      </ul>
      <ul className="side-nav" id="mobile-demo">
        <li><Link to="/posts"  onClick={ (event) => {props.handleHome(event)}}>Home</Link></li>
        <li>{((props.title) ? <Link to='/posts' onClick={props.logout}>LOG-OUT</Link> : <Link to="/login">Login</Link> )}</li>
        <li><a href="collapsible.html">Javascript</a></li>
        <li><a href="mobile.html">Mobile</a></li>
      </ul>
    </div>
  </nav>  
      )
    
}




        
