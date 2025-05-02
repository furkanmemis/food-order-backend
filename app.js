const express = require('express');
const app = express();
const connectDB = require('./config/dbConnection')
const { initAdmin } = require('./initilization/adminInitilization'); // Doğru yol
const authenticationRoute = require('./routes/authentication');
const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category')
const restaurantRoute = require('./routes/restaurant');
const paymentRoute = require('./routes/Payment');
const cors = require('cors');

connectDB();
initAdmin();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/auth',authenticationRoute);
app.use('/user',userRoute);
app.use('/category',categoryRoute);
app.use('/restaurant',restaurantRoute);
app.use('/payment',paymentRoute);

app.listen(4000, () => {
  console.log('Server running with 4000 ports.');
});
