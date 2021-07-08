import {  Navbar, Nav,NavDropdown ,Form,FormControl,Button} from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import React, { useState } from 'react';
export let SetUser
let history = null
const Navigator = () => {
  let History = useHistory()
    history= History
    // ...
    const [user, setUser] = useState({name:"guest",isLog:false});
    
    SetUser=setUser
    let dropDown=null;
    function logOut(){
      setUser({name:"guest",isLog:false})
      History.replace("/Home") 
       
    }
    if (!user.isLog){
      dropDown=<NavDropdown title={user.name} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={()=>{History.replace("/Register")}}>Register</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{History.replace("/LogIn")}}>LogIn</NavDropdown.Item>
        <NavDropdown.Divider />
      </NavDropdown>
    }else{
      dropDown=<NavDropdown title={user.name} id="basic-nav-dropdown">
         <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={()=>{History.replace("/ToDo")}}>To Do List</NavDropdown.Item>
      </NavDropdown>
    }
     
    return (
<Navbar bg="light" expand="lg">
  <Navbar.Brand onClick={()=>{History.replace("/Home")}}>ToDo</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    <Nav.Link onClick={()=>{History.replace("/Home")}}>Home</Nav.Link>
      {dropDown}
    </Nav>
  </Navbar.Collapse>
</Navbar>
    )}
export default Navigator
