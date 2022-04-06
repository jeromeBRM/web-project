const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const db = require('../database').db;
const jwt = require('jsonwebtoken');

exports.getDatabase = (req, res, next) => {
    db.all('select * from user' , (err, data) => {
        if(err){
          return console.error(err.message);
        }
        else {
          console.log(data);
          res.status(201).json(data);
        }
      })
}

exports.signup = (req, res, next) => {

  const sendMail = async (destination, verification_url) => {
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'ProjetTutoreWeb@gmail.com',
        pass: 'ProjetTutore',
      },
    });
  
    await transporter.sendMail({
      from: '" ToDoLister " <ProjetTutoreWeb@gmail.com>',
      to: destination, 
      subject: "Vérification de mail ✔",
      text: "Mail de confirmation",
      html: "<b>TodoLister : Vérifiez votre compte !</b><br><br><a href=\"http://localhost:3000/verify/"+verification_url+"\">Confirmez votre adresse mail ici !</a>",
    });
  }

  const random = require('crypto').randomBytes(32).toString('hex');
  console.log(random);

  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      db.run('insert into user (email, password, verifed, url_verification) values (?,?,0,?)',[req.body.email,hash,random], (err) => {
        if (err) {
          res.status(400).json({ err });
        }
        else {
          sendMail(req.body.email, random);
          res.status(201).json({ message: 'Utilisateur créé !' });
        }
      })
    })
    .catch(error => res.status(500).json({ error }));
}
  
exports.signin = (req, res, next) => {

    db.get('select id, email, password from user where email = ? and verifed = 1',[req.body.email], (err, row) => {
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
            email: user.email,
            token: jwt.sign(
              { userId: user.id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    });
}

exports.getDatabase = (req, res, next) => {
  db.all('select * from user' , (err, data) => {
      if(err){
        return console.error(err.message);
      }
      else {
        console.log(data);
        res.status(201).json(data);
      }
    })
}

exports.resetPassword = (req, res, next) => {

const sendMail = async (destination, verification_url) => {
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'ProjetTutoreWeb@gmail.com',
        pass: 'ProjetTutore',
      },
    });

    await transporter.sendMail({
      from: '" ToDoLister " <ProjetTutoreWeb@gmail.com>',
      to: destination, 
      subject: "Changement de mot de passe",
      text: "Changement de mot de passe",
      html: "<b>TodoLister : Changez votre mot de passe !</b><br><br><a href=\"http://localhost:3000/update-password/"+verification_url+"\">Cliquez ici pour changer votre mot de passe!</a>",
    });
  }

  const random = require('crypto').randomBytes(32).toString('hex');
  console.log(random);

      db.run('update user set url_verification = ? where email = ?',[random, req.body.email], (err) => {
        if (err) {
          res.status(400).json({ err });
        }
        else {
          sendMail(req.body.email, random);
          res.status(201).json({ message: 'Mot de passe changé !' });
        }
      })
}

exports.updateEmail = (req, res, next) => {
  db.run('update user set email = ?  where id = ?',[req.body.email, req.body.id], (err) => {
    if (err) {
      res.status(400).json({ err });
    }
    else
      res.status(201).json({ message: 'Email changé' });  
  })
}

exports.updatePassword = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    db.run('update user set password = ?  where id = ?',[hash,req.body.id], (err) => {
      if (err) {
        res.status(400).json({ err });
      }
      else
        res.status(201).json({ message: 'Mot de passe changé' });  
    })
  })
  .catch(error => res.status(500).json({ error }));
}

exports.verify = (req, res, next) => {
  db.get('update user set verifed = 1 where url_verification = ?',[req.query.url_verification], (err) => {
    if (err) {
      res.status(400).json({ err });
    }
    else
      res.status(201).json({ message: 'Votre mail est bien vérifié' });  
  })
}