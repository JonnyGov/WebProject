//import React from 'react'
import Login from './components/LogIn'
import Register from './components/Register'
import ToDoContainer from './components/Todo'
import Navigator from './components/Navigator'
import Home from './components/Home'
import { useHistory } from "react-router-dom";
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";




const App = (props) => {
  const [Authenticated, setAuthenticated] = useState(false);

  function requireAuth ()
  {
    if(Authenticated){ 
      return (
    <div  className="centerLarge" >
      <ToDoContainer/>
      </div>

      )
    }
    else
    {
      return <Redirect to="/"/>
    }
  }

  return(

    <div >
      
    <Router>    
    <Navigator></Navigator>
        <Switch>
          <Route exact path="/Login">
          <div  className="center" >
            <Login setAuto={setAuthenticated}/>
            </div>
          </Route>  
          <Route path="/ToDo" render={requireAuth}></Route>
        <div className="center">
        <Route path="/Register" render={()=>{return(<Register/>)}}></Route>
        <Route path="/Home" render={()=>{return(<Home/>)}}></Route>
        </div>
          
      </Switch>
    </Router>  
    </div>
    )
  
}

export default App