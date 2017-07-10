import React, { Component } from 'react';
import { Row, Input } from 'react-materialize';

export default class SearchBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchTerm: ""
    }
  }

  onInputChange(term){
    this.setState({
      searchTerm: term
    },() => this.props.search(this.state.searchTerm))
  }

  render(){
    return(
      <div>
        <Row className="searchBarRow">
          <Input s={12} className="searchBarRow" label="Search for a Topic" value={this.state.searchTerm} onChange={event => this.onInputChange(event.target.value)}/>
        </Row>
      </div>
    )
  }
}