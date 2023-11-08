import baseRoute from './routers/baseRoute'; 
import express from 'express';

const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const app: express.Application = express();

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(baseRoute);

const port = process.env.PORT;
const url = process.env.URL;

app.listen(port, () => {
  console.log(`Server running on ${url}${port}/`);
});