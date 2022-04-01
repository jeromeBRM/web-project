const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const smtp = require('../smtp').EmailSender;

console.log(smtp)

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
    host: 'smtp.elasticemail.com',
    port: 2525,
    auth: {
      user:'jerome@gmail.com',
      pass:'E2525046C6BDF03F4E8F112922A96E4F9708'
    },
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo " <jerome@gmail.com>',
    to: "amelbos@hotmail.fr", 
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

main().catch();