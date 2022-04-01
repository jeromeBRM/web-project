const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const db = require('../database').db;
const jwt = require('jsonwebtoken');

exports.getDatabase = (req, res, next) => {
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
  
  exports.signin = (req, res, next) => {

    db.get('select id, email, password from user where email = ?',[req.body.email], (err, row) => {
      const user = row
    
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign(
              { userId: user.id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    });
};


async function main() {
  
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'ProjetTutoreWeb@gmail.com',
      pass: 'ProjetTutore',
    },
  });

  let info = await transporter.sendMail({
    from: '" ToDoLister " <ProjetTutoreWeb@gmail.com>',
    to: "amelbos@hotmail.fr", 
    subject: "Vérification de mail ✔",
    text: "Mail de confirmation",
    html: "<b>Mail de confirmation</b>",
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

main().catch();