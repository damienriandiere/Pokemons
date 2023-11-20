import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { connectDB } from './loaders/mongoose';
import routes from './loaders/routes';
const logger = require('./loggers/loggers');

(async () => {
  await connectDB();
})()
const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(bodyParser.json());
routes(app);

const PORT = process.env.PORT || 3000;
const LINK = process.env.URL || 'http://localhost';
app.listen(PORT, () => {
  logger.info(`Serveur lancé à l\'adresse suivante : ${LINK}${PORT}`);
});