const app = require("../../../src/server.js");
const config = require("../../../src/config");
const request = require("supertest");
const sinon = require("sinon");
require("chai").should();

const populationHelper = require("../../../src/lib/population-helper");
const {
  mockPopulationData,
  validCountryNames,
  ascending_order_populationData,
  descending_order_populationData,
  invalidCountryNames,
} = require("../../fixtures/data/population-data-test.json");

describe("populations endpoint tests", () => {
  let sandbox;
  beforeEach(function beforeEach() {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function afterEach() {
    sandbox.restore();
  });

  describe("get populations of given countries", function getCountries() {
    const endpointUrl = `${config.routes.controllerRootUrl}/v1/populations/${validCountryNames}`;
    const endpointUrlWithInvalidNames = `${config.routes.controllerRootUrl}/v1/populations/${invalidCountryNames}`;
    const asc_endpointUrl = `${config.routes.controllerRootUrl}/v1/populations/${validCountryNames}?sort=asc`;
    const des_endpointUrl = `${config.routes.controllerRootUrl}/v1/populations/${validCountryNames}?sort=desc`;

    it("should return a list of populations for given country names", (done) => {
      sandbox.stub(populationHelper, "getCountryPopulation", (countries, date, sort) => {
        if (sort) {
          if (sort === "asc") return ascending_order_populationData;
          if (sort === "desc") return descending_order_populationData;
        }
        return mockPopulationData;
      });

      request(app)
        .get(`${endpointUrl}`)
        .set("accept", "application/json")
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.should.be.an.array;
          res.body[0].should.be.an.object;
          res.body[0].country.should.eql(mockPopulationData[0].country);
          res.body[0].population.should.eql(mockPopulationData[0].population);
          res.body[1].country.should.eql(mockPopulationData[1].country);
          res.body[1].population.should.eql(mockPopulationData[1].population);
          res.body[2].country.should.eql(mockPopulationData[2].country);
          res.body[2].population.should.eql(mockPopulationData[2].population);
          return done();
        });
    });

    it("should throw error when invalid country names are provided", (done) => {
      sandbox.stub(populationHelper, "getCountryPopulation", (countries, date, sort) => {
        if (countries.join(",") === invalidCountryNames) throw new Error("Invalid countries array");
        return mockPopulationData;
      });

      request(app)
        .get(`${endpointUrlWithInvalidNames}`)
        .set("accept", "application/json")
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          return done();
        });
    });

    it("should return a list of populations for given country names with Ascending Order", (done) => {
      sandbox.stub(populationHelper, "getCountryPopulation", (countries, date, sort) => {
        if (sort) {
          if (sort === "asc") return ascending_order_populationData;
          if (sort === "desc") return descending_order_populationData;
        }
        return mockPopulationData;
      });

      request(app)
        .get(`${asc_endpointUrl}`)
        .set("accept", "application/json")
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.should.be.an.array;
          res.body[0].should.be.an.object;
          res.body[0].country.should.eql(ascending_order_populationData[0].country);
          res.body[0].population.should.eql(ascending_order_populationData[0].population);
          res.body[1].country.should.eql(ascending_order_populationData[1].country);
          res.body[1].population.should.eql(ascending_order_populationData[1].population);
          res.body[2].country.should.eql(ascending_order_populationData[2].country);
          res.body[2].population.should.eql(ascending_order_populationData[2].population);
          return done();
        });
    });

    it("should return a list of populations for given country names with Descending Order", (done) => {
      sandbox.stub(populationHelper, "getCountryPopulation", (countries, date, sort) => {
        if (sort) {
          if (sort === "asc") return ascending_order_populationData;
          if (sort === "desc") return descending_order_populationData;
        }
        return mockPopulationData;
      });

      request(app)
        .get(`${des_endpointUrl}`)
        .set("accept", "application/json")
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.should.be.an.array;
          res.body[0].should.be.an.object;
          res.body[0].country.should.eql(descending_order_populationData[0].country);
          res.body[0].population.should.eql(descending_order_populationData[0].population);
          res.body[1].country.should.eql(descending_order_populationData[1].country);
          res.body[1].population.should.eql(descending_order_populationData[1].population);
          res.body[2].country.should.eql(descending_order_populationData[2].country);
          res.body[2].population.should.eql(descending_order_populationData[2].population);
          return done();
        });
    });
  });
});
