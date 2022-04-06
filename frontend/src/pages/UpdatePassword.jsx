/*import '../App.css';
import Button from '../components/Button';
import Input from '../components/Input';
import React from 'react';
import { useState } from "react";

function  UpdatePassword(props) {
    const [newPasswordState, setNewPasswordValue] = useState({ value:"", changed:false });
    const [newPasswordRepeatState, setNewPasswordRepeatValue] = useState({ value:"", changed:false });
  

  const submitForm = async (e) => {
    e.preventDefault();
  
    if ( newPasswordState.value !== newPasswordRepeatState || passwordState.value === "")
      return;

    setFormState(false);
    
    await fetch("http://localhost:4200/api/auth/updateEmail/", {
      body: JSON.stringify({
        id: props.userCredentials.userId,
        password: newpasswordState.value
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
        <Input type="email" label = "Nouvelle adresse e-mail" val="email" required={ true } onchange={ (e) => setEmailValue({value:e.target.value, changed:true}) } feedback={ "" } ></Input>
        <Input type="email" label = "Confirmer l'adresse e-mail" val="email-repeat" required={true} onchange={ (e) => setEmailRepeatValue({value:e.target.value, changed:true}) } feedback={ "" } ></Input>
        <Button label ="Modifier l'adresse e-mail" onclick= { (e) => {submitEmail(e)} } active={ true } ></Button>
        <h2>Mot de passe</h2>
        <Input type="password" label = "Mot de passe actuel" val="password" required={ true } onchange={ (e) => setPasswordValue({value:e.target.value, changed:true}) } feedback={ "" } ></Input>
        <Input type="password" label = "Nouveau mot de passe" val="new-password" required={true} onchange={ (e) => setNewPasswordValue({value:e.target.value, changed:true}) } feedback={ "" } ></Input>
        <Input type="password" label = "Confirmer Nouveau mot de passe" val="new-password-repeat" required={true} onchange={ (e) => setNewPasswordRepeatValue({value:e.target.value, changed:true}) } feedback={ "" } ></Input>
        <Button label ="Modifier le mot de passe" onclick= { (e) => {submitPassword(e)} } active={ true } ></Button>
    </div>
  );
}

export default UpdatePassword; */