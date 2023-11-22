import supertest from 'supertest';
import app from '../src/app'
import { expect } from 'chai';
const logger = require('../src/loggers/loggers');

const request = supertest(app);

it('should return Pokemon information for a valid ID', async () => {
  logger.info('[TEST] Should return Pokemon information for a valid ID.')
  const response = await request.get('/api/v1/pokemon/1');

  expect(response.status).to.equal(200);
  expect(response.body).to.exist;
  logger.info('[TEST] Should return Pokemon information for a valid ID passed.')
});

it('should return 404 for an invalid ID', async () => {
  logger.info('[TEST] Should return 404 error for an invalid ID.')
  const response = await request.get('/api/v1/pokemon/invalid-id');

  expect(response.status).to.equal(404);
  expect(response.body).to.exist;
  logger.info('[TEST] Should return 404 error for an invalid ID passed.')
});
