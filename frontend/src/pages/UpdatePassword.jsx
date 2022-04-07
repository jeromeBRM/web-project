import { useParams } from 'react-router-dom';
import '../App.css';
import Button from '../components/Button';
import Input from '../components/Input';
import React from 'react';
import { useState } from "react";

function  UpdatePassword(props) {
  
  const { url } = useParams();

  fetch("http://localhost:4200/api/auth/update-password?url_verification="+url, {
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
  method: "post"
  })

  return (
    <div className="menu__form--wrapper">
        <form action="" method="post" className="form--wrapper">
        <Input type="password" label = "Nouveau mot de passe" val="new-password" required={true} onchange={ () => ({}) } feedback={ "" } ></Input>
        <Input type="password" label = "Confirmer le nouveau mot de passe" val="new-password-repeat" required={true} onchange ={ () => ({}) } feedback={ "" } ></Input>
        <Button label ="Modifier le mot de passe" onclick= { () => {} } active={ true } ></Button> 
        </form>
    </div>
  );
}

export default UpdatePassword; 