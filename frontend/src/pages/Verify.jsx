import { Link, useParams } from 'react-router-dom';
import '../App.css';
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
        <Link to = "/signin ">Se connecter</Link>
        <p>Votre email a été vérifié !</p>
      </div>
  );
}
  
export default Verify;