import { useParams } from "react-router";

function TodoLoader() {
    const { todoId } = useParams();  

    return (
      <div className="app__todoloader">
        <h1>{ todoId }</h1>
      </div>
    );
  }
  
  export default TodoLoader;