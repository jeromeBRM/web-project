function Input(props) {
  const i = <div className="form__item--wrapper">
              <label htmlFor={ props.val }>{ props.label }</label>
              <input type={ props.type } name={ props.val } id={ props.val } required={ props.required } className="form__text--input" placeholder={ props.label } onChange={ props.onchange }/>
              { props.feedback.trim() !== "" ? <p className="form__text--input--feedback">{ props.feedback }</p> : "" }
            </div>
  return (
     i
  );
}

export default Input;