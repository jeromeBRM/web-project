import { Link, Navigate, useParams } from 'react-router-dom';
import '../App.css';
import Button from '../components/Button';
import React from 'react';

function Verify() {
  const { url } = useParams();

  fetch("http://localhost:4200/api/auth/verify?url_verification="+url, {
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
  method: "get"
})

  return (
      <div>
        <Button label = "Se connecter" onClick= { () => { return <Navigate to="/signin"/> } } active={true}></Button>
        Votre email a été vérifié !
      </div>
  );
}
  
export default Verify;