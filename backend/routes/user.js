const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');

router.get('/', auth, userCtrl.getDatabase);
router.post('/signup', auth, userCtrl.signup);
router.post('/login', auth, userCtrl.login);

module.exports = router;