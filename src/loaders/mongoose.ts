import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    mongoose.connect('mongodb+srv://student:student@pokedex0.yhyr1o3.mongodb.net/pokedex?retryWrites=true&replicaSet=atlas-zf4fz1-shard-0&readPreference=primary&srvServiceName=mongodb&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1', {
    });
    console.log('Connexion à la base de données établie.');
  } catch (err) {
    console.error('Erreur de connexion à la base de données :', err);
    process.exit(1);
  }
};

export { connectDB };