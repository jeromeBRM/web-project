import { Link } from 'react-router-dom';
import '../App.css';

function Signin() {
  return (
    <div className="form--signup">
      <form action="" method="post" class="form-example">
        <div class="form-example">
          <label for="email">Adresse e-mail</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div class="form-example">
          <label for="password">Mot de passe</label>
          <input type="password" name="password" id="password" required />
        </div>
        <div class="form-example">
          <input type="submit" value="Connexion" className="app__btn--orange"/>
        </div>
        <Link to="/signup">J'ai oublié mon mot de passe</Link>
        <Link to="/signup">Pas encore de compte ? Inscrivez-vous !</Link>
      </form>
    </div>
  );
}

export default Signin;