import mongoose from 'mongoose';
const logger = require('../loggers/loggers');

const connectDB = async () => {
  try {
    mongoose.connect('mongodb+srv://student:student@pokedex0.yhyr1o3.mongodb.net/pokedex?retryWrites=true&replicaSet=atlas-zf4fz1-shard-0&readPreference=primary&srvServiceName=mongodb&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1', {
    });
    logger.info('Connexion à la base de données établie.');
  } catch (err) {
    logger.error('Erreur de connexion à la base de données :', err);
    process.exit(1);
  }
};

export { connectDB };