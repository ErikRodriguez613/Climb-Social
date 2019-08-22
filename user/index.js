const express = require('express');
const db = require('./config/db');

// Initiliase an express server
const app = express();

//Initialize db connection
db.conn();

//Initialize json parser
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
// app.use('/api/user', require('./api/routes/user'));

// Startup App
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`server started on port: ${port}`));
