function Task(props) {
    return (
      <div className="app__tasklist__item">
          <li>{ props.task.title }</li>
      </div>
    );
  }
  
  export default Task;