import * as fs from 'fs';
const winston = require('winston');
const fileName = 'LogOutput.log';

if (fs.existsSync(fileName)) {
    fs.writeFileSync(fileName, '');
}

const transports = [
    new winston.transports.Console(),
    new winston.transports.File({ filename: fileName })
];

const logger = winston.createLogger({
    level: 'info', // Niveau minimal de logs à enregistrer
    format: winston.format.simple(), // Format des logs
    transports: transports
});

module.exports = logger;