const express = require('express');

const app = express();

const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/main.sqlite', (err) => {
  if(err){
    return console.error(err.message);
  }

  console.log('Connected to the main.sqlite database.');
});

db.close((err) =>{
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});

app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});

module.exports = app;