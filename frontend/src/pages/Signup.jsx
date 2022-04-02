import '../App.css';
import Button from '../components/Button';
import Input from '../components/Input';
import React from 'react';
import { useState, useEffect } from "react";

function Signup() {
  
  const [emailState, setEmailValue] = useState({ value:"", changed:false });
  const [passwordState, setPasswordValue] = useState({ value:"", changed:false });
  const [passwordRepeatState, setPasswordRepeatValue] = useState({ value:"", changed:false });
  const [formSubmitState, setFormState] = useState(true);
  const [formSubmitResult, setFormResult] = useState({message:""});

  useEffect(() => {
    setFormState(passwordState.value === passwordRepeatState.value && emailState.value.includes("@") && passwordState.value !== "");
  }, [emailState, passwordState, passwordRepeatState]);

  const submitForm = async (e) => {
    e.preventDefault();
  
    if (passwordState.value !== passwordRepeatState.value || emailState.value === "" || passwordState.value === "")
      return;

    setFormState(false);
    
    const response = await fetch("http://localhost:4200/api/auth/signup/", {
      body: JSON.stringify({
        email: emailState.value,
        password: passwordState.value
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      method: "post"
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong');
    })
    .then((responseJson) => {
      // Do something with the response
    })
    .catch((error) => {
      setFinally(error.message)
    });
  }

  const setFinally = (responseJson) => {
    setFormState(true);
    setFormResult({message:responseJson});
  }

  return (
    <div className="menu__form--wrapper" >
      <form action="" method="post" className="form--wrapper">
          <Input type="email" label="Adresse e-mail" val="email" required={ true } onchange={ (e) => setEmailValue({value:e.target.value, changed:true}) } feedback={ emailState.changed && !emailState.value.trim().includes("@") ? "Veuillez entrer une adresse e-mail valide" : "" } />
          <Input type="password" label="Mot de passe" val="password" required={ true } onchange={ (e) => setPasswordValue({value:e.target.value, changed:true}) } feedback={ passwordState.changed && passwordState.value.trim() === "" ? "Veuillez entrer un mot de passe valide" : "" } />
          <Input type="password" label="Répéter le mot de passe" val="password-repeat" required={ true } onchange={ (e) => setPasswordRepeatValue({value:e.target.value, changed:true}) } feedback={ passwordRepeatState.changed && passwordRepeatState.value.trim() !== passwordState.value.trim() ? "Les mots de passe saisis ne correspondent pas !" : "" } />
          <Button label="Inscription" onclick= { (e) => submitForm(e) } active={ formSubmitState } />
          <p className="menu__link--centered">{ formSubmitResult.message }</p>
      </form>
    </div>
  );
}

export default Signup;