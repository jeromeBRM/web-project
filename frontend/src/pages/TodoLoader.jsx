import { Navigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import TaskList from '../components/TaskList';
import SidePanel from '../components/SidePanel';

function TodoLoader(props) {
    const { todoId } = useParams();

    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [list, setList] = useState({id: -1, description: ""});
    const [newTaskName, setNewTaskName] = useState("");
    const [tasks, setTasks] = useState([]);

    const [sidePanel, setSidePanelDisplay] = useState({visible:false, focusedTask:null});
    const [taskUpdateFields, setTaskUpdateFields] = useState({title:"", deadline:"", description:""});

    useEffect(() => {
      getList(todoId);
      getTasks(todoId);
    }, [todoId]);

    const getTasks = async (listId) => {
      await fetch("http://localhost:4200/api/task/", {
        body: JSON.stringify({
          list_id: listId
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        method: "post"
      }).then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then((responseJson) => {
        setTasks(responseJson);
      })
      .catch((error) => {
      });
    }

    const addNewTask = async (id, ntn) => {
      await fetch("http://localhost:4200/api/task/create", {
        body: JSON.stringify({
          list_id: id,
          title: ntn
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        method: "post"
      }).then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then((responseJson) => {
        getTasks(todoId);
      })
      .catch((error) => {
      });
    }

    const updateTask = async () => {
      await fetch("http://localhost:4200/api/task/update", {
        body: JSON.stringify({
          id: sidePanel.focusedTask.id,
          title: taskUpdateFields.title,
          deadline: taskUpdateFields.deadline,
          description: taskUpdateFields.description
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        method: "post"
      }).then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then((responseJson) => {
        getTasks(todoId);
        setSidePanelDisplay({visible:false, focusedTask:null});
        setTaskUpdateFields({title:"", deadline:"", description:""});
      })
      .catch((error) => {
      });
    }

    const deleteTask = async (taskId) => {
      await fetch("http://localhost:4200/api/task/delete", {
        body: JSON.stringify({
          id: taskId
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        method: "post"
      }).then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then((responseJson) => {
        getTasks(todoId);
        if (taskId === sidePanel.focusedTask.id){
          setSidePanelDisplay({visible:false, focusedTask:null});
        }
      })
      .catch((error) => {
      });
    }

    const switchCompletedState = async (taskId, completed) => {
      await fetch("http://localhost:4200/api/task/complete", {
        body: JSON.stringify({
          id: taskId,
          completed: !completed
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        method: "post"
      }).then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then((responseJson) => {
        getTasks(todoId);
      })
      .catch((error) => {
      });
    }

    const getList = async (listId) => {
      await fetch("http://localhost:4200/api/list/get", {
        body: JSON.stringify({
          listId: listId
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        method: "post"
      }).then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then((responseJson) => {
        setList(responseJson);
      })
      .catch((error) => {
      });
    }

    const deleteList = async (listId) => {
      await fetch("http://localhost:4200/api/list/delete", {
        body: JSON.stringify({
          id: listId
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        method: "post"
      }).then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then((responseJson) => {
        setDeleteSuccess(true);
      })
      .catch((error) => {
      });
    }

    const focusTask = (task) => {
        setTaskUpdateFields(task);
        setSidePanelDisplay({visible:true, focusedTask:task});
    }

    return (
      <div className="app__todoloader"> 
        <div className="app__tasklist">
          <h1>{ props.defaultTasks ? "Prochaines tâches" : list.description }</h1>
          { props.defaultTasks ? "" : <button onClick={ () => deleteList(todoId) }>Supprimer la liste</button> }
          <TaskList focusTask={ (t) => { focusTask(t) } } canCreate={ !props.defaultTasks } addNewTask={ () => { addNewTask(todoId, newTaskName) } } deleteTask={ (taskId) => { deleteTask(taskId) } } switchCompletedState={ (taskId, taskCompleted) => switchCompletedState(taskId, taskCompleted) } setNewTaskName={ (n) => { setNewTaskName(n) } } tasks={ tasks }/>
          { deleteSuccess ? <Navigate to="app/todo" replace /> : "" }
        </div>
        <SidePanel
          updateTitleField={ (newTitle) => { setTaskUpdateFields({title:newTitle, deadline:taskUpdateFields.deadline, description:taskUpdateFields.description}) } }
          updateDeadlineField={ (newDeadline) => { setTaskUpdateFields({title:taskUpdateFields.title, deadline:newDeadline, description:taskUpdateFields.description}) } }
          updateDescriptionField={ (newDescription) => { setTaskUpdateFields({title:taskUpdateFields.title, deadline:taskUpdateFields.deadline, description:newDescription}) } }
          save={ () => { updateTask() } } task={ taskUpdateFields } cancel={ () => setSidePanelDisplay({visible:false, focusedTask:null}) } visible={ sidePanel.visible } />
      </div>
    );
  }
  
  export default TodoLoader;