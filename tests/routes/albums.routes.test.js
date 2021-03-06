const { expect } = require('chai');
const request = require('supertest');
const app = require('../../server/app');

describe('/albums', () => {

  it('albums/ returns albums', (done) => {
    request(app).get('/api/albums')
    .expect(200)
    .expect('Content-Type', /json/)
    .then( ({body})  => {
      expect(body.length).to.equal(4);
      done();
    })
    .catch(done);
  });

  it('albums/ post new albums', (done) => {
    request(app).post('/api/albums')
    .send({
      name: 'Who is next',
      year: 1988,
      price: 12,
      description: 'Best album from the who'
    })
    .expect(201)
    .expect('Content-Type', /json/)
    .then( ({body})  => {
      expect(body.id * 1).to.equal(3);
      expect(body.price * 1).to.equal(12);
      return request(app).get('/api/albums')
      .then((res) => {
        expect(res.body.length).to.equal(5);
        done();
      });
    })
    .catch(done);
  });

  it('albums/:id returns an album', (done) => {
    request(app).get('/api/albums/1')
    .expect(200)
    .expect('Content-Type', /json/)
    .then( ({body})  => {
      expect(body.id * 1).to.equal(1);
      done();
    })
    .catch(done);
  });

  it('albums/:id can delete', (done) => {
    request(app).delete('/api/albums/1')
    .expect(204)
    .then( () => {
      return request(app).get('/api/albums/1')
      .expect(404)
      .then(() => done());
    })
    .catch(done);
  });


  it('albums/:id/genre returns a genre', (done) => {
    request(app).get('/api/albums/1/genre')
    .expect(200)
    .expect('Content-Type', /json/)
    .then( ({body})  => {
      expect(body.id * 1).to.equal(1);
      expect(body.name).to.equal('Jazz');
      done();
    })
    .catch(done);
  });

  it('albums/:id/genre can change genre', (done) => {
    request(app).put('/api/albums/1/genre')
    .send({id: 3})
    .expect(204)
    .then( ()  => {
      return request(app).get('/api/albums/1/genre')
      .then(({body}) => {
        expect(body.id * 1).to.equal(3);
        expect(body.name).to.equal('Rock Music');
        done();
      });
    })
    .catch(done);
  });

  it('albums/:id/genre removes genre', (done) => {
    request(app).delete('/api/albums/1/genre')
    .send({id: 2})
    .expect(204)
    .then( ()  => {
      return request(app).get('/api/albums/1/genre')
      .then(({body}) => {
        expect(body).to.equal(null);
        done();
      });
    })
    .catch(done);
  });

  it('albums/:id/songs returns songs', (done) => {
    request(app).get('/api/albums/1/songs')
    .expect(200)
    .expect('Content-Type', /json/)
    .then( ({body})  => {
      expect(body.length).to.equal(2);
      done();
    })
    .catch(done);
  });

  it('albums/:id/songs adds songs', (done) => {
    request(app).put('/api/albums/1/songs')
    .send({id: 3})
    .expect(204)
    .then( ()  => {
      return request(app).get('/api/albums/1/songs')
      .then(({body}) => {
        expect(body.length).to.equal(3);
        expect(body[2].name).to.equal('Miss You');
        done();
      });
    })
    .catch(done);
  });

  it('albums/:id/songs removes songs', (done) => {
    request(app).delete('/api/albums/1/songs')
    .send({id: 2})
    .expect(204)
    .then( ()  => {
      return request(app).get('/api/albums/1/songs')
      .then(({body}) => {
        expect(body.length).to.equal(1);
        done();
      });
    })
    .catch(done);
  });

  it('albums/:id/artist returns an artist', (done) => {
    request(app).get('/api/albums/1/artist')
    .expect(200)
    .expect('Content-Type', /json/)
    .then( ({body})  => {
      expect(body.id).to.equal(1);
      expect(body.firstName).to.equal('Nsync');
      done();
    })
    .catch(done);
  });

  it('albums/:id/artist updates artist', (done) => {
    request(app).put('/api/albums/1/artist')
    .send({id: 2})
    .expect(204)
    .then( ()  => {
      return request(app).get('/api/albums/1/artist')
      .then(({body}) => {
        expect(body.lastName).to.equal('Timberlake');
        done();
      });
    })
    .catch(done);
  });

  it('albums/:id/artist deletes artist', (done) => {
    request(app).delete('/api/albums/1/artist')
    .send({id: 2})
    .expect(204)
    .then( ()  => {
      return request(app).get('/api/albums/1/artist')
      .then(({body}) => {
        expect(body).to.equal(null);
        done();
      });
    })
    .catch(done);
  });


  it('albums/:id returns 404', (done) => {
    request(app).get('/api/albums/10')
    .expect(404)
    .then(() => {
      done();
    })
    .catch(done);
  });
});
