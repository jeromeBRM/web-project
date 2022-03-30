import '../App.css';

function Signup() {
  return (
    <div className="menu__form--wrapper">
      <form action="" method="post" className="form--wrapper">
        <div className="form__item--wrapper">
          <label for="email">Adresse e-mail</label>
          <input type="email" name="email" id="email" required className="form__text--input" placeholder="Adresse e-mail"/>
        </div>
        <div className="form__item--wrapper">
          <label for="password">Mot de passe</label>
          <input type="password" name="password" id="password" required className="form__text--input" placeholder="Mot de passe"/>
        </div>
        <div className="form__item--wrapper">
          <label for="password">Répéter le mot de passe</label>
          <input type="password" name="password" id="password" required className="form__text--input" placeholder="Répéter le mot de passe"/>
        </div>
        <div className="form__item--wrapper">
          <div className="form__input--wrapper">
            <input type="submit" value="Inscription" className="form__btn--orange"/>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;