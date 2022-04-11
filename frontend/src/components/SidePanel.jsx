function SidePanel(props) {
  
    return (
        <div className={ props.visible ? "app__sidepanel" : "app__sidepanel--hidden" }>
          <div className="app__sidepanel__column">
            <div className="app__sidepanel__w">
            <div className="app__header__close right" onClick={ () => { props.cancel(); } } />
              <div className="app__sidepanel__input">
                <label htmlFor="task-title">Titre</label>
                <input className="app__sidepanel__text--input" onChange={ (e) => { props.updateTitleField(e.target.value) } } type="text" id="task-title" name="task-title" defaultValue={ props.task.title } key={ "update-task-title"+props.task.id+props.task.title } ></input>
              </div>
              <div className="app__sidepanel__input">
                <label htmlFor="deadline">Echéance</label>
                <input className="app__sidepanel__text--input" onChange={ (e) => { props.updateDeadlineField(e.target.value) } } type="date" id="deadline" name="deadline" min="2022-01-01" max="2050-12-31" defaultValue={ props.task.deadline } key={ "update-task-deadline"+props.task.id+props.task.deadline } ></input>
              </div>
              <div className="app__sidepanel__input">
                <label htmlFor="task-description">Note</label>
                <textarea onChange={ (e) => { props.updateDescriptionField(e.target.value) } } type="text" id="task-description" name="task-description" defaultValue={ props.task.description } key={ "update-task-description"+props.task.id+props.task.description } ></textarea>
              </div>
              <div className="app__sidepanel__controls">
                <button className="app__sidepanel__controls--save" onClick={ () => props.save() }>Enregistrer</button>
                <button className="app__sidepanel__controls--cancel" onClick={ () => props.cancel() }>Annuler</button>
              </div>
            </div>
          </div>
      </div>
    );
}

export default SidePanel;