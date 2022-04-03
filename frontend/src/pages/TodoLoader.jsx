import { Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import TaskList from '../components/TaskList';

function TodoLoader(props) {
    const { todoId } = useParams();

    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [list, setList] = useState({id: -1, description: ""});
    const [newTaskName, setNewTaskName] = useState("");
    const [tasks, setTasks] = useState([]);

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
        console.log(responseJson);
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

    return (
      <div className="app__todoloader">
        <h1>{ props.defaultTasks ? "Prochaines tâches" : list.description }</h1>
        { props.defaultTasks ? "" : <button onClick={ () => deleteList(todoId) }>Supprimer la liste</button> }
        <TaskList canCreate={ !props.defaultTasks } addNewTask={ () => { addNewTask(todoId, newTaskName) } } setNewTaskName={ (n) => { setNewTaskName(n) } } tasks={ tasks }/>
        { deleteSuccess ? <Navigate to="app/todo" replace /> : "" }
      </div>
      
    );
  }
  
  export default TodoLoader;