function SidePanel(props) {
    return (
        <div className={ props.visible ? "app__sidepanel" : "app__sidepanel--hidden" }>
          <label for="task-title">Titre</label>
          <input onChange={ (e) => { props.updateTitleField(e.target.value) } } type="text" id="task-title" name="task-title" defaultValue={ props.task.title } ></input>
          <label for="deadline">Echéance</label>
          <input onChange={ (e) => { props.updateDeadlineField(e.target.value) } } type="date" id="deadline" name="deadline" min="2022-01-01" max="2050-12-31" defaultValue={ props.task.deadline } ></input>
          <label for="task-description">Note</label>
          <textarea onChange={ (e) => { props.updateDescriptionField(e.target.value) } } type="text" id="task-description" name="task-description" defaultValue={ props.task.description } ></textarea>
          <button onClick={ () => props.save() }>Enregistrer</button>
          <button onClick={ () => props.cancel() }>Annuler</button>
      </div>
    );
}

export default SidePanel;