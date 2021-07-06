import {  Navbar, Nav,NavDropdown ,Form,FormControl,Button} from 'react-bootstrap'
const isLog=false;

const Navigator = ({ setAuto }) => {
    // ...
    return (
<Navbar bg="light" expand="lg">
  <Navbar.Brand href="Home">ToDo-Home</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <NavDropdown title="User" id="basic-nav-dropdown">
              <NavDropdown.Item href="Register">register</NavDropdown.Item>
              <NavDropdown.Item href="Login">LogIn</NavDropdown.Item>
        <NavDropdown.Divider />
      </NavDropdown>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
    )}
export default Navigator