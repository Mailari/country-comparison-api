"use strict";

const co = require("co");
const errors = require("restify-errors");
const populationHelper = require("../../lib/population-helper");

exports.getCountryPopulation = co.wrap(async (req, res, next) => {
  {
    try {
      const countries = req.params.countries.split(",");
      const { sort = "asc", date = `${new Date().toISOString()}` } = req.query;
      const fetch_for = new Date(date);
      const result = await populationHelper.getCountryPopulation(countries, sort, fetch_for);
      res.json(result);
      return next();
    } catch (err) {
      return next(new errors.InternalServerError(err, "Server error retrieving countries."));
    }
  }
});
