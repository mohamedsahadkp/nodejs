const supertest = require("supertest");
const assert = require("assert");
const app = require("../index");

describe("POST /", function() {
  it("it shoud return status code 200 is name exists", function(done) {
    supertest(app)
      .post("/")
      .send({ name: "Hope" })
      .expect(200)
      .end(function(err, res) {
        if (err) done(err);
        done();
      });
  });
  it("it shoud return status code 400 if we dosent send anything", function(done) {
    supertest(app)
      .post("/")
      .send({})
      .expect(400)
      .end(function(err, res) {
        if (err) done(err);
        done();
      });
  });
});