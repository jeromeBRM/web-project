function Input(props) {
  const i = <div className="form__item--wrapper">
              <label for={ props.val }>{ props.label }</label>
              <input type={ props.type } name={ props.val } id={ props.val } required={ props.required } className="form__text--input" placeholder={ props.label }/>
            </div>
  return (
     i
  );
}

export default Input;