import { Card, Form, Button,Container ,Row,Col,Badge,Alert,Tab,ListGroup,Accordion} from 'react-bootstrap'
import React, { useState } from 'react';


const SubTask=({ task, index,  markTask, removeTask })=> {

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
const Task=({ task, index,  markTask, removeTask,tasks,setTasks})=> {

    const addsSubTask = text => {
        const newSubtasks = [...(task.subTasks), { isDone: false,text:text }]
        task.subTasks=newSubtasks
        const newTasks=tasks
        newTasks[index]=task
        setTasks(newTasks)
      }
    const removeSubTask = subIndex => {
        const newTask = [...(task.subTasks)]
        newTask.splice(subIndex, 1);
        task.subTasks=newTask;

        const newTasks = [...tasks]
        newTasks[index]=task
        setTasks(newTasks)
      }

      const markSubTask = subIndex => {
        const newTasks = [...tasks]
        const newTask = [...(task.subTasks)]
        if(newTask[subIndex].isDone == true)
        {
            newTask[subIndex].isDone =false
        }
        else
        {
            newTask[subIndex].isDone = true;
        }
        
        newTasks[index]=task
        setTasks(newTasks);
      };
    return (
        <Accordion defaultActiveKey="0">

        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1" >
            <div >
                <div>
                    <span  className="float-left" style={{ textDecoration: task.isDone ? "line-through" : "" }}>{task.text}</span>
                    
                </div>
            </div>
            </Accordion.Toggle>
                    <div>  
                    <Button variant="outline-danger" size="sm"  className="float-right" onClick={() => removeTask(index)}>Remove</Button>
                    <Button variant={ task.isDone ? "success" : "outline-success "}  size="sm" className="float-right" onClick={() => markTask(index)}>Done</Button>
                    </div>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
     
            <TaskAdder addTask={addsSubTask}/>
                {(task.subTasks).map((subTask,index) => {
                   return(
                       <Card>
                        <SubTask 
                        key={index}
                        index={index}
                        task={subTask}
                        markTask={markSubTask}
                        removeTask={removeSubTask}/>
                        </Card>
                    )
                    }
                )}
            
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
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
      <Form onSubmit={handleSubmit} > 
      <Form.Group>
        <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new task" />
      </Form.Group >
      <Form.Group >
        <Button   variant="primary" type="Add"className="float" size="lg" block>
            Add
        </Button>
        </Form.Group >
        <Form.Group>
        <Form.Label><b>Tasks:</b></Form.Label>
        </Form.Group>
    </Form>
    );
  }

const ToDo =({inputList})=> {

    const [tasks, setTasks] = useState(inputList.tasks);
    
      const addTask = text => {
        const newTasks = [...tasks, { isDone: false,text:text,subTasks:[] }];
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
        <h1 >{inputList.name}</h1>
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
                tasks={tasks} 
                setTasks={setTasks}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  


  const suBatask={isDone: true,text:"suBatask"}
  const suBatask2={isDone: false,text:"suBatask2"}
  const suBatask3={isDone: false,text:"suBatask3"}

  const atask={isDone: false,text:"atask",subTasks:[suBatask,suBatask2,suBatask3]}
  const List = {name:"ListName", tasks:[atask,atask]}
  

const ToDoContainer = ({InputLists}) => {

    InputLists=[List,List,List]

    const [Lists, setTasks] = useState(InputLists);
    return (
<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
  <Row>
    <Col sm={4}>
      <ListGroup>
        {Lists.map((list,index) => <ListGroup.Item action href={`#${list.name}_${index}`}> {`${list.name}`} </ListGroup.Item>)}
      </ListGroup>
    </Col>
    <Col sm={8}>
      <Tab.Content>

        {Lists.map((list,index) => {
        return(<Tab.Pane eventKey={`#${list.name}_${index}`}>
             <ToDo inputList={list}/>
            </Tab.Pane>)
        })}
      </Tab.Content>
    </Col>
  </Row>
</Tab.Container>
      
  )}

  

  export default ToDoContainer