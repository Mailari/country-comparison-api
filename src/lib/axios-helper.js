const axios = require("axios");

exports.axiosInstance = axios.create({
  // baseURL: "https://d6wn6bmjj722w.population.io/1.0",
  baseURL: process.env.SERVICE_URL ? process.env.SERVICE_URL : "https://d6wn6bmjj722w.population.io/1.0",
});
