const express = require('express');
const {createUser, getUserByID, getAllUser, deleteUser, updateUser} = require('../controller/user');
const {verifyJWT} = require('../middleware/authentication');
const {verifyAdmin,verifyUser} = require('../middleware/user');

const router = express.Router();

router.post('/create-user',verifyJWT,verifyAdmin,createUser);
router.get('/get-user/:id', verifyJWT,verifyAdmin,getUserByID);
router.get('/get-all-user', verifyJWT,verifyAdmin,getAllUser);
router.delete('/delete-user/:id',verifyJWT,verifyAdmin,deleteUser);
router.put('/update-user/:id',verifyJWT,verifyUser,updateUser);

module.exports = router;