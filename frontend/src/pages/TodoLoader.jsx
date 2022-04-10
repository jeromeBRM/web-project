import { Navigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import TaskList from '../components/TaskList';
import SidePanel from '../components/SidePanel';
import Popup from '../components/Popup';

function TodoLoader(props) {
    const { todoId } = useParams();

    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [list, setList] = useState({id: -1, description: ""});
    const [newTaskName, setNewTaskName] = useState("");
    const [tasks, setTasks] = useState([]);

    const [sidePanel, setSidePanelDisplay] = useState({visible:false, focusedTask:null});
    const [taskUpdateTitle, setTaskUpdateTitle] = useState("");
    const [taskUpdateDeadline, setTaskUpdateDeadline] = useState("");
    const [taskUpdateDescription, setTaskUpdateDescription] = useState("");

    const [taskToDelete, setListToDelete] = useState("");

    useEffect(() => {
      getList(todoId);
      if (todoId) {
        getTasks(todoId);
      }
      else {
        getTasksByDeadline(props.userCredentials.userId);
      }
    }, [todoId, props.userCredentials.userId]);

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

    const getTasksByDeadline = async (uId) => {
      await fetch("http://localhost:4200/api/task/TasksDeadline", {
        body: JSON.stringify({
          user_id: uId
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
        if (todoId) {
          getTasks(todoId);
        }
        else {
          getTasksByDeadline(props.userCredentials.userId);
        }
      })
      .catch((error) => {
      });
    }

    const updateTask = async () => {
      await fetch("http://localhost:4200/api/task/update", {
        body: JSON.stringify({
          id: sidePanel.focusedTask.id,
          title: taskUpdateTitle,
          deadline: taskUpdateDeadline,
          description: taskUpdateDescription
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
        if (todoId) {
          getTasks(todoId);
        }
        else {
          getTasksByDeadline(props.userCredentials.userId);
        }
        setSidePanelDisplay({visible:false, focusedTask:null});
        setTaskUpdateTitle("");
        setTaskUpdateDeadline("");
        setTaskUpdateDescription("");
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
        if (todoId) {
          getTasks(todoId);
        }
        else {
          getTasksByDeadline(props.userCredentials.userId);
        }
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
        if (todoId) {
          getTasks(todoId);
        }
        else {
          getTasksByDeadline(props.userCredentials.userId);
        }
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
        setTaskUpdateTitle(task.title);
        setTaskUpdateDeadline(task.deadline);
        setTaskUpdateDescription(task.description);
        setSidePanelDisplay({visible:true, focusedTask:task})
    }

    return (
      <div className="app__todoloader">
        { taskToDelete !== "" ? <Popup deleteForever={ () => { deleteList(todoId); } } cancel={ () => { setListToDelete("") } } title={ taskToDelete } /> : "" }
        <div className="app__tasklist">
          <div className="app__tasklist__w">
            <h1 className='app__tasklist__title'>{ props.defaultTasks ? "Prochaines tâches" : list.description }</h1>
            { props.defaultTasks ? "" : <button className="app__tasklist__delete__list" onClick={ () => setListToDelete(list.description) }><div className="app__tasklist__delete__list--icon" />Supprimer la liste</button> }
          </div>
          <TaskList focusTask={ (t) => { focusTask(t) } } canCreate={ !props.defaultTasks } addNewTask={ () => { addNewTask(todoId, newTaskName) } } deleteTask={ (taskId) => { deleteTask(taskId) } } switchCompletedState={ (taskId, taskCompleted) => switchCompletedState(taskId, taskCompleted) } setNewTaskName={ (n) => { setNewTaskName(n) } } tasks={ tasks }/>
          { deleteSuccess ? <Navigate to="app/todo" replace /> : "" }
        </div>
        <SidePanel
          updateTitleField={ (newTitle) => { setTaskUpdateTitle(newTitle); } }
          updateDeadlineField={ (newDeadline) => { setTaskUpdateDeadline(newDeadline) } }
          updateDescriptionField={ (newDescription) => { setTaskUpdateDescription(newDescription) } }
          save={ () => { updateTask() } } task={ sidePanel.focusedTask ? sidePanel.focusedTask : { title:"", deadline:"", description:"" } } cancel={ () => setSidePanelDisplay({visible:false, focusedTask:null}) } visible={ sidePanel.visible } />
      </div>
    );
  }
  
  export default TodoLoader;