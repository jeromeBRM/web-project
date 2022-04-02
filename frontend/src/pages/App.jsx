import '../App.css';
import Header from '../components/Header';

import {
  Outlet,
} from "react-router-dom";


function App(props) {
  return (
    <div className="app">
      <Header userCredentials={ props.userCredentials } logoutCallback={ props.logoutCallback } />
      <Outlet />
    </div>
  );
}

export default App;