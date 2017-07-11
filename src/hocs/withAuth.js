import React from 'react'
import { AuthAdapter } from '../adapters/Posts_adapter.js'
import { withRouter } from 'react-router-dom'

export default function withAuth(WrappedComponent){
  class withAuth extends React.Component {
    componentDidMount(){
        if (localStorage.getItem('jwt')) {
      AuthAdapter.currentUser()
        .then(user => {
          if (!user.error) {
            this.setState({
              auth: {
                isLoggedIn: true,
                user: user
              }
            })
          }
        })
    }
    }

    render(){
      return <WrappedComponent {...this.props} />
    }
  }
  return withRouter(withAuth)
}