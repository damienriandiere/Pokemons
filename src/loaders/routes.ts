import { Express } from "express";
import swaggerUi from 'swagger-ui-express';
import AuthController from '../api/auth';
import PokemonController from '../api/pokemon';
import swaggerOptions from '../static/swaggerOptions.json';

export default (app: Express) => {
    console.log("Registering routes");

    app.use(AuthController);
    app.use(PokemonController);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));
}