const express = require('express');
const router = express.Router();

const taskCtrl = require('../controllers/task');

router.post('/', taskCtrl.getTasksList);
router.post('/TasksDeadline', taskCtrl.getTasksDeadline);
router.post('/create', taskCtrl.create);
router.post('/delete', taskCtrl.delete);
router.post('/update',taskCtrl.update);
router.post('/complete', taskCtrl.complete);

module.exports = router;