import Task from '../components/Task';

function TaskList(props) {
  return (
    <div className="app__tasklist__wrapper">
      <ul>
        { props.tasks.length > 0 ? props.tasks.map(task => { return <Task key={ "task-"+task.id } task={ task } /> }) : "" }
        { props.canCreate ? <li><button onClick={ () => props.addNewTask() }>Ajouter une tâche...</button><input type="text" name="new-task-name" id ="new-task-name" placeholder="Ajouter une tâche" onChange={ (e) => props.setNewTaskName(e.target.value) } /></li> : "" }
        </ul>
    </div>
  );
}
  
export default TaskList;