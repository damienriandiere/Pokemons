import supertest from 'supertest';
import app from '../src/app'
import { expect } from 'chai';
const logger = require('../src/loggers/loggers');

const request = supertest(app);

it('should return pokemons', async () => {
  logger.info('[TEST] Should return Pokemons.')
  const response = await request.get('/api/v1/pokemons/1');

  expect(response.status).to.equal(200);
  expect(response.body).to.exist;
  logger.info('[TEST] Should return Pokemons passed.')
});

it('should return 404 for an page number out of range', async () => {
  logger.info('[TEST] Should return 404  for an page number out of range.')
  const response = await request.get('/api/v1/pokemons/-2');

  expect(response.status).to.equal(404);
  expect(response.body).to.exist;
  logger.info('[TEST] Should return 404  for an page number out of range passed.')
});

it('should return 404 for a string passed in params', async () => {
  logger.info('[TEST] Should return 404 for a string passed in params.')
  const response = await request.get('/api/v1/pokemons/page');

  expect(response.status).to.equal(404);
  expect(response.body).to.exist;
  logger.info('[TEST] Should return 404 for a string passed in params.')
});

