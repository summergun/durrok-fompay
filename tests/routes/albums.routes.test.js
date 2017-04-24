const { expect } = require('chai');
const request = require('supertest');
const app = require('../../server/app');
const server = request(app);

describe('/albums', () => {

  it('albums/:id returns an album', (done) => {
    server.get('/api/albums/1')
    .expect(200)
    .expect('Content-Type', /json/)
    .then( ({body})  => {
      expect(body.id * 1).to.equal(1);
      done();
    })
    .catch(done);
  });

  it('albums/:id returns 404', (done) => {
    server.get('api/albums/10')
    .expect(404)
    .then(() => {
      done();
    })
    .catch(done);
  });
});
