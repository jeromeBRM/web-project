import '../App.css';
import Header from '../components/Header';

import {
  Outlet,
} from "react-router-dom";
import { useEffect, useState } from 'react';

function App(props) {

  const [firstLoad, setLoaded] = useState(true);
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState("Nouvelle Liste");

  useEffect(() => {
    if (firstLoad)
      updateLists();
  });

  const updateLists = async () => {
    await fetch("http://localhost:4200/api/list/", {
      body: JSON.stringify({
        userId: props.userCredentials.userId
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
      setLists(responseJson);
      return responseJson;
    })
    .catch((error) => {
    })
    .finally(() => setLoaded(false));
  }

  const addNewList = async () => {
    await fetch("http://localhost:4200/api/list/create", {
      body: JSON.stringify({
        userId: props.userCredentials.userId,
        description: newListName
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
      updateLists();
    })
    .catch((error) => {
    });
  }

  return (
    <div className="app">
      <Header lists={ lists } addNewList={ () => addNewList() } setNewListName={ (n) => { setNewListName(n) } } userCredentials={ props.userCredentials } logoutCallback={ props.logoutCallback } />
      <Outlet></Outlet>
    </div>
  );
}

export default App;