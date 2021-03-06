import '../stylesheets/editor.css'
import '../stylesheets/prism.css'
import {Button} from 'react-materialize'
const Draft = require('draft-js');
const React = require('react');
const Immutable = require('immutable');

const CodeUtils = require('draft-js-code')
var Prism = require('prismjs')

const {
    Editor,
    EditorState,
    RichUtils, 
    convertToRaw
} = Draft;


const {Map, List} = Immutable;

class NewComment extends React.Component {
  constructor(props) {
    super(props);
    var decorator = new PrismDraftDecorator(Prism.languages.javascript);
    this.state = {editorState: EditorState.createEmpty(decorator)};

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});
    this.keyBindingFn = (e) => this._keyBindingFn(e);
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.onTab = (e) => this._onTab(e);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.onReturn = (e) => this._onReturn(e);
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  _handleKeyCommand(command) {
    const {editorState} = this.state;
    let newState;

    if (CodeUtils.hasSelectionInBlock(editorState)) {
        newState = CodeUtils.handleKeyCommand(editorState, command);
    }

    if (!newState) {
        newState = RichUtils.handleKeyCommand(editorState, command);
    }

    if (newState) {
        this.onChange(newState);
        return true;
    }
    return false;
  }

  _keyBindingFn(e) {
    let editorState = this.state.editorState;
    let command;

    if (CodeUtils.hasSelectionInBlock(editorState)) {
        command = CodeUtils.getKeyBinding(e);
    }
    if (command) {
        return command;
    }

  }

  _onTab(e) {
    let editorState = this.state.editorState;

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
        return;
    }

    this.onChange(
        CodeUtils.handleTab(e, editorState)
    )
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }


  _onReturn(e) {
      let editorState = this.state.editorState;

      if (!CodeUtils.hasSelectionInBlock(editorState)) {
          return;
      }

      this.onChange(
          CodeUtils.handleReturn(e, editorState)
      )
      return true;
  }

  handleSubmit(event){
    event.preventDefault()

    const rawDraftContentState = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
    if(this.props.commentID){
      this.props.createComment(rawDraftContentState, this.props.commentID)
    } else{
      this.props.createComment(rawDraftContentState)
    }
  }

  render() {
    const {editorState} = this.state;

    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
    <form className= "pure-form" onSubmit={this.handleSubmit}>
      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <div className={className} onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            onTab={this.onTab}
            placeholder="Tell a story..."
            ref="editor"
            spellCheck={true}
          />
        </div>
          <Button  onClick={this.handleSubmit} className="btn-flat">Submit</Button>
      </div>
    </form>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

class PrismDraftDecorator {
  constructor(grammar) {
    this.grammar = grammar;
    this.highlighted = {};
  }
  getDecorations(block) {
    var blockType = block.getType();
    var blockKey = block.getKey();
    var blockText = block.getText();
    var decorations = Array(blockText.length).fill(null);

    this.highlighted[blockKey] = {};

    if (blockType !== 'code-block') {
      return List(decorations);
    }

    var tokens = Prism.tokenize(blockText, this.grammar);

    var offset = 0;
    var that = this;

    tokens.forEach(function(tok) {
      if (typeof tok === 'string') {
        offset += tok.length;
      } else {
        var tokId = 'tok'+offset;
        var completeId = blockKey + '-' + tokId;
        that.highlighted[blockKey][tokId] = tok;
        occupySlice(decorations, offset, offset + tok.content.length, completeId);
        offset += tok.content.length;
      }
    });
    return List(decorations);
  }
  getComponentForKey(key) {
    return function(props) {
      return <span {...props} className={'token ' + props.tokType}>{props.children}</span>;
    }
  }
  getPropsForKey(key) {
    var parts = key.split('-');
    var blockKey = parts[0];
    var tokId = parts[1];
    var token = this.highlighted[blockKey][tokId];
    return {
      tokType: token.type
    };
  }
}
function occupySlice(targetArr, start, end, componentKey) {
  for (var ii = start; ii < end; ii++) {
    targetArr[ii] = componentKey;
  }
}

export default NewComment


