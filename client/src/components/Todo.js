import { Card, Form, Button,Container ,Row,Col,Badge,Alert,Tab,ListGroup} from 'react-bootstrap'
import React, { useState } from 'react';


const Task=({ task, index,  markTask, removeTask })=> {

    return (
      <div>
        <span style={{ textDecoration: task.isDone ? "line-through" : "" }}>{task.text}</span>
        <div>  
          <Button variant="outline-danger" size="sm"  className="float-right" onClick={() => removeTask(index)}>Remove</Button>
          <Button variant={ task.isDone ? "success" : "outline-success "}  size="sm" className="float-right" onClick={() => markTask(index)}>Done</Button>
        </div>
      </div>
    );
  }

  const TaskAdder=({ addTask }) =>{
    const [value, setValue] = useState("");
  
    const handleSubmit = event => {
        event.preventDefault();
      if (!value) return;
      addTask(value);
      setValue("");
    };
  
    return (
      <Form onSubmit={handleSubmit}> 
      <Form.Group>
        <Form.Label><b>Tasks:</b></Form.Label>
        <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new task" />
      </Form.Group>
        
        <Button   variant="primary" type="Add"className="float" size="lg">
            Add
        </Button>

    </Form>
    );
  }

const ToDo =()=> {

    const [tasks, setTasks] = useState([]);
    
      const addTask = text => {
        const newTasks = [...tasks, { text }];
        setTasks(newTasks);
      };
    
      const markTask = index => {
        const newTasks = [...tasks];
        if(newTasks[index].isDone == true)
        {
            newTasks[index].isDone =false
        }
        else
        {
            newTasks[index].isDone = true;
        }
        
        setTasks(newTasks);
      };
    
      const removeTask = index => {
        const newTask = [...tasks];
        newTask.splice(index, 1);
        setTasks(newTask);
      };
    
    return (
    <div >
        <h1 >Todo List</h1>
        <TaskAdder addTask={addTask} />
        <div>
          {tasks.map((task, index) => (
            <Card>
              <Card.Body>
                <Task
                key={index}
                index={index}
                task={task}
                markTask={markTask}
                removeTask={removeTask}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  

  /*
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

  */

  export default ToDo