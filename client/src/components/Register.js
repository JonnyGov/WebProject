import {  Form, Button,Container ,Row,Col,Badge,Alert} from 'react-bootstrap'
import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

var onSubmit=()=>{}

const Register = ({ setAuto }) => {
    let History = useHistory()
    const [show, setShow] = useState(false);
    return (
        <Form onSubmit={onSubmit}  >
        <h1 >
        Register
        </h1>
        <Alert show={show} variant="warning">
              <Alert.Heading>Log in failed</Alert.Heading>
              <p>
               username or password incorrect
              </p>
              <hr />
              <div className="d-flex justify-content-end">
                <Button onClick={() => setShow(false)} variant="outline-warning">
                  Close
                </Button>
              </div>
            </Alert>
        <Col>
          <Form.Group   controlId="formGridUserName">
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="Chose your username" />
          </Form.Group>
      
          <Form.Group   controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Chose your password" />
          </Form.Group>
          <Form.Group   controlId="formGridPasswordAgain">
            <Form.Label>Rewrite Password</Form.Label>
            <Form.Control type="password" placeholder="Rewrite the chosen password , please avoid useing copy paste" />
          </Form.Group>
        </Col>
      <Col>
        <Form.Group  controlId="button" >
        <Row>
            <Col md={4}>
                <Button type="submit" block>Register</Button>
               
            </Col>
        </Row>
      
          </Form.Group>
       </Col>
      </Form>
    )}

export default Register