"use strict";

const { axiosInstance: axios } = require("./axios-helper");

exports.Countries = class Countries {
  static countries;
  static async getCountries() {
    return new Promise(async (resolve, _) => {
      if (this.countries) return resolve(this.countries);
      this.countries = axios.get("/countries").then(({ data }) => data.countries);
      return resolve(this.countries);
    });
  }

  static async updateCountries() {
    this.countries = await axios.get("/countries").then(({ data }) => data.countries);
  }
};

exports.getCountries = async function getCountries(refresh = false) {
  if (refresh) {
    await this.Countries.updateCountries();
  }
  return this.Countries.getCountries();
};
