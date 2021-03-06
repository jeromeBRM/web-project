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
import Verify from '../pages/Verify';
import ForgottenPassword from './ForgottenPassword';
import UpdatePassword from './UpdatePassword';

function getToken() {
  const tokenString = localStorage.getItem('token');
  return tokenString ? JSON.parse(tokenString): { userId:-1, email:"", token:"" };
}

function Top() {
  const [menuDisplayed, setMenu] = useState(false);

  const [token, setToken] = useState(getToken().token !== "" ? getToken() : { userId:-1, email:"", token:"" });
  const [connected, setConnected] = useState(getToken().token !== "");

  const disconnect = () => {
    localStorage.removeItem('token');
    setToken({ userId:-1, email:"", token:"" });
  }

  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(token));
    setConnected(token.token !== "");
  }, [token]);

  const toggleMenu = () => {
    setMenu(!menuDisplayed);
   }

  return (
    <div className="app__root">
      <div className="app__debug--hidden">Vous êtes connecté en tant que { token ? token.email : "" }</div>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={ connected ? <Navigate to="app/todo" replace /> : <Navigate to="signin" replace /> } />
          <Route exact path="app" element={ connected ? <Navigate to="todo" replace /> : <Navigate to="../signin" replace /> } />
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin successCallback={ (newToken) => { setToken(newToken) } } />} />
          <Route path="forgotten-password" element={<ForgottenPassword/>}></Route>
          <Route path="update-password/:url" element={<UpdatePassword/>}></Route>
          <Route path="verify/:url" element={<Verify/>} />
          <Route path="app" element={ connected ? <App toggleMenu={ () => { toggleMenu(); } } menuDisplayed={ menuDisplayed } userCredentials={ token } logoutCallback={ disconnect } /> : <Navigate to="../signin" replace /> }>
            <Route path="todo" element={<Todo />} >
              <Route path=":todoId" element={<TodoLoader toggleMenu={ () => { toggleMenu(); } } defaultTasks={ false } userCredentials={ token } />} />
              <Route path="" element={<TodoLoader toggleMenu={ () => { toggleMenu(); } } defaultTasks={ true } userCredentials={ token } />} />
            </Route>
            <Route path="settings" element={<Settings toggleMenu={ () => { toggleMenu(); } } userCredentials={ token } updateUserCredentialsCallback={ (newToken) => setToken(newToken) } />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Top;