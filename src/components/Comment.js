import React from 'react';
import NewComment from './NewComment.js'
import ToggleBox from './ToggleBox.js'
import './Comment.css'
import '../stylesheets/editor.css'
import withAuth from '../hocs/withAuth.js'
import { UserAdapter }  from '../adapters/Posts_adapter.js'
import {Link} from 'react-router-dom'

import {Editor, EditorState, convertFromRaw} from 'draft-js';
import PrismDraftDecorator from './PrismDraftDecorator.js'
var Prism = require('prismjs')
const Immutable = require('immutable');
const {Map, List} = Immutable;

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.State = {
    auth: {
      isLoggedIn: false
        },
    username: ""
      }
    let decorator = new PrismDraftDecorator(Prism.languages.javascript);
    const ContentState = convertFromRaw(JSON.parse(this.props.content));
    this.state = {editorState: EditorState.createWithContent(ContentState, decorator)};
  }

  componentDidMount(){ 
    UserAdapter.CommentUser(this.props.user)
    .then( user => this.setState({ username: user.username }))
  }

  LoginCheck(){
    if (this.state.auth.isLoggedIn){
      <ToggleBox title="Reply"><NewComment createComment={this.props.createComment } commentID={this.props.commentParentID}/></ToggleBox>
    } else {

    }
  }

  render() {
    return (
      <li className='commentColoring'>
        <Link to = {`/users/${this.props.user}`}><p className="user-name-box">{this.state.username}</p></Link>
        <Editor editorState={this.state.editorState} readOnly={true}/>
        <ToggleBox title="Reply"><NewComment createComment={this.props.createComment } commentID={this.props.commentParentID}/></ToggleBox>
        <span>{this.props.children}</span>
      </li>
    );
  }
}
// { <Link to = {`/user/${this.props.user}`}><p className="user-name-box">{this.state.username}</p></Link>}

// let post_url = event.target.closest("a").getAttribute('href')
//      this.props.history.push(post_url)

export default withAuth(Comment)