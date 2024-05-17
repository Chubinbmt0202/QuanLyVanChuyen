const express = require('express');
const app = express();

// Settings
app.get('/', (req, res) => {
    res.send('Hello World');
});



module.exports = app;