import { Card, Form, Button,Container ,Row,Col,Badge,Alert,Tab,ListGroup,Accordion} from 'react-bootstrap'
import React, { useState,useEffect } from 'react';

const ListsComponent = ({InputLists,size,setList})=>{
  const [lists, setLists] = useState(InputLists)
  const addList = text => {
    const newList = [...lists, {name:text, tasks:[]}];
    setLists(newList);
  };
  return (
<Col sm={size}>
      <ListGroup>
      <TaskAdder addTask={addList}size={"sm"} name={"list"}/>
        {lists.map((list,index) => <ListGroup.Item onClick={()=> setList(list)} action href={`#${list.name}_${index}`}> {`${list.name}`} </ListGroup.Item>)}
        
      </ListGroup>
    </Col>
    );
  }
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const SubTask=({ subTask, removeSubTask,index})=> {
  const [isDone,setIsDone]= useState(SubTask.isDone)
  function markTask () {
    subTask.isDone=!subTask.isDone
    setIsDone(subTask.isDone)
    
  };
  if (subTask==null) return null;
  else
    return (
      <div>
        <span style={{ textDecoration: subTask.isDone ? "line-through" : "" }}>{subTask.text}</span>
        <div>  
          <Button variant="outline-danger" size="sm"  className="float-right" onClick={() => removeSubTask(index)}>Remove</Button>
          <Button variant={ subTask.isDone ? "success" : "outline-success "}  size="sm" className="float-right" onClick={() => markTask()}>Done</Button>
        </div>
      </div>
    );
  }
