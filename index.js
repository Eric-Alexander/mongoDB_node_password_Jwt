const express = require('express');

const http = require('http');

const bodyParser = require('body-parser');

const morgan = require('morgan');

const app = express();

const router = require('./router');

const mongoose = require('mongoose');

//setup DB

mongoose.connect('mongodb://localhost/mern_auth');

//setup app
//middleware
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

//setup server

const port = process.env.PORT || 7777;
const server = http.createServer(app);

server.listen(port);

console.log('WE LISTENING ON', port);
