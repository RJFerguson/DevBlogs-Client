import React from 'react'
import { AuthAdapter } from '../adapters/Posts_adapter.js'
import { withRouter } from 'react-router-dom'

export default function withAuth(WrappedComponent){
  class withAuth extends React.Component {
    componentDidMount(){
      if (!localStorage.getItem('jwt')) {
        this.props.history.push('/login')
      } else {
        AuthAdapter.currentUser()
          .then(user => {
            if (user.error) {
              this.props.history.push('/login')
            } else {
              this.props.history.push('/posts')
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