const app = require("../../src/server");
const config = require("../../src/config");
const request = require("supertest");
require("chai").should();

const { validCountryNames, invalidCountryNames } = require("./../fixtures/data/population-data-test.json");

describe("Population endpoint tests", () => {
  describe("get Population of a List of Countries", () => {
    const invalidEndpointUrl = config.routes.controllerRootUrl + "/v1/populations/" + invalidCountryNames;

    it("should throw an error when invalid country name is provided", (done) => {
      request(app)
        .get(`${invalidEndpointUrl}`)
        .set("accept", "application/json")
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          return done();
        });
    });
    const endpointUrl = config.routes.controllerRootUrl + "/v1/populations/" + validCountryNames;
    it("should return a list of population details with country names", (done) => {
      request(app)
        .get(`${endpointUrl}`)
        .set("accept", "application/json")
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.should.be.an.array;
          return done();
        });
    });
    it("should return a list of population details with country names in ascending order", (done) => {
      request(app)
        .get(`${endpointUrl}?sort=asc`)
        .set("accept", "application/json")
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.should.be.an.array;
          const [item1, item2] = res.body;
          item1.population.should.be.lessThan(item2.population);
          return done();
        });
    });

    it("should return a list of population details with country names in descending order", (done) => {
      request(app)
        .get(`${endpointUrl}?sort=desc`)
        .set("accept", "application/json")
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.should.be.an.array;
          const [item1, item2] = res.body;
          item2.population.should.be.lessThan(item1.population);
          return done();
        });
    });
  });
});
