function Button(props) {
  const b = 
            <div className="form__item--wrapper">
              <div className="form__input--wrapper">
                <input type="submit" value={props.label} onClick={ props.onclick } className="form__btn--orange" disabled={ !props.active } />
              </div>
            </div>

  return (
     b
  );
}

export default Button;