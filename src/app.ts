import baseRoute from './api/baseRoute'; 
import express from 'express';

var helmet = require('helmet');
require('dotenv').config();
const bodyParser = require('body-parser');
const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(bodyParser.json());
app.use(baseRoute);

const port = process.env.PORT;
const url = process.env.URL;

app.listen(port, () => {
  console.log(`Server running on ${url}${port}/`);
});