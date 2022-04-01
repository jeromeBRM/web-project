const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');

router.get('/', auth, userCtrl.getDatabase);
router.post('/signup', auth, userCtrl.signup);
router.post('/signin', auth, userCtrl.signin);

module.exports = router;