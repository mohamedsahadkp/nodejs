const supertest = require('supertest');
const app = require('../index')

describe("/api", () => {
    it('it should return 200 OK', (done) => {
        supertest(app)
        .get("/")
        .expect(200)
        .end((err, res) => {
            if (err) done(err)
            done()
        });
    })
});