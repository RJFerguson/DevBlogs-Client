

class CommentList extends React.Component {
  constructor(props) {
    super(props);

  }
  
  render() {
  	var childNodes;
    var classObj;

    if (this.props.node.comments != null) {
      comments = this.props.node.comments.map(function(node, index) {
        return <li key={index}><CommentList node={node} /></li>
      });
    }


    return (
      <div>
          {this.props.node.title}
        <ul>
          {comments}
        </ul>
      </div>
    );
  }
}


ReactDOM.render(
  <CommentList node={props.post} />,
  document.getElementById("tree")
);