import { Outlet, useParams } from "react-router";
import SidePanel from "../components/SidePanel";
import TaskList from "../components/TaskList";

function Todo() {
    return (
      <div className="app__todolist">
        <TaskList>
          <Outlet />
        </TaskList>
        <SidePanel />
      </div>
    );
  }
  
  export default Todo;