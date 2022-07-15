"use strict";

const co = require("co");
const errors = require("restify-errors");
const countryHelper = require("../../lib/country-helper");
const populationHelper = require("../../lib/population-helper");

exports.getCountries = co.wrap(async (req, res, next) => {
  {
    try {
      const refresh = req.query.refresh && req.query.refresh === "true" ? true : false;
      const countries = await countryHelper.getCountries(refresh);
      res.json(countries);
      return next();
    } catch (err) {
      return next(new errors.InternalServerError(err, "Server error retrieving countries."));
    }
  }
});
