const bcrypt = require('bcrypt');
const user = require("../db/main.sqlite");

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const created_user = new user({
          email: req.body.email,
          password: hash
        });
    })
};