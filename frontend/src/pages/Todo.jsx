import { Outlet, useParams } from "react-router";
import SidePanel from "../components/SidePanel";

function Todo() {
    return (
      <div className="app__todolist">
        <Outlet />
        <SidePanel />
      </div>
    );
  }
  
  export default Todo;