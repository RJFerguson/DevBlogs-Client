import React from 'react';
import { Button, Col, Row} from 'react-materialize'

const NewPage = (props) =>  {


    return (
      <Row> 
        <Col offset="s9">
          <Button waves='light' onClick={ (event) => {props.handleClick(event)}}>Next Page</Button>
        </Col>
      </Row>
    );
  }

export default NewPage 