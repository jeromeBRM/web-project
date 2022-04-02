import { Outlet } from "react-router-dom";

function TaskList() {
    return (
      <div className="app__tasklist">
          <Outlet />
      </div>
    );
  }
  
  export default TaskList;