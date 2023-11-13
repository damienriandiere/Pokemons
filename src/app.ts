const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const dotenv = require('dotenv');
const SwaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

dotenv.config();

const app = express();

// Use middleware
app.use(bodyParser.json());
app.use(helmet());

// Set up Swagger options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'Description of your API',
    },
  },
  apis: ['./api/*.js'], // specify the path to your API routes
};

// Generate Swagger documentation
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger documentation at /api-docs
app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(swaggerSpec));

// Your API routes go here
// app.use('/api', baseRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});