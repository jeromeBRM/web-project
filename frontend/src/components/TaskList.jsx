import Task from '../components/Task';

function TaskList(props) {
  return (
    <div className="app__tasklist__wrapper">
      <ul className="app__tasklist__ul">
        { props.tasks.length > 0 ? props.tasks.map(task => { return <Task focusTask={ () => props.focusTask(task) } switchCompletedState={ () => props.switchCompletedState(task.id, task.completed) } deleteTask={ () => props.deleteTask(task.id) } key={ "task-"+task.id } task={ task } /> }) : "" }
        { props.canCreate ?
        <div className="app__tasklist__item">
          <li className="app__tasklist_task">
            <button className="app__tasklist__addnewtask" onClick={ () => props.addNewTask() }></button>
            <input className='app__header__top__newlist--input--small' type="text" key={ "add-new-task-button" } name="new-task-name" id ="new-task-name" placeholder="Ajouter une tâche..." onChange={ (e) => props.setNewTaskName(e.target.value) } />
          </li>
        </div> : "" }
        { props.tasks.length !== 0 || props.canCreate ? <div className="app__tasklist__separator" /> : "" }
      </ul>
    </div>
  );
}

export default TaskList;