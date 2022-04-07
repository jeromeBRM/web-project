import '../App.css';
import Button from '../components/Button';
import Input from '../components/Input';
import React, { useState } from 'react';

function ForgottenPassword() {
    const [emailState, setEmailValue] = useState({ value:"", changed:false });
    const [emailfeedback, setEmailFeedback] = useState("");
    const [formSubmitState, setFormState] = useState(true);

    const submitForgottenPassword = async (e) => {
    e.preventDefault();

    if (!emailState.value.includes("@") || emailState.value === ""){
         setEmailFeedback("Veuillez saisir une adresse e-mail");
         return;
    }
    else if(emailState.value.includes("@")){
        setEmailFeedback("Si cette e-mail correspond à un compte existant, un mail a été envoyé");
    }
        
    await fetch("http://localhost:4200/api/auth/resetPassword", {
      body: JSON.stringify({
      email: emailState.value,
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    method: "post"
    })
    }

  return (
    <div className="menu__form--wrapper">
        <form action="" method="post" className="form--wrapper">
        <Input type="email" label = "Adresse e-mail" val="email" required={ true } onchange={ (e) => { setEmailValue({ value:e.target.value, changed:true }) } } feedback={ emailfeedback } ></Input>
        <Button label ="Envoyer" onclick={ (e) => { submitForgottenPassword(e) } } active={ formSubmitState } ></Button>
        </form>
    </div>
  );
}

export default ForgottenPassword;