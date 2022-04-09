import Step from '../components/Step';

function StepList(props) {
  return (
    <div>
      <ul>
        { props.step.length > 0 ? props.step.map(step => { return <Step focusStep={ () => props.focusStep(step) } switchCompletedState={ () => props.switchCompletedState(step.id, step.completed) } deleteStep={ () => props.deleteStep(step.id) } key={ "step-"+step.id } step={ step } /> }) : "" }
        { props.canCreate ? <li><button onClick={ () => props.addNewStep() }>Ajouter une Etape...</button><input type="text" name="new-step-name" id ="new-step-name" placeholder="Ajouter une Etape" onChange={ (e) => props.setNewStepName(e.target.value) } /></li> : "" }
        </ul>
    </div>
  );
}
  
export default StepList;