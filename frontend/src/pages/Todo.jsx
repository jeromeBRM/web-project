import { Outlet, useParams } from "react-router";
import SidePanel from "../components/SidePanel";
import TaskList from "../components/TaskList";

function Todo() {
    return (
      <div className="app__todolist">
        <div className="app__tasklist">
          <Outlet />
        </div>
        <SidePanel />
      </div>
    );
  }
  
  export default Todo;