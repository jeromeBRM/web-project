function Task(props) {
    return (
      <div className="app__tasklist__item">
          <li>{ props.task.title }</li>
          <button onClick={ () => props.switchCompletedState() }>{ props.task.completed === 1 ? "tâche completée" : "tâche en cours" }</button>
          <button onClick={ () => props.deleteTask() }>Supprimer</button>
      </div>
    );
  }
  
  export default Task;