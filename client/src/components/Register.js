import {  Form, Button,Container ,Row,Col,Badge,Alert} from 'react-bootstrap'
import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
const sc=require("../services/serverCom.js");

var setNotefunc=()=>{}
var setNoteTextfunc=()=>{}
var setNoteVarfunc=()=>{}

var history=null

const onSuccess=()=>
{
  console.log("onSuccess")
  setNoteVarfunc("success")
  setNoteTextfunc("Registerd successfuly")
  setNotefunc(true)
}

const onFailure=()=>
{
  console.log("onFailure")
  setNoteVarfunc("warning")
  setNoteTextfunc("User exists")
  setNotefunc(true)
}


var onSubmit=(event)=>{


  event.preventDefault();
  
  const form = event.currentTarget
  console.log("formGridUserName")
  console.log(form.formGridUserName.value)

  console.log("formGridPassword")
  console.log(form.formGridPassword.value)

  console.log("formGridPasswordAgain")
  console.log(form.formGridPasswordAgain.value)

  const username=form.formGridUserName.value
  const password=form.formGridPassword.value
  const PasswordAgain=form.formGridPasswordAgain.value
  if(password!==PasswordAgain){
    setNoteTextfunc("Passwords dont match")
    setNoteVarfunc("warning")
    setNotefunc(true)
    return
  }
  sc.register(username,password,onSuccess,onFailure)


}

const Register = ({ setAuto }) => {
    let History = useHistory()
    history=History
    const [show, setShow] = useState(false);
    const [notificationText,setNotificationText]=useState("empty")
    const [notificationVariant,setNotificationVariant]=useState("warning")
    setNotefunc=setShow
    setNoteTextfunc=setNotificationText
    setNoteVarfunc=setNotificationVariant
    return (
        <Form onSubmit={onSubmit}  >
        <h1 >
        Register
        </h1>

        <Alert show={show} variant={`${notificationVariant}`} >
              <Alert.Heading>Registration info</Alert.Heading>
              <p>
                {notificationText}
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