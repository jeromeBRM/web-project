import { Outlet, useParams } from "react-router";

function Todo() {
    return (
      <div className="app__todolist">
        <Outlet />
      </div>
    );
  }
  
  export default Todo;