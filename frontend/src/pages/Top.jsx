import React, { useEffect, useState } from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import App from '../pages/App';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Settings from '../pages/Settings';
import Todo from '../pages/Todo';
import TodoLoader from '../pages/TodoLoader';

function getToken() {
  const tokenString = localStorage.getItem('token');
  return tokenString ? JSON.parse(tokenString): { userId:-1, email:"", token:"" };
}

function Top() {
  const [token, setToken] = useState(getToken().token !== "" ? getToken() : { userId:-1, email:"", token:"" });
  const [connected, setConnected] = useState(getToken().token !== "");

  const disconnect = () => {
    localStorage.removeItem('token');
    setToken({ userId:-1, email:"", token:"" });
  }

  useEffect(() => {
    setConnected(token.token !== "");
  }, [token]);

  return (
    <div className="app__root">
      <div className="app__debug--hidden">Vous êtes connecté en tant que { token ? token.email : "" }</div>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={ connected ? <Navigate to="app/todo" replace /> : <Navigate to="signin" replace /> } />
          <Route exact path="app" element={ connected ? <Navigate to="todo" replace /> : <Navigate to="../signin" replace /> } />
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin successCallback={ (newToken) => { setToken(newToken) } } />} />
          <Route path="app" element={ connected ? <App userCredentials={ token } logoutCallback={ disconnect } /> : <Navigate to="../signin" replace /> }>
            <Route path="todo" element={<Todo />} >
              <Route path=":todoId" element={<TodoLoader />} />
            </Route>
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Top;