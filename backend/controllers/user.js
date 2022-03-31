const db = require('../database').db;

exports.get = () => {
    db.each('select * from user' , (err, data) => {
        if(err){
          return console.error(err.message);
        }
          console.log(data);
      })
}

exports.signup = (req, res, next) => {
    console.log(req.body);
    /*bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
      */
      db.run('insert into user (email, password) values (?,?)',[req.body.email,req.body.password])
  };

exports.login = (req, res, next) => {

};