const express = require('express');

const app = express();

const expressEjsLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 5000;

// EJS
app.use(expressEjsLayout);
app.set('view engine', 'ejs');

app.use('/', require('./routes/index'))

app.use('/users', require('./routes/users'))

app.listen(PORT, () => {
    console.log(`app listened to ${PORT}`)
})