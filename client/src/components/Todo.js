import { Card, Form, Button,Container ,Row,Col,Badge,Alert,Tab,ListGroup,Accordion,Modal} from 'react-bootstrap'
import React, { useState,useEffect } from 'react';
import {update,data} from '../services/serverCom'
const ListsComponent = ({InputLists,size,setList,setInputLists})=>{
  const addList = text => {
    const newList = [...InputLists, {name:text, tasks:[]}];
    setInputLists(newList);
  };
  if (InputLists == null) InputLists=[]
  if (!Array.isArray(InputLists)) InputLists=[]
  return (
<Col sm={size}>
      <ListGroup>
      <TaskAdder addTask={addList}size={"sm"} name={"list"}/>
        {InputLists.map((list,index) => <ListGroup.Item onClick={()=> setList(list)} action href={`#${list.name}_${index}`}> {`${list.name}`} </ListGroup.Item>)}
        
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
  useEffect(()=>{
    _updateData()

  },[isDone])
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
  let _setTaskName
const Task=({ myTask,removeTask,index})=> {
  const [isDone,setIsDone]= useState(myTask.isDone)
  const [subTasks,setSubTasks]= useState(myTask.subTasks)
  const [taskName,setTaskName] = useState(myTask.text)
    const addsSubTask = text => {
        const newSubtasks = [...(myTask.subTasks), { isDone: false,text:text }]
        myTask.subTasks=newSubtasks
        setSubTasks(myTask.subTasks)
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
        _setTaskName=setTaskName
        showTaskDetails();
        _setSelectedTask(myTask)
        
      }
      useEffect(()=>{
        _updateData()

      },[subTasks,isDone])
      useEffect(()=>{
        setTaskName(myTask.text)

      },[myTask.text])
    return (
        <Accordion defaultActiveKey="0">

        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1" >
            <div >
                <div>
                    <span  className="float-left" style={{ textDecoration: myTask.isDone ? "line-through" : "" }}>{taskName}</span>
                    
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

const ListDetails =({list,size})=> {

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
      useEffect(()=>{
        _updateData()

      },[tasks])
      if (list==undefined || list == null) return null
    return (
      <Col sm={size}>
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
      </Col>
    );
  };
  
let showTaskDetails
const TaskForm= ()=>{
  }
 
let _setShowTaskDetails=null
let _setSelectedTask=null
let _selectedTask=null;
let _showTaskDetails=null
let _updateData
export let global_setData
let counter=0
const ToDoContainer = () => {
  
    const [localData,setData]= useState(data)
    const [InputLists,setInputLists] = useState(JSON.parse(localData.lists))
    global_setData=setData

    function updateData(){
      counter++
      setTimeout(() => {
        data.lists=JSON.stringify(InputLists)
        update({username:localData.username,password:localData.password,lists:InputLists},()=>{},()=>{})
        counter--
      }, counter*2000)
      
    }
    _updateData=updateData
    useEffect(()=>
      {
        
          if (localData==null || localData== undefined){
            setData({username:"",password:"",lists:"[]"})
            setInputLists(JSON.parse(localData.lists))
            return
          }
          
          setInputLists(JSON.parse(localData.lists))
          

      },[localData]
    )
    useEffect(()=>
      {
          if (localData.username=="" || localData== undefined){
            return
          }
          if (typeof(InputLists)!="string"){
              updateData()
            return
          }
          

      },[InputLists]
    )
    const [list,setList]= useState(InputLists[0]);
    
  //JSON.parse(JSON.stringify(List))
    //InputLists=[List1,List2]
   
    function testList(list){
      if (list!=null) return <ListDetails  list={list} setList={setList} size={7}/>
    }
    
    return (
<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1" >
  <Row style={{ marginLeft: 15, marginRight: 15 }}>
  <ListsComponent setInputLists={setInputLists} InputLists = {InputLists} size={4} setList={setList} ></ListsComponent> 
      
  {testList(list)}
  <TaskDetails/>
  </Row>
</Tab.Container>
      
  )
  }
  const TaskDetails=()=>{     
    const EmptyTask= {text:"",desc:"",date:"1111-11-11"}
    const [selectedTask, setSelectedTask] = useState(EmptyTask);
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    showTaskDetails=handleShow
    _setSelectedTask=setSelectedTask
    _selectedTask=selectedTask
    const onSubmit=(event)=>
    {
      event.preventDefault();
      const form = event.currentTarget
      const title=form.task.value
      const desc=form.taskdesc.value
      const date=form.date.value
      selectedTask.text=title
      selectedTask.desc=desc
      selectedTask.date=date
      _setTaskName(title)
      _updateData()
      setShow(false)
      

    }
      return (
      
      <>
        <Modal show={show} onHide={handleClose}>
        <Form onSubmit={onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Task Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          
      <Form.Group controlId="task">
        <Form.Label>Task</Form.Label>
        <Form.Control type="text" defaultValue={selectedTask.text}/>
      </Form.Group>
      <Form.Group controlId="taskdesc">
        <Form.Label>Description</Form.Label>
        <Form.Control  as="textarea" rows={3} defaultValue={selectedTask.desc} />
      </Form.Group>
      <Form.Group controlId="date">
        <Form.Label> Due Date:</Form.Label>
        <Form.Control type="date"  defaultValue={selectedTask.date} />
      </Form.Group>
      
    
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
        Save Changes
      </Button>
            
          </Modal.Footer>
          </Form>
        </Modal>
     
      
      
    </>
        )
  }
  export default ToDoContainer