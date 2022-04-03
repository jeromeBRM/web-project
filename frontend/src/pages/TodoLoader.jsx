import { Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function TodoLoader(props) {
    const { todoId } = useParams();

    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [list, setList] = useState({id: -1, description: ""});

    useEffect(() => {
      getList(todoId);
    }, [todoId]);

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
        <h1>{ list.description }</h1><button onClick={ () => deleteList(todoId) }>Supprimer la liste</button>
        { deleteSuccess ? <Navigate to="app/todo" replace /> : "" }
      </div>
      
    );
  }
  
  export default TodoLoader;