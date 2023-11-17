const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const dotenv = require('dotenv');
const SwaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
import swaggerOptions from './models/swaggerOptions.json';
import AuthController from './api/auth';
import PokemonController from './api/pokemon';
import { connectDB } from './loaders/mongoose';

dotenv.config();

const app = express();

connectDB();

// Use middleware
app.use(bodyParser.json());
app.use(helmet());
app.use(AuthController);
app.use(PokemonController);

// Generate Swagger documentation
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger documentation at /api-docs
app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(swaggerSpec));

// Start the server
const PORT = process.env.PORT || 3000;
const LINK = process.env.URL || 'http://localhost';
app.listen(PORT, () => {
  console.log(`Server is running on port ${LINK}${PORT}`);
});