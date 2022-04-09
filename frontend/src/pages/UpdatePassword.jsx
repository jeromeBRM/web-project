import { Link, useParams } from 'react-router-dom';
import '../App.css';
import Button from '../components/Button';
import Input from '../components/Input';
import React from 'react';
import { useState } from "react";

function  UpdatePassword(props) {

  const [newPasswordState, setNewPasswordValue] = useState({ value:"", changed:false });
  const [newPasswordRepeatState, setNewPasswordRepeatValue] = useState({ value:"", changed:false });
  const [showLink, setShowLink] = useState(false);
  const toggleShowLink = () => {
    if (newPasswordState.value === newPasswordRepeatState.value)
    setShowLink((showLink) => !showLink)
  }
  const { url } = useParams();
    
  const submitPassword = async (e) => {
    e.preventDefault();

    if (newPasswordState.value !== newPasswordRepeatState.value || newPasswordRepeatState.value === "" || newPasswordState.value === "")
      return;

  await fetch("http://localhost:4200/api/auth/updatePassword?url_verification="+url, {
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
    <div className="menu__form--wrapper">
        <form action="" method="post" className="form--wrapper">
        <Input type="password" label = "Nouveau mot de passe" val="new-password" required={true} onchange={ (e) => setNewPasswordValue({value:e.target.value, changed:true}) } feedback={ "" } ></Input>
        <Input type="password" label = "Confirmer le nouveau mot de passe" val="new-password-repeat" required={true} onchange ={ (e) => setNewPasswordRepeatValue({value:e.target.value, changed:true}) } feedback={ "" } ></Input>
        <Button label ="Modifier le mot de passe" onclick= { (e) => { submitPassword(e); toggleShowLink() }} active={ true } ></Button> 
        {showLink ? <Link to="/signin" >Le mot de passe a été modifier avec succès. Cliquez ici pour vous connecter</Link> : null}
        </form>
    </div>
  );
}

export default UpdatePassword;