const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

// Middleware 
app.use(bodyParser.json());
app.use(cookieParser());


const userRoutes = require("../back-end/routes/user");
const profileRoutes = require("../back-end/routes/profile");
const requestRoutes = require("../back-end/routes/request");
const authRoute = require("../back-end/routes/auth");
const churchRoute = require("../back-end/routes/church");

app.get('/', (req, res) => {
  return res.send('Hello World!');
});

app.use('/users', userRoutes);
app.use('/profiles', profileRoutes);
app.use('/requests', requestRoutes);
app.use('/auth', authRoute);
app.use('/churches', churchRoute);

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, {
  promiseLibrary: require('bluebird'),
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
.then(() => console.log('connection successful'))
.catch((err) => console.error(err));
mongoose.Promise = global.Promise;

module.exports = app;
