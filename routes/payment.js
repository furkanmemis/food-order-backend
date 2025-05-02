const {createPayment,getIdPayment,getAllPayment,updatePayment,deletePayment} = require('../controller/payment');
const {verifyJWT} = require('../middleware/authentication');
const {verifyAdmin} = require('../middleware/user');
const express = require('express');
const router = express.Router();


router.post('/create-payment',verifyJWT,verifyAdmin,createPayment);
router.get('/get-all-payment',verifyJWT,getAllPayment);
router.get('/get-payment/:id',verifyJWT,getIdPayment);
router.delete('/delete-payment/:id',verifyJWT,verifyAdmin,deletePayment)
router.put('/update-payment/:id',verifyJWT,verifyAdmin,updatePayment);



module.exports = router;
