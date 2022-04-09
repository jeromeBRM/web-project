const express = require('express');

const app = express();

const userRoutes = require('./routes/user');
const listRoutes = require('./routes/list');
const taskRoutes = require('./routes/task');
const stepRoutes = require('./routes/step');


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());



app.use('/api/auth', userRoutes);
app.use('/api/list', listRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/step', stepRoutes);

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