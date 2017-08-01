import React, { Component } from 'react'
// import {Input} from 'react-materialize'
class LoginForm extends Component {

  constructor(){
    super()
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onSubmit( this.state )
    this.setState({username: '', password: ''})
  }

  // handleFB(e){
  //   e.preventDefault()
  //   fetch('http://localhost:3000/api/v1',{

  //   })
  //   fetch("https://api.twitter.com/oauth/request_token", {
  //     method: 'POST',
  //     headers:  "Authorization" = 'OAuth oauth_consumer_key="Dt8pDD6gmBxpN4R8alNrjpYLS",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1499971714",oauth_nonce="yzSJqlZ90FN",oauth_version="1.0",oauth_signature="LpBHACzHvsNntasLxxoi3XplMoU%3D"'  

  //   })
  //   .then(res => res.json())
  //   .then(resp => console.log(resp))
  //   // window.open("https://api.twitter.com/oauth/authenticate?oauth_token=x70VhQAAAAAA1fXgAAABXT0uLmM")
  //   // const oauth_token="x70VhQAAAAAA1fXgAAABXT0uLmM"
  //   // oauth_token_secret="CyVPN9Dt7c2AE69zFMhPhflR82vWF65l"
  // }

  render(){
    return (
      <div>
      <form onSubmit={this.handleSubmit} >
        <label>Username</label>
        <input  type='text' value={this.state.username} name="username" onChange={this.handleChange}/>
        <label>Password</label>
        <input  type='password' value={this.state.password} name="password" onChange={this.handleChange}/>
        <input type="submit" />
      </form>
      {/* <button onClick={this.handleFB}>Log-in with twit</button> */}
      </div>
    )
  }
}


// function headers(){
//   return {
//     Authorization: 'OAuth oauth_consumer_key="Dt8pDD6gmBxpN4R8alNrjpYLS",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1499971714",oauth_nonce="yzSJqlZ90FN",oauth_version="1.0",oauth_signature="LpBHACzHvsNntasLxxoi3XplMoU%3D"'  
// }



export default LoginForm