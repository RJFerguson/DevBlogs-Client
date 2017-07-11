import React from 'react';
import { Button, Col, Row} from 'react-materialize'

const NewPage = (props) =>  {


    return (
      <Row> 
        <Col offset="s8 m9 l9">
          <Button className="nxt-pg-btn" onClick={ (event) => {props.handleClick(event)}}>Next Page</Button>
        </Col>
      </Row>
    );
  }

export default NewPage 