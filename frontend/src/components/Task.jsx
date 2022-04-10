function Task(props) {
    return (
      <div className="app__tasklist__item">
          <li className="app__tasklist_task">
            <button className={ props.task.completed === 1 ? "app__tasklist__button--completetask" : "app__tasklist__button--uncompletetask" } onClick={ () => props.switchCompletedState() }></button>
            <div className="app__tasklist__task__details">
              <button className="app__tasklist__task__button" onClick={ () => { props.focusTask(props.task)} } ><div className={ props.task.completed === 1 ? "app__tasklist__task__title--crossed" : "app__tasklist__task__title" }>{ props.task.title }</div>
                <div className="app__tasklist__task__details--row">
                  { props.task.deadline !== "" ? <div>{ "Échéance : " + props.task.deadline }</div> : "" }
                  { props.task.description !== "" ? <div className="app__tasklist__task__details__description" >{ props.task.description }</div> : "" }
                </div>
              </button>
            </div>
            <button className="app__tasklist__task__delete" onClick={ () => props.deleteTask() }></button>
          </li>
      </div>
    );
  }
  
  export default Task;