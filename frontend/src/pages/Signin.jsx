import { Link } from 'react-router-dom';
import '../App.css';

function Signin() {
  return (
    <div className="menu__form--wrapper">
      <form action="" method="post" className="form--wrapper">
        <div className="form__item--wrapper">
          <label htmlFor="email">Adresse e-mail</label>
          <input type="email" name="email" id="email" required className="form__text--input" placeholder="Adresse e-mail"/>
        </div>
        <div className="form__item--wrapper">
          <label htmlFor="password">Mot de passe</label>
          <input type="password" name="password" id="password" required className="form__text--input" placeholder="Mot de passe"/>
        </div>
        <div className="form__item--wrapper">
          <div className="form__input--wrapper">
            <input type="submit" value="Connexion" className="form__btn--orange"/>
          </div>
        </div>
        <Link to="/signup" className="menu__link--centered">J'ai oublié mon mot de passe</Link>
        <Link to="/signup" className="menu__link--centered">Pas encore de compte ? Inscrivez-vous !</Link>
      </form>
    </div>
  );
}

export default Signin;