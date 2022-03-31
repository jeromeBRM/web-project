const db = require('../database').db;

exports.get = (req, res, next) => {
    db.each('select * from user' , (err, data) => {
        if(err){
          return console.error(err.message);
        }
          console.log(data);
      })
    next()
}

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        db.run('insert into user (email, password) values (?,?)',[req.body.email,hash])
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };
  
exports.login = (req, res, next) => {

};