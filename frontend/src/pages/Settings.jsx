import Button from '../components/Button';
import Input from '../components/Input';
import React from 'react';
import { useState } from "react";

function Settings(props) {

  const [emailState, setEmailValue] = useState({ value:"", changed:false });
  const [emailRepeatState, setEmailRepeatValue] = useState({ value:"", changed:false });
  const [passwordState, setPasswordValue] = useState({ value:"", changed:false });
  const [newPasswordState, setNewPasswordValue] = useState({ value:"", changed:false });
  const [newPasswordRepeatState, setNewPasswordRepeatValue] = useState({ value:"", changed:false });
  
  const submitEmail = async (e) => {
    e.preventDefault();
    
    if (emailState.value !== emailRepeatState.value || emailState.value === "")
      return;
    

    await fetch("http://localhost:4200/api/auth/updateEmail/",{
      body: JSON.stringify({
      id: props.userCredentials.userId,
      email: emailState.value
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    method: "post"
    }).then( () => {
      props.updateUserCredentialsCallback({ userId: props.userCredentials.userId, email:emailState.value, token: props.userCredentials.token });
    })
  }
  
  const submitPassword = async (e) => {
    e.preventDefault();
    
    if (newPasswordState.value !== newPasswordRepeatState.value || passwordState.value === newPasswordState.value || newPasswordState.value === "")
      return;
    
    await fetch("http://localhost:4200/api/auth/updatePassword/",{
      body: JSON.stringify({
      id: props.userCredentials.userId,
      password: newPasswordState.value,
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    method: "post"
    })

  }

    return (
      <div className="app__settings">
        <div className="app__title"><div className="app__toggle--home" onClick={ () => props.toggleMenu() } /><h1 className="no-margin">Paramètres</h1></div>
        <div className="app__settings__wra">
          <div className="app__settings__c">
            <h2 className="no-margin">Adresse e-mail</h2>
            <p className="no-margin"><b>Adresse e-mail actuelle : </b> { props.userCredentials.email}</p>  
          </div>
          <div className="app__settings__input__w">
            <Input type="email" label = "Nouvelle adresse e-mail" val="email" required={ true } onchange={ (e) => setEmailValue({value:e.target.value, changed:true}) } feedback={ "" } ></Input>
            <Input type="email" label = "Confirmer l'adresse e-mail" val="email-repeat" required={true} onchange={ (e) => setEmailRepeatValue({value:e.target.value, changed:true}) } feedback={ "" } ></Input>
            <Button label ="Modifier l'adresse e-mail" onclick= { (e) => {submitEmail(e)} } active={ true } ></Button>
          </div>
          <div className="app__settings__c">
            <h2 className="no-margin">Mot de passe</h2>
          </div>
          <div className="app__settings__input__w">
            <Input type="password" label = "Mot de passe actuel" val="password" required={ true } onchange={ (e) => setPasswordValue({value:e.target.value, changed:true}) } feedback={ "" } ></Input>
            <Input type="password" label = "Nouveau mot de passe" val="new-password" required={true} onchange={ (e) => setNewPasswordValue({value:e.target.value, changed:true}) } feedback={ "" } ></Input>
            <Input type="password" label = "Confirmer le nouveau mot de passe" val="new-password-repeat" required={true} onchange={ (e) => setNewPasswordRepeatValue({value:e.target.value, changed:true}) } feedback={ "" } ></Input>
            <Button label ="Modifier le mot de passe" onclick= { (e) => {submitPassword(e)} } active={ true } ></Button> 
          </div>
        </div>
      </div>
    );
  }
  
  export default Settings;