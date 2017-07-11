import React from 'react'
import {Button } from 'react-materialize'
import withPerm from '../hocs/withPerm.js'
class ToggleBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // toggle box is closed initially
      opened: false,
    };
    this.toggleBox = this.toggleBox.bind(this);
  }
  
  toggleBox() {
    // check if box is currently opened
    const { opened } = this.state;
    this.setState({
      // toggle value of `opened`
      opened: !opened,
    });
  }
  
  render() {
    const { title, children } = this.props;
    const { opened } = this.state;
    return (
      <div className="box">
        <div className="boxTitle" onClick={this.toggleBox}>
          <Button className="cmt-rply-btn">{title}</Button>
        </div>
        {opened && (
          <div className="boxContent">
            {children}
          </div>
        )}
      </div>
    );
  }
}

export default ToggleBox