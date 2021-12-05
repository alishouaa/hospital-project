const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/Authcontroller')
const upload = require('../middelware/upload')

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/add-user',upload.single('avatar'), AuthController.addUser)
router.get('/get-user', AuthController.getUser);
router.post('/get-one', AuthController.getOne)
router.post('/update-user/:userId',upload.single('avatar'), AuthController.updateUser);
router.post('/post-help/:userId', AuthController.postHelp);
router.get('/get-help', AuthController.getHelp);
router.post('/delete-help/:helpId', AuthController.deleteHelp);
router.post('/delete-user/:userId', AuthController.deleteUser);









module.exports = router