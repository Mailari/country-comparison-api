const app = require("../../src/server");
const config = require("../../src/config");
const request = require("supertest");
require("chai").should();

describe("countries endpoint tests", () => {
  describe("get countries", () => {
    const endpointUrl = config.routes.controllerRootUrl + "/v1/countries";

    it("should return a list of countries", (done) => {
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
  });
});
