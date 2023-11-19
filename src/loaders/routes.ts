import { Express } from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import AuthController from '../api/auth';
import PokemonController from '../api/pokemon';
import swaggerOptions from '../static/swaggerOptions.json';

export default (app: Express) => {
    console.log("Registering routes");

    const swaggerSpec = swaggerJSDoc(swaggerOptions);
    
    app.use(AuthController);
    app.use(PokemonController);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}