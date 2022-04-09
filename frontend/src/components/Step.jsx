function Step(props) {
    return (
      <div>
          <li>
            <button onClick={ () => props.switchCompletedState() }>{ props.step.completed === 1 }</button>
            <button onClick={ () => { props.focusStep(props.step)} } >{ props.step.description }</button>
            <button onClick={ () => props.deleteStep() }>Supprimer</button>
          </li>
      </div>
    );
  }
  
  export default Step;