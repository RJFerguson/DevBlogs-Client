import React from 'react';
import NewComment from './NewComment.js'
// import { Link } from 'react-router-dom';
import ToggleBox from './ToggleBox.js'
import './Comment.css'

import {Editor, EditorState, convertFromRaw} from 'draft-js';
import PrismDraftDecorator from './PrismDraftDecorator.js'
// const Immutable = require('immutable');
// const CodeUtils = require('draft-js-code')
var Prism = require('prismjs')
// var classNames = require('classnames');


class Comment extends React.Component {
  constructor(props) {
    super(props);
    let decorator = new PrismDraftDecorator(Prism.languages.javascript);
    const ContentState = convertFromRaw(JSON.parse(this.props.content));
    this.state = {editorState: EditorState.createWithContent(ContentState, decorator)};
  }
  //{/*<Editor editorState={this.state.editorState}  />*/}

  
  

  render() {
    return (
      <li className='commentColoring'>
        <Editor editorState={this.state.editorState}  />
        <ToggleBox title="Reply"><NewComment createComment={this.props.createComment } commentID={this.props.commentParentID}/></ToggleBox>
        <span>{this.props.children}</span>
      </li>
    );
  }
}


export default Comment