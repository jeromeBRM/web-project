import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import App from './pages/App';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Settings from './pages/Settings';
import Todo from './pages/Todo';
import TodoLoader from './pages/TodoLoader';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<Signin />} />
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="app" element={<App />}>
          <Route path="todo" element={<Todo />} >
            <Route path=":todoId" element={<TodoLoader />} />
          </Route>
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);