const express = require('express');
const expressEjsLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');

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
app.use(express.urlencoded({extended: true}))

app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))



app.listen(PORT, () => {
    console.log(`app listened to ${PORT}`)
})