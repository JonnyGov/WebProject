import {  Form, Button,Container ,Row,Col,Badge} from 'react-bootstrap'

const onSubmit=(event)=>
{
  event.preventDefault();
  
  const form = event.currentTarget
  console.log("formGridUserName")
  console.log(form.formGridUserName.value)

  console.log("formGridPassword")
  console.log(form.formGridPassword.value)

  form.formGridUserName.value=""
  form.formGridPassword.value=""

}

const LogIn = (props) => {
    // ...
    return (
<Form onSubmit={onSubmit} >
<h1>
  Sign in
  </h1>
  <Col>
    <Form.Group   controlId="formGridUserName">
      <Form.Label>Username</Form.Label>
      <Form.Control type="username" placeholder="Enter username" />
    </Form.Group>

    <Form.Group   controlId="formGridPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
  </Col>
<Col>
  <Form.Group  controlId="button" >
  <Row>
      <Col md={4}>
          <Button type="submit">Sign in</Button>
      </Col>
  </Row>

    </Form.Group>
 </Col>
</Form>
      
  )}


  export default LogIn