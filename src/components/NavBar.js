import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar(props){
  return (
   <div className="pure-menu pure-menu-horizontal pure-menu-scrollable">
    <Link to="/posts" className='pure-menu-link pure-menu-heading'>Home</Link>
    <ul className="pure-menu-list">
        <li className="pure-menu-item"><Link to="/posts" className='pure-menu-link pure-menu-heading'>Home</Link></li>
        <li className="pure-menu-item"><Link to="/posts" className='pure-menu-link'>User</Link></li>
        <li className="pure-menu-item"><Link to="/posts" className='pure-menu-link'>Blogs</Link></li>
        <li className="pure-menu-item"><Link to="/posts" className='pure-menu-link'>UserPanel</Link></li>
    </ul>
</div>
  )
}

