const express = require('express');
const expressEjsLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const router = express.Router();
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

// Database Config
const db = require('./config/keys').MongoURI;
// connect to the database
mongoose.connect(db, {useNewUrlParser: true})
.then(() => console.log('Database connected......'))
.catch(() => {
    console.log('not connected to the database')
})

const PORT = process.env.PORT || 5000;

// EJS
app.use(expressEjsLayout);
app.set('view engine', 'ejs');

// BodyParser
app.use(express.urlencoded({extended: false}));

// Express-session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));

// use flash
app.use(flash());
// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.errror_msg = req.flash('error_msg');
    next()
})


app.use(morgan('tiny'))

app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))



app.listen(PORT, () => {
    console.log(`app listened to ${PORT}`)
})