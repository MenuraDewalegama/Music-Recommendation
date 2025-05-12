const express = require('express');
const router = express.Router();
const { register, login } = require('../controller/authController');
const { getUser, updateUser, deleteUser} = require('../controller/userController');
const authenticate = require('../middleware/authMiddleware');
const { getMessages } = require('../controller/chatController');
const { spotifyLogin, spotifyCallback } = require('../controller/spotifyController');

//GET
router.get('/getUserProfile', authenticate, getUser); 
router.get('/spotify', spotifyLogin);
router.get('/spotify/callback', spotifyCallback);
router.get('/messages/:otherUserId', authenticate, getMessages);

//POST
router.post('/register', register);
router.post('/login', login);

//PUT
router.put('/profileUpdate', authenticate, updateUser);

//DELETE
router.delete('/deteleProfile/:id', authenticate, deleteUser);


module.exports = router;
