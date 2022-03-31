import '../App.css';
import Button from '../components/Button';
import Input from '../components/Input';

function Signup() {
  return (
    <div className="menu__form--wrapper">
      <form action="" method="post" className="form--wrapper">
          <Input type="email" label="Adresse e-mail" val="email" required={ true } />
          <Input type="password" label="Mot de passe" val="password" required={ true } />
          <Input type="password" label="Répéter le mot de passe" val="password-repeat" required={ true } />
          <Button label="Inscription" onclick= { submitSignup } />
      </form>
    </div>
  );
}

async function submitSignup() {
  const response = await fetch("http://localhost:4200/api/auth/signup/", {
    body: JSON.stringify({
      email: "teest@gmail.com",
      password: "toto123"
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    method: "post"
  })

  if (response.ok) {
    // TODO
  } else {
    throw new Error()
  }
}

export default Signup;