const Task=({ myTask,removeTask,index})=> {
  const [isDone,setIsDone]= useState(myTask.isDone)
  const [subTasks,setSubTasks]= useState(myTask.subTasks)
    const addsSubTask = text => {
        const newSubtasks = [...(myTask.subTasks), { isDone: false,text:text }]
        myTask.subTasks=newSubtasks
      }
    const removeSubTask = subIndex => {
      
        const newTask = [...(myTask.subTasks)]
        newTask.splice(subIndex, 1);
        myTask.subTasks=newTask;
        setSubTasks(myTask.subTasks)

      }
      function markTask () {
        myTask.isDone=!myTask.isDone
        setIsDone(myTask.isDone)
        
      };
      function showDetails(){
        if (_selectedTask!==myTask){
         if (_setSelectedTask!=null) _setSelectedTask(myTask)
          _setShowTaskDetails(true)
        }
        else{
          _setShowTaskDetails(!_showTaskDetails)
        }
      }
    return (
        <Accordion defaultActiveKey="0">

        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1" >
            <div >
                <div>
                    <span  className="float-left" style={{ textDecoration: myTask.isDone ? "line-through" : "" }}>{myTask.text}</span>
                    
                </div>
            </div>
            </Accordion.Toggle>
                    <div>  
                    <Button variant="outline-danger" size="sm"  className="float-right" onClick={() => removeTask(index)}>Remove</Button>
                    <Button variant={ myTask.isDone ? "success" : "outline-success "}  size="sm" className="float-right" onClick={()=>markTask()}>Done</Button>
                    <Button variant="outline-info" size="sm"  className="float-left" onClick={() => showDetails() }>Details</Button>

                    </div>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
     
            <TaskAdder addTask={addsSubTask}size={"sm"} name={"sub task"} />
                {(myTask.subTasks).map((subTask,index) => {
                   return(
                       <Card>
                        <SubTask 
                        index={index}
                        subTask={subTask}
                        removeSubTask={removeSubTask}/>
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



  const TaskAdder=({ addTask,size,name }) =>{
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
        <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder={`Add new ${name}`} />
      </Form.Group >
      <Form.Group >
        <Button   variant="primary" type="Add"className="float" size={size} block>
            Add
        </Button>
        </Form.Group >
        <Form.Group>
        <Form.Label>
          <b>{`${capitalizeFirstLetter(name)}s:`}</b>
          </Form.Label>
        </Form.Group>
    </Form>
    );
  }

const ListDetails =({list})=> {

    const [tasks, setTasks] = useState(list.tasks);
  
      const addTask = text => {
        const newTasks = [...list.tasks, { isDone: false,text:text,subTasks:[] }];
        setTasks(newTasks);
        list.tasks=newTasks
      };
      const removeTask = index => {
        const newTask = [...list.tasks];
        newTask.splice(index, 1);
        setTasks(newTask);
        list.tasks=newTask
      };

    return (
    <div >
        <h1 >{list.name}</h1>
        <TaskAdder addTask={addTask}size={"lg"} name={"task"} />
        <div>
          {list.tasks.map((task, index) => (
            <Card>
              <Card.Body>
                <Task 
                index={index}
                myTask={task}
                removeTask={removeTask}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    );
  };
  


const TaskForm= ()=>{
  const [selectedTask, setSelectedTask] = useState({text:"",desc:"",date:""});
  _setSelectedTask=setSelectedTask
  _selectedTask=selectedTask
  const onSubmit=(event)=>
  {
    event.preventDefault();
  }
  
    return (<Form onSubmit={onSubmit}>
    <Form.Group controlId="task">
      <Form.Label>Task</Form.Label>
      <Form.Control type="text" defaultValue={_selectedTask.text}/>
    </Form.Group>
    <Form.Group controlId="taskdesc">
      <Form.Label>Description</Form.Label>
      <Form.Control  as="textarea" rows={3} defaultValue={_selectedTask.desc} />
    </Form.Group>
    <Form.Group controlId="date">
      <Form.Label> Due Date:</Form.Label>
      <Form.Control type="date"  defaultValue={_selectedTask.date} />
    </Form.Group>
    <Button variant="secondary" type="submit">
      Save Changes
    </Button>
  </Form>
      )}


  const suBatask={isDone: true,text:"suBatask"}
  const suBatask2={isDone: false,text:"suBatask2"}
  const suBatask3={isDone: false,text:"suBatask3"}

  const atask={isDone: false,text:"atask",subTasks:[suBatask,suBatask2,suBatask3],date: "1990-03-04",desc:"afljhasdfhasdjkfh asdfhljasdhf /n akdfj;asd"}
  const atask1={isDone: false,text:"atask1",subTasks:[suBatask,suBatask2,suBatask3],date: "1990-05-04",desc:"afljhasdfhasdjsadsadkfh asdfhljasdhf /n akdfj;asd"}
  const atask2={isDone: false,text:"atask2",subTasks:[suBatask,suBatask2,suBatask3],date: "1990-04-04",desc:"afljhasdfhasdjkfasdasdh asdfhljasdhf /n akdfj;asd"}
  const atask3={isDone: false,text:"atask3",subTasks:[suBatask,suBatask2,suBatask3],date: "1990-06-04",desc:"afljhasdfhasdjsadsadkfh asdfhljasdhf /n akdfj;asd"}
  const List1 = {name:"ListName1", tasks:[atask1,atask2]}
  const List2 = {name:"ListName2", tasks:[atask,atask3]}
 
let _setShowTaskDetails=null
let _setSelectedTask=null
let _selectedTask=null;
let _showTaskDetails=null
const ToDoContainer = ({InputLists}) => {

  //JSON.parse(JSON.stringify(List))
    InputLists=[List1,List2]
    const [list,setList]= useState(InputLists[0]);
    
    //creates deep copys
    //InputLists=[JSON.parse(JSON.stringify(List)),JSON.parse(JSON.stringify(List)),JSON.parse(JSON.stringify(List))]
    return (
<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
  <Row>
  <ListsComponent InputLists = {InputLists} size={4} setList={setList} ></ListsComponent>     
  <ListDetails  list={list} setList={setList}/>
  <TaskDetails />
  </Row>
</Tab.Container>
      
  )
  }
  const TaskDetails=()=>{     
    
    const [showTaskDetails, setShowTaskDetails] = useState(false);
    const [selectedTask, setSelectedTask] = useState({text:"",desc:"",date:""});
    _setSelectedTask=setSelectedTask
    _selectedTask=selectedTask
    _setShowTaskDetails=setShowTaskDetails
    _showTaskDetails=showTaskDetails
    if(showTaskDetails){
    return(
      
          <Col  sm={4}>
            <TaskForm selectedTask={selectedTask}/>
          </Col> 
      )
    }else return null
  }
  export default ToDoContainer