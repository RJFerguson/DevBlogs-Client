import React from 'react';
import { UserAdapter }  from '../adapters/Posts_adapter.js'


class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }

  }

  componentDidMount(){
    UserAdapter.UserPage(this.props.match.params.id)
    .then( user => this.setState({ user: user, username: user.username }))
  }

 

  render() {
    return (
     <div>
       {this.state.username}
     </div>
    );
  }
}


export default User