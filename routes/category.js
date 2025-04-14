const express = require('express');
const {create,getAll,getByID,categoryDelete, categoryUpdate, uploadImage,getImage, deleteImage} = require('../controller/category');
const {verifyJWT} = require('../middleware/authentication');
const {verifyAdmin} = require('../middleware/user');
const multer = require('multer');
const upload = multer({dest: 'uploads/'})

const router = express.Router();

router.post('/create-category',verifyJWT,verifyAdmin,create);
router.get('/get-all-category',verifyJWT,getAll);
router.get('/get-category/:id',verifyJWT,getByID);
router.delete('/delete-category/:id',verifyJWT,verifyAdmin,categoryDelete)
router.put('/update-category/:id',verifyJWT,verifyAdmin,categoryUpdate);



module.exports = router;