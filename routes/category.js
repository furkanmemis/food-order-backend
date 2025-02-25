const express = require('express');
const {create,getAll,getByID,categoryDelete, categoryUpdate} = require('../controller/category');
const {verifyJWT} = require('../middleware/authentication');
const {verifyAdmin} = require('../middleware/user');

const router = express.Router();

router.post('/create-category',verifyJWT,verifyAdmin,create);
router.get('/get-all-category',verifyJWT,verifyAdmin,getAll);
router.get('/get/:id',verifyJWT,verifyAdmin,getByID);
router.delete('/delete-category/:id',verifyJWT,verifyAdmin,categoryDelete)
router.put('/update-category/:id',verifyJWT,verifyAdmin,categoryUpdate);



module.exports = router;