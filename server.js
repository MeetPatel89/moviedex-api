require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const movies = require('./movies-dataset.json');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(helmet());

// Middleware functions

console.log(process.env.API_TOKEN);
