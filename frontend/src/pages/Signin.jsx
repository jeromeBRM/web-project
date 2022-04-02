import { Link, Navigate } from 'react-router-dom';
import '../App.css';
import Button from '../components/Button';
import Input from '../components/Input';
import React from 'react';
import { useState, useEffect } from "react";

function Signin(props) {
  const [emailState, setEmailValue] = useState({ value:"", changed:false });
  const [passwordState, setPasswordValue] = useState({ value:"", changed:false });
  const [formSubmitState, setFormState] = useState(true);
  const [formSubmitResult, setFormResult] = useState("");

  useEffect(() => {
    setFormState(emailState.value.includes("@") && passwordState.value !== "");
  }, [emailState, passwordState]);

  const submitForm = async (e) => {
    e.preventDefault();
  
    if (!emailState.value.includes("@") || passwordState.value === "")
      return;

    setFormState(false);
    
    await fetch("http://localhost:4200/api/auth/signin/", {
      body: JSON.stringify({
        email: emailState.value,
        password: passwordState.value
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      method: "post"
    })
    .then(async (response) => {
      if (response.ok) {
        await response.json()
        .then((responseJson) => {
          localStorage.setItem("token", JSON.stringify(responseJson));
          props.successCallback(responseJson);
        })
      }
      setFormResult("connected");
    })
    .finally(() => setFormState(true))
  }

  return (
    <div className="menu__form--wrapper">
      <form action="" method="post" className="form--wrapper">
        <Input type="email" label="Adresse e-mail" val="email" required={ true } onchange={ (e) => setEmailValue({value:e.target.value, changed:true}) } feedback={ emailState.changed && !emailState.value.trim().includes("@") ? "Veuillez entrer une adresse e-mail valide" : "" } />
        <Input type="password" label="Mot de passe" val="password" required={ true } onchange={ (e) => setPasswordValue({value:e.target.value, changed:true}) } feedback={ passwordState.changed && passwordState.value.trim() === "" ? "Veuillez entrer un mot de passe valide" : "" } />
        <Button label="Connexion" onclick= { (e) => submitForm(e) } active={ formSubmitState } />
        <Link to="/signup" className="menu__link--centered">Pas encore de compte ? Inscrivez-vous !</Link>
        <p className="menu__link--centered">{ formSubmitResult.message }</p>
        { formSubmitResult === "connected" ? <Navigate to="app/todo" replace /> : "" }
      </form>
    </div>
  );
}

export default Signin;