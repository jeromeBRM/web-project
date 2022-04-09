function Task(props) {
    return (
      <div className="app__tasklist__item">
          <li>
            <button onClick={ () => props.switchCompletedState() }>{ props.task.completed === 1 ? "tâche completée" : "tâche en cours" }</button>
            <button onClick={ () => { props.focusTask(props.task)} } >{ props.task.title }</button>
            { props.task.deadline !== "" ? <div>{ "Échéance : " + props.task.deadline }</div> : "" }
            { props.task.description !== "" ? <div>{ props.task.description }</div> : "" }
            <button onClick={ () => props.deleteTask() }>Supprimer</button>
          </li>
      </div>
    );
  }
  
  export default Task;