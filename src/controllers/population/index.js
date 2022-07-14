"use strict";

const controller = require("./population.controller");

function routes(app, rootUrl) {
  // include api version number
  let fullRootUrl = rootUrl + "/v1";

  /**
   * @apiVersion 1.0.0
   * @api {get} /populations
   * @apiGroup Population
   * @apiName Get list of country population by country names
   * @apiDescription Returns an array of country population
   *
   * @apiSampleRequest /api/v1/populations
   *
   * @apiSuccess {json} Array of all country population
   * @apiSuccessExample {json} Success-Response:
   *   HTTP/1.1 200 OK
   * [
   *  {
   *     "country": "AFRICA",
   *     "population": "11231231"
   *  },
   *  {
   *     "country": "Afghanistan",
   *     "population": "11231231",
   *  }, ....
   * ]
   *
   * @apiError (Error 500) InternalServerError Returned if there was a server error
   */
  app.get({ url: fullRootUrl + "/populations/:countries" }, controller.getCountryPopulation);
}

module.exports = {
  routes: routes,
};
