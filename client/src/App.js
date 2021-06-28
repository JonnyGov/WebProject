//import React from 'react'
import Login from './components/LogIn'
import Todo from './components/Todo'
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
      <Todo/>
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
        <Switch>
          <Route exact path="/">
          <div  className="center" >
            <Login setAuto={setAuthenticated}/>
            </div>
          </Route>  
          <Route path="/ToDo" render={requireAuth}>       
        </Route>
      </Switch>
    </Router>  
    </div>
    )
  
}

export default App