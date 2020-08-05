const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const productsController = require('./routes/productsController');
const adminController = require('./routes/adminController');
const usersController = require('./routes/usersController');
const cartController = require('./routes/cartController');
const offersController = require('./routes/offersController'); 
const tailorsController = require('./routes/tailorsController'); 

const PORT = process.env.PORT || 5000;

// DB Config
const db = require('./config/keys').mongoURI;
mongoose
    .connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors('*'));
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['png','PNG', 'jpg', 'JPG', 'jpeg', 'JPEG'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

app.use(express.static('uploads', options))
app.use(express.static(path.join(__dirname, '/back')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/admin', adminController);
app.use('/api/users', usersController);
app.use('/api/users', cartController);
app.use('/api/admin', tailorsController);
app.use('/api/products', productsController);
app.use('/api/offers', offersController);

app.get('/', (req, res) => {
  res.send('Working...');
});

app.listen(PORT, () => {
  console.log(`Started at port - ${PORT}`);
});
