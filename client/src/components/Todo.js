
import {  Form, Button,Container ,Row,Col,Badge,Alert,Tab,ListGroup} from 'react-bootstrap'
import React, { useState } from 'react';




const ToDo = (props) => {
    // ...1

    return (
<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
  <Row>
    <Col sm={4}>
      <ListGroup>
        <ListGroup.Item action href="#link1">
          Link 1
        </ListGroup.Item>
        <ListGroup.Item action href="#link2">
          Link 2
        </ListGroup.Item>
      </ListGroup>
    </Col>
    <Col sm={8}>
      <Tab.Content>
        <Tab.Pane eventKey="#link1">
            
        </Tab.Pane>
        <Tab.Pane eventKey="#link2">
            
        </Tab.Pane>
      </Tab.Content>
    </Col>
  </Row>
</Tab.Container>
      
  )}

  export default ToDo